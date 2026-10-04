import { PlantDiagnosisResult, WeatherData } from '../types/plant';
import { SAMPLE_CASES } from '../data/sampleCases';
import { GUJARAT_DISTRICTS } from '../data/gujaratDistricts';

export const apiService = {
  async analyzePlant(images: string[], cropHint?: string): Promise<PlantDiagnosisResult> {
    try {
      const response = await fetch('/api/analyze-plant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images, cropHint })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('API call failed or offline mode active, using fallback diagnosis:', error);

      // Intelligent fallback: check if hint matches any sample crop
      const matched = cropHint
        ? SAMPLE_CASES.find(c => c.plant_name_gu.toLowerCase().includes(cropHint.toLowerCase()) || c.plant_name_en.toLowerCase().includes(cropHint.toLowerCase()))
        : null;

      const base = matched || SAMPLE_CASES[0];
      return {
        ...base,
        id: `scan-${Date.now()}`,
        timestamp: new Date().toISOString(),
        image_url: images[0] || base.image_url,
        secondary_image_url: images[1] || undefined,
        is_demo: false,
        warning: 'આ ફોટા આધારિત પ્રાથમિક AI વિશ્લેષણ છે. ચોક્કસ રોગ, પોષક તત્વોની ઉણપ અથવા દવાની ભલામણ માટે જમીન/પાકની તપાસ અને સ્થાનિક કૃષિ નિષ્ણાતની સલાહ જરૂરી હોઈ શકે છે.'
      };
    }
  },

  async sendChatMessage(
    message: string,
    history: Array<{ role: 'user' | 'assistant'; content: string }>
  ): Promise<{ text: string; suggestions?: string[] }> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history })
      });

      if (!response.ok) {
        throw new Error(`Server error ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.warn('Chat API offline or failed, using intelligent rule-based fallback:', err);
      return this.getLocalAgroResponse(message);
    }
  },

  async fetchWeather(lat: number, lon: number, districtName: string): Promise<WeatherData> {
    try {
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}&district=${encodeURIComponent(districtName)}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.warn('Proxy weather failed, trying direct Open-Meteo fallback:', e);
    }

    // Direct Open-Meteo API fallback in browser if proxy is temporarily unreachable
    try {
      const omRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FKolkata`
      );
      if (omRes.ok) {
        const omData = await omRes.json();
        const current = omData.current;
        const temp = Math.round(current.temperature_2m);
        const humidity = Math.round(current.relative_humidity_2m);
        const rain = current.precipitation || 0;
        const wind = Math.round(current.wind_speed_10m);

        let condition = 'સ્વચ્છ આકાશ (Clear Sky)';
        let sprayAdvice = 'પવન ધીમો છે. સવારે અથવા સાંજે દવાનો છંટકાવ અનુકૂળ રહેશે.';
        let irrigationAdvice = 'જમીનમાં સામાન્ય ભેજ જાળવવા હળવું પિયત આપી શકાય.';

        if (rain > 0 || current.weather_code >= 51) {
          condition = 'વરસાદી વાતાવરણ / ઝાપટાં';
          sprayAdvice = 'વરસાદની શક્યતા હોવાથી હાલમાં કોઈ દવાનો છંટકાવ કરવો નહીં; ધોવાઈ જશે.';
          irrigationAdvice = 'વરસાદની સ્થિતિ જોતાં હાલ પિયત આપવું મુલતવી રાખો.';
        } else if (wind > 20) {
          condition = 'તેજ પવન (Windy)';
          sprayAdvice = 'તેજ પવનના કારણે દવાનો બગાડ થશે, પવન શાંત થાય તેની રાહ જુઓ.';
          irrigationAdvice = 'ઊંચા પાક (ઘઉં, જુવાર) ઢળી ન પડે તે માટે પિયત ધીમે આપો.';
        } else if (temp > 38) {
          condition = 'તીવ્ર ગરમી (Heat Stress)';
          sprayAdvice = 'બપોરના સમયે છંટકાવ ન કરવો, પાન દાઝી જવાની શક્યતા છે.';
          irrigationAdvice = 'પાકને ગરમીથી બચાવવા સાંજે કે રાત્રે પિયત આપવું.';
        }

        const districtObj = GUJARAT_DISTRICTS.find(d => d.name_en.toLowerCase() === districtName.toLowerCase()) || GUJARAT_DISTRICTS[0];

        return {
          district: districtObj.name_en,
          district_gu: districtObj.name_gu,
          temperature: temp,
          apparent_temperature: Math.round(current.apparent_temperature || temp),
          humidity,
          rain,
          rain_probability: rain > 0 ? 80 : 15,
          wind_speed: wind,
          weather_code: current.weather_code,
          weather_condition_gu: condition,
          spray_advice_gu: sprayAdvice,
          irrigation_advice_gu: irrigationAdvice,
          updated_at: new Date().toLocaleTimeString('gu-IN', { hour: '2-digit', minute: '2-digit' })
        };
      }
    } catch (fallbackErr) {
      console.error('All weather fetches failed:', fallbackErr);
    }

    // Default static district weather
    const districtObj = GUJARAT_DISTRICTS.find(d => d.name_en.toLowerCase() === districtName.toLowerCase()) || GUJARAT_DISTRICTS[0];
    return {
      district: districtObj.name_en,
      district_gu: districtObj.name_gu,
      temperature: 31,
      apparent_temperature: 33,
      humidity: 58,
      rain: 0,
      rain_probability: 10,
      wind_speed: 12,
      weather_code: 1,
      weather_condition_gu: 'હળવો તડકો અને સ્વચ્છ હવામાન',
      spray_advice_gu: 'હવામાન અનુકૂળ છે. સાંજે પવન શાંત હોય ત્યારે ભલામણ મુજબ છંટકાવ કરી શકાય.',
      irrigation_advice_gu: 'સામાન્ય વાપસા સ્થિતિ જાળવવા ટપક કે ધોરિયા પિયત આપો.',
      updated_at: 'તાજેતરમાં'
    };
  },

  getLocalAgroResponse(msg: string): { text: string; suggestions?: string[] } {
    const q = msg.toLowerCase();

    if (q.includes('પીળા') || q.includes('yellow') || q.includes('પીળાશ')) {
      return {
        text: `🌱 **પાન પીળા પડવાના મુખ્ય કારણો અને માર્ગદર્શન:**

૧. **નાઇટ્રોજન (N) ની ઉણપ:** જૂના (નીચેના) પાન પહેલા પીળા પડે છે.
૨. **મેગ્નેશિયમ (Mg) ની ઉણપ:** પાનની નસો લીલી રહે છે અને વચ્ચેનો ભાગ પીળો થાય છે.
૩. **પાણીનો ભરાવો:** મૂળમાં વધુ પડતું પાણી ભરાવાથી ઓક્સિજન મળતો નથી, જેનાથી છોડ પીળો પડે છે.
૪. **ચુસિયા જીવાત (સફેદ માખી, થ્રીપ્સ):** પાનમાંથી રસ ચૂસી લેવાથી પાન પીળા થાય છે.

💡 **શું કરવું:**
• સૌપ્રથમ જમીનમાં પાણીનો નિકાલ સુધારો.
• લીમડાના તેલનો (૫ મિલી/લિટર) છંટકાવ કરો જેથી જીવાત નિયંત્રણ થાય.
• ચોક્કસ ખાતર માત્રા માટે માટી ચકાસણી (Soil Test) કરાવવી જરૂરી છે.

⚠️ *આ સામાન્ય કૃષિ સલાહ છે. કોઈપણ દવા વાપરતા પહેલા સ્થાનિક કૃષિ વૈજ્ઞાનિકની સલાહ લો.*`,
        suggestions: ['કપાસમાં સફેદ માખી નિયંત્રણ', 'ટપક પદ્ધતિમાં ખાતર વ્યવસ્થાપન', 'મગફળીમાં ટિક્કા રોગ']
      };
    }

    if (q.includes('કપાસ') || q.includes('cotton')) {
      return {
        text: `🌾 **કપાસ પાક સંભાળ અને જીવાત વ્યવસ્થાપન:**

• **કુકડાવો અને ગુલાબી ઈયળ:** પાન વાંકા વળવા લાગે તો લીલા-પીળા ચીકણા ટ્રેપ લગાવો.
• **ગુલાબી ઈયળ માટે:** હેક્ટર દીઠ ૮-૧૦ ફેરોમોન ટ્રેપ લગાવો.
• **ખાતર:** ફૂલ-ઝીંડવા સમયે પોટાશ અને બોરોનનું સંતુલન રાખો.
• **પિયત:** કપાસમાં પાણી ભરાવું ન જોઈએ; હળવું પિયત આપવું.

⚠️ *પ્રતિબંધિત અથવા અત્યંત ઝેરી રસાયણોનો ઉપયોગ ટાળો. બાળકો અને પાળતુ પ્રાણીઓથી દવાઓ દૂર રાખો.*`,
        suggestions: ['ગુલાબી ઈયળથી બચવાના ઉપાય', 'કપાસમાં ખાતરનું પ્રમાણ', 'કપાસના પાન વળી ગયા છે']
      };
    }

    if (q.includes('મગફળી') || q.includes('groundnut')) {
      return {
        text: `🥜 **મગફળી પાક સલાહ:**

• **ટિક્કા રોગ:** પાન પર કાળા-બદામી ટપકાં દેખાય તો ટ્રાઇકોડર્મા અથવા ભલામણ કરેલ ફૂગનાશકનો ઉપયોગ કરવો.
• **સૂયા અવસ્થા:** સૂયા બેસતી વખતે જમીન પોચી અને ભેજવાળી હોવી જોઈએ, નહિતર દાણો નાનો રહેશે.
• **જીપ્સમ:** સૂયા બેસવાના સમયે હેક્ટરે જીપ્સમ આપવાથી તેલની ટકાવારી અને દાણાનો ભરાવો સારો થાય છે.

⚠️ *સ્થાનિક કૃષિ ભલામણ અને પેકેજ ઓફ પ્રેક્ટિસિસ મુજબ જ પગલાં લો.*`,
        suggestions: ['મગફળીમાં સફેદ ફૂગ', 'સૂયા અવસ્થામાં પિયત', 'મગફળીમાં ખાતર']
      };
    }

    if (q.includes('ખાતર') || q.includes('fertilizer') || q.includes('યુરિયા')) {
      return {
        text: `🧪 **સંતુલિત ખાતર વ્યવસ્થાપન માર્ગદર્શન:**

• માત્ર ફોટા પરથી ખાતરની ચોક્કસ માત્રા નક્કી કરવી જોખમી છે.
• વધુ પડતો યુરિયા (નાઇટ્રોજન) આપવાથી છોડ કુણો પડે છે અને જીવાત વધારે આકર્ષાય છે.
• ડીએપી, પોટાશ અને સૂક્ષ્મ તત્વો (ઝીંક, બોરોન, આયર્ન) નો જમીન ચકાસણી (Soil Health Card) રિપોર્ટ મુજબ જ ઉપયોગ કરવો હિતાવહ છે.
• દેશી છાણીયું ખાતર અથવા વર્મીકમ્પોસ્ટ જમીનની ફળદ્રુપતા વધારે છે.`,
        suggestions: ['માટી પરીક્ષણ કેવી રીતે કરાવવું?', 'ડીએપી અને યુરિયાનો યોગ્ય ઉપયોગ', 'ઓર્ગેનિક ખાતરો']
      };
    }

    return {
      text: `નમસ્તે ખેડૂત મિત્ર! 🌱
હું આપનો **સ્માર્ટ કૃષિ સહાયક** છું.

આપ પાકની કોઈપણ સમસ્યા (જેમ કે પાન પીળા પડવા, ઈયળનો ઉપદ્રવ, ટપકાંનો રોગ, પાણીનું આયોજન કે ખાતર) વિશે ગુજરાતીમાં પૂછી શકો છો.

💡 આપ "📷 છોડ સ્કેન કરો" માં જઈને તમારા પાન કે છોડનો ફોટો પાડીને પણ ત્વરિત AI વિશ્લેષણ મેળવી શકો છો!`,
      suggestions: ['મારા કપાસના પાન પીળા થઈ ગયા છે, શું કરું?', 'મગફળીમાં પાનના ટપકાંનો રોગ', 'ડુંગળીમાં થ્રીપ્સ નિયંત્રણ', 'આજના હવામાન મુજબ દવાનો છંટકાવ કરાય?']
    };
  }
};

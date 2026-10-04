import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// High limit for base64 plant image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize Gemini SDK if API key is present
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (geminiApiKey) {
  ai = new GoogleGenAI();
}

/**
 * Endpoint: POST /api/analyze-plant
 * Multimodal Plant Disease & Crop Identification using Gemini Vision
 */
app.post('/api/analyze-plant', async (req: Request, res: Response) => {
  try {
    const { images, cropHint } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      res.status(400).json({ error: 'કૃપા કરીને ઓછામાં ઓછો એક ફોટો આપો (At least one image is required)' });
      return;
    }

    if (!ai) {
      console.warn('GEMINI_API_KEY not configured on server. Handing over to fallback.');
      res.status(503).json({ error: 'GEMINI_API_KEY not set on server' });
      return;
    }

    // Convert data URLs to Gemini inlineData parts
    const imageParts = images.slice(0, 3).map((imgUrl: string) => {
      const match = imgUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
      if (match) {
        return {
          inlineData: {
            mimeType: match[1],
            data: match[2]
          }
        };
      }
      return null;
    }).filter(Boolean);

    if (imageParts.length === 0) {
      res.status(400).json({ error: 'અમાન્ય ફોટો ફોર્મેટ (Invalid image base64 data)' });
      return;
    }

    const promptText = `
You are a senior agricultural plant pathologist and crop expert specializing in Indian/Gujarat agriculture.
Analyze the provided plant photo(s). ${cropHint ? `The user indicated the crop may be: "${cropHint}".` : ''}

You MUST return a pure, valid JSON object (no markdown quotes, no explanations outside JSON) with this exact schema:
{
  "plant_name_gu": "પાકનું ગુજરાતી નામ (e.g. કપાસ, મગફળી, ઘઉં, ટામેટા)",
  "plant_name_en": "English Name (e.g. Cotton, Groundnut)",
  "scientific_name": "Botanical / Scientific Name (e.g. Gossypium hirsutum)",
  "crop_category": "પાકનો પ્રકાર (e.g. રોકડિયો પાક, તેલીબિયાં, અનાજ, શાકભાજી, ઔષધીય છોડ)",
  "growth_stage": "વૃદ્ધિનો તબક્કો (e.g. વાનસ્પતિક, ફૂલ આવવા, ફળ/ઝીંડવા, પરિપક્વ)",
  "health_status": "healthy" | "attention" | "critical",
  "confidence": "high" | "medium" | "low",
  "confidence_score": 0.85,
  "visible_symptoms": ["પાન પીળા પડવા", "ગોળાકાર ટપકાં", "કુકડાવો"],
  "possible_disease": "સંભવિત રોગનું નામ અને ટૂંકી વિગત",
  "possible_pest": "સંભવિત જીવાત (સફેદ માખી, થ્રીપ્સ, ઈયળ વગેરે) અથવા 'કોઈ જીવાત દેખાતી નથી'",
  "possible_nutrient_deficiency": "સંભવિત પોષક તત્વોની ઉણપ (નાઇટ્રોજન, પોટાશ, મેગ્નેશિયમ, ઝીંક વગેરે)",
  "water_guidance": "પાણી/સિંચાઈ માર્ગદર્શન. ક્યારેય 'આજે જ પાણી આપો' જેવી અતિશય નિશ્ચિત ખાતરી ન આપવી; જમીનની ભેજ ચકાસવાની સલાહ આપવી.",
  "care_recommendation": "સામાન્ય સંભાળ, નીંદણ દૂર કરવું, સૂર્યપ્રકાશ અને હવા-ઉજાસ.",
  "treatment_guidance": "સૌપ્રથમ Integrated Pest Management (IPM), લીમડાનું તેલ, ટ્રેપ્સ, જૈવિક ઉપાયો બતાવો. કોઈ દવાનું ચોક્કસ મિલી/ગ્રામ માપ માત્ર ફોટા પરથી ન આપવું; માન્ય લેબલ અને કૃષિ વિભાગની ભલામણ ચકાસવાની સૂચના આપવી. PPE (માસ્ક, મોજાં) સલામતી આપવી.",
  "dos_and_donts": {
    "dos": ["સવારે કે સાંજે શાંત વાતાવરણમાં છંટકાવ કરવો", "પીળા/વાદળી ટ્રેપ વાપરવા"],
    "donts": ["બે કે વધુ દવાઓ ભેગી ન કરવી", "તડકામાં છંટકાવ ન કરવો", "બાળકોથી દવાઓ દૂર રાખવી"]
  },
  "when_to_consult_expert": "જો 3 દિવસમાં રોગ 15% થી વધુ વધે તો સ્થાનિક કૃષિ વિજ્ઞાન કેન્દ્ર (KVK) અથવા ગ્રામસેવકનો સંપર્ક કરવો.",
  "warning": "આ ફોટા આધારિત પ્રાથમિક AI વિશ્લેષણ છે. ચોક્કસ રોગ, પોષક તત્વોની ઉણપ અથવા દવાની ભલામણ માટે જમીન/પાકની તપાસ અને સ્થાનિક કૃષિ નિષ્ણાતની સલાહ જરૂરી હોઈ શકે છે."
}

Rules:
- Respond in high quality, natural, farmer-friendly Gujarati for all descriptions.
- Strictly adhere to uncertainty rules: Never claim 100% certainty from a single photo.
- Never recommend dangerous pesticide tank cocktails or exact hazardous chemical dosages.
`;

    const contents = [
      ...imageParts,
      { text: promptText }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: contents as any,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const responseText = response.text || '';
    let parsed: any;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      // Clean possible markdown code fences
      const cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    }

    // Attach server id and timestamp
    parsed.id = `scan-${Date.now()}`;
    parsed.timestamp = new Date().toISOString();
    parsed.image_url = images[0];
    if (images.length > 1) {
      parsed.secondary_image_url = images[1];
    }

    res.json(parsed);
  } catch (error: any) {
    console.error('Error analyzing plant with Gemini API:', error);
    res.status(500).json({
      error: 'AI વિશ્લેષણમાં ત્રુટિ આવી છે. કૃપા કરીને ફરી પ્રયાસ કરો.',
      details: error?.message || 'Unknown error'
    });
  }
});

/**
 * Endpoint: POST /api/chat
 * Agricultural Chat Assistant in Gujarati
 */
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      res.status(400).json({ error: 'સંદેશ આપવો જરૂરી છે (Message is required)' });
      return;
    }

    if (!ai) {
      res.status(503).json({ error: 'GEMINI_API_KEY not configured on server' });
      return;
    }

    const systemInstruction = `
તમે ગુજરાતના ખેડૂતો માટેના સ્માર્ટ કૃષિ સલાહકાર અને પાક નિષ્ણાત "કૃષિ મિત્ર" છો.
આપ ખેડૂતોના પ્રશ્નોના જવાબો સરળ, આદરપૂર્ણ અને શુદ્ધ ગુજરાતી ભાષામાં આપો છો.

મુખ્ય નિયમો:
૧. પાક, રોગ, જીવાત, ખાતર, પાણી વ્યવસ્થાપન, જમીન સંભાળ અંગે ચોક્કસ અને વ્યવહારુ માહિતી આપો.
૨. કોઈપણ રાસાયણિક દવાની ભલામણ કરતાં પહેલા જૈવિક (Organic) અને IPM (Integrated Pest Management) ઉપાયોને પ્રાથમિકતા આપો (જેમ કે લીમડાનું તેલ, ટ્રાઇકોડર્મા, ફેરોમોન ટ્રેપ).
૩. ક્યારેય બે કે વધુ દવાઓ ભેગી કરવાની જોખમી સલાહ ન આપવી. દવા વાપરતી વખતે માસ્ક અને મોજાં પહેરવાની સલાહ આપવી.
૪. જવાબના અંતે ટૂંકી સાવચેતી નોંધ અને આગામી ૨-૩ સંભવિત પ્રશ્નો (suggestions) આપવા.
૫. સ્પષ્ટ બુલેટ પોઇન્ટ્સ અને સરળ ભાષા વાપરો.
`;

    const chatHistory = Array.isArray(history)
      ? history.map((item: any) => ({
          role: item.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: item.content || item.text }]
        }))
      : [];

    chatHistory.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: chatHistory as any,
      config: {
        systemInstruction
      }
    });

    const answer = response.text || '';
    res.json({
      text: answer,
      suggestions: [
        'આ રોગમાં કયું જૈવિક ખાતર વાપરી શકાય?',
        'પિયત ક્યારે અને કેટલું આપવું જોઈએ?',
        'દવાનો છંટકાવ કરતી વખતે શું સાવચેતી રાખવી?'
      ]
    });
  } catch (error: any) {
    console.error('Error in chat assistant:', error);
    res.status(500).json({
      error: 'ચેટ સહાયકમાં ત્રુટિ આવી છે.',
      details: error?.message || 'Unknown error'
    });
  }
});

/**
 * Endpoint: GET /api/weather
 * Real-time Gujarat Agricultural Weather
 */
app.get('/api/weather', async (req: Request, res: Response) => {
  try {
    const lat = req.query.lat ? Number(req.query.lat) : 22.3039; // Default Rajkot
    const lon = req.query.lon ? Number(req.query.lon) : 70.8022;
    const districtName = (req.query.district as string) || 'Rajkot';

    const omUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FKolkata`;
    
    const omRes = await fetch(omUrl);
    if (!omRes.ok) {
      throw new Error(`Open-Meteo returned status ${omRes.status}`);
    }

    const data = await omRes.json();
    const current = data.current;
    const temp = Math.round(current.temperature_2m);
    const humidity = Math.round(current.relative_humidity_2m);
    const rain = current.precipitation || 0;
    const wind = Math.round(current.wind_speed_10m);

    let condition = 'સ્વચ્છ આકાશ (Clear Sky)';
    let sprayAdvice = 'પવન શાંત છે. સવારે અથવા સાંજે દવાનો છંટકાવ કરવો અનુકૂળ છે.';
    let irrigationAdvice = 'જમીનમાં સામાન્ય ભેજ જાળવવા હળવું પિયત આપો.';

    if (rain > 0 || current.weather_code >= 51) {
      condition = 'વરસાદી વાતાવરણ / ઝાપટાં';
      sprayAdvice = 'વરસાદની શક્યતા હોવાથી હાલમાં કોઈ દવાનો છંટકાવ કરવો નહીં; દવા ધોવાઈ જશે.';
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

    res.json({
      district: districtName,
      district_gu: districtName,
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
    });
  } catch (error: any) {
    console.error('Weather fetch error:', error);
    res.status(500).json({ error: 'હવામાન ડેટા મેળવવામાં ત્રુટિ આવી.' });
  }
});

/**
 * Static file serving & Vite Dev Server integration
 */
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌱 AI Plant Doctor server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

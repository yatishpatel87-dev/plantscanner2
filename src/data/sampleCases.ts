import { PlantDiagnosisResult } from '../types/plant';

export const SAMPLE_CASES: PlantDiagnosisResult[] = [
  {
    id: 'sample-cotton',
    timestamp: '2026-10-03T10:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=800&q=80',
    plant_name_gu: 'કપાસ (Cotton)',
    plant_name_en: 'Cotton',
    scientific_name: 'Gossypium hirsutum',
    crop_category: 'રોકડિયો પાક (Cash Crop)',
    growth_stage: 'ફૂલ અને ઝીંડવા બેસવાનો તબક્કો (Flowering / Boll Formation)',
    health_status: 'attention',
    confidence: 'high',
    confidence_score: 0.92,
    visible_symptoms: [
      'પાનની કિનારીઓ આછી પીળી પડવી',
      'પાન નીચેની તરફ વળવા લાગવા (Leaf curling)',
      'પાનની નીચે નાની સફેદ માખી અથવા ચુસિયા પ્રકારની જીવાતની હાજરી'
    ],
    possible_disease: 'લીફ કર્લ વાયરસ અથવા પાનનો કુકડાવો (Leaf Curl Risk)',
    possible_pest: 'સફેદ માખી (Whitefly) અને થ્રીપ્સ (Thrips)',
    possible_nutrient_deficiency: 'મેગ્નેશિયમ (Mg) ની આછી ઉણપ (પાનની નસો વચ્ચે પીળાશ)',
    water_guidance: 'જમીનમાં સપ્રમાણ ભેજ જાળવવો. કપાસમાં પાણી ભરાવું ન જોઈએ. ટપક પદ્ધતિ હોય તો 2 થી 3 દિવસે હળવું પિયત આપો.',
    care_recommendation: 'ખેતરમાં પીળા અને વાદળી ચીકણા ટ્રેપ (Sticky Traps) હેક્ટર દીઠ 15-20 લગાવો જેથી ચુસિયા જીવાત ફસાય. નીંદણ તાત્કાલિક સાફ કરો.',
    treatment_guidance: 'પ્રથમ ઉપાય: 5 મિલી લીમડાનું તેલ (Neem Oil 1500 PPM) પ્રતિ લિટર પાણીમાં સ્ટીકર સાથે સાંજના સમયે છંટકાવ કરો. જો ઉપદ્રવ વધુ હોય તો સ્થાનિક એગ્રો કેન્દ્ર અથવા કેવીકે (KVK) ની ભલામણ અનુસાર અધિકૃત જૈવિક કીટનાશક કે ભલામણ કરેલ દવા વાપરો. બાળકો અને પશુઓથી દૂર રાખો.',
    dos_and_donts: {
      dos: [
        'પીળા ચીકણા ટ્રેપ લગાવો',
        'છંટકાવ વખતે મોં પર માસ્ક અને હાથમાં મોજાં અવશ્ય પહેરો',
        'હંમેશા સાંજે પવન શાંત હોય ત્યારે જ છંટકાવ કરવો'
      ],
      donts: [
        'કોઈપણ બે દવાઓ કે ખાતરો જાણકારી વગર એકસાથે મિક્સ ન કરવા',
        'તીવ્ર તડકામાં કે ભારે પવનમાં છંટકાવ ન કરવો'
      ]
    },
    when_to_consult_expert: 'જો 4-5 દિવસમાં 20% થી વધુ છોડમાં કુકડાવો વધે તો ગ્રામસેવક અથવા નજીકની કૃષિ યુનિવર્સિટીના વૈજ્ઞાનિકને ફોટો અથવા નમૂનો બતાવો.',
    warning: 'આ ફોટા આધારિત પ્રાથમિક AI વિશ્લેષણ છે. ચોક્કસ રોગ, પોષક તત્વોની ઉણપ અથવા દવાની ભલામણ માટે જમીન/પાકની તપાસ અને સ્થાનિક કૃષિ નિષ્ણાતની સલાહ જરૂરી હોઈ શકે છે.',
    is_demo: true
  },
  {
    id: 'sample-groundnut',
    timestamp: '2026-10-03T10:15:00Z',
    image_url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
    plant_name_gu: 'મગફળી (Groundnut)',
    plant_name_en: 'Groundnut / Peanut',
    scientific_name: 'Arachis hypogaea',
    crop_category: 'તેલીબિયાં પાક (Oilseed Crop)',
    growth_stage: 'સૂયા બેસવાનો તબક્કો (Pegging Stage)',
    health_status: 'critical',
    confidence: 'high',
    confidence_score: 0.89,
    visible_symptoms: [
      'પાન ઉપર ઘેરા બદામી-કાળા ગોળાકાર ટપકાં (Dark circular spots)',
      'ટપકાંની ફરતે પીળું કુંડાળું (Yellow halo effect)',
      'નીચેના પાન અકાળે ખરી પડવા'
    ],
    possible_disease: 'ટિક્કા રોગ (પાનના ટપકાંનો રોગ - Cercospora Leaf Spot / Tikka Disease)',
    possible_pest: 'પાન કોરી ખાનાર ઈયળની પ્રાથમિક શક્યતા',
    possible_nutrient_deficiency: 'કેલ્શિયમ અને સલ્ફરની અછતના પ્રારંભિક ચિહ્નો',
    water_guidance: 'સૂયા બેસવાના સમયે જમીન કડક ન થવી જોઈએ. જમીનમાં પૂરતો ભેજ હોવો અત્યંત જરૂરી છે જેથી સૂયા સરળતાથી જમીનમાં પ્રવેશી શકે.',
    care_recommendation: 'અસરગ્રસ્ત ખરી પડેલા પાન ભેગા કરી બાળી નાખો. વધુ પડતી ભેજવાળી સ્થિતિમાં ફૂગ ઝડપથી ફેલાય છે માટે હવા-ઉજાસ જાળવો.',
    treatment_guidance: 'IPM ઉપાય: ટ્રાઇકોડર્મા હાર્ઝિયાનમ (Trichoderma harzianum) કલ્ચરનો ઉપયોગ કરો. ફૂગનાશક માટે સ્થાનિક કૃષિ ભલામણ મુજબ કાર્બેન્ડાઝીમ અથવા મેન્કોઝેબ જેવા ભલામણ કરેલ ફૂગનાશકનો નિર્ધારિત લેબલ સૂચના મુજબ જ ઉપયોગ કરવો.',
    dos_and_donts: {
      dos: [
        'રોગની શરૂઆતમાં જ નિયંત્રણ શરૂ કરો',
        'પાણી સાથે જીપ્સમ (સલ્ફર + કેલ્શિયમ માટે) કૃષિ સલાહ મુજબ ઉમેરો'
      ],
      donts: [
        'જમીન વધારે પડતી સૂકી ન પડવા દો',
        'રોગગ્રસ્ત પાન ખેતરમાં જ સડવા ન દેશો'
      ]
    },
    when_to_consult_expert: 'જો પાન મોટા પાયે પીળા પડી ખરી રહ્યા હોય તો તરત જ જૂનાગઢ/આણંદ કૃષિ યુનિવર્સિટીના પ્લાન્ટ પેથોલોજિસ્ટનો સંપર્ક કરો.',
    warning: 'આ ફોટા આધારિત પ્રાથમિક AI વિશ્લેષણ છે. ચોક્કસ રોગ, પોષક તત્વોની ઉણપ અથવા દવાની ભલામણ માટે જમીન/પાકની તપાસ અને સ્થાનિક કૃષિ નિષ્ણાતની સલાહ જરૂરી હોઈ શકે છે.',
    is_demo: true
  },
  {
    id: 'sample-wheat',
    timestamp: '2026-10-03T10:30:00Z',
    image_url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    plant_name_gu: 'ઘઉં (Wheat)',
    plant_name_en: 'Wheat',
    scientific_name: 'Triticum aestivum',
    crop_category: 'ધાન્ય પાક (Cereal Grain)',
    growth_stage: 'ડુંડી નીકળવાનો તબક્કો (Heading / Booting Stage)',
    health_status: 'healthy',
    confidence: 'high',
    confidence_score: 0.95,
    visible_symptoms: [
      'પાનનો લીલો રંગ ઘેરો અને સ્વસ્થ છે',
      'કોઈ કાળા, પીળા ગેરુ કે ઉધઈના ડાઘ નથી',
      'ડુંડીનો વિકાસ નિયમિત છે'
    ],
    possible_disease: 'કોઈ સક્રિય રોગના લક્ષણ નથી (No active disease)',
    possible_pest: 'કોઈ સક્રિય જીવાત નથી',
    possible_nutrient_deficiency: 'કોઈ ગંભીર ઉણપ નથી; પોષણ સંતુલિત છે',
    water_guidance: 'ડુંડીમાં દાણા ભરાવાના તબક્કે (Milking Stage) જમીનમાં ભેજ જાળવી રાખવો. પવન તેજ હોય ત્યારે પિયત ન આપવું જેથી ઘઉં ઢળી ન પડે.',
    care_recommendation: 'તાપમાન વધે ત્યારે સવારે કે સાંજે હળવું પિયત આપવું. નીંદણમુક્ત રાખો.',
    treatment_guidance: 'હાલમાં કોઈ રાસાયણિક કે કીટનાશક સારવારની જરૂર નથી. પાક તંદુરસ્ત છે.',
    dos_and_donts: {
      dos: [
        'દાણા ભરાવાના સમયે જમીનમાં ભેજ જાળવો',
        'પાક પરિપક્વ થાય ત્યાં સુધી નિયમિત નિરીક્ષણ કરો'
      ],
      donts: [
        'વગર કારણે દવાઓનો બિનજરૂરી છંટકાવ ન કરવો',
        'ભારે પવનમાં પિયત આપવાનું ટાળવું'
      ]
    },
    when_to_consult_expert: 'જો પાન પર પીળા અથવા કથ્થઈ રંગની પટ્ટીઓ (ગેરુ) દેખાય તો જ નિષ્ણાતને બતાવવું.',
    warning: 'આ ફોટા આધારિત પ્રાથમિક AI વિશ્લેષણ છે. ચોક્કસ રોગ, પોષક તત્વોની ઉણપ અથવા દવાની ભલામણ માટે જમીન/પાકની તપાસ અને સ્થાનિક કૃષિ નિષ્ણાતની સલાહ જરૂરી હોઈ શકે છે.',
    is_demo: true
  },
  {
    id: 'sample-onion',
    timestamp: '2026-10-03T10:45:00Z',
    image_url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    plant_name_gu: 'ડુંગળી (Onion)',
    plant_name_en: 'Onion',
    scientific_name: 'Allium cepa',
    crop_category: 'શાકભાજી / કંદ પાક (Vegetable Bulb)',
    growth_stage: 'ગાંઠ/દડો બેસવાનો તબક્કો (Bulb Development Stage)',
    health_status: 'attention',
    confidence: 'medium',
    confidence_score: 0.82,
    visible_symptoms: [
      'ડુંગળીના પાનના છેડા સફેદ-પીળા પડી સુકાવા (Tip burn)',
      'પાન પર ચાંદી જેવા સફેદ રંગના ઉઝરડા (Silvery patches)',
      'પાંદડીઓ વાંકી-ચૂંકી વળી જવી'
    ],
    possible_disease: 'જાંબલી ધાબાનો રોગ (Purple Blotch) ની શરૂઆતની શક્યતા',
    possible_pest: 'ડુંગળીના થ્રીપ્સ (Onion Thrips)',
    possible_nutrient_deficiency: 'પોટાશ (Potash - K) અને બોરોન (Boron) ની સંભવિત અછત',
    water_guidance: 'ડુંગળી છીછરા મૂળવાળો પાક હોવાથી નિયમિત અને હળવું પિયત આપવું. વધારે પડતું પાણી ભરવાથી મૂળ અને ગાંઠનો કોહવારો થઈ શકે છે.',
    care_recommendation: 'વાદળી ચીકણા ટ્રેપ ખેતરમાં લગાવો. ગાંઠના કદ માટે પોટાશ ખાતર જમીન ચકાસણી મુજબ જ આપો.',
    treatment_guidance: 'પ્રથમ જૈવિક ઉપાય: વર્ટિસિલિયમ લેકાની (Verticillium lecanii) 5 ગ્રામ પ્રતિ લિટર પાણીમાં છાંટો. રાસાયણિક કીટનાશક કે ફૂગનાશક માટે માન્ય લેબલ મુજબ જ એગ્રો એક્સપર્ટની સલાહ લેવી.',
    dos_and_donts: {
      dos: [
        'ડુંગળી કાઢવાના 10-15 દિવસ પહેલા પિયત બંધ કરવું',
        'દવા છાંટતી વખતે સ્ટીકર/ચીકણો પદાર્થ (Spreader) વાપરવો કારણ કે ડુંગળીના પાન ચીકણા હોય છે'
      ],
      donts: [
        'વધારાનું પાણી ખેતરમાં ભરાઈ રહેવા ન દેવું',
        'લણણીના દિવસો નજીક હોય ત્યારે ઝેરી દવાનો છંટકાવ ન કરવો'
      ]
    },
    when_to_consult_expert: 'જો જાંબુડિયા રંગના મોટા ડાઘ પાન પર ફેલાય તો તાત્કાલિક તજજ્ઞ પાસે જવું.',
    warning: 'આ ફોટા આધારિત પ્રાથમિક AI વિશ્લેષણ છે. ચોક્કસ રોગ, પોષક તત્વોની ઉણપ અથવા દવાની ભલામણ માટે જમીન/પાકની તપાસ અને સ્થાનિક કૃષિ નિષ્ણાતની સલાહ જરૂરી હોઈ શકે છે.',
    is_demo: true
  },
  {
    id: 'sample-tomato',
    timestamp: '2026-10-03T11:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80',
    plant_name_gu: 'ટામેટા (Tomato)',
    plant_name_en: 'Tomato',
    scientific_name: 'Solanum lycopersicum',
    crop_category: 'શાકભાજી પાક (Vegetable Crop)',
    growth_stage: 'ફળ બેસવાનો તબક્કો (Fruiting Stage)',
    health_status: 'critical',
    confidence: 'high',
    confidence_score: 0.94,
    visible_symptoms: [
      'પાન પર ઘેરા ગોળ રીંગ જેવા ટપકાં (Target-board concentric rings)',
      'નીચેના પાન પીળા પડીને સુકાઈ જવા',
      'ફળના નીચેના ભાગમાં કાળો સડો (Blossom End Rot)'
    ],
    possible_disease: 'આગોતરો સુકારો (Early Blight - Alternaria solani)',
    possible_pest: 'ફળ કોરી ખાનાર ઈયળ (Fruit Borer)',
    possible_nutrient_deficiency: 'કેલ્શિયમ (Calcium) ની ઉણપના કારણે ફળના તળિયે કાળો ડાઘ',
    water_guidance: 'પિયતમાં વધઘટ ન કરવી; અનિયમિત પાણી આપવાથી ફળ ફાટી જાય છે અને કેલ્શિયમ શોષણ અટકે છે. ટપક પદ્ધતિ ઉત્તમ છે.',
    care_recommendation: 'જમીનને સ્પર્શતા નીચેના રોગગ્રસ્ત પાન કાપીને દૂર કરો જેથી ભેજથી ફૂગ ન ફેલાય.',
    treatment_guidance: 'IPM: ફળો માટે ફેરોમોન ટ્રેપ (Pheromone Traps) ગોઠવો. કેલ્શિયમ નાઇટ્રેટનો જમીન પૃથ્થકરણ બાદ ઉપયોગ કરો. ફૂગનાશક માટે કોપર ઓક્સીક્લોરાઇડ અથવા મેન્કોઝેબ અંગે લેબલ મુજબ કૃષિ અધિકારીની સલાહ લો.',
    dos_and_donts: {
      dos: [
        'છોડને સ્ટેકિંગ (લાકડીનો ટેકો) આપવો જેથી ફળ જમીન સાથે ન અડે',
        'ફળ તોડવાના દિવસો દરમિયાન સલામત waiting period જાળવવો'
      ],
      donts: [
        'પાંદડા ઉપર સીધું પાણી ન છાંટવું (સ્પ્રિંકલર કરતાં ટપક વાપરવું)',
        'સડેલા ફળો છોડ પર લટકતા ન રહેવા દેવા'
      ]
    },
    when_to_consult_expert: 'જો ફળો પર કાળા ડાઘ અને સડો 10% થી વધુ વધે તો બાગાયત અધિકારીનો સંપર્ક કરવો.',
    warning: 'આ ફોટા આધારિત પ્રાથમિક AI વિશ્લેષણ છે. ચોક્કસ રોગ, પોષક તત્વોની ઉણપ અથવા દવાની ભલામણ માટે જમીન/પાકની તપાસ અને સ્થાનિક કૃષિ નિષ્ણાતની સલાહ જરૂરી હોઈ શકે છે.',
    is_demo: true
  },
  {
    id: 'sample-chilli',
    timestamp: '2026-10-03T11:15:00Z',
    image_url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
    plant_name_gu: 'મરચાં (Chilli)',
    plant_name_en: 'Chilli / Hot Pepper',
    scientific_name: 'Capsicum annuum',
    crop_category: 'મસાલા / શાકભાજી પાક (Spice / Vegetable)',
    growth_stage: 'ફૂલ અને મરચાં આવવાનો તબક્કો (Flowering & Pod Setting)',
    health_status: 'attention',
    confidence: 'high',
    confidence_score: 0.91,
    visible_symptoms: [
      'પાન ઉપરની તરફ હોડી જેવા આકારમાં વળી જવા (Boat-shaped upward curling)',
      'છોડનો વિકાસ અટકી જવો (Stunted growth)',
      'ફૂલ ખરી પડવા'
    ],
    possible_disease: 'મુરબ્બો / કુકડાવો (Chilli Leaf Curl Virus / Murda Disease)',
    possible_pest: 'થ્રીપ્સ (Thrips) અને કથીરી (Mites)',
    possible_nutrient_deficiency: 'ઝીંક (Zinc) અને બોરોનની સામાન્ય ઉણપ',
    water_guidance: 'મરચાંને વધુ પાણી માફક આવતું નથી. જમીન વાપસા (ભેજવાળી પણ પોચી) રહે તે રીતે પિયત આપવું. પાણી ભરાવાથી મૂળ સુકાઈ જાય છે.',
    care_recommendation: 'ખેતરના શેઢા-પાળા પરનું નીંદણ સાફ રાખો. કુકડાયેલા છોડ ઓછા હોય તો મૂળ સહિત ઉપાડી ખેતર બહાર દાટી દો.',
    treatment_guidance: 'થ્રીપ્સ અને કથીરી આ રોગ ફેલાવે છે માટે સૌપ્રથમ જૈવિક લીમડાનું તેલ છાંટો. કથીરી માટે સલ્ફર આધારિત ભલામણ કરેલ દવા અને થ્રીપ્સ માટે યોગ્ય કીટનાશક નિષ્ણાતની સલાહ લઈને જ વાપરવું.',
    dos_and_donts: {
      dos: [
        'વાદળી અને પીળા ટ્રેપ ખેતરમાં ગોઠવો',
        'રોગની શરૂઆત હોય ત્યારે જ સમયસર પગલાં લો'
      ],
      donts: [
        'અતિશય યુરિયા (નાઇટ્રોજન) ન નાખવું, જેનાથી પાન કુણા બને અને જીવાત વધે',
        'બાળકોને દવાના વાસણોની નજીક ન જવા દેવા'
      ]
    },
    when_to_consult_expert: 'જો આખો પ્લોટ કુકડાઈ જાય અને નવી ફૂટ ન નીકળે તો બાગાયત શાખાના અધિકારીને બતાવો.',
    warning: 'આ ફોટા આધારિત પ્રાથમિક AI વિશ્લેષણ છે. ચોક્કસ રોગ, પોષક તત્વોની ઉણપ અથવા દવાની ભલામણ માટે જમીન/પાકની તપાસ અને સ્થાનિક કૃષિ નિષ્ણાતની સલાહ જરૂરી હોઈ શકે છે.',
    is_demo: true
  },
  {
    id: 'sample-rose',
    timestamp: '2026-10-03T11:30:00Z',
    image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    plant_name_gu: 'ગુલાબ (Rose)',
    plant_name_en: 'Rose',
    scientific_name: 'Rosa',
    crop_category: 'ફૂલછોડ / પુષ્પ પાક (Floriculture)',
    growth_stage: 'ફૂલ ખીલવાનો તબક્કો (Budding & Blooming)',
    health_status: 'attention',
    confidence: 'high',
    confidence_score: 0.88,
    visible_symptoms: [
      'પાન અને કળીઓ પર સફેદ પાવડર જેવો છારો (White powdery coating)',
      'નવી કૂંપળો વળી જવી',
      'ફૂલની પાંખડીઓ બરાબર ન ખીલવી'
    ],
    possible_disease: 'ભૂકી છારો (Powdery Mildew - Podosphaera pannosa)',
    possible_pest: 'ગુલાબની એફિડ્સ / મોલોમશી (Rose Aphids)',
    possible_nutrient_deficiency: 'આયર્ન (Iron) ની ઉણપથી નવી કૂંપળો પીળી પડવી',
    water_guidance: 'કુંડામાં કે જમીનમાં પાણીનો નિકાલ સારો રાખો. સવારના સમયે પાણી આપવું જેથી દિવસ દરમિયાન પાન સુકાઈ જાય.',
    care_recommendation: 'ગુલાબને રોજ 5-6 કલાક સૂર્યપ્રકાશ મળે તે જગ્યાએ રાખો. સુકાઈ ગયેલી ડાળીઓની કાપણી (Pruning) કરો.',
    treatment_guidance: 'ઘરેલુ/IPM ઉપાય: 1 લિટર પાણીમાં 1 ચમચી ખાવાનો સોડા (Baking Soda) અને 2 ટીપાં લિક્વિડ સાબુ ઉમેરી હળવો છંટકાવ કરવો. અથવા લીમડાનું તેલ છાંટવું.',
    dos_and_donts: {
      dos: [
        'છોડની આસપાસ પૂરતી હવા-ઉજાસ રાખો',
        'કાપણી કરેલા ઓજારો સેનિટાઈઝ રાખો'
      ],
      donts: [
        'રાત્રે પાંદડા ભીના થાય તે રીતે પાણી ન રેડવું',
        'ઘરમાં રાસાયણિક ઝેરી દવાઓનો ઉપયોગ ન કરવો'
      ]
    },
    when_to_consult_expert: 'જો ડાળીઓ કાળી પડી સુકાવા લાગે (Dieback) તો નર્સરી નિષ્ણાતની સલાહ લો.',
    warning: 'આ ફોટા આધારિત પ્રાથમિક AI વિશ્લેષણ છે. ચોક્કસ રોગ, પોષક તત્વોની ઉણપ અથવા દવાની ભલામણ માટે જમીન/પાકની તપાસ અને સ્થાનિક કૃષિ નિષ્ણાતની સલાહ જરૂરી હોઈ શકે છે.',
    is_demo: true
  },
  {
    id: 'sample-tulsi',
    timestamp: '2026-10-03T11:45:00Z',
    image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    plant_name_gu: 'તુલસી (Holy Basil / Tulsi)',
    plant_name_en: 'Holy Basil (Tulsi)',
    scientific_name: 'Ocimum tenuiflorum',
    crop_category: 'ઔષધીય છોડ (Medicinal Herb)',
    growth_stage: 'વનસ્પતિક વિકાસ / માંજર આવવાનો તબક્કો (Vegetative & Inflorescence)',
    health_status: 'healthy',
    confidence: 'high',
    confidence_score: 0.96,
    visible_symptoms: [
      'પાનનો લીલો-શ્યામ રંગ કુદરતી અને સુગંધિત છે',
      'કોઈ કાળા ડાઘ કે છિદ્રો નથી',
      'માંજર તંદુરસ્ત છે'
    ],
    possible_disease: 'કોઈ રોગ નથી (Healthy plant)',
    possible_pest: 'કોઈ જીવાત નથી',
    possible_nutrient_deficiency: 'કોઈ ઉણપ નથી',
    water_guidance: 'જમીન સહેજ ભીની રહે તેટલું જ પાણી આપો. કુંડાના તળિયે કાણું હોવું જરૂરી છે જેથી પાણી ભરાઈ ન રહે.',
    care_recommendation: 'તુલસીના માંજર (બીજ) પાકી જાય ત્યારે તેને ઉપરથી ચપટીથી તોડી લેવા જેથી છોડ ઘટાદાર બને. દર મહિને વર્મીકમ્પોસ્ટ (અળસિયાનું ખાતર) ઉમેરો.',
    treatment_guidance: 'તુલસી પવિત્ર અને ઔષધીય છોડ છે, માટે તેના પર ક્યારેય કોઈપણ પ્રકારના ઝેરી રસાયણો કે કેમિકલ દવાઓ ન છાંટવી. જરૂર પડે તો માત્ર હળદરવાળા પાણી અથવા ગૌમૂત્ર-લીમડાના અર્કનો છંટકાવ કરવો.',
    dos_and_donts: {
      dos: [
        'દરરોજ સવારે સૂર્યપ્રકાશ મળે તેવી જગ્યાએ રાખો',
        'સમયસર માંજર તોડીને છોડનું આયુષ્ય વધારો'
      ],
      donts: [
        'તુલસી પર કોઈપણ ઝેરી રાસાયણિક દવા કે જંતુનાશક ક્યારેય ન છાંટવી',
        'કુંડામાં વધારે પાણી ભરાઈ ન રહેવા દેવું'
      ]
    },
    when_to_consult_expert: 'જો પાન કાળા પડી મૂળમાંથી સુકાવા લાગે તો આયુર્વેદિક અથવા નર્સરી નિષ્ણાતને પૂછવું.',
    warning: 'આ ફોટા આધારિત પ્રાથમિક AI વિશ્લેષણ છે. ચોક્કસ રોગ, પોષક તત્વોની ઉણપ અથવા દવાની ભલામણ માટે જમીન/પાકની તપાસ અને સ્થાનિક કૃષિ નિષ્ણાતની સલાહ જરૂરી હોઈ શકે છે.',
    is_demo: true
  }
];

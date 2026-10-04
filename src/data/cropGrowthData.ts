import { CropGrowthPlan } from '../types/plant';

export const CROP_GROWTH_PLANS: Record<string, CropGrowthPlan> = {
  cotton: {
    crop_key: 'cotton',
    crop_name_gu: 'કપાસ (બીટી કપાસ)',
    crop_name_en: 'Cotton',
    total_days: 160,
    stages: [
      {
        id: 'cot-1',
        stage_number: 1,
        name_gu: 'ઉગાવો અને પ્રારંભિક વૃદ્ધિ',
        name_en: 'Germination & Seedling',
        start_day: 0,
        end_day: 25,
        icon: '🌱',
        description_gu: 'બીજ અંકુરણ પામી ૩-૪ સાચાં પાન આવે છે. મૂળ જમીનમાં ઊંડે ઊતરવાની શરૂઆત થાય છે.',
        water_tip_gu: 'વાવણી વખતે જમીન વાપસા હોવી જરૂરી. વધુ પાણી ન ભરવું જેથી મૂળ સડી ન જાય.',
        fertilizer_tip_gu: 'વાવણી સમયે પાયાનું ખાતર (DAP + પોટાશ) આપેલું હોવું જોઈએ. હજુ યુરિયા આપવું નહીં.',
        pest_watch_gu: 'ધરૂ મૃત્યુ (Damping off) અને શરૂઆતની ચુસિયા જીવાતનું નિરીક્ષણ કરો.',
        field_action_gu: 'પહેલું નિંદામણ અને ખામણાં ભરવાનું (Gap filling) કામ પૂર્ણ કરો.'
      },
      {
        id: 'cot-2',
        stage_number: 2,
        name_gu: 'વાનસ્પતિક વૃદ્ધિ અને ડાળીઓ',
        name_en: 'Vegetative Branching',
        start_day: 26,
        end_day: 55,
        icon: '🌿',
        description_gu: 'છોડમાં મુખ્ય થડ અને ફળવાળી ડાળીઓ (Monopodial & Sympodial) નો ઝડપી વિકાસ થાય છે.',
        water_tip_gu: 'જમીન સુકાય નહીં તે રીતે હળવું નિયમિત પિયત આપો. ટપક હોય તો ૨ દિવસે ૨ કલાક.',
        fertilizer_tip_gu: 'પ્રથમ હપ્તો યુરિયા (નાઇટ્રોજન) આપો. સાથે ઝીંક અથવા મેગ્નેશિયમ સ્પ્રે કરો.',
        pest_watch_gu: 'થ્રીપ્સ અને મોલોમશીના કારણે પાન કુકડાય નહીં તે ચકાસો. પીળા ટ્રેપ લગાવો.',
        field_action_gu: 'આંતરખેડ (Inter-culturing) કરો જેથી મૂળમાં હવા-ઉજાસ વધે.'
      },
      {
        id: 'cot-3',
        stage_number: 3,
        name_gu: 'ચાંડીયા અને ફૂલ ખીલવા',
        name_en: 'Squaring & Flowering',
        start_day: 56,
        end_day: 85,
        icon: '🌼',
        description_gu: 'પીળા રંગના સુંદર ફૂલ અને ચાંડીયા બેસે છે. આ તબક્કો ઉત્પાદન માટે સૌથી નિર્ણાયક છે.',
        water_tip_gu: 'આ તબક્કે પાણીની ખેંચ બિલકુલ ન પડવી જોઈએ, નહિતર ફૂલ ખરી પડશે.',
        fertilizer_tip_gu: 'બીજો હપ્તો યુરિયા અને પોટાશ (MOP) આપો. બોરોન (0.1%) નો છંટકાવ કરો.',
        pest_watch_gu: 'ગુલાબી ઈયળ (Pink Bollworm) માટે હેક્ટરે ૮-૧૦ ફેરોમોન ટ્રેપ લગાવો.',
        field_action_gu: 'ચાંડીયા ખરતાં અટકાવવા જરૂરી હોય તો પ્લાનોફિક્સ (NAA) નો હળવો સ્પ્રે કરો.'
      },
      {
        id: 'cot-4',
        stage_number: 4,
        name_gu: 'ઝીંડવા બેસવા અને વિકાસ',
        name_en: 'Boll Formation & Enlargement',
        start_day: 86,
        end_day: 125,
        icon: '🍈',
        description_gu: 'ઝીંડવા મોટા થાય છે અને અંદર રૂ તથા કપાસિયાનું બંધારણ મજબૂત બને છે.',
        water_tip_gu: 'નિયમિત સપ્રમાણ ભેજ જાળવો. જો ભારે પવન હોય તો પિયત મુલતવી રાખો.',
        fertilizer_tip_gu: '13:00:45 (પોટેશિયમ નાઇટ્રેટ) નો ૧% દ્રાવણનો છંટકાવ ઝીંડવાનો ભરાવો વધારશે.',
        pest_watch_gu: 'ઝીંડવા કોરી ખાનાર ઈયળો અને લાલ ચુસિયા ચાંચવા તપાસો.',
        field_action_gu: 'નીચેના સુકાઈ ગયેલા રોગગ્રસ્ત પાન વીણી લો જેથી હવા સરળતાથી ફરી શકે.'
      },
      {
        id: 'cot-5',
        stage_number: 5,
        name_gu: 'ઝીંડવા ફૂટવા અને કપાસ વીણવો',
        name_en: 'Boll Bursting & Harvesting',
        start_day: 126,
        end_day: 160,
        icon: '☁️',
        description_gu: 'ઝીંડવા સંપૂર્ણ પાકીને ફૂટે છે અને ઉજળું સફેદ રૂ બહાર આવે છે.',
        water_tip_gu: 'કપાસ વીણવાના ૧૦-૧૫ દિવસ પહેલા પિયત ધીમે ધીમે બંધ કરવું.',
        fertilizer_tip_gu: 'હવે કોઈ રાસાયણિક ખાતર આપવું નહીં.',
        pest_watch_gu: 'વીણેલા કપાસમાં કચરો કે જીવાત ન ભળે તેની કાળજી રાખવી.',
        field_action_gu: 'સવારના સમયે ઝાકળ સુકાયા બાદ ચોખ્ખી સુતરાઉ થેલીમાં કપાસની વીણી કરો.'
      }
    ]
  },
  groundnut: {
    crop_key: 'groundnut',
    crop_name_gu: 'મગફળી (જી-૨૦ / અર્ધ વેલડી)',
    crop_name_en: 'Groundnut',
    total_days: 115,
    stages: [
      {
        id: 'gn-1',
        stage_number: 1,
        name_gu: 'અંકુરણ અને પ્રારંભિક વાનસ્પતિક',
        name_en: 'Emergence & Early Vegetative',
        start_day: 0,
        end_day: 20,
        icon: '🌱',
        description_gu: 'બીજ ઉગીને ૪-૬ પાન બને છે. મૂળમાં રાઇઝોબિયમ બેક્ટેરિયાની ગાંઠો બનવાની શરૂઆત થાય છે.',
        water_tip_gu: 'ઉગાવો સારો થાય તે માટે પૂરતો ભેજ રાખો; પાણી ભરાવા ન દેશો.',
        fertilizer_tip_gu: 'વાવણી સમયે પાયાનું ખાતર આપેલ હોવું જોઈએ. બીજ માવજત ટ્રાઇકોડર્માથી થયેલ હોવી જરૂરી.',
        pest_watch_gu: 'ધરૂનો કોહવારો અને ઉધઈથી બચાવ માટે ધ્યાન રાખો.',
        field_action_gu: 'પ્રથમ નિંદામણ અને ગોડ કરી જમીન પોચી બનાવો.'
      },
      {
        id: 'gn-2',
        stage_number: 2,
        name_gu: 'પીળા ફૂલ ખીલવાનો તબક્કો',
        name_en: 'Flowering Stage',
        start_day: 21,
        end_day: 40,
        icon: '🌼',
        description_gu: 'છોડ પર પુષ્કળ પીળા રંગના ફૂલ આવે છે. પરાગનયન સવારના સમયે કુદરતી રીતે થાય છે.',
        water_tip_gu: 'ફૂલ આવતી વખતે હળવું પિયત આપો. પાણીની અછત ફૂલની સંખ્યા ઘટાડી શકે છે.',
        fertilizer_tip_gu: 'સૂક્ષ્મ તત્વો (ગ્રેડ-૪) નો હળવો છંટકાવ કરવો.',
        pest_watch_gu: 'પાનમાં થ્રીપ્સ અને મોલોમશીનું નિરીક્ષણ કરો.',
        field_action_gu: 'ફૂલ આવ્યા પછી વધુ પડતી આંતરખેડ ટાળવી જેથી નવી કળીઓને ઈજા ન થાય.'
      },
      {
        id: 'gn-3',
        stage_number: 3,
        name_gu: 'સૂયા બેસવાનો તબક્કો (Pegging)',
        name_en: 'Pegging Stage',
        start_day: 41,
        end_day: 65,
        icon: '📌',
        description_gu: 'ફૂલમાંથી સોય જેવા સૂયા (Pegs) નીકળીને જમીનની અંદર પ્રવેશે છે જ્યાં મગફળીના ડોડવા બંધાશે.',
        water_tip_gu: 'આ તબક્કે જમીન સહેજ પણ કડક ન થવી જોઈએ. પૂરતો ભેજ અનિવાર્ય છે.',
        fertilizer_tip_gu: 'ખાસ ભલામણ: હેક્ટરે ૨૫૦ થી ૪૦૦ કિલો જીપ્સમ (સલ્ફર + કેલ્શિયમ) આપો.',
        pest_watch_gu: 'ટિક્કા રોગ (Cercospora leaf spot) ના કાળા ટપકાં દેખાય તો તરત જ પગલાં લો.',
        field_action_gu: 'સૂયા જમીનમાં ઉતરતા હોય ત્યારે જમીન પોચી રહે તેવું ધ્યાન રાખો.'
      },
      {
        id: 'gn-4',
        stage_number: 4,
        name_gu: 'દાણા અને ડોડવા ભરાવા',
        name_en: 'Pod Development & Filling',
        start_day: 66,
        end_day: 95,
        icon: '🥜',
        description_gu: 'જમીનની અંદર ડોડવામાં તેલ અને પ્રોટીનથી ભરપૂર દાણા ભરાય છે.',
        water_tip_gu: 'દાણાના સંપૂર્ણ કદ માટે નિયમિત અંતરે પિયત ચાલુ રાખો.',
        fertilizer_tip_gu: '00:52:34 ખાતરનો પાન પર છંટકાવ દાણાનો વજન અને ચમક વધારે છે.',
        pest_watch_gu: 'સફેદ ફૂગ (Stem rot / Sclerotium rolfsii) માટે મૂળનો ભાગ તપાસો.',
        field_action_gu: 'ખેતરમાં ઉંદરનો ત્રાસ ન થાય તેની તકેદારી રાખો.'
      },
      {
        id: 'gn-5',
        stage_number: 5,
        name_gu: 'પરિપક્વતા અને લણણી (ઉપાડવી)',
        name_en: 'Maturity & Harvesting',
        start_day: 96,
        end_day: 115,
        icon: '🚜',
        description_gu: 'નીચેના પાન પીળા પડી ખરી પડે છે. ડોડવાનું અંદરનું પડ કાળું-બદામી થાય છે.',
        water_tip_gu: 'ઉપાડવાના ૭-૧૦ દિવસ પહેલા પિયત બંધ કરો જેથી ડોડવા ચોખ્ખા નીકળે.',
        fertilizer_tip_gu: 'ખાતર આપવાનું બંધ કરો.',
        pest_watch_gu: 'કાઢ્યા પછી મગફળીને યોગ્ય રીતે સુકવો જેથી એફલાટોક્સિન ફૂગ ન લાગે.',
        field_action_gu: 'વાપસા સ્થિતિમાં ઉપાડીને પાથરા કરી ૩-૪ દિવસ સુકવવા.'
      }
    ]
  },
  wheat: {
    crop_key: 'wheat',
    crop_name_gu: 'ઘઉં (ટુકડી / ભાલિયા)',
    crop_name_en: 'Wheat',
    total_days: 120,
    stages: [
      {
        id: 'wh-1',
        stage_number: 1,
        name_gu: 'અંકુરણ અને મુગટ મૂળ (CRI)',
        name_en: 'Crown Root Initiation (CRI)',
        start_day: 0,
        end_day: 25,
        icon: '🌱',
        description_gu: 'બીજ ઉગીને ૨૧ દિવસે જમીન નીચે મુગટ મૂળ (Crown Roots) ફૂટે છે.',
        water_tip_gu: '૨૧ દિવસે પ્રથમ પિયત (CRI પિયત) અત્યંત મહત્વનું છે. આ પિયત ચૂકવું નહીં.',
        fertilizer_tip_gu: 'પહેલા પિયત સાથે યુરિયાનો પ્રથમ હપ્તો આપો.',
        pest_watch_gu: 'ઉધઈનું નિરીક્ષણ કરો.',
        field_action_gu: 'પહેલું નિંદામણ પૂર્ણ કરો.'
      },
      {
        id: 'wh-2',
        stage_number: 2,
        name_gu: 'ફૂટ થવાનો તબક્કો (Tillering)',
        name_en: 'Tillering Stage',
        start_day: 26,
        end_day: 50,
        icon: '🌾',
        description_gu: 'છોડમાંથી ઘણી બધી નવી શાખાઓ (Tillers) ફૂટે છે જે પાછળથી ડુંડીઓ બનશે.',
        water_tip_gu: 'જમીન ભેજવાળી રાખો; ૩૫-૪૦ દિવસે બીજું પિયત આપો.',
        fertilizer_tip_gu: 'બીજો હપ્તો યુરિયા ખાતર આપો.',
        pest_watch_gu: 'પહોળા અને સાંકડા પાનના નીંદણ નિયંત્રણ કરો.',
        field_action_gu: 'જો છોડ પીળા પડે તો ઝીંક સલ્ફેટનો સ્પ્રે કરો.'
      },
      {
        id: 'wh-3',
        stage_number: 3,
        name_gu: 'ગાભારો અને ડુંડી નીકળવી',
        name_en: 'Booting & Heading',
        start_day: 51,
        end_day: 75,
        icon: '🌾',
        description_gu: 'થડની અંદરથી ડુંડીઓ બહાર નીકળે છે અને પરાગરજ ખીલે છે.',
        water_tip_gu: 'ડુંડી નીકળતી વખતે પિયત આપવું ખૂબ જરૂરી છે. પવન શાંત હોય ત્યારે જ પાણી આપો.',
        fertilizer_tip_gu: '00:52:34 ખાતરનો ૧% છંટકાવ ડુંડીની લંબાઈ વધારે છે.',
        pest_watch_gu: 'ગેરુ (Rust) ના પીળા કે કથ્થઈ પાવડર જેવા ડાઘ તપાસો.',
        field_action_gu: 'પવન તેજ હોય તો પિયત આપવાનું ટાળો જેથી ઘઉં ઢળી (Lodging) ન પડે.'
      },
      {
        id: 'wh-4',
        stage_number: 4,
        name_gu: 'દૂધિયા દાણા અને પોંક અવસ્થા',
        name_en: 'Milking & Dough Stage',
        start_day: 76,
        end_day: 100,
        icon: '🍞',
        description_gu: 'દાણામાં દૂધ ભરાઈને ધીમે ધીમે કઠણ થાય છે (પોંક અવસ્થા).',
        water_tip_gu: 'તાપમાન વધતું હોય તો હળવું પિયત આપો જેથી દાણો ચીમળાઈ ન જાય.',
        fertilizer_tip_gu: 'ખાતર આપવાનું બંધ કરો.',
        pest_watch_gu: 'મોલોમશી કે પક્ષીઓથી ડુંડીઓનું રક્ષણ કરો.',
        field_action_gu: 'ખેતરની આસપાસ પક્ષીઓને ઉડાડવા માટે ચમકતી પટ્ટીઓ લગાવો.'
      },
      {
        id: 'wh-5',
        stage_number: 5,
        name_gu: 'પરિપક્વતા અને કાપણી',
        name_en: 'Maturity & Harvesting',
        start_day: 101,
        end_day: 120,
        icon: '🚜',
        description_gu: 'સમગ્ર છોડ અને ડુંડી સોનેરી પીળા રંગની થઈ જાય છે. દાણો નખથી દબાવતાં તૂટતો નથી.',
        water_tip_gu: 'કાપણીના ૧૫ દિવસ પહેલા પાણી બંધ કરો.',
        fertilizer_tip_gu: 'કંઈ નહીં.',
        pest_watch_gu: 'સંગ્રહ માટે દાણામાં ભેજ 10-12% થી ઓછો હોવો જોઈએ.',
        field_action_gu: 'હાર્વેસ્ટર અથવા દાતરડાથી કાપણી કરી થ્રેસરિંગ કરો.'
      }
    ]
  },
  onion: {
    crop_key: 'onion',
    crop_name_gu: 'ડુંગળી (લાલ / સફેદ ડુંગળી)',
    crop_name_en: 'Onion',
    total_days: 125,
    stages: [
      {
        id: 'on-1',
        stage_number: 1,
        name_gu: 'ધરૂ રોપણી અને મૂળ જામવા',
        name_en: 'Transplanting & Root Establishment',
        start_day: 0,
        end_day: 20,
        icon: '🌱',
        description_gu: 'ધરૂવાડિયામાંથી તંદુરસ્ત રોપાઓ લાવી ખેતરમાં રોપણી કરવામાં આવે છે.',
        water_tip_gu: 'રોપણી પછી તરત જ હળવું પિયત આપવું. ડુંગળી છીછરા મૂળ ધરાવે છે.',
        fertilizer_tip_gu: 'રોપણી વખતે પાયામાં DAP અને સલ્ફર આપવું.',
        pest_watch_gu: 'ધરૂનો સડો ન થાય તે માટે ફૂગનાશકની માવજત કરવી.',
        field_action_gu: 'ખામણાં પૂરવા અને નીંદણ સાફ રાખવું.'
      },
      {
        id: 'on-2',
        stage_number: 2,
        name_gu: 'વાનસ્પતિક પાંદડાંનો વિકાસ',
        name_en: 'Vegetative Foliage Growth',
        start_day: 21,
        end_day: 50,
        icon: '🌿',
        description_gu: 'લીલાં નળાકાર પાન ઝડપથી વધે છે. જેટલાં વધુ અને તંદુરસ્ત પાન, તેટલો મોટો દડો બનશે.',
        water_tip_gu: '૫ થી ૭ દિવસે નિયમિત હળવું પિયત આપવું.',
        fertilizer_tip_gu: 'યુરિયા અને સૂક્ષ્મ તત્વો (ખાસ કરીને સલ્ફર) આપો.',
        pest_watch_gu: 'થ્રીપ્સ (ચાંદી જેવા ડાઘ) નું ખાસ નિરીક્ષણ કરો. વાદળી ટ્રેપ લગાવો.',
        field_action_gu: 'હાથથી હળવું નિંદામણ કરવું; મૂળ છીછરા હોવાથી ઊંડી ખેડ ન કરવી.'
      },
      {
        id: 'on-3',
        stage_number: 3,
        name_gu: 'ગાંઠ/દડો બેસવાની શરૂઆત',
        name_en: 'Bulb Initiation Stage',
        start_day: 51,
        end_day: 80,
        icon: '🧅',
        description_gu: 'થડનો નીચેનો ભાગ ફૂલીને નાની ડુંગળી (દડો) બનવાની શરૂઆત થાય છે.',
        water_tip_gu: 'આ તબક્કે પાણીની ખેંચ ન પડવી જોઈએ, નહિતર બેવડા દડા (Splitting) થશે.',
        fertilizer_tip_gu: 'પોટાશ (Potash) અને બોરોનનું મિશ્રણ આપો જેથી દડો મજબૂત બને.',
        pest_watch_gu: 'જાંબલી ધાબાનો રોગ (Purple blotch) અને પાનના છેડા સુકાવા સામે પગલાં લો.',
        field_action_gu: 'દવાનો છંટકાવ કરતી વખતે સ્ટીકર/ચીકણો પદાર્થ અવશ્ય ઉમેરો.'
      },
      {
        id: 'on-4',
        stage_number: 4,
        name_gu: 'દડાનો સંપૂર્ણ વિકાસ',
        name_en: 'Bulb Enlargement',
        start_day: 81,
        end_day: 105,
        icon: '🧅',
        description_gu: 'ડુંગળીનો દડો મોટો અને ભરાવદાર બને છે. ઉપર છાલનો લાલ/સફેદ રંગ ઘાટો થાય છે.',
        water_tip_gu: 'જમીન વાપસા રાખો; વધુ પડતું પાણી દડાને સડાવી શકે છે.',
        fertilizer_tip_gu: '00:00:50 (SOP) ખાતરનો ઉપયોગ ગુણવત્તા અને કદ વધારે છે.',
        pest_watch_gu: 'જમીનની અંદર સડો ન થાય તેનું ધ્યાન રાખો.',
        field_action_gu: 'છોડ પર અણગમતા ફૂલ (Bolting) આવે તો તેને તોડી નાખો.'
      },
      {
        id: 'on-5',
        stage_number: 5,
        name_gu: 'ડોક વળવી અને લણણી',
        name_en: 'Neck Fall & Harvesting',
        start_day: 106,
        end_day: 125,
        icon: '🧺',
        description_gu: '૫૦% થી વધુ છોડની ડોક આપોઆપ વળીને જમીન પર ઢળી પડે છે.',
        water_tip_gu: 'કાઢવાના ૧૫ દિવસ પહેલા પાણી સંપૂર્ણ બંધ કરી દેવું.',
        fertilizer_tip_gu: 'ખાતર બંધ.',
        pest_watch_gu: 'કાઢ્યા પછી યોગ્ય ક્યોરિંગ (Curing) કરવું જેથી સંગ્રહશક્તિ વધે.',
        field_action_gu: 'ડુંગળી કાઢી પાંદડાથી ઢાંકીને ખેતરમાં ૩-૪ દિવસ સુકવવી.'
      }
    ]
  },
  tomato: {
    crop_key: 'tomato',
    crop_name_gu: 'ટામેટા (હાઇબ્રિડ ટામેટા)',
    crop_name_en: 'Tomato',
    total_days: 130,
    stages: [
      {
        id: 'tom-1',
        stage_number: 1,
        name_gu: 'રોપણી અને સ્થાપન',
        name_en: 'Transplanting & Rooting',
        start_day: 0,
        end_day: 25,
        icon: '🌱',
        description_gu: 'રોપાઓ ખેતરમાં સારી રીતે જામી જાય છે અને નવી ફૂટ શરૂ થાય છે.',
        water_tip_gu: 'નિયમિત હળવું પિયત આપવું.',
        fertilizer_tip_gu: 'પાયામાં 19:19:19 ખાતર આપવું.',
        pest_watch_gu: 'ધરૂનો કોહવારો અને પાન કોરી ખાનાર ઈયળ.',
        field_action_gu: 'રોપા સીધા રાખવા માટે ટેકાની તૈયારી કરવી.'
      },
      {
        id: 'tom-2',
        stage_number: 2,
        name_gu: 'ફૂલ આવવા અને કળીઓ',
        name_en: 'Flowering Stage',
        start_day: 26,
        end_day: 50,
        icon: '🌼',
        description_gu: 'પીળા ફૂલના ઝૂમખાં આવે છે.',
        water_tip_gu: 'પાણીમાં વધઘટ ન કરવી; ટપક સિંચાઈ શ્રેષ્ઠ છે.',
        fertilizer_tip_gu: 'કેલ્શિયમ નાઇટ્રેટ અને બોરોન આપો.',
        pest_watch_gu: 'સફેદ માખી અને લીફ કર્લ વાયરસ સામે સાવચેતી.',
        field_action_gu: 'સ્ટેકિંગ (લાકડી અને તારનો ટેકો) આપવો.'
      },
      {
        id: 'tom-3',
        stage_number: 3,
        name_gu: 'ફળ બેસવા (લીલા ટામેટા)',
        name_en: 'Fruit Setting',
        start_day: 51,
        end_day: 80,
        icon: '🍏',
        description_gu: 'લીલા કાચા ટામેટા મોટા થાય છે.',
        water_tip_gu: 'નિયમિત ભેજ જાળવો જેથી ફળ ફાટી ન જાય.',
        fertilizer_tip_gu: '12:61:00 અથવા 13:00:45 ખાતર આપો.',
        pest_watch_gu: 'ફળ કોરી ખાનાર ઈયળ માટે ફેરોમોન ટ્રેપ લગાવો.',
        field_action_gu: 'નીચેના સડેલા પાન કાપીને હવા-ઉજાસ વધારો.'
      },
      {
        id: 'tom-4',
        stage_number: 4,
        name_gu: 'ફળ પાકવા અને રંગ બદલાવો',
        name_en: 'Fruit Ripening',
        start_day: 81,
        end_day: 105,
        icon: '🍅',
        description_gu: 'ટામેટા લીલામાંથી ગુલાબી અને ઘેરા લાલ બને છે.',
        water_tip_gu: 'હળવું પિયત આપવું; વધુ પાણીથી ફળ નરમ પડી જાય છે.',
        fertilizer_tip_gu: 'પોટાશ આધારિત ખાતર ફળની ચમક વધારે છે.',
        pest_watch_gu: 'આગોતરો સુકારો (Early Blight) તપાસો.',
        field_action_gu: 'લાલ-ગુલાબી ટામેટાની નિયમિત વીણી શરૂ કરો.'
      },
      {
        id: 'tom-5',
        stage_number: 5,
        name_gu: 'સતત વીણી અને પાક પૂર્ણતા',
        name_en: 'Continuous Harvest',
        start_day: 106,
        end_day: 130,
        icon: '🧺',
        description_gu: 'અઠવાડિયામાં બે વાર નિયમિત વીણી થાય છે.',
        water_tip_gu: 'વીણી પછી હળવું પિયત આપો.',
        fertilizer_tip_gu: 'હળવું ઓર્ગેનિક ખાતર ઉમેરી શકાય.',
        pest_watch_gu: 'વીણી પછી સલામત અંતરાલ જાળવો.',
        field_action_gu: 'બજાર ભાવ મુજબ ગ્રેડિંગ કરીને વેચાણ કરો.'
      }
    ]
  },
  chilli: {
    crop_key: 'chilli',
    crop_name_gu: 'મરચાં (તીખાં / લીલાં મરચાં)',
    crop_name_en: 'Chilli',
    total_days: 140,
    stages: [
      {
        id: 'ch-1',
        stage_number: 1,
        name_gu: 'રોપણી અને વાનસ્પતિક ફૂટ',
        name_en: 'Transplanting & Vegetative',
        start_day: 0,
        end_day: 30,
        icon: '🌱',
        description_gu: 'રોપા જમીનમાં જામીને નવી ડાળીઓ ફૂટે છે.',
        water_tip_gu: 'મરચાંને વધારે પાણી માફક આવતું નથી; વાપસા સ્થિતિ રાખો.',
        fertilizer_tip_gu: 'DAP અને ઓર્ગેનિક વર્મીકમ્પોસ્ટ આપો.',
        pest_watch_gu: 'થ્રીપ્સ અને કથીરીથી પાન કુકડાય નહીં તે તપાસો.',
        field_action_gu: 'વાદળી અને પીળા ચીકણા ટ્રેપ લગાવો.'
      },
      {
        id: 'ch-2',
        stage_number: 2,
        name_gu: 'ફૂલ અને કળીઓ આવવી',
        name_en: 'Flowering & Budding',
        start_day: 31,
        end_day: 60,
        icon: '🌼',
        description_gu: 'સફેદ ફૂલ પુષ્કળ પ્રમાણમાં આવે છે.',
        water_tip_gu: 'પાણીની ખેંચ ન પડવા દો જેથી ફૂલ ખરી ન પડે.',
        fertilizer_tip_gu: '19:19:19 અને સૂક્ષ્મ તત્વોનો સ્પ્રે કરો.',
        pest_watch_gu: 'મુરબ્બો રોગ (Chilli leaf curl) સામે લીમડાનું તેલ છાંટો.',
        field_action_gu: 'શેઢા-પાળાનું નીંદણ સાફ રાખો.'
      },
      {
        id: 'ch-3',
        stage_number: 3,
        name_gu: 'મરચાં બેસવા અને લંબાવવા',
        name_en: 'Pod Development',
        start_day: 61,
        end_day: 90,
        icon: '🌶️',
        description_gu: 'મરચાં લાંબા અને લીલાં-ચમકદાર બને છે.',
        water_tip_gu: 'ટપક પદ્ધતિથી નિયમિત પાણી આપો.',
        fertilizer_tip_gu: 'પોટાશ અને કેલ્શિયમ આપો જેથી મરચાં કડક રહે.',
        pest_watch_gu: 'ફળનો સડો (Anthracnose / Dieback) તપાસો.',
        field_action_gu: 'પ્રથમ વીણીની તૈયારી કરો.'
      },
      {
        id: 'ch-4',
        stage_number: 4,
        name_gu: 'પ્રથમ અને બીજી વીણી',
        name_en: 'Primary Harvests',
        start_day: 91,
        end_day: 115,
        icon: '🧺',
        description_gu: 'લીલાં મરચાંની મુખ્ય વીણી થાય છે.',
        water_tip_gu: 'વીણીના ૨ દિવસ પહેલા પાણી આપવું.',
        fertilizer_tip_gu: 'વીણી પછી હળવો યુરિયા આપવાથી નવી ફૂટ આવે છે.',
        pest_watch_gu: 'જીવાત નિયંત્રણ માટે જૈવિક કીટનાશક વાપરો.',
        field_action_gu: 'મરચાંને ડીંટિયાં સાથે સાવચેતીથી તોડો.'
      },
      {
        id: 'ch-5',
        stage_number: 5,
        name_gu: 'અનુગામી વીણીઓ અને પૂર્ણતા',
        name_en: 'Late Harvests',
        start_day: 116,
        end_day: 140,
        icon: '🌶️',
        description_gu: 'છેલ્લી વીણીઓ અથવા લાલ મરચાં સુકવવા માટે રાખવા.',
        water_tip_gu: 'જરૂર મુજબ હળવું પાણી આપો.',
        fertilizer_tip_gu: 'ખાતર બંધ.',
        pest_watch_gu: 'લાલ મરચાં સુકવતી વખતે ફૂગ ન લાગે તે ધ્યાન રાખો.',
        field_action_gu: 'પાક પૂરો થયા પછી જમીનની ઊંડી ખેડ કરો.'
      }
    ]
  },
  default: {
    crop_key: 'general',
    crop_name_gu: 'સામાન્ય પાક વિકાસ ચક્ર',
    crop_name_en: 'General Crop Cycle',
    total_days: 120,
    stages: [
      {
        id: 'gen-1',
        stage_number: 1,
        name_gu: 'ઉગાવો અને પ્રારંભિક વાનસ્પતિક',
        name_en: 'Germination & Early Growth',
        start_day: 0,
        end_day: 25,
        icon: '🌱',
        description_gu: 'બીજ અંકુરણ પામી છોડ જમીનમાં મૂળ જમાવે છે.',
        water_tip_gu: 'જમીનમાં સપ્રમાણ ભેજ રાખો; પાણી ભરાવા ન દેશો.',
        fertilizer_tip_gu: 'પાયાનું ખાતર અને મૂળ વિકાસ માટે ફોસ્ફરસ જરૂરી છે.',
        pest_watch_gu: 'ધરૂનો સડો અને પાન કોરી ખાનાર જીવાત તપાસો.',
        field_action_gu: 'નિંદામણ મુક્ત રાખો.'
      },
      {
        id: 'gen-2',
        stage_number: 2,
        name_gu: 'ઝડપી વાનસ્પતિક વૃદ્ધિ',
        name_en: 'Vegetative Stage',
        start_day: 26,
        end_day: 55,
        icon: '🌿',
        description_gu: 'પાંદડાં, થડ અને ડાળીઓનો મહત્તમ વિકાસ થાય છે.',
        water_tip_gu: 'નિયમિત અંતરે પિયત આપો.',
        fertilizer_tip_gu: 'નાઇટ્રોજન (યુરિયા) નો પૂરક હપ્તો આપો.',
        pest_watch_gu: 'ચુસિયા પ્રકારની જીવાતો સામે ટ્રેપ લગાવો.',
        field_action_gu: 'આંતરખેડ કરો.'
      },
      {
        id: 'gen-3',
        stage_number: 3,
        name_gu: 'ફૂલ અને કળીઓ ખીલવી',
        name_en: 'Flowering Stage',
        start_day: 56,
        end_day: 80,
        icon: '🌼',
        description_gu: 'ઉત્પાદન માટે સૌથી મહત્વનો ફૂલ ખીલવાનો તબક્કો.',
        water_tip_gu: 'આ તબક્કે પાણીની ખેંચ પડવા ન દેવી.',
        fertilizer_tip_gu: 'પોટાશ અને બોરોન ખાતર ફૂલ ખરતાં અટકાવશે.',
        pest_watch_gu: 'ઈયળો અને વાયરસનું નિરીક્ષણ કરો.',
        field_action_gu: 'તડકામાં છંટકાવ ન કરવો.'
      },
      {
        id: 'gen-4',
        stage_number: 4,
        name_gu: 'ફળ / દાણા બેસવા અને વિકાસ',
        name_en: 'Fruit / Grain Filling',
        start_day: 81,
        end_day: 105,
        icon: '🌾',
        description_gu: 'ફળ કે દાણાનો વજન અને ગુણવત્તા વધે છે.',
        water_tip_gu: 'નિયમિત ભેજ જાળવો; પવન હોય ત્યારે પાણી ન આપવું.',
        fertilizer_tip_gu: '00:00:50 અથવા 13:00:45 ખાતર આપો.',
        pest_watch_gu: 'ફળ સડો અથવા ગેરુ તપાસો.',
        field_action_gu: 'નીચેના ક્ષતિગ્રસ્ત પાન દૂર કરો.'
      },
      {
        id: 'gen-5',
        stage_number: 5,
        name_gu: 'પરિપક્વતા અને લણણી',
        name_en: 'Maturity & Harvesting',
        start_day: 106,
        end_day: 120,
        icon: '🚜',
        description_gu: 'પાક સંપૂર્ણ પાકી ગયો છે અને લણણી માટે તૈયાર છે.',
        water_tip_gu: 'લણણીના ૧૦-૧૫ દિવસ પહેલા પાણી બંધ કરો.',
        fertilizer_tip_gu: 'ખાતર બંધ.',
        pest_watch_gu: 'કાપણી પછી સંગ્રહ માટે યોગ્ય રીતે સુકવો.',
        field_action_gu: 'સમયસર લણણી કરી બજારમાં વેચાણ કરો.'
      }
    ]
  }
};

/**
 * Helper to match user crop string to growth plan
 */
export function getCropGrowthPlan(cropName: string): CropGrowthPlan {
  const q = cropName.toLowerCase();
  if (q.includes('કપાસ') || q.includes('cotton') || q.includes('બીટી')) {
    return CROP_GROWTH_PLANS.cotton;
  }
  if (q.includes('મગફળી') || q.includes('groundnut') || q.includes('peanut')) {
    return CROP_GROWTH_PLANS.groundnut;
  }
  if (q.includes('ઘઉં') || q.includes('wheat')) {
    return CROP_GROWTH_PLANS.wheat;
  }
  if (q.includes('ડુંગળી') || q.includes('onion')) {
    return CROP_GROWTH_PLANS.onion;
  }
  if (q.includes('ટામેટા') || q.includes('tomato')) {
    return CROP_GROWTH_PLANS.tomato;
  }
  if (q.includes('મરચાં') || q.includes('મરચી') || q.includes('chilli') || q.includes('chili')) {
    return CROP_GROWTH_PLANS.chilli;
  }
  return CROP_GROWTH_PLANS.default;
}

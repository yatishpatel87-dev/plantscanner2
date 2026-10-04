import { CropFertilizerPlan } from '../types/plant';

export const CROP_FERTILIZER_PLANS: Record<string, CropFertilizerPlan> = {
  cotton: {
    crop_key: 'cotton',
    crop_name_gu: 'કપાસ (બીટી કપાસ)',
    doses: [
      {
        id: 'cot-f1',
        dose_number: 1,
        title_gu: 'પાયાનું ખાતર (Basal Application)',
        title_en: 'Basal Dose at Sowing',
        target_day: 0,
        fertilizers_gu: ['DAP (અથવા NPK 12:32:16)', 'મ્યુરેટ ઓફ પોટાશ (MOP)', 'છાણીયું ખાતર / વર્મીકમ્પોસ્ટ'],
        method_gu: 'વાવણી સમયે ચાસમાં બીજથી ૨ ઇંચ ઊંડે અથવા બાજુમાં ઓરીને આપવું.',
        quantity_hint_gu: 'માટી ચકાસણી મુજબ (સામાન્ય ભલામણ: DAP ૫૦ કિલો + MOP ૨૫ કિલો પ્રતિ એકર)',
        why_important_gu: 'પ્રારંભિક મૂળિયાંનો ઝડપી અને ઊંડો વિકાસ કરવા માટે ફોસ્ફરસ અત્યંત જરૂરી છે.',
        safety_note_gu: 'બીજ અને રાસાયણિક ખાતર સીધા સંપર્કમાં ન આવે તેનું ધ્યાન રાખવું.'
      },
      {
        id: 'cot-f2',
        dose_number: 2,
        title_gu: 'પ્રથમ પૂર્તિ હપ્તો (1st Top Dressing)',
        title_en: 'First Top Dressing (Early Vegetative)',
        target_day: 30,
        fertilizers_gu: ['યુરિયા (નાઇટ્રોજન)', 'ઝીંક સલ્ફેટ (ZnSO4 21%)'],
        method_gu: 'છોડની બાજુમાં રીંગ બનાવીને જમીનમાં ભેજ હોય ત્યારે આપવું અથવા ટપક પદ્ધતિથી.',
        quantity_hint_gu: 'યુરિયા ૨૫-૩૦ કિલો પ્રતિ એકર (ઝીંક ૫ કિલો જો પાયામાં ન આપેલ હોય તો)',
        why_important_gu: 'વાનસ્પતિક વૃદ્ધિ, પાંદડાંનો લીલો રંગ અને નવી ડાળીઓની ઝડપી ફૂટ માટે નાઇટ્રોજન જરૂરી છે.',
        safety_note_gu: 'જમીન સૂકી હોય ત્યારે યુરિયા આપવું નહીં; પિયત આપ્યા બાદ અથવા પિયત સાથે જ આપવું.'
      },
      {
        id: 'cot-f3',
        dose_number: 3,
        title_gu: 'બીજો પૂર્તિ હપ્તો (ચાંડીયા અને ફૂલ અવસ્થા)',
        title_en: 'Second Top Dressing (Squaring & Flowering)',
        target_day: 60,
        fertilizers_gu: ['યુરિયા', 'પોટાશ (MOP)', 'મેગ્નેશિયમ સલ્ફેટ (MgSO4)'],
        method_gu: 'આંતરખેડ કર્યા પછી છોડના મૂળ પાસે આપીને માટી ચડાવવી.',
        quantity_hint_gu: 'યુરિયા ૨૫ કિલો + MOP ૨૦ કિલો પ્રતિ એકર',
        why_important_gu: 'ચાંડીયા ખરતાં અટકાવવા અને ફૂલમાંથી તંદુરસ્ત ઝીંડવા બંધાવવા માટે પોટાશ અને મેગ્નેશિયમ અનિવાર્ય છે.',
        safety_note_gu: 'અતિશય યુરિયા ન આપવું; વધુ પડતા નાઇટ્રોજનથી છોડ અતિશય વધી જશે અને જીવાત આકર્ષાશે.'
      },
      {
        id: 'cot-f4',
        dose_number: 4,
        title_gu: 'ત્રીજો હપ્તો – ફોલિયર છંટકાવ (ઝીંડવા વિકાસ)',
        title_en: 'Foliar Spray (Boll Development)',
        target_day: 85,
        fertilizers_gu: ['13:00:45 (પોટેશિયમ નાઇટ્રેટ)', 'બોરોન (Boron 20%)'],
        method_gu: 'પાન પર સવારના કે સાંજના સમયે હળવો છંટકાવ (Foliar Spray).',
        quantity_hint_gu: '૧૩:૦૦:૪૫ ૧૦૦ ગ્રામ + બોરોન ૧૫-૨૦ ગ્રામ પ્રતિ પંપ (૧૫ લિટર પાણી)',
        why_important_gu: 'બોરોન ઝીંડવા ફાટતાં અટકાવે છે અને પોટેશિયમ રૂ તથા કપાસિયાનું વજન અને ક્વોલિટી સુધારે છે.',
        safety_note_gu: 'તડકામાં સ્પ્રે ન કરવો. પાંદડાં પર દવા બરાબર ચોંટે તે માટે સ્ટીકર ઉમેરવું.'
      },
      {
        id: 'cot-f5',
        dose_number: 5,
        title_gu: 'ચોથો હપ્તો – ઝીંડવાનો ભરાવો અને ચમક',
        title_en: 'Late Stage Foliar Nutrition',
        target_day: 115,
        fertilizers_gu: ['00:00:50 (પોટેશિયમ સલ્ફેટ - SOP)'],
        method_gu: 'પાન પર સ્પ્રે.',
        quantity_hint_gu: '૭૫ થી ૧૦૦ ગ્રામ પ્રતિ પંપ',
        why_important_gu: 'ઉપરના પાછોતરા ઝીંડવા પૂરા ભરાય અને કપાસનું ઉત્પાદન મહત્તમ મળે તે માટે.',
        safety_note_gu: 'હવે જમીનમાં યુરિયા કે અન્ય ભારે ખાતર આપવાનું સંપૂર્ણ બંધ કરવું.'
      }
    ]
  },
  groundnut: {
    crop_key: 'groundnut',
    crop_name_gu: 'મગફળી',
    doses: [
      {
        id: 'gn-f1',
        dose_number: 1,
        title_gu: 'પાયાનું ખાતર (Basal Dose)',
        title_en: 'Basal Dose at Sowing',
        target_day: 0,
        fertilizers_gu: ['DAP અથવા SSP (સિંગલ સુપર ફોસ્ફેટ)', 'મ્યુરેટ ઓફ પોટાશ', 'રાઇઝોબિયમ કલ્ચર'],
        method_gu: 'વાવણી સમયે ચાસમાં ઓરીને આપવું.',
        quantity_hint_gu: 'SSP ૧૦૦ કિલો (અથવા DAP ૩૫ કિલો) + પોટાશ ૨૦ કિલો પ્રતિ એકર',
        why_important_gu: 'મગફળી તેલીબિયાં પાક હોવાથી SSP માથી મળતું સલ્ફર તેલની ટકાવારી વધારે છે.',
        safety_note_gu: 'બીજને રાઇઝોબિયમ કલ્ચરનો પટ વાવણીના ૨ કલાક પહેલા છાંયડે સુકવીને આપવો.'
      },
      {
        id: 'gn-f2',
        dose_number: 2,
        title_gu: 'ફૂલ ખીલવાનો તબક્કો – સૂક્ષ્મ પોષણ',
        title_en: 'Micronutrient Spray at Flowering',
        target_day: 28,
        fertilizers_gu: ['સૂક્ષ્મ તત્વો ગ્રેડ-૪', 'હળવો સલ્ફર પાવડર'],
        method_gu: 'પાન પર છંટકાવ અથવા પિયત સાથે.',
        quantity_hint_gu: 'સૂક્ષ્મ તત્વો ૩૦ ગ્રામ પ્રતિ પંપ',
        why_important_gu: 'પીળા રંગના ફૂલોની સંખ્યા વધારવા અને પરાગનયન સક્ષમ બનાવવા માટે.',
        safety_note_gu: 'ફૂલ ખીલેલા હોય ત્યારે બપોરે છંટકાવ ન કરવો.'
      },
      {
        id: 'gn-f3',
        dose_number: 3,
        title_gu: 'સૂયા બેસતી વખતે – જીપ્સમ આપવું (અનિવાર્ય)',
        title_en: 'Gypsum Application at Pegging',
        target_day: 48,
        fertilizers_gu: ['જીપ્સમ (Gypsum - કેલ્શિયમ + સલ્ફર)'],
        method_gu: 'છોડની હાર પાસે જમીન પર પૂરીને હળવું ગોડ કરવું અને પિયત આપવું.',
        quantity_hint_gu: '૧૫૦ થી ૨૦૦ કિલો પ્રતિ એકર (અથવા હેક્ટરે ૪૦૦ કિલો)',
        why_important_gu: 'કેલ્શિયમ વગર મગફળીના ડોડવા પોચા રહે છે (પોપટા થાય છે). જીપ્સમ દાણાનો સારો ભરાવો કરે છે.',
        safety_note_gu: 'જીપ્સમ આપ્યા પછી જમીન ભેજવાળી રાખવી જેથી સૂયા સરળતાથી જમીનમાં પ્રવેશી શકે.'
      },
      {
        id: 'gn-f4',
        dose_number: 4,
        title_gu: 'ડોડવા ભરાવાનો તબક્કો – 00:52:34 છંટકાવ',
        title_en: 'Pod Filling Foliar Spray',
        target_day: 72,
        fertilizers_gu: ['00:52:34 (મોનો પોટેશિયમ ફોસ્ફેટ)'],
        method_gu: 'પાન પર સ્પ્રે.',
        quantity_hint_gu: '૭૫ થી ૧૦૦ ગ્રામ પ્રતિ પંપ',
        why_important_gu: 'દાણાનો વજન અને ગુણવત્તા વધારવા માટે.',
        safety_note_gu: 'દવા સાથે ભેળવતી વખતે સુસંગતતા ચકાસી લેવી.'
      }
    ]
  },
  wheat: {
    crop_key: 'wheat',
    crop_name_gu: 'ઘઉં',
    doses: [
      {
        id: 'wh-f1',
        dose_number: 1,
        title_gu: 'પાયાનું ખાતર (વાવણી સમયે)',
        title_en: 'Basal Dose at Sowing',
        target_day: 0,
        fertilizers_gu: ['DAP', 'પોટાશ (MOP)'],
        method_gu: 'ઓરીને વાવણી સમયે આપવું.',
        quantity_hint_gu: 'DAP ૪૫ કિલો + MOP ૨૦ કિલો પ્રતિ એકર',
        why_important_gu: 'મજબૂત થડ અને શરૂઆતના મૂળ વિકાસ માટે પાયાનું ખાતર જરૂરી છે.',
        safety_note_gu: 'બીજની સાથે જ ખાતર ભેળવીને ન વાવવું.'
      },
      {
        id: 'wh-f2',
        dose_number: 2,
        title_gu: 'મુગટ મૂળ (CRI) – પ્રથમ પિયત સાથે',
        title_en: 'First Top Dressing (CRI Stage - 21 Days)',
        target_day: 21,
        fertilizers_gu: ['યુરિયા', 'ઝીંક સલ્ફેટ (Zn 33%)'],
        method_gu: 'પિયત આપ્યા પહેલા કે પિયત આપતી વખતે સપ્રમાણ પૂંખીને.',
        quantity_hint_gu: 'યુરિયા ૩૦ કિલો + ઝીંક ૪-૫ કિલો પ્રતિ એકર',
        why_important_gu: 'આ ઘઉંનો સૌથી નિર્ણાયક સમય છે; સમયસર ખાતર આપવાથી ફૂટ (Tillers) બમણી થશે.',
        safety_note_gu: 'જો જમીન રેતાળ હોય તો યુરિયા બે નાના હપ્તામાં આપવું.'
      },
      {
        id: 'wh-f3',
        dose_number: 3,
        title_gu: 'ફૂટ અને ગાભારો અવસ્થા – બીજો હપ્તો',
        title_en: 'Second Top Dressing (Booting Stage)',
        target_day: 45,
        fertilizers_gu: ['યુરિયા'],
        method_gu: 'પિયત સાથે આપવું.',
        quantity_hint_gu: 'યુરિયા ૨૫ કિલો પ્રતિ એકર',
        why_important_gu: 'ડુંડીઓની લંબાઈ અને દાણાની સંખ્યા વધારે છે.',
        safety_note_gu: 'ડુંડી બહાર નીકળ્યા પછી જમીનમાં યુરિયા આપવું નહીં.'
      },
      {
        id: 'wh-f4',
        dose_number: 4,
        title_gu: 'દૂધિયા દાણા અવસ્થા – 00:52:34 છંટકાવ',
        title_en: 'Foliar Spray at Grain Formation',
        target_day: 75,
        fertilizers_gu: ['00:52:34 અથવા 13:00:45'],
        method_gu: 'પાન પર છંટકાવ.',
        quantity_hint_gu: '૭૫-૧૦૦ ગ્રામ પ્રતિ પંપ',
        why_important_gu: 'ગરમી સામે રક્ષણ આપી દાણાને ભરાવદાર અને ચમકદાર બનાવે છે.',
        safety_note_gu: 'પવન તેજ હોય ત્યારે છંટકાવ ન કરવો.'
      }
    ]
  },
  onion: {
    crop_key: 'onion',
    crop_name_gu: 'ડુંગળી',
    doses: [
      {
        id: 'on-f1',
        dose_number: 1,
        title_gu: 'પાયાનું ખાતર (રોપણી સમય)',
        title_en: 'Basal Application',
        target_day: 0,
        fertilizers_gu: ['DAP', 'પોટાશ', 'બેન્ટોનાઇટ સલ્ફર'],
        method_gu: 'જમીન તૈયાર કરતી વખતે છેલ્લી ખેડે આપવું.',
        quantity_hint_gu: 'DAP ૪૦ કિલો + પોટાશ ૨૫ કિલો + સલ્ફર ૧૦ કિલો પ્રતિ એકર',
        why_important_gu: 'સલ્ફર ડુંગળીની તીખાશ અને સંગ્રહશક્તિ વધારે છે.',
        safety_note_gu: 'ખાતર જમીનમાં સારી રીતે ભળી જવું જોઈએ.'
      },
      {
        id: 'on-f2',
        dose_number: 2,
        title_gu: 'વાનસ્પતિક પાંદડાંનો વિકાસ',
        title_en: 'Vegetative Top Dressing',
        target_day: 30,
        fertilizers_gu: ['યુરિયા', 'સૂક્ષ્મ પોષક તત્વો'],
        method_gu: 'પિયત સાથે જમીનમાં આપવું.',
        quantity_hint_gu: 'યુરિયા ૨૫ કિલો પ્રતિ એકર',
        why_important_gu: 'તંદુરસ્ત લીલા પાંદડાં ખોરાક બનાવશે જેથી મોટો દડો બનશે.',
        safety_note_gu: 'વધુ પડતો નાઇટ્રોજન ન આપવો નહિતર ડોક જાડી થશે.'
      },
      {
        id: 'on-f3',
        dose_number: 3,
        title_gu: 'ગાંઠ/દડો બેસવાની શરૂઆત',
        title_en: 'Bulb Initiation Nutrition',
        target_day: 60,
        fertilizers_gu: ['પોટેશિયમ સલ્ફેટ (00:00:50)', 'બોરોન (Boron 20%)'],
        method_gu: 'પાન પર સ્પ્રે અથવા ટપક દ્વારા.',
        quantity_hint_gu: '00:00:50 ૧૦૦ ગ્રામ + બોરોન ૧૫ ગ્રામ પ્રતિ પંપ',
        why_important_gu: 'દડાનો આકાર ગોળ અને મજબૂત બનાવે છે, બેવડા દડા થતા અટકાવે છે.',
        safety_note_gu: 'સ્પ્રેમાં સ્ટીકર વાપરવું જરૂરી છે.'
      },
      {
        id: 'on-f4',
        dose_number: 4,
        title_gu: 'દડાનો સંપૂર્ણ ભરાવો',
        title_en: 'Bulb Enlargement Spray',
        target_day: 85,
        fertilizers_gu: ['00:00:50'],
        method_gu: 'પાન પર સ્પ્રે.',
        quantity_hint_gu: '૧૦૦ ગ્રામ પ્રતિ પંપ',
        why_important_gu: 'ડુંગળીનો લાલ/સફેદ રંગ ઘાટો કરે છે અને વજન વધારે છે.',
        safety_note_gu: 'કાઢવાના ૧૫ દિવસ પહેલા પાણી અને ખાતર બંધ કરવું.'
      }
    ]
  },
  tomato: {
    crop_key: 'tomato',
    crop_name_gu: 'ટામેટા',
    doses: [
      {
        id: 'tom-f1',
        dose_number: 1,
        title_gu: 'પાયાનું ખાતર (રોપણી સમય)',
        title_en: 'Basal Dose',
        target_day: 0,
        fertilizers_gu: ['DAP / NPK 19:19:19', 'વર્મીકમ્પોસ્ટ / છાણીયું ખાતર'],
        method_gu: 'બેડ પર રોપણી પહેલા જમીનમાં આપવું.',
        quantity_hint_gu: 'DAP ૩૫ કિલો પ્રતિ એકર',
        why_important_gu: 'રોપાનો ઝડપી મૂળ વિકાસ.',
        safety_note_gu: 'જમીન ભેજવાળી હોય ત્યારે રોપણી કરવી.'
      },
      {
        id: 'tom-f2',
        dose_number: 2,
        title_gu: 'ફૂલ અને કળીઓનો તબક્કો',
        title_en: 'Flowering Stage Nutrients',
        target_day: 28,
        fertilizers_gu: ['19:19:19 (વોટર સોલ્યુબલ)', 'મેગ્નેશિયમ સલ્ફેટ'],
        method_gu: 'ટપક પદ્ધતિ (Fertigation) દ્વારા અથવા પાન પર સ્પ્રે.',
        quantity_hint_gu: '૩ કિલો પ્રતિ એકર ટપક દ્વારા દર અઠવાડિયે',
        why_important_gu: 'પુષ્કળ ફૂલ આવવા માટે સંતુલિત NPK જરૂરી છે.',
        safety_note_gu: 'બપોરના તડકામાં ફર્ટિગેશન ન કરવું.'
      },
      {
        id: 'tom-f3',
        dose_number: 3,
        title_gu: 'ફળ બેસતી વખતે – કેલ્શિયમ + બોરોન (અતિ મહત્વનું)',
        title_en: 'Fruit Set & Calcium Application',
        target_day: 55,
        fertilizers_gu: ['કેલ્શિયમ નાઇટ્રેટ (Calcium Nitrate)', 'બોરોન (Boron 20%)'],
        method_gu: 'ડ્રીપ દ્વારા અથવા પાન પર સ્પ્રે.',
        quantity_hint_gu: 'કેલ્શિયમ ૫૦ ગ્રામ + બોરોન ૧૫ ગ્રામ પ્રતિ પંપ',
        why_important_gu: 'ટામેટાના તળિયે કાળો ડાઘ (Blossom End Rot) અને ફળ ફાટતાં અટકાવવા કેલ્શિયમ અનિવાર્ય છે.',
        safety_note_gu: 'કેલ્શિયમ ખાતરને ક્યારેય સલ્ફેટ કે ફોસ્ફેટ ખાતર સાથે ભેગું ન કરવું.'
      },
      {
        id: 'tom-f4',
        dose_number: 4,
        title_gu: 'ફળ પાકતી વખતે – પોટાશ',
        title_en: 'Fruit Ripening & Size',
        target_day: 80,
        fertilizers_gu: ['13:00:45 અથવા 00:00:50'],
        method_gu: 'ટપક દ્વારા અથવા પાન પર સ્પ્રે.',
        quantity_hint_gu: '૩ થી ૪ કિલો પ્રતિ એકર',
        why_important_gu: 'ટામેટાનો ઘેરો લાલ રંગ, મીઠાશ અને સંગ્રહ શક્તિ વધે છે.',
        safety_note_gu: 'વીણીના દિવસોમાં ઓવરડોઝ ટાળવો.'
      }
    ]
  },
  chilli: {
    crop_key: 'chilli',
    crop_name_gu: 'મરચાં',
    doses: [
      {
        id: 'ch-f1',
        dose_number: 1,
        title_gu: 'પાયાનું ખાતર (રોપણી સમય)',
        title_en: 'Basal Dose',
        target_day: 0,
        fertilizers_gu: ['DAP', 'પોટાશ', 'હ્યુમિક એસિડ'],
        method_gu: 'રોપણી પહેલા બેડમાં આપવું.',
        quantity_hint_gu: 'DAP ૪૦ કિલો + MOP ૨૫ કિલો પ્રતિ એકર',
        why_important_gu: 'મૂળના જથ્થાનો વિકાસ.',
        safety_note_gu: 'મરચાંને વધુ પાણી ન આપવું.'
      },
      {
        id: 'ch-f2',
        dose_number: 2,
        title_gu: 'વાનસ્પતિક ફૂટ અને નવી ડાળીઓ',
        title_en: 'Vegetative Stage',
        target_day: 30,
        fertilizers_gu: ['19:19:19', 'સૂક્ષ્મ તત્વો'],
        method_gu: 'ટપક દ્વારા અથવા સ્પ્રે.',
        quantity_hint_gu: '૩ કિલો પ્રતિ એકર',
        why_important_gu: 'શાખાઓ વધારવા માટે.',
        safety_note_gu: 'યુરિયાનો વધુ પડતો ઉપયોગ ન કરવો નહિતર કુકડાવો વધશે.'
      },
      {
        id: 'ch-f3',
        dose_number: 3,
        title_gu: 'ફૂલ અને કળીઓ વધારવા – 12:61:00',
        title_en: 'Flowering Booster',
        target_day: 60,
        fertilizers_gu: ['12:61:00 (મોનો એમોનિયમ ફોસ્ફેટ)', 'બોરોન'],
        method_gu: 'પાન પર સ્પ્રે.',
        quantity_hint_gu: '૭૫ ગ્રામ પ્રતિ પંપ',
        why_important_gu: 'ફૂલ ખરતાં અટકે અને પુષ્કળ મરચાં બેસે.',
        safety_note_gu: 'પવન શાંત હોય ત્યારે સ્પ્રે કરવો.'
      },
      {
        id: 'ch-f4',
        dose_number: 4,
        title_gu: 'મરચાંની લંબાઈ અને ચમક – પોટાશ',
        title_en: 'Pod Quality & Length',
        target_day: 90,
        fertilizers_gu: ['કેલ્શિયમ નાઇટ્રેટ', '00:00:50'],
        method_gu: 'ડ્રીપ અથવા સ્પ્રે.',
        quantity_hint_gu: '૫૦ ગ્રામ કેલ્શિયમ + ૭૫ ગ્રામ 00:00:50 (અલગ અલગ સ્પ્રે)',
        why_important_gu: 'મરચાં કડક રહે અને બજારમાં સારા ભાવ મળે.',
        safety_note_gu: 'વીણી પછી હળવો છંટકાવ કરવો.'
      }
    ]
  },
  default: {
    crop_key: 'general',
    crop_name_gu: 'સામાન્ય પાક ખાતર ચક્ર',
    doses: [
      {
        id: 'gen-f1',
        dose_number: 1,
        title_gu: 'પાયાનું ખાતર (વાવણી સમયે)',
        title_en: 'Basal Dose at Planting',
        target_day: 0,
        fertilizers_gu: ['DAP / NPK', 'પોટાશ (MOP)', 'છાણીયું ખાતર'],
        method_gu: 'વાવણી સમયે ચાસમાં આપવું.',
        quantity_hint_gu: 'જમીન ચકાસણી મુજબ (DAP ૪૦-૫૦ કિલો પ્રતિ એકર)',
        why_important_gu: 'મૂળના વિકાસ અને પ્રારંભિક પોષણ માટે.',
        safety_note_gu: 'ખાતર અને બીજ વચ્ચે અંતર રાખવું.'
      },
      {
        id: 'gen-f2',
        dose_number: 2,
        title_gu: 'પ્રથમ પૂર્તિ હપ્તો (વાનસ્પતિક વૃદ્ધિ)',
        title_en: 'First Top Dressing',
        target_day: 30,
        fertilizers_gu: ['યુરિયા (નાઇટ્રોજન)', 'સૂક્ષ્મ પોષક તત્વો'],
        method_gu: 'પિયત સાથે આપવું.',
        quantity_hint_gu: 'યુરિયા ૨૫ કિલો પ્રતિ એકર',
        why_important_gu: 'ઝડપી પાંદડાં અને શાખાઓના વિકાસ માટે.',
        safety_note_gu: 'ભેજવાળી જમીનમાં જ આપવું.'
      },
      {
        id: 'gen-f3',
        dose_number: 3,
        title_gu: 'બીજો પૂર્તિ હપ્તો (ફૂલ/ફળ અવસ્થા)',
        title_en: 'Second Top Dressing',
        target_day: 60,
        fertilizers_gu: ['પોટાશ (MOP / SOP)', 'બોરોન'],
        method_gu: 'જમીનમાં અથવા પાન પર સ્પ્રે.',
        quantity_hint_gu: 'પોટાશ ૨૦ કિલો અથવા સ્પ્રે ૧૦૦ ગ્રામ/પંપ',
        why_important_gu: 'ફૂલ-ફળનું બંધારણ મજબૂત કરવા.',
        safety_note_gu: 'વરસાદની શક્યતા હોય ત્યારે છંટકાવ ન કરવો.'
      },
      {
        id: 'gen-f4',
        dose_number: 4,
        title_gu: 'ફળ/દાણા ભરાવાનો તબક્કો',
        title_en: 'Maturity / Grain Filling Spray',
        target_day: 85,
        fertilizers_gu: ['00:00:50 (પોટેશિયમ સલ્ફેટ)'],
        method_gu: 'પાન પર હળવો છંટકાવ.',
        quantity_hint_gu: '૭૫ થી ૧૦૦ ગ્રામ પ્રતિ પંપ',
        why_important_gu: 'ગુણવત્તા, વજન અને સંગ્રહ શક્તિ વધારવા.',
        safety_note_gu: 'લણણી નજીક હોય ત્યારે ઝેરી દવાઓ ન ભેળવવી.'
      }
    ]
  }
};

export function getCropFertilizerPlan(cropName: string): CropFertilizerPlan {
  const q = cropName.toLowerCase();
  if (q.includes('કપાસ') || q.includes('cotton') || q.includes('બીટી')) {
    return CROP_FERTILIZER_PLANS.cotton;
  }
  if (q.includes('મગફળી') || q.includes('groundnut') || q.includes('peanut')) {
    return CROP_FERTILIZER_PLANS.groundnut;
  }
  if (q.includes('ઘઉં') || q.includes('wheat')) {
    return CROP_FERTILIZER_PLANS.wheat;
  }
  if (q.includes('ડુંગળી') || q.includes('onion')) {
    return CROP_FERTILIZER_PLANS.onion;
  }
  if (q.includes('ટામેટા') || q.includes('tomato')) {
    return CROP_FERTILIZER_PLANS.tomato;
  }
  if (q.includes('મરચાં') || q.includes('મરચી') || q.includes('chilli') || q.includes('chili')) {
    return CROP_FERTILIZER_PLANS.chilli;
  }
  return CROP_FERTILIZER_PLANS.default;
}

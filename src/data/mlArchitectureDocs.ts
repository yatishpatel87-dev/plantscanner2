export const ML_ARCHITECTURE_DOCS = {
  title_gu: 'કૃષિ AI મશીન લર્નિંગ મોડેલ અને ડેટાબેઝ આર્કિટેક્ચર',
  title_en: 'Agri-Vision Machine Learning Pipeline & Database Architecture',
  summary_gu: 'ગુજરાતના પાક અને જમીનની પરિસ્થિતિ અનુસાર ડિઝાઇન કરેલ 3-સ્ટેજ હાઇબ્રિડ વિઝન ટ્રાન્સફોર્મર અને રિલેશનલ ડેટાબેઝ સિસ્ટમ.',
  stages: [
    {
      step: '૧. ઇનપુટ પ્રી-પ્રોસેસિંગ (Input Pre-processing)',
      desc_gu: 'મોબાઇલ કેમેરામાંથી 512x512 RGB ઇમેજનું સ્કેલિંગ, તડકો/છાંયડો બેલેન્સિંગ (CLAHE) અને નોઇઝ રિમૂવલ.',
      tech: 'OpenCV / TorchVision, Bilateral Filtering, Auto-Contrast Adjustment'
    },
    {
      step: '૨. પાક અને અંગ વર્ગીકરણ (Crop & Organ Classifier)',
      desc_gu: 'છોડનો પ્રકાર (કપાસ, મગફળી વગેરે) અને ભાગ (પાન, ફળ, પ્રકાંડ, ફૂલ) શોધવા માટે હળવું એજ મોડેલ.',
      tech: 'MobileNetV4 / ConvNeXt-Nano + YOLOv8-Seg (Zero-latency on-device/edge execution)'
    },
    {
      step: '૩. રોગ-જીવાત લક્ષણ વિશ્લેષણ (Pathology Feature Extractor)',
      desc_gu: 'ICAR અને ગુજરાત કૃષિ યુનિવર્સિટીના ડેટાસેટ પર ફાઇન-ટ્યુન થયેલ વિઝન ટ્રાન્સફોર્મર જે પાનના ડાઘ, કુકડાવો અને પીળાશ પકડે છે.',
      tech: 'Swin-Transformer-Base / ViT-L-16 + Grad-CAM Feature Attribution'
    },
    {
      step: '૪. મલ્ટિમોડલ રીઝનિંગ અને સેફ્ટી ગેટ (Multimodal LLM & Safety Gate)',
      desc_gu: 'ગુગલ જેમિની 2.5 ફ્લેશ વિઝન મોડેલ સાથે એગ્રો-પ્રોમ્પ્ટ ગ્રાઉન્ડિંગ. જો કોન્ફિડન્સ ૭૦% થી ઓછો હોય તો અનિશ્ચિતતા નોટિસ જનરેટ થાય છે.',
      tech: 'Gemini 2.5 Flash Multimodal + Temperature Scaling (ECE < 0.05)'
    }
  ],
  datasets_gu: [
    'ICAR - ભારતીય કૃષિ અનુસંધાન પરિષદ રોગ-જીવાત ડેટાબેઝ',
    'AAU (આણંદ), JAU (જૂનાગઢ), NAU (નવસારી), SDAU (દાંતીવાડા) ફીલ્ડ ડેટાસેટ્સ',
    'PlantVillage Benchmark (ભારતીય સૂર્યપ્રકાશ અને ખેતરના બેકગ્રાઉન્ડ સાથે એનરિચ કરેલ)'
  ],
  database_tables: [
    {
      table_name: 'farmers',
      desc_gu: 'ખેડૂત પ્રોફાઇલ, ગામ, તાલુકો, જિલ્લો, જમીનનો પ્રકાર, સિંચાઈ પદ્ધતિ',
      primary_key: 'id (UUID)',
      fields: ['full_name', 'phone', 'village', 'taluka', 'district', 'soil_type', 'irrigation_type', 'created_at']
    },
    {
      table_name: 'farm_crops',
      desc_gu: 'ખેડૂતના વાવેલા પાક, જાત, વાવણી તારીખ, એકર વિસ્તાર',
      primary_key: 'id (UUID)',
      foreign_key: 'farmer_id -> farmers(id)',
      fields: ['crop_name_gu', 'crop_name_en', 'variety', 'sowing_date', 'acreage', 'created_at']
    },
    {
      table_name: 'plant_scans',
      desc_gu: 'છોડ સ્કેન વિશ્લેષણ, ફોટો URL, રોગ, જીવાત, પોષણ ઉણપ, કોન્ફિડન્સ સ્કોર, સલાહ',
      primary_key: 'id (UUID)',
      foreign_key: 'farmer_id -> farmers(id), crop_id -> farm_crops(id)',
      fields: ['image_url', 'plant_name_gu', 'plant_name_en', 'scientific_name', 'health_status', 'confidence_score', 'possible_disease', 'possible_pest', 'possible_deficiency', 'water_guidance', 'care_recommendation', 'treatment_guidance', 'created_at']
    },
    {
      table_name: 'weather_advisories',
      desc_gu: 'ગુજરાતના 33 જિલ્લાનું તાપમાન, વરસાદની સંભાવના અને ખેતી માટે દૈનિક સલાહ',
      primary_key: 'id (UUID)',
      fields: ['district', 'temperature_c', 'humidity_percent', 'rainfall_prob_percent', 'wind_speed_kmh', 'agri_advisory_gu', 'recorded_at']
    }
  ]
};

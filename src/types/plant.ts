export type HealthStatus = 'healthy' | 'attention' | 'critical';
export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface DosAndDonts {
  dos: string[];
  donts: string[];
}

export interface PlantDiagnosisResult {
  id: string;
  timestamp: string;
  image_url: string;
  secondary_image_url?: string;
  plant_name_gu: string;
  plant_name_en: string;
  scientific_name: string;
  crop_category: string;
  growth_stage: string;
  health_status: HealthStatus;
  confidence: ConfidenceLevel;
  confidence_score: number; // 0 to 1
  visible_symptoms: string[];
  possible_disease: string;
  possible_pest: string;
  possible_nutrient_deficiency: string;
  water_guidance: string;
  care_recommendation: string;
  treatment_guidance: string;
  dos_and_donts?: DosAndDonts;
  when_to_consult_expert: string;
  warning: string;
  is_demo?: boolean;
}

export interface GujaratDistrict {
  id: string;
  name_gu: string;
  name_en: string;
  lat: number;
  lon: number;
  major_crops: string[];
  zone_gu: string;
}

export interface WeatherData {
  district: string;
  district_gu: string;
  temperature: number;
  apparent_temperature: number;
  humidity: number;
  rain: number;
  rain_probability: number;
  wind_speed: number;
  weather_code: number;
  weather_condition_gu: string;
  spray_advice_gu: string;
  irrigation_advice_gu: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export interface FarmerProfile {
  full_name: string;
  phone: string;
  village: string;
  taluka: string;
  district: string;
  crop_name: string;
  sowing_date: string;
  soil_type: 'કાળી (Black Soil)' | 'ગોરાડુ (Loamy Soil)' | 'રેતાળ (Sandy Soil)' | 'કાંપવાળી (Alluvial)';
  irrigation_type: 'ટપક પદ્ધતિ (Drip)' | 'ફુવારા પદ્ધતિ (Sprinkler)' | 'ધોરિયા પદ્ધતિ (Flood)' | 'વરસાદ આધારિત (Rainfed)';
  acreage: string;
}

export interface GrowthStageInfo {
  id: string;
  stage_number: number;
  name_gu: string;
  name_en: string;
  start_day: number;
  end_day: number;
  icon: string;
  description_gu: string;
  water_tip_gu: string;
  fertilizer_tip_gu: string;
  pest_watch_gu: string;
  field_action_gu: string;
}

export interface CropGrowthPlan {
  crop_key: string;
  crop_name_gu: string;
  crop_name_en: string;
  total_days: number;
  stages: GrowthStageInfo[];
}

export type FertilizerStatus = 'due_now' | 'upcoming' | 'completed' | 'future';

export interface FertilizerDoseInfo {
  id: string;
  dose_number: number;
  title_gu: string;
  title_en: string;
  target_day: number;
  fertilizers_gu: string[];
  method_gu: string;
  quantity_hint_gu: string;
  why_important_gu: string;
  safety_note_gu: string;
}

export interface CropFertilizerPlan {
  crop_key: string;
  crop_name_gu: string;
  doses: FertilizerDoseInfo[];
}

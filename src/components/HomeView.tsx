import React from 'react';
import { 
  Camera, CloudSun, ShieldCheck, Sprout, ArrowRight, 
  HelpCircle, Sparkles, AlertCircle, Droplets, FlaskConical, Bug, ChevronRight
} from 'lucide-react';
import { PlantDiagnosisResult, WeatherData } from '../types/plant';
import { SAMPLE_CASES } from '../data/sampleCases';
import { GUJARAT_DISTRICTS } from '../data/gujaratDistricts';

import { CropGrowthTimeline } from './CropGrowthTimeline';
import { FertilizerReminderCard } from './FertilizerReminderCard';

interface HomeViewProps {
  onStartScan: () => void;
  onOpenWeather: () => void;
  onOpenChat: () => void;
  onOpenSamples: () => void;
  onSelectSample: (sample: PlantDiagnosisResult) => void;
  onOpenScanGuide: () => void;
  recentScans: PlantDiagnosisResult[];
  onSelectScan: (scan: PlantDiagnosisResult) => void;
  weather: WeatherData | null;
  selectedDistrictId: string;
  farmerCropName: string;
  farmerSowingDate: string;
  onUpdateSowingDate: (date: string) => void;
  onUpdateCropName: (crop: string) => void;
  onAskChatAboutFertilizer?: (crop: string, doseTitle: string, fertilizerList: string[]) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartScan,
  onOpenWeather,
  onOpenChat,
  onOpenSamples,
  onSelectSample,
  onOpenScanGuide,
  recentScans,
  onSelectScan,
  weather,
  selectedDistrictId,
  farmerCropName,
  farmerSowingDate,
  onUpdateSowingDate,
  onUpdateCropName,
  onAskChatAboutFertilizer
}) => {
  const currentDistrict = GUJARAT_DISTRICTS.find(d => d.id === selectedDistrictId) || GUJARAT_DISTRICTS[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 pb-24 space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white p-6 sm:p-8 shadow-md border border-emerald-700/60">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-emerald-700/70 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>ગુજરાતના ખેડૂતો માટે અદ્યતન AI તકનીક</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            🌱 AI Plant Doctor
          </h2>
          <p className="text-base sm:text-lg font-bold text-emerald-200 mt-1">
            સ્માર્ટ પાક અને છોડ સહાયક
          </p>

          <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
            “ફોટો લો – પાક ઓળખો – સમસ્યા જાણો – યોગ્ય સંભાળ મેળવો”
          </p>

          {/* Large CTA buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={onStartScan}
              className="py-3 px-5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <Camera className="w-4 h-4 text-emerald-700" />
              <span>છોડ સ્કેન કરો (Scan Now)</span>
            </button>

            <button
              onClick={onOpenSamples}
              className="py-3 px-4 rounded-2xl bg-emerald-800/80 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-emerald-600 transition-colors"
            >
              <Sprout className="w-4 h-4 text-amber-300" />
              <span>નમૂના પાક જુઓ</span>
            </button>
          </div>
        </div>

        {/* Decorative corner icon */}
        <div className="absolute -bottom-6 -right-6 text-emerald-700/20 pointer-events-none">
          <Sprout className="w-48 h-48" />
        </div>
      </div>

      {/* Real-time Weather Strip */}
      {weather && (
        <div
          onClick={onOpenWeather}
          className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100 hover:border-emerald-300 transition-all cursor-pointer flex flex-wrap items-center justify-between gap-3 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <CloudSun className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">
                  આજનું હવામાન ({currentDistrict.name_gu}):
                </span>
                <span className="text-xs font-extrabold text-emerald-800">
                  {weather.temperature}°C
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                {weather.spray_advice_gu}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-emerald-800 group-hover:translate-x-0.5 transition-transform">
            <span>સંપૂર્ણ હવામાન જુઓ</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* Visual Crop Growth Stage Timeline */}
      <CropGrowthTimeline
        cropName={farmerCropName}
        sowingDate={farmerSowingDate}
        onUpdateSowingDate={onUpdateSowingDate}
        onUpdateCropName={onUpdateCropName}
      />

      {/* Automated Fertilizer Schedule Notifications & Reminders */}
      <FertilizerReminderCard
        cropName={farmerCropName}
        sowingDate={farmerSowingDate}
        onAskChatAboutFertilizer={onAskChatAboutFertilizer}
      />

      {/* 4 Feature Cards Grid */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
          <span>મુખ્ય સેવાઓ અને માર્ગદર્શન:</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            onClick={onStartScan}
            className="p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
              <Sprout className="w-5 h-5" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">પાક ઓળખો</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">અનાજ, કઠોળ, શાકભાજી, ઔષધીય છોડ</p>
          </div>

          <div
            onClick={onStartScan}
            className="p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-red-100 text-red-800 flex items-center justify-center mb-2 group-hover:bg-red-700 group-hover:text-white transition-colors">
              <Bug className="w-5 h-5" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">રોગ & જીવાત</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">ટપકાં, કુકડાવો, ઈયળ, ફૂગ તપાસ</p>
          </div>

          <div
            onClick={onStartScan}
            className="p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-2 group-hover:bg-purple-700 group-hover:text-white transition-colors">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">પોષણ & ખાતર</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">N, P, K, ઝીંક અને સલ્ફર ઉણપ</p>
          </div>

          <div
            onClick={onStartScan}
            className="p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-2 group-hover:bg-blue-700 group-hover:text-white transition-colors">
              <Droplets className="w-5 h-5" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">પાણી વ્યવસ્થાપન</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">જમીનમાં ભેજ અને ટપક પિયત સલાહ</p>
          </div>
        </div>
      </div>

      {/* Popular Demo Samples Showcase */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              ગુજરાતના મુખ્ય પાકો – ત્વરિત ડેમો:
            </h3>
            <p className="text-xs text-slate-500">ક્લિક કરીને વાસ્તવિક નિદાન તપાસો</p>
          </div>
          <button
            onClick={onOpenSamples}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
          >
            <span>તમામ ૮ પાક</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {SAMPLE_CASES.slice(0, 4).map((sample) => (
            <button
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className="flex flex-col text-left rounded-2xl overflow-hidden border border-slate-100 hover:border-emerald-300 hover:shadow-sm transition-all group bg-slate-50/60"
            >
              <div className="aspect-[4/3] bg-slate-200 overflow-hidden relative">
                <img
                  src={sample.image_url}
                  alt={sample.plant_name_gu}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-2.5">
                <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 block truncate">
                  {sample.plant_name_gu.split(' ')[0]}
                </span>
                <span className="text-[10px] text-slate-500 block truncate">
                  {sample.health_status === 'healthy' ? '🟢 સ્વસ્થ' : sample.health_status === 'attention' ? '🟡 કુકડાવો' : '🔴 ટિક્કા રોગ'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Scans (if available) */}
      {recentScans.length > 0 && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900">
              આપના તાજેતરના સ્કેન (Recent Scans):
            </h3>
          </div>

          <div className="space-y-2">
            {recentScans.slice(0, 3).map((scan) => (
              <div
                key={scan.id}
                onClick={() => onSelectScan(scan)}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={scan.image_url}
                    alt={scan.plant_name_gu}
                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-800 truncate">
                      {scan.plant_name_gu}
                    </h5>
                    <p className="text-[11px] text-slate-500 truncate">
                      {scan.possible_disease}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Safety Notice Footer */}
      <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>સલામત ખેતી નિયમ:</strong> આ એપ Integrated Pest Management (IPM) અને જૈવિક ઉપાયોને પ્રોત્સાહન આપે છે. રાસાયણિક જંતુનાશકોનો બિનજરૂરી ઉપયોગ ટાળો, હંમેશા PPE માસ્ક-મોજાં વાપરો અને ચોક્કસ દવા માટે સ્થાનિક કૃષિ વૈજ્ઞાનિકની સલાહ લો.
        </p>
      </div>
    </div>
  );
};

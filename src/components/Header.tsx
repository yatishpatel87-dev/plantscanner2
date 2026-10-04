import React from 'react';
import { Sprout, HelpCircle, Database, MapPin, CloudSun, School, Sparkles } from 'lucide-react';
import { GUJARAT_DISTRICTS } from '../data/gujaratDistricts';
import { WeatherData } from '../types/plant';

interface HeaderProps {
  selectedDistrictId: string;
  onSelectDistrict: (districtId: string) => void;
  weather: WeatherData | null;
  onOpenScanGuide: () => void;
  onOpenMLDocs: () => void;
  onOpenWeatherTab: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedDistrictId,
  onSelectDistrict,
  weather,
  onOpenScanGuide,
  onOpenMLDocs,
  onOpenWeatherTab
}) => {
  const currentDistrict = GUJARAT_DISTRICTS.find(d => d.id === selectedDistrictId) || GUJARAT_DISTRICTS[0];

  return (
    <header className="sticky top-0 z-30 bg-emerald-900/95 text-white shadow-md backdrop-blur-md border-b border-emerald-800">
      {/* સૌથી ઉપર શાળાનું નામ મધ્યમાં (School Title Centered at Very Top) */}
      <div className="bg-emerald-950 text-white py-2 px-3 border-b border-emerald-800/90 shadow-inner">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-center">
          <School className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0" />
          <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-2 leading-tight">
            <span className="font-extrabold text-sm sm:text-base text-amber-200 tracking-wide">
              ભીખાપુરા પ્રાથમિક શાળા
            </span>
            <span className="hidden sm:inline text-emerald-400">·</span>
            <span className="text-xs sm:text-sm text-emerald-100 font-semibold">
              તા. હાલોલ, જિલ્લો: પંચમહાલ
            </span>
          </div>
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0 hidden sm:block" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* Brand & Subtitle */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-700/80 border border-emerald-500/40 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Sprout className="w-6 h-6 text-emerald-300" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white truncate flex items-center gap-1.5">
                <span>AI Plant Doctor</span>
                <span className="text-xs font-medium text-emerald-300 bg-emerald-800/80 px-2 py-0.5 rounded-full border border-emerald-700">
                  ગુજરાત
                </span>
              </h1>
              <p className="text-xs text-emerald-200/80 truncate hidden sm:block">
                સ્માર્ટ પાક અને છોડ સહાયક · ફોટો લો, સમસ્યા જાણો, યોગ્ય સંભાળ મેળવો
              </p>
            </div>
          </div>

          {/* Quick Actions & District Selector */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Gujarat District Selector */}
            <div className="flex items-center bg-emerald-800/70 hover:bg-emerald-800 border border-emerald-700 rounded-lg px-2 py-1 text-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-300 mr-1 shrink-0" />
              <select
                value={selectedDistrictId}
                onChange={(e) => onSelectDistrict(e.target.value)}
                className="bg-transparent text-emerald-100 text-xs font-medium focus:outline-none cursor-pointer pr-1"
                title="ગુજરાત જિલ્લો પસંદ કરો"
              >
                {GUJARAT_DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id} className="bg-emerald-900 text-white py-1">
                    {d.name_gu} ({d.name_en})
                  </option>
                ))}
              </select>
            </div>

            {/* Weather Quick Badge */}
            {weather && (
              <button
                onClick={onOpenWeatherTab}
                className="hidden md:flex items-center gap-1.5 bg-emerald-800/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700 px-2.5 py-1 rounded-lg text-xs transition-colors"
                title="આજનું હવામાન અને કૃષિ સલાહ"
              >
                <CloudSun className="w-4 h-4 text-amber-300" />
                <span className="font-semibold">{weather.temperature}°C</span>
                <span className="text-emerald-300/70 text-[11px] truncate max-w-[90px]">{currentDistrict.name_gu}</span>
              </button>
            )}

            {/* Smart Scan Guide Trigger */}
            <button
              onClick={onOpenScanGuide}
              className="flex items-center gap-1 bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border border-emerald-600/50 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm"
              title="ફોટો સ્કેન માર્ગદર્શિકા"
            >
              <HelpCircle className="w-4 h-4 text-emerald-300" />
              <span className="hidden sm:inline">સ્કેન ગાઇડ</span>
            </button>

            {/* ML & DB Architecture Docs Modal Trigger */}
            <button
              onClick={onOpenMLDocs}
              className="flex items-center gap-1 bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border border-emerald-600/50 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm"
              title="ML મોડેલ અને ડેટાબેઝ આર્કિટેક્ચર"
            >
              <Database className="w-4 h-4 text-amber-300" />
              <span className="hidden lg:inline">ML & DB</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { 
  CloudSun, Droplets, Wind, Thermometer, Navigation as NavIcon, 
  AlertTriangle, CheckCircle, RefreshCw, MapPin, ShieldAlert, Sparkles
} from 'lucide-react';
import { WeatherData } from '../types/plant';
import { GUJARAT_DISTRICTS } from '../data/gujaratDistricts';

interface WeatherViewProps {
  weather: WeatherData | null;
  selectedDistrictId: string;
  onSelectDistrict: (districtId: string) => void;
  onRefreshWeather: () => void;
  isLoading: boolean;
  onDetectGPS: () => void;
}

export const WeatherView: React.FC<WeatherViewProps> = ({
  weather,
  selectedDistrictId,
  onSelectDistrict,
  onRefreshWeather,
  isLoading,
  onDetectGPS
}) => {
  const currentDistrict = GUJARAT_DISTRICTS.find(d => d.id === selectedDistrictId) || GUJARAT_DISTRICTS[0];

  const getFungalRisk = () => {
    if (!weather) return 'સામાન્ય';
    if (weather.humidity > 75 && weather.temperature < 32) {
      return 'ઉચ્ચ જોખમ (ફૂગ અને પાનના ટપકાં ફેલાઈ શકે છે)';
    }
    if (weather.humidity > 60) {
      return 'મધ્યમ જોખમ';
    }
    return 'નહિવત / ઓછું જોખમ';
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 sm:py-6 pb-24">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-5 sm:p-6 text-white shadow-md border border-emerald-700/50 mb-5 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold bg-emerald-700/80 px-2.5 py-0.5 rounded-full border border-emerald-600 text-emerald-200">
                {currentDistrict.zone_gu}
              </span>
              <span className="text-xs text-emerald-300">
                છેલ્લે અપડેટ: {weather?.updated_at || 'તાજેતરમાં'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {currentDistrict.name_gu} ({currentDistrict.name_en})
            </h2>
            <p className="text-xs text-emerald-200 mt-0.5">
              મુખ્ય પાક: {currentDistrict.major_crops.join(', ')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onDetectGPS}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-xl backdrop-blur-sm border border-white/20 transition-colors"
              title="GPS દ્વારા મારું ખેતર શોધો"
            >
              <NavIcon className="w-3.5 h-3.5 text-emerald-300" />
              <span>મારું GPS લોકેશન</span>
            </button>

            <button
              onClick={onRefreshWeather}
              disabled={isLoading}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors disabled:opacity-50"
              title="તાજું કરો"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Current Core Metrics Bar */}
        {weather && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-emerald-700/60 relative z-10">
            <div className="bg-black/20 p-3 rounded-2xl backdrop-blur-xs">
              <div className="flex items-center gap-1.5 text-emerald-300 text-xs mb-1">
                <Thermometer className="w-4 h-4 text-amber-300" />
                <span>તાપમાન</span>
              </div>
              <div className="text-2xl font-black">{weather.temperature}°C</div>
              <div className="text-[11px] text-emerald-300/80">અનુભવાતું: {weather.apparent_temperature}°C</div>
            </div>

            <div className="bg-black/20 p-3 rounded-2xl backdrop-blur-xs">
              <div className="flex items-center gap-1.5 text-emerald-300 text-xs mb-1">
                <Droplets className="w-4 h-4 text-blue-300" />
                <span>હવામાં ભેજ</span>
              </div>
              <div className="text-2xl font-black">{weather.humidity}%</div>
              <div className="text-[11px] text-emerald-300/80">
                {weather.humidity > 70 ? 'ભેજવાળું વાતાવરણ' : 'સામાન્ય ભેજ'}
              </div>
            </div>

            <div className="bg-black/20 p-3 rounded-2xl backdrop-blur-xs">
              <div className="flex items-center gap-1.5 text-emerald-300 text-xs mb-1">
                <CloudSun className="w-4 h-4 text-sky-300" />
                <span>વરસાદ શક્યતા</span>
              </div>
              <div className="text-2xl font-black">{weather.rain_probability}%</div>
              <div className="text-[11px] text-emerald-300/80">વરસાદ: {weather.rain} mm</div>
            </div>

            <div className="bg-black/20 p-3 rounded-2xl backdrop-blur-xs">
              <div className="flex items-center gap-1.5 text-emerald-300 text-xs mb-1">
                <Wind className="w-4 h-4 text-teal-300" />
                <span>પવનની ગતિ</span>
              </div>
              <div className="text-2xl font-black">{weather.wind_speed} <span className="text-xs font-normal">km/h</span></div>
              <div className="text-[11px] text-emerald-300/80">
                {weather.wind_speed > 20 ? 'તેજ પવન' : 'શાંત પવન'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* District Fast-Switch Buttons */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100 mb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>ગુજરાત જિલ્લો બદલો (૩૩ જિલ્લા ઉપલબ્ધ):</span>
          </div>
        </div>

        <select
          value={selectedDistrictId}
          onChange={(e) => onSelectDistrict(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 mb-2.5"
        >
          {GUJARAT_DISTRICTS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name_gu} ({d.name_en}) - {d.zone_gu}
            </option>
          ))}
        </select>

        {/* Quick popular chips */}
        <div className="flex flex-wrap gap-1.5">
          {['rajkot', 'junagadh', 'banaskantha', 'anand', 'surat', 'bhavnagar', 'kutch', 'ahmedabad'].map((id) => {
            const d = GUJARAT_DISTRICTS.find(x => x.id === id);
            if (!d) return null;
            return (
              <button
                key={id}
                onClick={() => onSelectDistrict(id)}
                className={`text-xs px-2.5 py-1 rounded-lg transition-colors font-medium ${
                  selectedDistrictId === id
                    ? 'bg-emerald-800 text-white font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {d.name_gu}
              </button>
            );
          })}
        </div>
      </div>

      {/* Agricultural Advisories Based on Current Weather */}
      {weather && (
        <div className="space-y-4">
          {/* Spraying Advisory Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-100">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                weather.wind_speed > 20 || weather.rain_probability > 40
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {weather.wind_speed > 20 || weather.rain_probability > 40 ? (
                  <AlertTriangle className="w-5 h-5 text-amber-700" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-emerald-700" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    જંતુનાશક / ફૂગનાશક દવાનો છંટકાવ સલાહ:
                  </h3>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    weather.wind_speed > 20 || weather.rain_probability > 40
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    {weather.wind_speed > 20 || weather.rain_probability > 40 ? 'સાવધાની જરૂરી' : 'અનુકૂળ હવામાન'}
                  </span>
                </div>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  {weather.spray_advice_gu}
                </p>
              </div>
            </div>
          </div>

          {/* Irrigation & Water Planning Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5 text-blue-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-900">
                  સિંચાઈ અને પિયત આયોજન:
                </h3>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  {weather.irrigation_advice_gu}
                </p>
              </div>
            </div>
          </div>

          {/* Fungal & Pest Risk based on Humidity */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5 text-purple-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    હવામાન આધારિત ફૂગ / રોગનું જોખમ:
                  </h3>
                  <span className="text-[11px] font-semibold text-purple-900 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                    {getFungalRisk()}
                  </span>
                </div>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  જ્યારે વાતાવરણમાં ભેજ {weather.humidity}% હોય ત્યારે પાનમાં ફૂગ અને ચુસિયા જીવાતોની પ્રજનન ક્ષમતા વધે છે. ખાસ કરીને કપાસમાં કુકડાવો અને મગફળીમાં ટિક્કા રોગ માટે ખેતરનું નિયમિત નિરીક્ષણ કરો.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

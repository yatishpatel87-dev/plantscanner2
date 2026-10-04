import React, { useState, useMemo } from 'react';
import { 
  Calendar, Sprout, Clock, CheckCircle2, ChevronRight, 
  Droplets, FlaskConical, Bug, Wrench, Edit3, ArrowRight, Sparkles
} from 'lucide-react';
import { GrowthStageInfo, CropGrowthPlan } from '../types/plant';
import { getCropGrowthPlan, CROP_GROWTH_PLANS } from '../data/cropGrowthData';

interface CropGrowthTimelineProps {
  cropName: string;
  sowingDate: string;
  onUpdateSowingDate?: (date: string) => void;
  onUpdateCropName?: (crop: string) => void;
  compact?: boolean;
}

export const CropGrowthTimeline: React.FC<CropGrowthTimelineProps> = ({
  cropName,
  sowingDate,
  onUpdateSowingDate,
  onUpdateCropName,
  compact = false
}) => {
  const [selectedCropKey, setSelectedCropKey] = useState<string>('');
  const [isEditingDate, setIsEditingDate] = useState<boolean>(false);
  const [customDate, setCustomDate] = useState<string>(sowingDate || '2026-06-15');

  // Match active crop plan
  const plan: CropGrowthPlan = useMemo(() => {
    if (selectedCropKey && CROP_GROWTH_PLANS[selectedCropKey]) {
      return CROP_GROWTH_PLANS[selectedCropKey];
    }
    return getCropGrowthPlan(cropName || 'કપાસ');
  }, [cropName, selectedCropKey]);

  // Calculate elapsed days
  const { daysElapsed, progressPercent, currentStageIndex, daysRemaining } = useMemo(() => {
    const today = new Date();
    const planting = new Date(customDate);

    // If invalid date, fallback to 45 days
    let diffDays = 45;
    if (!isNaN(planting.getTime())) {
      const diffTime = today.getTime() - planting.getTime();
      diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    }

    const total = plan.total_days || 120;
    const progress = Math.min(100, Math.max(0, Math.round((diffDays / total) * 100)));
    const remaining = Math.max(0, total - diffDays);

    let currentIdx = plan.stages.findIndex(
      (st) => diffDays >= st.start_day && diffDays <= st.end_day
    );

    if (currentIdx === -1) {
      if (diffDays > plan.stages[plan.stages.length - 1].end_day) {
        currentIdx = plan.stages.length - 1;
      } else {
        currentIdx = 0;
      }
    }

    return {
      daysElapsed: diffDays,
      progressPercent: progress,
      currentStageIndex: currentIdx,
      daysRemaining: remaining
    };
  }, [customDate, plan]);

  // Which stage card is expanded / viewed by user (defaults to current stage)
  const [inspectedStageIndex, setInspectedStageIndex] = useState<number>(currentStageIndex);

  // Keep inspectedStageIndex synced when crop or date changes
  React.useEffect(() => {
    setInspectedStageIndex(currentStageIndex);
  }, [currentStageIndex]);

  const activeStage = plan.stages[currentStageIndex] || plan.stages[0];
  const inspectedStage = plan.stages[inspectedStageIndex] || activeStage;

  const handleApplyNewDate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingDate(false);
    if (onUpdateSowingDate) {
      onUpdateSowingDate(customDate);
    }
  };

  const handleQuickOffsetDays = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    const dateStr = d.toISOString().split('T')[0];
    setCustomDate(dateStr);
    if (onUpdateSowingDate) {
      onUpdateSowingDate(dateStr);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-emerald-100">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-800 text-emerald-200 flex items-center justify-center font-bold text-lg shadow-sm">
            🌾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                પાક વૃદ્ધિ ટાઇમલાઇન
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">
                કુલ અવધિ: {plan.total_days} દિવસ
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              {plan.crop_name_gu} ({plan.crop_name_en})
            </h3>
          </div>
        </div>

        {/* Crop Selector Switcher */}
        <div className="flex items-center gap-2">
          <select
            value={selectedCropKey || plan.crop_key}
            onChange={(e) => {
              setSelectedCropKey(e.target.value);
              if (onUpdateCropName) {
                onUpdateCropName(CROP_GROWTH_PLANS[e.target.value]?.crop_name_gu || e.target.value);
              }
            }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            title="બીજો પાક પસંદ કરો"
          >
            <option value="cotton">કપાસ (Cotton)</option>
            <option value="groundnut">મગફળી (Groundnut)</option>
            <option value="wheat">ઘઉં (Wheat)</option>
            <option value="onion">ડુંગળી (Onion)</option>
            <option value="tomato">ટામેટા (Tomato)</option>
            <option value="chilli">મરચાં (Chilli)</option>
          </select>
        </div>
      </div>

      {/* Sowing Date & Days Counter Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-2xl p-4 text-white shadow-inner mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Planting Date Display / Editor */}
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-emerald-300 shrink-0" />
            {isEditingDate ? (
              <form onSubmit={handleApplyNewDate} className="flex items-center gap-2">
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="bg-white text-slate-900 text-xs px-2.5 py-1 rounded-lg font-semibold"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-500"
                >
                  લાગુ કરો
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2">
                <div>
                  <span className="text-[11px] text-emerald-200 block">વાવણી તારીખ:</span>
                  <span className="text-xs sm:text-sm font-bold">
                    {new Date(customDate).toLocaleDateString('gu-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <button
                  onClick={() => setIsEditingDate(true)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-200 transition-colors ml-1"
                  title="તારીખ બદલો"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Days Elapsed & Remaining Metric */}
          <div className="flex items-center gap-4 text-right">
            <div>
              <span className="text-[11px] text-emerald-200 block">પાકની ઉંમર:</span>
              <span className="text-lg sm:text-xl font-black text-amber-300">
                {daysElapsed} <span className="text-xs font-normal text-white">દિવસ</span>
              </span>
            </div>
            <div className="border-l border-emerald-700/80 pl-4">
              <span className="text-[11px] text-emerald-200 block">લણણી સુધી બાકી:</span>
              <span className="text-lg sm:text-xl font-black text-white">
                {daysRemaining} <span className="text-xs font-normal text-emerald-200">દિવસ</span>
              </span>
            </div>
          </div>
        </div>

        {/* Overall Growth Progress Bar */}
        <div className="mt-4 pt-3 border-t border-emerald-700/60">
          <div className="flex justify-between text-xs mb-1.5 font-medium">
            <span className="text-emerald-200">
              વર્તમાન તબક્કો: <strong className="text-white">{activeStage.name_gu}</strong>
            </span>
            <span className="text-amber-300 font-bold">{progressPercent}% પૂર્ણ</span>
          </div>
          <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-amber-300 rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Quick testing presets */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-emerald-200">
          <span className="opacity-80">ઝડપી તારીખ ટેસ્ટ:</span>
          <button
            onClick={() => handleQuickOffsetDays(15)}
            className="px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
          >
            ૧૫ દિવસ (ઉગાવો)
          </button>
          <button
            onClick={() => handleQuickOffsetDays(45)}
            className="px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
          >
            ૪૫ દિવસ (વાનસ્પતિક)
          </button>
          <button
            onClick={() => handleQuickOffsetDays(70)}
            className="px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
          >
            ૭૦ દિવસ (ફૂલ/ચાંડીયા)
          </button>
          <button
            onClick={() => handleQuickOffsetDays(105)}
            className="px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
          >
            ૧૦૫ દિવસ (ફળ/ઝીંડવા)
          </button>
        </div>
      </div>

      {/* Visual Multi-Stage Timeline Track */}
      <div className="mb-6">
        <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center justify-between">
          <span>પાકના ૫ મુખ્ય વિકાસ તબક્કા (ક્લિક કરીને વિગત જુઓ):</span>
          <span className="text-[11px] text-slate-400 font-normal">
            તબક્કા પર ક્લિક કરો
          </span>
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {plan.stages.map((stage, idx) => {
            const isPast = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            const isInspected = idx === inspectedStageIndex;

            return (
              <button
                key={stage.id}
                onClick={() => setInspectedStageIndex(idx)}
                className={`flex flex-col text-left p-3 rounded-2xl border transition-all relative ${
                  isInspected
                    ? 'ring-2 ring-emerald-600 bg-emerald-50/70 border-emerald-300 shadow-sm'
                    : isCurrent
                    ? 'bg-amber-50/50 border-amber-300'
                    : isPast
                    ? 'bg-slate-50/80 border-slate-200 opacity-90'
                    : 'bg-white border-slate-200'
                }`}
              >
                {/* Top Badge: Stage # & Status */}
                <div className="flex items-center justify-between w-full mb-1.5">
                  <span className="text-lg">{stage.icon}</span>
                  {isCurrent ? (
                    <span className="text-[10px] font-extrabold bg-emerald-700 text-white px-2 py-0.5 rounded-full shadow-xs">
                      ચાલુ
                    </span>
                  ) : isPast ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400">
                      આગામી
                    </span>
                  )}
                </div>

                {/* Stage Title */}
                <span className="text-xs font-bold text-slate-900 line-clamp-1 leading-snug">
                  {stage.name_gu}
                </span>

                {/* Day span */}
                <span className="text-[10px] font-mono text-slate-500 mt-0.5">
                  {stage.start_day}-{stage.end_day} દિવસ
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inspected Stage Detailed Advisory Card */}
      <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-emerald-100 shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-200/80">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{inspectedStage.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  તબક્કો {inspectedStage.stage_number}: {inspectedStage.name_gu}
                </h4>
                {inspectedStageIndex === currentStageIndex && (
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    હાલનો સક્રિય તબક્કો
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 italic">
                {inspectedStage.name_en} ({inspectedStage.start_day} થી {inspectedStage.end_day} દિવસ)
              </p>
            </div>
          </div>
        </div>

        {/* Stage Description */}
        <p className="text-xs text-slate-700 leading-relaxed mb-4 p-3 bg-white rounded-xl border border-slate-200">
          {inspectedStage.description_gu}
        </p>

        {/* 4 Actionable Pillars for This Stage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Water tip */}
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-blue-950 mb-1">
              <Droplets className="w-4 h-4 text-blue-600" />
              <span>આ તબક્કે સિંચાઈ / પાણી સલાહ:</span>
            </div>
            <p className="text-blue-900 leading-relaxed">{inspectedStage.water_tip_gu}</p>
          </div>

          {/* Fertilizer tip */}
          <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-100 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-purple-950 mb-1">
              <FlaskConical className="w-4 h-4 text-purple-600" />
              <span>ખાતર વ્યવસ્થાપન શેડ્યૂલ:</span>
            </div>
            <p className="text-purple-900 leading-relaxed">{inspectedStage.fertilizer_tip_gu}</p>
          </div>

          {/* Pest watch */}
          <div className="p-3 bg-red-50/70 rounded-xl border border-red-100 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-red-950 mb-1">
              <Bug className="w-4 h-4 text-red-600" />
              <span>સંભવિત જીવાત / રોગ સાવચેતી:</span>
            </div>
            <p className="text-red-900 leading-relaxed">{inspectedStage.pest_watch_gu}</p>
          </div>

          {/* Field action */}
          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-950 mb-1">
              <Wrench className="w-4 h-4 text-emerald-700" />
              <span>ખેતરમાં તાત્કાલિક કરવા જેવી કામગીરી:</span>
            </div>
            <p className="text-emerald-900 leading-relaxed">{inspectedStage.field_action_gu}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

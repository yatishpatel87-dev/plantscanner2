import React, { useState, useMemo } from 'react';
import { 
  Bell, CheckCircle2, AlertCircle, Clock, Calendar, 
  FlaskConical, Check, ChevronDown, ChevronUp, MessageSquare, 
  AlertTriangle, Sparkles, ShieldAlert, ArrowRight
} from 'lucide-react';
import { FertilizerDoseInfo, CropFertilizerPlan } from '../types/plant';
import { getCropFertilizerPlan } from '../data/fertilizerScheduleData';
import { storageService } from '../services/storageService';

interface FertilizerReminderCardProps {
  cropName: string;
  sowingDate: string;
  onAskChatAboutFertilizer?: (cropName: string, doseTitle: string, fertilizerList: string[]) => void;
  compact?: boolean;
}

export const FertilizerReminderCard: React.FC<FertilizerReminderCardProps> = ({
  cropName,
  sowingDate,
  onAskChatAboutFertilizer,
  compact = false
}) => {
  const [appliedDoses, setAppliedDoses] = useState<Record<string, string>>(() => 
    storageService.getAppliedFertilizerDoses()
  );
  const [isExpanded, setIsExpanded] = useState<boolean>(!compact);
  const [selectedDoseId, setSelectedDoseId] = useState<string | null>(null);

  // Get fertilizer plan for current crop
  const plan: CropFertilizerPlan = useMemo(() => {
    return getCropFertilizerPlan(cropName || 'કપાસ');
  }, [cropName]);

  // Calculate days elapsed and target dates
  const { daysElapsed, dosesWithDates, activeAlertDose, nextUpcomingDose } = useMemo(() => {
    const today = new Date();
    const planting = new Date(sowingDate || '2026-06-15');

    let diffDays = 45;
    if (!isNaN(planting.getTime())) {
      const diffTime = today.getTime() - planting.getTime();
      diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    }

    const calculated = plan.doses.map((dose) => {
      const targetDate = new Date(planting);
      targetDate.setDate(targetDate.getDate() + dose.target_day);

      const daysDiff = dose.target_day - diffDays;
      const isCompleted = Boolean(appliedDoses[dose.id]);

      let status: 'due_now' | 'upcoming' | 'completed' | 'overdue' | 'future' = 'future';

      if (isCompleted) {
        status = 'completed';
      } else if (diffDays >= dose.target_day && diffDays <= dose.target_day + 7) {
        status = 'due_now';
      } else if (diffDays > dose.target_day + 7) {
        status = 'overdue';
      } else if (daysDiff > 0 && daysDiff <= 14) {
        status = 'upcoming';
      }

      return {
        ...dose,
        targetDate,
        targetDateFormatted: targetDate.toLocaleDateString('gu-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        daysDiff,
        status,
        isCompleted
      };
    });

    // Determine highest priority dose to alert
    const alertDose = calculated.find(d => d.status === 'due_now' || d.status === 'overdue');
    const upcomingDose = calculated.find(d => d.status === 'upcoming');

    return {
      daysElapsed: diffDays,
      dosesWithDates: calculated,
      activeAlertDose: alertDose,
      nextUpcomingDose: upcomingDose
    };
  }, [plan, sowingDate, appliedDoses]);

  const handleToggleApplied = (doseId: string) => {
    const updated = storageService.toggleFertilizerDoseApplied(doseId);
    setAppliedDoses({ ...updated });
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-emerald-100 transition-all">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-lg shadow-sm">
            <FlaskConical className="w-6 h-6 text-purple-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-purple-900 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                ખાતર રીમાઇન્ડર અને શેડ્યૂલ
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500 font-medium">
                {plan.crop_name_gu}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              સંતુલિત પોષણ વ્યવસ્થાપન કેલેન્ડર
            </h3>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors"
        >
          <span>{isExpanded ? 'ટૂંકમાં જુઓ' : 'સંપૂર્ણ શેડ્યૂલ જુઓ'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Primary Alert Notification Banner (Due Now / Overdue / Upcoming) */}
      {activeAlertDose ? (
        <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-4 mb-4 text-amber-950 flex flex-wrap items-start justify-between gap-3 animate-fade-in shadow-xs">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-600 text-white">
                  {activeAlertDose.status === 'due_now' ? '🔔 આજે જ આપવાનો સમય!' : '⚠️ વિલંબિત ખાતર હપ્તો'}
                </span>
                <span className="text-xs text-amber-900 font-semibold">
                  (વાવણીનો {activeAlertDose.target_day}મો દિવસ · તારીખ: {activeAlertDose.targetDateFormatted})
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1">
                {activeAlertDose.title_gu}
              </h4>
              <p className="text-xs text-slate-700 mt-0.5">
                <strong>ભલામણ કરેલ ખાતરો: </strong>
                {activeAlertDose.fertilizers_gu.join(', ')}
              </p>
              <p className="text-[11px] text-amber-900/90 mt-1 leading-relaxed">
                💡 {activeAlertDose.why_important_gu}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0">
            <button
              onClick={() => handleToggleApplied(activeAlertDose.id)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>આપી દીધું (Mark Done)</span>
            </button>

            {onAskChatAboutFertilizer && (
              <button
                onClick={() => onAskChatAboutFertilizer(plan.crop_name_gu, activeAlertDose.title_gu, activeAlertDose.fertilizers_gu)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 transition-colors flex items-center gap-1"
                title="AI ને પૂછો"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden sm:inline">પૂછો</span>
              </button>
            )}
          </div>
        </div>
      ) : nextUpcomingDose ? (
        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 mb-4 text-blue-950 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-blue-700 flex items-center gap-1.5">
                <span>📅 આગામી ખાતર શેડ્યૂલ:</span>
                <span>{nextUpcomingDose.daysDiff} દિવસ બાકી ({nextUpcomingDose.targetDateFormatted})</span>
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                {nextUpcomingDose.title_gu}: {nextUpcomingDose.fertilizers_gu.join(', ')}
              </h5>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(true)}
            className="text-xs text-blue-800 font-bold hover:underline shrink-0 flex items-center gap-0.5"
          >
            <span>વિગતો</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-3.5 mb-4 text-emerald-950 flex items-center gap-2.5 text-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>આપના પાકના તમામ નિર્ધારિત ખાતર હપ્તાઓ સમયસર અપડેટ થયેલા છે.</span>
        </div>
      )}

      {/* Detailed Full Season Fertilizer Schedule (Timeline of Doses) */}
      {isExpanded && (
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between text-xs text-slate-600 font-semibold mb-1">
            <span>પાક વાવણી ({new Date(sowingDate).toLocaleDateString('gu-IN')}) મુજબ ખાતર કેલેન્ડર:</span>
            <span>પાકની ઉંમર: {daysElapsed} દિવસ</span>
          </div>

          <div className="space-y-3">
            {dosesWithDates.map((dose) => {
              const isSelected = selectedDoseId === dose.id;
              const isDone = dose.isCompleted;

              return (
                <div
                  key={dose.id}
                  className={`rounded-2xl border transition-all p-4 ${
                    isDone
                      ? 'bg-slate-50/80 border-slate-200 opacity-90'
                      : dose.status === 'due_now'
                      ? 'bg-amber-50/60 border-amber-300 shadow-sm'
                      : dose.status === 'overdue'
                      ? 'bg-red-50/60 border-red-200'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  {/* Dose Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : dose.status === 'due_now'
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {isDone ? <Check className="w-4 h-4" /> : `#${dose.dose_number}`}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-xs sm:text-sm font-bold truncate ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                            {dose.title_gu}
                          </h4>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            isDone
                              ? 'bg-emerald-100 text-emerald-800'
                              : dose.status === 'due_now'
                              ? 'bg-amber-100 text-amber-900 font-bold animate-pulse'
                              : dose.status === 'overdue'
                              ? 'bg-red-100 text-red-900 font-bold'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {isDone
                              ? '✓ આપી દીધું'
                              : dose.status === 'due_now'
                              ? 'હમણાં આપો'
                              : dose.status === 'overdue'
                              ? 'વિલંબિત'
                              : `${dose.daysDiff} દિવસ બાકી`}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>વાવણીનો {dose.target_day}મો દિવસ</span>
                          <span>·</span>
                          <span className="font-mono text-emerald-800 font-medium">
                            તારીખ: {dose.targetDateFormatted}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleApplied(dose.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                          isDone
                            ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                        }`}
                      >
                        {isDone ? 'રદ કરો' : '✓ આપી દીધું'}
                      </button>

                      <button
                        onClick={() => setSelectedDoseId(isSelected ? null : dose.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                        title="વિગત જુઓ"
                      >
                        {isSelected ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Fertilizer Badges List */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {dose.fertilizers_gu.map((fName, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-xs bg-purple-50 text-purple-900 border border-purple-200/80 px-2.5 py-0.5 rounded-lg font-medium"
                      >
                        {fName}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Details for this Dose */}
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700 animate-fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="p-2.5 bg-slate-50 rounded-xl">
                          <span className="font-bold text-slate-800 block">આપવાની પદ્ધતિ:</span>
                          <span className="text-slate-600">{dose.method_gu}</span>
                        </div>
                        <div className="p-2.5 bg-slate-50 rounded-xl">
                          <span className="font-bold text-slate-800 block">સામાન્ય માત્રા (પ્રમાણ):</span>
                          <span className="text-slate-600">{dose.quantity_hint_gu}</span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-purple-50/60 border border-purple-100 rounded-xl">
                        <span className="font-bold text-purple-950 block">શા માટે જરૂરી છે?</span>
                        <p className="text-purple-900 mt-0.5 leading-relaxed">{dose.why_important_gu}</p>
                      </div>

                      <div className="p-2.5 bg-amber-50/60 border border-amber-100 rounded-xl flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-950 block">સાવચેતી:</span>
                          <p className="text-amber-900 leading-relaxed">{dose.safety_note_gu}</p>
                        </div>
                      </div>

                      {onAskChatAboutFertilizer && (
                        <div className="pt-1 flex justify-end">
                          <button
                            onClick={() => onAskChatAboutFertilizer(plan.crop_name_gu, dose.title_gu, dose.fertilizers_gu)}
                            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                            <span>આ ખાતર વિશે AI કૃષિ મિત્રને પૂછો</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Soil Health Card & Safety Footnote */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed">
        <ShieldAlert className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <p>
          <strong>મહત્વની સૂચના:</strong> આ ખાતર શેડ્યૂલ ગુજરાત કૃષિ યુનિવર્સિટીઓની સ્ટાન્ડર્ડ પેકેજ ઓફ પ્રેક્ટિસિસ પર આધારિત છે. વાસ્તવિક જથ્થા માટે આપના ખેતરના <strong>Soil Health Card</strong> અને જમીન ચકાસણી મુજબ જ ખાતર આપવું.
        </p>
      </div>
    </div>
  );
};

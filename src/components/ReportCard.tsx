import React, { useState } from 'react';
import { 
  CheckCircle, AlertTriangle, AlertOctagon, Droplets, FlaskConical, 
  ShieldCheck, AlertCircle, Share2, ArrowLeft, MessageSquare, 
  HelpCircle, UserCheck, Sparkles, Check, XCircle
} from 'lucide-react';
import { PlantDiagnosisResult } from '../types/plant';

interface ReportCardProps {
  report: PlantDiagnosisResult;
  onBackToScan: () => void;
  onAskChatAboutPlant: (plantName: string, issue: string) => void;
  onShareReport?: () => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  report,
  onBackToScan,
  onAskChatAboutPlant
}) => {
  const [copiedToast, setCopiedToast] = useState(false);
  const [activeReportSection, setActiveReportSection] = useState<'all' | 'disease' | 'nutrients' | 'water' | 'treatment'>('all');

  const getStatusBadge = () => {
    switch (report.health_status) {
      case 'healthy':
        return {
          icon: CheckCircle,
          label: '🟢 સ્વસ્થ પાક (Healthy)',
          color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          desc: 'છોડમાં કોઈ ગંભીર રોગ કે જીવાતની હાજરી જણાતી નથી.'
        };
      case 'attention':
        return {
          icon: AlertTriangle,
          label: '🟡 ધ્યાન આપવાની જરૂર (Needs Attention)',
          color: 'bg-amber-100 text-amber-800 border-amber-300',
          desc: 'પ્રારંભિક લક્ષણો દેખાઈ રહ્યા છે; સમયસર પગલાં લેવાથી નુકસાન અટકશે.'
        };
      case 'critical':
      default:
        return {
          icon: AlertOctagon,
          label: '🔴 તાત્કાલિક તપાસ જરૂરી (Critical / Immediate Action)',
          color: 'bg-red-100 text-red-800 border-red-300',
          desc: 'તીવ્ર ચેપ અથવા રોગના લક્ષણ છે; તાત્કાલિક નિયંત્રણના પગલાં લો.'
        };
    }
  };

  const getConfidenceBadge = () => {
    switch (report.confidence) {
      case 'high':
        return { text: 'ઉચ્ચ ચોકસાઈ (High Confidence)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
      case 'medium':
        return { text: 'મધ્યમ ચોકસાઈ (Medium Confidence)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
      case 'low':
      default:
        return { text: 'ઓછી ચોકસાઈ (Low Confidence - વધુ સ્પષ્ટ ફોટો લો)', color: 'text-red-700 bg-red-50 border-red-200' };
    }
  };

  const status = getStatusBadge();
  const confidence = getConfidenceBadge();
  const StatusIcon = status.icon;

  const handleShare = () => {
    const textToShare = `🌱 પાક રિપોર્ટ: ${report.plant_name_gu}\nસ્થિતિ: ${status.label}\nસમસ્યા: ${report.possible_disease}\nસંભાળ: ${report.care_recommendation}`;
    if (navigator.share) {
      navigator.share({
        title: `AI Plant Doctor રિપોર્ટ: ${report.plant_name_gu}`,
        text: textToShare
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(textToShare);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 sm:py-6 pb-24">
      {/* Top back & actions bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBackToScan}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ફરી નવો ફોટો સ્કેન કરો</span>
        </button>

        <div className="flex items-center gap-2">
          {report.is_demo && (
            <span className="text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
              ડેમો નમૂનો
            </span>
          )}
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm transition-colors"
            title="રિપોર્ટ શેર કરો અથવા કોપી કરો"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>{copiedToast ? 'કોપી થઈ ગયું!' : 'શેર કરો'}</span>
          </button>
        </div>
      </div>

      {/* Main Hero Diagnostic Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden mb-5">
        <div className="sm:flex">
          {/* Photo Preview Container */}
          <div className="sm:w-2/5 relative bg-emerald-950/80 aspect-square sm:aspect-auto">
            <img
              src={report.image_url}
              alt={report.plant_name_gu}
              className="w-full h-full object-cover"
            />
            {report.secondary_image_url && (
              <div className="absolute bottom-2 right-2 w-14 h-14 rounded-lg overflow-hidden border-2 border-white shadow-md">
                <img
                  src={report.secondary_image_url}
                  alt="Secondary shot"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Core Identification Details */}
          <div className="p-4 sm:p-6 sm:w-3/5 flex flex-col justify-between">
            <div>
              {/* Category & Confidence */}
              <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
                <span className="text-slate-500 font-medium">{report.crop_category}</span>
                <span className="text-slate-300">·</span>
                <span className={`px-2 py-0.5 rounded-md font-semibold border ${confidence.color}`}>
                  {confidence.text}
                </span>
              </div>

              {/* Plant Names */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {report.plant_name_gu}
              </h2>
              <div className="text-xs text-slate-500 italic mt-0.5 mb-3">
                <span>{report.plant_name_en}</span> · <span className="font-serif">{report.scientific_name}</span>
              </div>

              {/* Health Status Callout */}
              <div className={`p-3 rounded-2xl border ${status.color} mb-3`}>
                <div className="flex items-center gap-2">
                  <StatusIcon className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-bold">{status.label}</span>
                </div>
                <p className="text-xs mt-1 leading-relaxed opacity-90">{status.desc}</p>
              </div>

              {/* Growth Stage */}
              <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="font-semibold text-emerald-900">વૃદ્ધિનો તબક્કો: </span>
                <span>{report.growth_stage}</span>
              </div>
            </div>

            {/* Quick Action to Chat */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onAskChatAboutPlant(report.plant_name_gu, report.possible_disease)}
                className="w-full py-2 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                <span>કૃષિ મિત્ર સાથે ચર્ચા કરો</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-4 scrollbar-none">
        <button
          onClick={() => setActiveReportSection('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
            activeReportSection === 'all'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          સંપૂર્ણ રિપોર્ટ
        </button>
        <button
          onClick={() => setActiveReportSection('disease')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
            activeReportSection === 'disease'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          🐛 રોગ & જીવાત
        </button>
        <button
          onClick={() => setActiveReportSection('nutrients')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
            activeReportSection === 'nutrients'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          🧪 પોષક તત્વો & ખાતર
        </button>
        <button
          onClick={() => setActiveReportSection('water')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
            activeReportSection === 'water'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          💧 પાણી & સિંચાઈ
        </button>
        <button
          onClick={() => setActiveReportSection('treatment')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
            activeReportSection === 'treatment'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          🧴 સારવાર & IPM
        </button>
      </div>

      <div className="space-y-4">
        {/* Visible Symptoms Card */}
        {(activeReportSection === 'all' || activeReportSection === 'disease') && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-100">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>ફોટામાં દેખાતા લક્ષણો (Visible Symptoms):</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {report.visible_symptoms.map((sym, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 text-xs text-slate-700">
                  <span className="font-bold text-emerald-700">✓</span>
                  <span>{sym}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pest & Disease Detection Details */}
        {(activeReportSection === 'all' || activeReportSection === 'disease') && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-100">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span>સંભવિત રોગ અને જીવાત (Pest & Disease Detection):</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-red-50/70 border border-red-200">
                <span className="text-xs font-bold text-red-950 block">સંભવિત રોગ / ફૂગ:</span>
                <p className="text-xs text-red-900 mt-0.5 leading-relaxed font-medium">
                  {report.possible_disease}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                <span className="text-xs font-bold text-amber-950 block">સંભવિત જીવાત (Pests):</span>
                <p className="text-xs text-amber-900 mt-0.5 leading-relaxed font-medium">
                  {report.possible_pest}
                </p>
              </div>

              {/* Dos and Don'ts */}
              {report.dos_and_donts && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5 mb-1.5">
                      <Check className="w-4 h-4 text-emerald-700" />
                      <span>શું કરવું (Do's):</span>
                    </span>
                    <ul className="text-xs text-emerald-900 space-y-1">
                      {report.dos_and_donts.dos.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200">
                    <span className="text-xs font-bold text-rose-950 flex items-center gap-1.5 mb-1.5">
                      <XCircle className="w-4 h-4 text-rose-700" />
                      <span>શું ન કરવું (Don'ts):</span>
                    </span>
                    <ul className="text-xs text-rose-900 space-y-1">
                      {report.dos_and_donts.donts.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Nutrient & Fertilizer Guidance */}
        {(activeReportSection === 'all' || activeReportSection === 'nutrients') && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-100">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-purple-700" />
              <span>પોષક તત્વો અને ખાતર માર્ગદર્શન (Nutrient Guidance):</span>
            </h3>

            <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200 mb-3">
              <span className="text-xs font-bold text-purple-950 block">સંભવિત ઉણપ:</span>
              <p className="text-xs text-purple-900 mt-0.5 leading-relaxed font-medium">
                {report.possible_nutrient_deficiency}
              </p>
            </div>

            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>નિયમ:</strong> AI માત્ર ફોટા પરથી ખાતરની ચોક્કસ માત્રા નક્કી કરતું નથી. ખાતર આપતા પહેલા જમીન ચકાસણી (Soil Health Card) કરાવો અને પાકની ઉંમર તથા સ્થાનિક ભલામણ ધ્યાને લો.
              </p>
            </div>
          </div>
        )}

        {/* Water Management */}
        {(activeReportSection === 'all' || activeReportSection === 'water') && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-100">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-600" />
              <span>પાણી અને સિંચાઈ વ્યવસ્થાપન (Water Management):</span>
            </h3>

            <p className="text-xs text-slate-700 leading-relaxed p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              {report.water_guidance}
            </p>

            <div className="mt-2.5 text-[11px] text-slate-500 italic">
              * સલાહ: પાણી આપતા પહેલા છોડના મૂળ પાસે 2 ઇંચ જમીન ખોદીને હાથમાં ભેજ અનુભવવો. જો માટીનો લાડવો વળે તો હાલ પાણીની જરૂર નથી.
            </div>
          </div>
        )}

        {/* Treatment & Care Guidance (IPM First) */}
        {(activeReportSection === 'all' || activeReportSection === 'treatment') && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-100">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>સંભાળ અને સારવાર માર્ગદર્શન (IPM & Care):</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-800 block">ખેતરની સામાન્ય સંભાળ:</span>
                <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                  {report.care_recommendation}
                </p>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
                <span className="text-xs font-bold text-emerald-950 block">
                  🛡️ IPM અને જૈવિક ઉપાયો (પ્રાથમિકતા):
                </span>
                <p className="text-xs text-emerald-900 mt-0.5 leading-relaxed font-medium">
                  {report.treatment_guidance}
                </p>
              </div>

              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-950">
                <span className="font-bold block mb-1">⚠️ જંતુનાશક દવાઓ વાપરતી વખતે ખાસ સાવચેતી:</span>
                <ul className="list-disc list-inside space-y-0.5 text-rose-900 text-[11px]">
                  <li>મોં પર માસ્ક, ચશ્મા અને રબરના મોજાં (PPE) અવશ્ય પહેરો.</li>
                  <li>દવાઓને ઘરના બાળકો અને પશુઓના ઘાસચારાથી હંમેશા દૂર રાખો.</li>
                  <li>શાકભાજી કે ફળ તોડવાના દિવસો દરમિયાન લેબલ મુજબનો waiting period (કાપણી અંતરાલ) જાળવો.</li>
                  <li>ક્યારેય અનુમાનથી બે કે તેથી વધુ દવાઓ ભેગી (Cocktail) ન કરો.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* When to consult expert */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-amber-950">
                કૃષિ નિષ્ણાત અથવા KVK ને ક્યારે બતાવવું?
              </h4>
              <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                {report.when_to_consult_expert}
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Safety Disclaimer */}
        <div className="bg-slate-100 rounded-2xl p-3.5 text-center text-[11px] text-slate-600 leading-relaxed border border-slate-200">
          <p>{report.warning}</p>
        </div>
      </div>
    </div>
  );
};

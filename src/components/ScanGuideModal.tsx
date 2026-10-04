import React from 'react';
import { X, Sun, ZoomIn, FlipHorizontal, Trees, CheckCircle2, AlertCircle } from 'lucide-react';

interface ScanGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartScan: () => void;
}

export const ScanGuideModal: React.FC<ScanGuideModalProps> = ({
  isOpen,
  onClose,
  onStartScan
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      icon: Sun,
      title_gu: '૧. પૂરતો કુદરતી પ્રકાશ રાખો',
      desc_gu: 'તડકામાં સીધો અતિશય ચમકારો કે ગાઢ પડછાયો ન પડે તે રીતે દિવસના અજવાળામાં ફોટો લો. ફ્લેશ કરતાં કુદરતી પ્રકાશ વધુ સારો છે.'
    },
    {
      icon: ZoomIn,
      title_gu: '૨. પાનનો Close-up ફોટો લો',
      desc_gu: 'જે પાન પર ડાઘ, પીળાશ કે કાણાં હોય તેનો સ્પષ્ટ અને નજીકથી (Close-up) ફોટો લો જેથી AI ફૂગ કે રોગના લક્ષણ બરાબર પકડી શકે.'
    },
    {
      icon: FlipHorizontal,
      title_gu: '૩. પાનની આગળ અને પાછળની બાજુ',
      desc_gu: 'મોટાભાગની ચુસિયા જીવાતો (સફેદ માખી, થ્રીપ્સ, કથીરી) પાનની નીચે છુપાયેલી હોય છે. શક્ય હોય તો પાન ઉલટાવીને પણ ફોટો લો.'
    },
    {
      icon: Trees,
      title_gu: '૪. આખા છોડનો પણ એક ફોટો લો',
      desc_gu: 'છોડનો વિકાસ અટકી ગયો છે કે આખો છોડ સુકાય છે તે સમજવા માટે એક ફોટો સમગ્ર છોડનો પણ અપલોડ કરો.'
    },
    {
      icon: CheckCircle2,
      title_gu: '૫. સ્વસ્થ અને અસરગ્રસ્ત બંને ભાગ',
      desc_gu: 'જો શક્ય હોય તો બાજુના તંદુરસ્ત પાન સાથે સરખામણી થાય તેવો ફોટો લો, જેથી AI ને તફાવત સમજવામાં સરળતા રહે.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-100 p-5 sm:p-6 text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              📸
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-emerald-950">
                સ્માર્ટ ફોટો સ્કેન માર્ગદર્શિકા
              </h2>
              <p className="text-xs text-slate-500">ચોક્કસ AI પરિણામ મેળવવા માટે ૫ સરળ નિયમો</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Steps List */}
        <div className="py-4 space-y-3.5">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50/50 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{st.title_gu}</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{st.desc_gu}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-900 mb-4">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            ધૂંધળા (Blur) અથવા દૂરથી લીધેલા ફોટામાં AI નો વિશ્વાસ સ્કોર ઓછો આવી શકે છે. પાન પર કેમેરા ફોકસ કરીને જ ફોટો લો.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            બંધ કરો
          </button>
          <button
            onClick={() => {
              onClose();
              onStartScan();
            }}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md transition-colors"
          >
            સમજાઈ ગયું – સ્કેન કરો
          </button>
        </div>
      </div>
    </div>
  );
};

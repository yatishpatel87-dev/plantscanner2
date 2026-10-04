import React, { useState } from 'react';
import { X, Database, Cpu, Layers, GitBranch, Table, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ML_ARCHITECTURE_DOCS } from '../data/mlArchitectureDocs';

interface MLArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MLArchitectureModal: React.FC<MLArchitectureModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'ml' | 'database'>('ml');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-100 p-5 sm:p-6 text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {ML_ARCHITECTURE_DOCS.title_gu}
              </h2>
              <p className="text-xs text-slate-500">{ML_ARCHITECTURE_DOCS.title_en}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 my-4 p-1 bg-slate-100 rounded-2xl">
          <button
            onClick={() => setActiveTab('ml')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'ml'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4 text-emerald-600" />
            <span>મશીન લર્નિંગ મોડેલ આર્કિટેક્ચર (ML Model Pipeline)</span>
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'database'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4 text-amber-600" />
            <span>ડેટાબેઝ ડિઝાઇન (PostgreSQL Schema)</span>
          </button>
        </div>

        {activeTab === 'ml' ? (
          /* ML Model Architecture Section */
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
              <span className="font-bold block mb-0.5">💡 વિઝન આર્કિટેક્ચર સમરી:</span>
              આ એપ્લિકેશન હાઇબ્રિડ એજ + ક્લાઉડ વિઝન પાઇપલાઇન પર આધારિત છે. મોબાઇલ બ્રાઉઝર ઓન-ડિવાઇસ પાક અને પાનનું પ્રી-પ્રોસેસિંગ કરે છે અને ગૂગલ જેમિની 2.5 ફ્લેશ વિઝન મલ્ટિમોડલ નેટવર્ક દ્વારા રોગ, જીવાત અને પોષક તત્વોની ઉણપનું ચોક્કસ વર્ગીકરણ કરે છે.
            </div>

            {/* Pipeline Stages */}
            <div className="space-y-2.5">
              {ML_ARCHITECTURE_DOCS.stages.map((st, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{st.step}</h4>
                    <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                      Stage {i + 1}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-1.5">{st.desc_gu}</p>
                  <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                    ટેકનોલોજી: {st.tech}
                  </div>
                </div>
              ))}
            </div>

            {/* Datasets */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-700" />
                <span>તાલીમ અને ફાઇન-ટ્યુનિંગ ડેટાસેટ્સ (Training Datasets):</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {ML_ARCHITECTURE_DOCS.datasets_gu.map((ds, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{ds}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          /* Database Design Section */
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 leading-relaxed">
              <span className="font-bold block mb-0.5">🗄️ PostgreSQL / Drizzle ORM રિલેશનલ સ્કીમા:</span>
              ખેડૂતોની પ્રોફાઇલ, પાકનું વાવેતર, સ્કેન વિશ્લેષણ હિસ્ટ્રી અને હવામાન લૉગ્સ સાચવવા માટે ડિઝાઇન કરેલ પ્રોડક્શન-ગ્રેડ સ્કીમા.
            </div>

            <div className="space-y-3">
              {ML_ARCHITECTURE_DOCS.database_tables.map((tbl, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Table className="w-4 h-4 text-emerald-700" />
                      <span className="font-mono text-xs sm:text-sm font-bold text-slate-900">
                        {tbl.table_name}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      PK: {tbl.primary_key}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">{tbl.desc_gu}</p>

                  {tbl.foreign_key && (
                    <div className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md mb-2 inline-block">
                      FK: {tbl.foreign_key}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {tbl.fields.map((f, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[10px] font-mono bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition-colors shadow-sm"
          >
            સમજાઈ ગયું
          </button>
        </div>
      </div>
    </div>
  );
};

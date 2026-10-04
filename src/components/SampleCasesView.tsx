import React from 'react';
import { Sprout, ExternalLink, ShieldCheck, AlertTriangle, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { SAMPLE_CASES } from '../data/sampleCases';
import { PlantDiagnosisResult } from '../types/plant';

interface SampleCasesViewProps {
  onSelectSample: (sample: PlantDiagnosisResult) => void;
}

export const SampleCasesView: React.FC<SampleCasesViewProps> = ({ onSelectSample }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 pb-24">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-emerald-950 flex items-center justify-center gap-2">
          <Sprout className="w-6 h-6 text-emerald-700" />
          <span>નમૂના પાક લાઇબ્રેરી (Demo Cases)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl mx-auto">
          ગુજરાતના મુખ્ય પાકોમાં થતા રોગ, જીવાત અને પોષક તત્વોની ઉણપના વાસ્તવિક AI નિદાન જોવા માટે કોઈપણ પાક પર ક્લિક કરો
        </p>
      </div>

      {/* Grid of 8 crops */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SAMPLE_CASES.map((sample) => {
          const isHealthy = sample.health_status === 'healthy';
          const isAttention = sample.health_status === 'attention';

          return (
            <div
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={sample.image_url}
                    alt={sample.plant_name_gu}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    {isHealthy ? (
                      <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full shadow-sm">
                        🟢 સ્વસ્થ
                      </span>
                    ) : isAttention ? (
                      <span className="text-[10px] font-bold bg-amber-600 text-white px-2 py-0.5 rounded-full shadow-sm">
                        🟡 ધ્યાન આપો
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full shadow-sm">
                        🔴 ગંભીર
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3.5 sm:p-4">
                  <span className="text-[11px] text-emerald-800 font-semibold block mb-0.5">
                    {sample.crop_category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                    {sample.plant_name_gu}
                  </h3>
                  <p className="text-xs text-slate-400 italic mb-2">
                    {sample.scientific_name}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="font-semibold text-slate-700 block">રોગ/સમસ્યા:</span>
                    <p className="text-slate-600 line-clamp-2 mt-0.5">
                      {sample.possible_disease}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="px-4 pb-4 pt-1">
                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-xl bg-emerald-50 group-hover:bg-emerald-800 text-emerald-900 group-hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>સંપૂર્ણ AI રિપોર્ટ જુઓ</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

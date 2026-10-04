import React, { useState } from 'react';
import { History, Trash2, ExternalLink, Calendar, Search, Filter } from 'lucide-react';
import { PlantDiagnosisResult, HealthStatus } from '../types/plant';

interface HistoryViewProps {
  scans: PlantDiagnosisResult[];
  onSelectScan: (scan: PlantDiagnosisResult) => void;
  onDeleteScan: (scanId: string) => void;
  onStartNewScan: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  scans,
  onSelectScan,
  onDeleteScan,
  onStartNewScan
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | HealthStatus>('all');

  const filteredScans = scans.filter((s) => {
    const matchesSearch =
      s.plant_name_gu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.plant_name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.possible_disease.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || s.health_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: HealthStatus) => {
    switch (status) {
      case 'healthy':
        return <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">🟢 સ્વસ્થ</span>;
      case 'attention':
        return <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">🟡 ધ્યાન આપો</span>;
      case 'critical':
      default:
        return <span className="text-[11px] font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded-full">🔴 તાત્કાલિક</span>;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 sm:py-6 pb-24">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-950 flex items-center gap-2">
            <History className="w-6 h-6 text-emerald-700" />
            <span>સ્કેન ઇતિહાસ (Scan History)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            આપના અગાઉના તમામ પાક નિદાન અને AI ભલામણો
          </p>
        </div>

        <button
          onClick={onStartNewScan}
          className="text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-3.5 py-2 rounded-xl shadow-sm transition-colors"
        >
          + નવો સ્કેન
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-3 shadow-sm border border-emerald-100 mb-4 space-y-2">
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="પાકનું નામ કે રોગ શોધો..."
            className="w-full bg-transparent text-xs text-slate-800 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              સાફ
            </button>
          )}
        </div>

        {/* Status filter chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none pt-1">
          <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" />
            <span>સ્થિતિ:</span>
          </span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
              statusFilter === 'all'
                ? 'bg-emerald-800 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            તમામ ({scans.length})
          </button>
          <button
            onClick={() => setStatusFilter('healthy')}
            className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
              statusFilter === 'healthy'
                ? 'bg-emerald-800 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            સ્વસ્થ
          </button>
          <button
            onClick={() => setStatusFilter('attention')}
            className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
              statusFilter === 'attention'
                ? 'bg-emerald-800 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ધ્યાન આપો
          </button>
          <button
            onClick={() => setStatusFilter('critical')}
            className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
              statusFilter === 'critical'
                ? 'bg-emerald-800 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            તાત્કાલિક
          </button>
        </div>
      </div>

      {/* Scans List */}
      {filteredScans.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">કોઈ સ્કેન મળ્યા નથી</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            આપે હજુ સુધી કોઈ છોડ સ્કેન કર્યો નથી અથવા આપેલા ફિલ્ટરમાં કોઈ પરિણામ મળ્યું નથી.
          </p>
          <button
            onClick={onStartNewScan}
            className="mt-4 px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold shadow-sm hover:bg-emerald-900 transition-colors"
          >
            છોડ સ્કેન કરો
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredScans.map((scan) => (
            <div
              key={scan.id}
              className="bg-white rounded-2xl p-3.5 shadow-sm border border-emerald-100 hover:border-emerald-300 transition-all flex items-center justify-between gap-3 group"
            >
              {/* Thumbnail */}
              <div
                onClick={() => onSelectScan(scan)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 cursor-pointer"
              >
                <img
                  src={scan.image_url}
                  alt={scan.plant_name_gu}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Info */}
              <div
                onClick={() => onSelectScan(scan)}
                className="flex-1 min-w-0 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  {getStatusBadge(scan.health_status)}
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(scan.timestamp).toLocaleDateString('gu-IN')}</span>
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                  {scan.plant_name_gu}
                </h4>

                <p className="text-xs text-slate-600 truncate mt-0.5">
                  <span className="font-semibold text-slate-700">સમસ્યા: </span>
                  <span>{scan.possible_disease}</span>
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => onSelectScan(scan)}
                  className="p-2 rounded-xl text-emerald-800 hover:bg-emerald-50 transition-colors"
                  title="રિપોર્ટ જુઓ"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteScan(scan.id);
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="ડિલીટ કરો"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

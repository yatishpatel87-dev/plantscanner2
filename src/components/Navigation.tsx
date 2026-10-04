import React from 'react';
import { Home, Camera, CloudSun, MessageSquare, History, UserCheck, Sprout } from 'lucide-react';

export type TabType = 'home' | 'scan' | 'weather' | 'chat' | 'history' | 'profile' | 'samples';

interface NavigationProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  scansCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  scansCount
}) => {
  return (
    <>
      {/* Desktop / Tablet Top Tabs Bar */}
      <nav className="bg-emerald-950 border-b border-emerald-900 hidden md:block">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-1.5 scrollbar-none">
            <button
              onClick={() => onSelectTab('home')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'home'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-900/60'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>હોમ</span>
            </button>

            <button
              onClick={() => onSelectTab('scan')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'scan'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-900/60'
              }`}
            >
              <Camera className="w-4 h-4 text-emerald-300" />
              <span>છોડ સ્કેન કરો</span>
            </button>

            <button
              onClick={() => onSelectTab('samples')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'samples'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-900/60'
              }`}
            >
              <Sprout className="w-4 h-4 text-amber-300" />
              <span>નમૂના પાક (Demo)</span>
            </button>

            <button
              onClick={() => onSelectTab('weather')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'weather'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-900/60'
              }`}
            >
              <CloudSun className="w-4 h-4 text-amber-300" />
              <span>હવામાન & સલાહ</span>
            </button>

            <button
              onClick={() => onSelectTab('chat')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'chat'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-900/60'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-teal-300" />
              <span>કૃષિ મિત્ર (AI Chat)</span>
            </button>

            <button
              onClick={() => onSelectTab('history')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-900/60'
              }`}
            >
              <History className="w-4 h-4" />
              <span>ઇતિહાસ ({scansCount})</span>
            </button>

            <button
              onClick={() => onSelectTab('profile')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-900/60'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>મારી ખેતી</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fixed Bottom Navigation Bar (Thumb ergonomic zone) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-emerald-950/95 backdrop-blur-md border-t border-emerald-100 dark:border-emerald-900 md:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
        <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-2">
          <button
            onClick={() => onSelectTab('home')}
            className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
              activeTab === 'home' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[11px] leading-tight">હોમ</span>
          </button>

          <button
            onClick={() => onSelectTab('weather')}
            className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
              activeTab === 'weather' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <CloudSun className="w-5 h-5 mb-0.5 text-amber-500" />
            <span className="text-[11px] leading-tight">હવામાન</span>
          </button>

          {/* Centered Large Scan CTA Button */}
          <button
            onClick={() => onSelectTab('scan')}
            className="flex flex-col items-center justify-center relative -top-3"
            title="છોડ સ્કેન કરો"
          >
            <div className={`w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
              activeTab === 'scan'
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-200'
                : 'bg-emerald-700 text-white ring-2 ring-emerald-500'
            }`}>
              <Camera className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 mt-0.5">સ્કેન કરો</span>
          </button>

          <button
            onClick={() => onSelectTab('chat')}
            className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
              activeTab === 'chat' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-5 h-5 mb-0.5 text-teal-600" />
            <span className="text-[11px] leading-tight">કૃષિ મિત્ર</span>
          </button>

          <button
            onClick={() => onSelectTab('history')}
            className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
              activeTab === 'history' || activeTab === 'profile' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <History className="w-5 h-5 mb-0.5" />
            <span className="text-[11px] leading-tight">ઇતિહાસ</span>
          </button>
        </div>
      </nav>
    </>
  );
};

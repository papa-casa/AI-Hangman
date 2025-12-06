import React, { useState } from 'react';
import { GameMode, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface GameControlsProps {
  onStartClassic: () => void;
  onStartAI: (topic: string) => void;
  isLoading: boolean;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const GameControls: React.FC<GameControlsProps> = ({ 
  onStartClassic, 
  onStartAI, 
  isLoading,
  language,
  onLanguageChange
}) => {
  const [topic, setTopic] = useState('');
  const [mode, setMode] = useState<GameMode | null>(null);
  const t = TRANSLATIONS[language];

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onStartAI(topic);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4 glass-panel rounded-xl">
        <div className="w-12 h-12 border-t-2 border-r-2 border-cyan-400 rounded-full animate-spin"></div>
        <p className="text-cyan-400 font-mono tracking-widest animate-pulse">{t.loading}</p>
      </div>
    );
  }

  // Initial State: Choose Mode
  if (!mode) {
    return (
      <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto p-4">
        
        {/* Language Selector */}
        <div className="flex gap-2 p-2 bg-slate-900/60 backdrop-blur-md rounded-lg border border-slate-700/50 shadow-lg">
          {(['IT', 'EN', 'FR', 'ES', 'DE'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              className={`px-3 py-1.5 rounded-md font-bold text-xs transition-all duration-200
                ${language === lang 
                  ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(8,145,178,0.5)]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}
              `}
            >
              {lang}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 w-full">
          <button
            onClick={() => onStartClassic()}
            className="group relative glass-panel hover:bg-slate-800/40 p-6 rounded-xl transition-all duration-200 flex items-center gap-6 shadow-xl hover:shadow-cyan-900/10 hover:-translate-y-1"
          >
             <div className="bg-slate-900/80 p-4 rounded-lg text-2xl group-hover:scale-110 transition-transform text-slate-200 shadow-inner">🎲</div>
             <div className="text-left">
                <h3 className="text-slate-100 font-bold text-lg uppercase tracking-wider">{t.startClassic}</h3>
                <p className="text-slate-400 text-sm">{t.classicDesc}</p>
             </div>
          </button>

          <button
            onClick={() => setMode(GameMode.AI)}
            className="group relative glass-panel hover:bg-slate-800/40 p-6 rounded-xl transition-all duration-200 flex items-center gap-6 shadow-xl hover:shadow-cyan-900/10 hover:-translate-y-1"
          >
             <div className="bg-slate-900/80 p-4 rounded-lg text-2xl group-hover:scale-110 transition-transform text-cyan-400 shadow-inner">🧠</div>
             <div className="text-left">
                <h3 className="text-cyan-400 font-bold text-lg uppercase tracking-wider">{t.startAI}</h3>
                <p className="text-slate-400 text-sm">{t.aiDesc}</p>
             </div>
          </button>
        </div>
      </div>
    );
  }

  // AI Input State
  if (mode === GameMode.AI) {
    return (
      <div className="w-full max-w-md mx-auto p-8 glass-panel rounded-xl shadow-2xl">
        <h3 className="text-lg font-bold mb-6 text-slate-100 uppercase tracking-widest text-center">{t.aiDesc}</h3>
        <form onSubmit={handleAISubmit} className="flex flex-col gap-6">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t.inputPlaceholder}
            className="w-full bg-slate-900/80 border border-slate-600 focus:border-cyan-500 text-slate-100 px-4 py-4 rounded-lg outline-none transition-all placeholder:text-slate-600 font-mono focus:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            autoFocus
          />
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setMode(null)}
              className="flex-1 py-3 text-slate-400 hover:text-slate-200 font-semibold text-sm uppercase tracking-wider transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={!topic.trim()}
              className="flex-[2] bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold shadow-lg shadow-cyan-900/30 transition-all uppercase tracking-wider text-sm transform hover:-translate-y-0.5"
            >
              {t.start}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return null;
};
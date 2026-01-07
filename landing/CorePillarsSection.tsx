import React from 'react';
import { Server, Landmark, Flame, Check } from 'lucide-react';
import { Language } from '../i18n';

interface CorePillarsSectionProps {
  lang: Language;
  translations: any;
}

export const CorePillarsSection = ({ lang, translations }: CorePillarsSectionProps) => {
  const t = translations[lang].pillars;
  return (
    <div className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Pillar 1: Infrastructure */}
          <div className="group bg-slate-900/40 border border-slate-800 hover:border-indigo-500/50 p-8 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-indigo-900/20 rounded-lg flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Server size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t.p1.title}</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {t.p1.desc}
            </p>
            <ul className="space-y-3">
              {t.p1.items.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check size={16} className="text-indigo-500" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Pillar 2: RWA */}
          <div className="group bg-slate-900/40 border border-slate-800 hover:border-emerald-500/50 p-8 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-emerald-900/20 rounded-lg flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Landmark size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t.p2.title}</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {t.p2.desc}
            </p>
            <ul className="space-y-3">
              {t.p2.items.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check size={16} className="text-emerald-500" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Pillar 3: Traffic & Meme */}
          <div className="group bg-slate-900/40 border border-slate-800 hover:border-rose-500/50 p-8 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-rose-900/20 rounded-lg flex items-center justify-center text-rose-400 mb-6 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <Flame size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t.p3.title}</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {t.p3.desc}
            </p>
            <ul className="space-y-3">
              {t.p3.items.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check size={16} className="text-rose-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

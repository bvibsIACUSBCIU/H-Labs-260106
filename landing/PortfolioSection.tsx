import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { successCases } from '../constants';
import { Language } from '../i18n';

interface PortfolioSectionProps {
  lang: Language;
  translations: any;
}

export const PortfolioSection = ({ lang, translations }: PortfolioSectionProps) => {
  const t = translations[lang].portfolio;
  return (
    <div className="py-24 border-t border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{t.title}</h2>
            <p className="text-slate-500">{t.desc}</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-indigo-400 hover:text-white transition-colors mt-4 md:mt-0">
            {t.viewAll} <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {successCases.map((item, i) => (
            <div key={i} className="group relative bg-slate-900/50 border border-slate-800 p-5 rounded-lg overflow-hidden hover:border-slate-600 transition-colors">
              <div className="relative z-10">
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-3 bg-slate-800 text-slate-400 group-hover:bg-indigo-900/30 group-hover:text-indigo-400 transition-colors`}>
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                <p className="text-xs text-slate-500 mb-4 h-8 leading-snug">{item.desc}</p>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <TrendingUp size={14} className="text-green-500" />
                  <span className="text-sm font-mono font-bold text-white">{item.growth}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

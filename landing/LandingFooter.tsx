import React from 'react';
import { Language } from '../i18n';

interface LandingFooterProps {
  lang: Language;
  translations: any;
}

export const LandingFooter = ({ lang, translations }: LandingFooterProps) => {
  const t = translations[lang].footer;
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center text-slate-950 font-bold font-mono">H</div>
          <span className="text-slate-400 font-mono text-sm">{t.rights}</span>
        </div>
        <div className="flex gap-6 text-slate-500 text-sm">
          {t.links.map((link, i) => (
             <a key={i} href="#" className="hover:text-white transition-colors">{link}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

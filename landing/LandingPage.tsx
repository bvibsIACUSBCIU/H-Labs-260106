import React from 'react';
import { Language, translations } from '../i18n';
import { LandingHero } from './LandingHero';
import { CorePillarsSection } from './CorePillarsSection';
import { CustodySection } from './CustodySection';
import { MediaMatrixSection } from './MediaMatrixSection';
import { PortfolioSection } from './PortfolioSection';
import { PartnersSection } from './PartnersSection';
import { LandingFooter } from './LandingFooter';

interface LandingPageProps {
  onEnter: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const LandingPage = ({ onEnter, lang, setLang }: LandingPageProps) => {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-700">
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-sm flex items-center justify-center text-white font-bold font-mono shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            H
          </div>
          <span className="font-bold text-lg tracking-tight">H Labs</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">{translations[lang].nav.services}</a>
            <a href="#" className="hover:text-white transition-colors">{translations[lang].nav.cases}</a>
          </div>
          
          {/* Language Switcher */}
          <div className="flex items-center gap-2 text-xs font-mono border border-slate-800 rounded px-2 py-1">
            <button onClick={() => setLang('en')} className={`${lang === 'en' ? 'text-white font-bold' : 'text-slate-500 hover:text-slate-300'}`}>EN</button>
            <span className="text-slate-700">|</span>
            <button onClick={() => setLang('zh')} className={`${lang === 'zh' ? 'text-white font-bold' : 'text-slate-500 hover:text-slate-300'}`}>中文</button>
          </div>

          <button onClick={onEnter} className="text-sm font-medium text-white hover:text-indigo-400 transition-colors">
            {translations[lang].nav.login}
          </button>
        </div>
      </nav>

      <LandingHero onEnter={onEnter} lang={lang} translations={translations} />
      <CorePillarsSection lang={lang} translations={translations} />
      <CustodySection lang={lang} translations={translations} />
      <MediaMatrixSection lang={lang} translations={translations} />
      <PortfolioSection lang={lang} translations={translations} />
      <PartnersSection lang={lang} translations={translations} />
      <LandingFooter lang={lang} translations={translations} />
    </div>
  );
};

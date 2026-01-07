import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { strategicPartners } from '../constants';
import { Language } from '../i18n';

interface PartnersSectionProps {
  lang: Language;
  translations: any;
}

export const PartnersSection = ({ lang, translations }: PartnersSectionProps) => {
  const t = translations[lang].partners;
  return (
    <div className="py-24 border-t border-slate-900 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-indigo-500 font-bold mb-2">{t.subtitle}</h3>
        <h2 className="text-3xl font-bold text-white mb-4">{t.title}</h2>
        <p className="text-slate-400 mb-12">{t.desc}</p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
          {strategicPartners.map((partner, i) => (
            <div key={i} className="group cursor-default">
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="h-8 md:h-10 w-auto object-contain transition-all duration-300"
                style={{ filter: 'brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(85%)' }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = 'none')}
                onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(85%)')}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('span');
                  fallback.className = 'text-lg font-bold transition-colors';
                  fallback.style.color = '#9ca3af';
                  fallback.textContent = partner.name;
                  fallback.onmouseenter = () => fallback.style.color = '#ffffff';
                  fallback.onmouseleave = () => fallback.style.color = '#9ca3af';
                  target.parentElement?.appendChild(fallback);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

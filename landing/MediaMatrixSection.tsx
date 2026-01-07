import React from 'react';
import { Twitter, Mic2, Presentation } from 'lucide-react';
import { mediaPartners } from '../constants';
import { Language } from '../i18n';

interface MediaMatrixSectionProps {
  lang: Language;
  translations: any;
}

export const MediaMatrixSection = ({ lang, translations }: MediaMatrixSectionProps) => {
  const t = translations[lang].media;
  return (
    <div className="py-24 bg-[#030818] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto bg-slate-900/50 py-2 px-4 rounded-full border border-slate-800">
            {t.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Twitter Ops */}
          <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-lg hover:border-sky-500/30 transition-all">
            <div className="w-12 h-12 bg-sky-900/20 rounded-full flex items-center justify-center text-sky-400 mb-6">
              <Twitter size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t.s1.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t.s1.desc}</p>
          </div>

          {/* Space / AMA */}
          <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-lg hover:border-purple-500/30 transition-all">
            <div className="w-12 h-12 bg-purple-900/20 rounded-full flex items-center justify-center text-purple-400 mb-6">
              <Mic2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t.s2.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t.s2.desc}</p>
          </div>

          {/* Roadshows */}
          <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-lg hover:border-amber-500/30 transition-all">
            <div className="w-12 h-12 bg-amber-900/20 rounded-full flex items-center justify-center text-amber-400 mb-6">
              <Presentation size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t.s3.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t.s3.desc}</p>
          </div>
        </div>

        {/* Media Partners Logos */}
        <div className="text-center">
           <h4 className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-8">{t.mediaPartners}</h4>
           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
            {mediaPartners.map((media, i) => (
              <div key={i} className="group cursor-default">
                <img 
                  src={media.logo} 
                  alt={media.name}
                  className="h-8 md:h-10 w-auto object-contain transition-all duration-300"
                  style={{ filter: 'brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(85%)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = 'none')}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(85%)')}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('span');
                    fallback.className = 'text-lg font-bold text-slate-400 group-hover:text-white transition-colors';
                    fallback.textContent = media.name;
                    target.parentElement?.appendChild(fallback);
                  }}
                />
              </div>
            ))}
           </div>
        </div>
      </div>
    </div>
  );
};

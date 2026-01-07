import React from 'react';
import { ArrowRight, Rocket } from 'lucide-react';
import { Language } from '../i18n';

interface LandingHeroProps {
  onEnter: () => void;
  lang: Language;
  translations: any;
}

export const LandingHero = ({ onEnter, lang, translations }: LandingHeroProps) => {
  const t = translations[lang].hero;
  return (
    <div className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-4 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          {t.badge}
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 leading-tight">
          {lang === 'en' ? (
            <>
              Build. Scale. Monetize. <br/>
              <span className="text-white">The Web3 Growth Engine.</span>
            </>
          ) : (
            <>
              构建. 扩张. 变现. <br/>
              <span className="text-white">Web3 增长引擎.</span>
            </>
          )}
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {lang === 'en' ? (
            <>
              We empower the next generation of unicorns with{' '}
              <span className="text-white font-semibold">Hardcore Tech</span>,{' '}
              <span className="text-white font-semibold">Traffic Matrix</span>, and{' '}
              <span className="text-white font-semibold">RWA Solutions</span>.
            </>
          ) : (
            <>
              我们通过
              <span className="text-white font-semibold">硬核技术支持</span>、
              <span className="text-white font-semibold">流量矩阵</span>和
              <span className="text-white font-semibold">RWA 解决方案</span>，
              赋能下一代独角兽企业。
            </>
          )}
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
          <button 
            onClick={onEnter}
            className="group relative px-8 py-4 bg-white text-slate-950 font-bold rounded-sm hover:bg-slate-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            {t.cta1}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-slate-900 border border-slate-800 text-white font-medium rounded-sm hover:border-slate-600 transition-all flex items-center gap-2">
            {t.cta2}
            <Rocket size={18} />
          </button>
        </div>

        {/* Trust Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 mt-12 border-t border-slate-800/50">
          {[
            { label: t.stats.aum, value: "$120M+" },
            { label: t.stats.kol, value: "50M+" },
            { label: t.stats.projects, value: "35+" },
            { label: t.stats.partners, value: "400+" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-white font-mono">{stat.value}</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

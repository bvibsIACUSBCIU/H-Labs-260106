import React from 'react';
import { ShieldCheck, Users, Terminal, Coins, Lock, Globe } from 'lucide-react';
import { TerminalHeader } from '../components/TerminalHeader';
import { kolBenefits } from '../constants';
import { Language } from '../i18n';

interface KolPortalViewProps {
  lang: Language;
  translations: any;
}

export const KolPortalView = ({ lang, translations }: KolPortalViewProps) => {
  const t = translations[lang].dashboard.kol;
  return (
  <div className="animate-in fade-in duration-500">
    <TerminalHeader title={t.title} subtitle={t.subtitle} color="purple" />
    
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="text-purple-500" /> {t.privileges}
        </h3>
        <div className="grid gap-4">
          {kolBenefits.map((benefit, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg flex gap-4 hover:border-purple-500/30 transition-colors">
              <div className="w-12 h-12 bg-purple-900/20 rounded-lg flex items-center justify-center text-purple-400 shrink-0">
                {benefit.iconType === 'Tool' && <Terminal size={24} />}
                {benefit.iconType === 'Money' && <Coins size={24} />}
                {benefit.iconType === 'Safety' && <Lock size={24} />}
                {benefit.iconType === 'Network' && <Globe size={24} />}
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">{benefit.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-slate-800 p-8 rounded-lg flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-20 h-20 bg-slate-950 rounded-full flex items-center justify-center border-2 border-dashed border-slate-700">
          <Users size={32} className="text-slate-500" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{t.join}</h3>
          <p className="text-slate-400 max-w-sm mx-auto">
            {t.req}
          </p>
        </div>
        <button className="px-8 py-3 bg-white text-slate-950 font-bold rounded hover:bg-slate-200 transition-colors w-full max-w-xs">
          {t.connect}
        </button>
      </div>
    </div>
  </div>
)};

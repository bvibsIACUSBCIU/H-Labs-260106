import React from 'react';
import { ShieldCheck, Wallet, FileText, Landmark, Layers } from 'lucide-react';
import { Language } from '../i18n';

interface CustodySectionProps {
  lang: Language;
  translations: any;
}

export const CustodySection = ({ lang, translations }: CustodySectionProps) => {
  const t = translations[lang].custody;
  return (
    <div className="py-24 bg-[#0B1121] relative overflow-hidden border-t border-slate-900">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-full mb-4">
                    <ShieldCheck size={32} className="text-indigo-400" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.title}</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">{t.desc}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {t.items.map((item: any, i: number) => (
                    <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg hover:border-indigo-500/30 transition-all group">
                        <div className="mb-4 text-indigo-400 group-hover:text-indigo-300 transition-colors">
                            {i === 0 && <Wallet size={28} />}
                            {i === 1 && <FileText size={28} />}
                            {i === 2 && <Landmark size={28} />}
                            {i === 3 && <Layers size={28} />}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TickerData {
  symbol: string;
  displaySymbol: string;
  price: string;
  change: string;
  trend: 'up' | 'down';
}

interface TickerTapeProps {
  marketData: TickerData[];
  gasPrice?: { price: string; change: string; trend: 'up' | 'down' };
}

export const TickerTape = ({ marketData, gasPrice }: TickerTapeProps) => {
  const allTickers = gasPrice ? [...marketData, { displaySymbol: 'GAS', price: gasPrice.price, change: gasPrice.change, trend: gasPrice.trend, symbol: 'GAS' }] : marketData;
  
  // 复制多次以确保无缝滚动
  const duplicatedTickers = [...allTickers, ...allTickers];
  
  return (
    <div className="w-full bg-slate-950 border-b border-slate-800 h-8 flex items-center overflow-hidden z-50 relative">
      <div className="flex items-center animate-scroll whitespace-nowrap">
        {duplicatedTickers.map((t, i) => (
          <div key={i} className="flex items-center gap-2 font-mono text-xs px-4">
            <span className="text-slate-500 font-bold">{t.displaySymbol}</span>
            <span className="text-slate-200">{t.price}</span>
            <span className={`${t.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'} flex items-center gap-0.5`}>
              {t.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {t.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

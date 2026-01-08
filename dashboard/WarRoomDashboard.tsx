import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Flame,
  Activity,
  Radio,
  Radar,
  ArrowRight,
  Wallet,
  Ghost,
  ArrowUpRight,
  ArrowDownRight,
  Twitter,
  MessageCircle,
  AlertTriangle,
  Search,
  RefreshCw,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { TerminalHeader } from '../components/TerminalHeader';
import { SectionCard } from '../components/SectionCard';
import {
  warRoomIntel,
  whaleAlerts,
  smartMoneyFlows,
  twitterTrends,
  telegramAlpha,
  sectorData,
  cexFlows
} from '../constants';
import { Language } from '../i18n';

// CryptoCompare API 配置
const NEWS_URL = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";

// 币安 API 配置
const BINANCE_API = "https://api.binance.com/api/v3";

const DEFAULT_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT'];

interface BinanceTickerData {
  symbol: string;
  displaySymbol: string;
  price: string;
  change: string;
  trend: 'up' | 'down';
}

const CATEGORIES = [
  { id: 'all', name: '全网快讯', nameEn: 'All News', tag: '' },
  { id: 'BTC', name: '比特币', nameEn: 'Bitcoin', tag: 'BTC' },
  { id: 'ETH', name: '以太坊', nameEn: 'Ethereum', tag: 'ETH' },
  { id: 'DeFi', name: 'DeFi', nameEn: 'DeFi', tag: 'DeFi' },
  { id: 'NFT', name: 'NFT', nameEn: 'NFT', tag: 'NFT' },
  { id: 'Regulation', name: '政策监管', nameEn: 'Regulation', tag: 'Regulation' }
];

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  sourceName: string;
  sourceImg: string;
  image: string;
  publishedAt: number;
  tags: string;
}

interface WarRoomDashboardProps {
  lang: Language;
  translations: any;
  marketData: BinanceTickerData[];
  gasPrice: { price: string; change: string; trend: 'up' | 'down' };
  searchedSymbols: string[];
  setSearchedSymbols: (symbols: string[]) => void;
  fetchBinanceData: (symbols: string[]) => void;
}

export const WarRoomDashboard = ({
  lang,
  translations,
  marketData,
  gasPrice,
  searchedSymbols,
  setSearchedSymbols,
  fetchBinanceData
}: WarRoomDashboardProps) => {
  const t = translations[lang].dashboard.war_room;

  // Alpha Stream 状态管理
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Telegram Alpha 状态
  const [activeChannel, setActiveChannel] = useState('CryptoMarketAggregator');
  const [tgPosts, setTgPosts] = useState<{ id: number; text: string; date?: string; author?: string }[]>([]);
  const [tgLoading, setTgLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 从本地缓存加载消息
  const loadCachedPosts = (channel: string) => {
    try {
      const cached = localStorage.getItem(`tg_posts_${channel}`);
      if (cached) {
        setTgPosts(JSON.parse(cached));
      } else {
        setTgPosts([]);
      }
    } catch (e) {
      console.error("Failed to load TG cache:", e);
      setTgPosts([]);
    }
  };

  // 自动滚动到底部
  useEffect(() => {
    if (scrollRef.current && tgPosts.length > 0) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [tgPosts]);

  // 获取 Telegram 频道最新消息列表
  const fetchChannelMessages = async (channel: string, forceLoading = false) => {
    if (forceLoading) setTgLoading(true);
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://t.me/s/${channel}`)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error('Proxy error');

      const data = await response.json();
      const html = data.contents;
      if (!html) throw new Error('No content received');

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const messageWraps = doc.querySelectorAll('.tgme_widget_message'); // 修正选择器为更通用的类名
      const posts: { id: number; text: string; date?: string; author?: string }[] = [];

      const lastWraps = Array.from(messageWraps).slice(-10);

      for (const wrap of lastWraps) {
        const textElement = wrap.querySelector('.tgme_widget_message_text');
        if (!textElement) continue;

        // 提取 ID (data-post 属性或链接)
        let idVal = wrap.getAttribute('data-post')?.split('/').pop();
        if (!idVal) {
          const linkElement = wrap.querySelector('.tgme_widget_message_date') as HTMLAnchorElement;
          idVal = linkElement?.href?.split('/').pop();
        }
        const id = idVal ? parseInt(idVal) : Math.random();

        const timeElement = wrap.querySelector('.tgme_widget_message_date time');
        const dateStr = timeElement ? timeElement.getAttribute('datetime') : undefined;

        const authorElement = wrap.querySelector('.tgme_widget_message_author_name');
        const author = authorElement ? authorElement.textContent?.trim() : undefined;

        const cloned = textElement.cloneNode(true) as HTMLElement;

        // 处理链接
        const links = cloned.querySelectorAll('a');
        links.forEach(link => {
          if (channel === 'groupdigest') {
            const newline = document.createTextNode('\n');
            link.parentNode?.replaceChild(newline, link);
          } else {
            link.remove();
          }
        });

        let text = cloned.innerText || cloned.textContent || '';

        // 核心清理逻辑
        // 1. 移除内容中的链接
        text = text.replace(/https?:\/\/[^\s]+/g, channel === 'groupdigest' ? '\n' : '');

        // 2. 移除所有括号及其内部内容 (包括全角和半角)
        text = text.replace(/\([^\)]*\)/g, ''); // 移除半角括号内容
        text = text.replace(/（[^）]*）/g, ''); // 移除全角括号内容

        // 3. 将连续的竖线符号替换为换行 (针对 CryptoMarketAggregator)
        if (channel === 'CryptoMarketAggregator') {
          text = text.replace(/[|｜]{1,}/g, '\n');
        }

        // 4. 通用结构清理
        text = text.replace(/^\s*[|｜]\s*/gm, '');
        text = text.replace(/\s*[|｜]\s*$/gm, '');

        // 5. 规范化换行
        text = text.replace(/\n{3,}/g, '\n\n');

        if (text.trim()) {
          posts.push({ id, text: text.trim(), date: dateStr, author });
        }
      }

      if (posts.length > 0) {
        const finalPosts = posts.slice(-6);
        setTgPosts(finalPosts);
        // 保存到缓存
        localStorage.setItem(`tg_posts_${channel}`, JSON.stringify(finalPosts));
      }
    } catch (err) {
      console.error(`Error fetching channel ${channel}:`, err);
    } finally {
      setTgLoading(false);
    }
  };

  useEffect(() => {
    loadCachedPosts(activeChannel);
    fetchChannelMessages(activeChannel, true);

    const interval = setInterval(() => fetchChannelMessages(activeChannel), 120000);
    return () => clearInterval(interval);
  }, [activeChannel]);

  // Token搜索状态
  const [tokenSearchQuery, setTokenSearchQuery] = useState('');
  const [marketLoading, setMarketLoading] = useState(false);

  // 搜索代币并添加到显示列表
  const handleTokenSearch = () => {
    if (!tokenSearchQuery.trim()) return;

    const symbol = tokenSearchQuery.toUpperCase().replace('USDT', '') + 'USDT';
    if (!searchedSymbols.includes(symbol)) {
      const newSymbols = [...searchedSymbols, symbol];
      setSearchedSymbols(newSymbols);
      setMarketLoading(true);
      fetchBinanceData(newSymbols);
      setTimeout(() => setMarketLoading(false), 1000);
    }
    setTokenSearchQuery('');
  };

  // 获取加密新闻数据
  const fetchCryptoNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const categoryTag = CATEGORIES.find(c => c.id === activeCategory)?.tag || '';
      const url = categoryTag
        ? `${NEWS_URL}&categories=${categoryTag}`
        : NEWS_URL;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response error');

      const data = await response.json();

      if (data.Data) {
        const formatted: NewsArticle[] = data.Data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.body,
          url: item.url,
          sourceName: item.source_info.name,
          sourceImg: item.source_info.img,
          image: item.imageurl,
          publishedAt: item.published_on * 1000,
          tags: item.categories
        }));
        setArticles(formatted);
      } else {
        throw new Error('No valid data received');
      }
    } catch (err) {
      console.error("API Fetch Error:", err);
      setError(lang === 'zh' ? "无法连接到快讯服务器，请检查网络或稍后重试。" : "Unable to connect to news server. Please check your network or try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoNews();
    const timer = setInterval(fetchCryptoNews, 300000); // 5分钟刷新
    return () => clearInterval(timer);
  }, [activeCategory]);

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    const query = searchQuery.toLowerCase();
    return articles.filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.description.toLowerCase().includes(query)
    );
  }, [articles, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (timestamp: number) => {
    const now = new Date();
    const articleDate = new Date(timestamp);
    const diff = Math.floor((now.getTime() - articleDate.getTime()) / 1000 / 60);

    if (lang === 'zh') {
      if (diff < 1) return "刚刚";
      if (diff < 60) return `${diff} 分钟前`;
      if (diff < 1440) return `${Math.floor(diff / 60)} 小时前`;
      return articleDate.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
    } else {
      if (diff < 1) return "just now";
      if (diff < 60) return `${diff}m ago`;
      if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
      return articleDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <TerminalHeader title={t.title} subtitle={t.subtitle} color="red" />

      {/* Top Row: Market Ticker + Search */}
      <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-green-400" />
            <span className="text-xs font-mono text-slate-400 uppercase">Live Market Data</span>
            {marketLoading && <RefreshCw className="w-3 h-3 text-green-400 animate-spin" />}
          </div>

          {/* Token Search */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder={lang === 'zh' ? "搜索代币 (如: BTC)" : "Search token (e.g., BTC)"}
                className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 pl-8 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all w-48"
                value={tokenSearchQuery}
                onChange={(e) => setTokenSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTokenSearch()}
              />
              <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
            </div>
            <button
              onClick={handleTokenSearch}
              className="px-3 py-1.5 bg-green-900/30 text-green-400 text-xs font-bold rounded hover:bg-green-900/50 transition-all border border-green-900/50"
            >
              {lang === 'zh' ? '添加' : 'Add'}
            </button>
          </div>
        </div>

        {/* Market Tickers */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {marketData.map((ticker, i) => (
            <div key={i} className="bg-slate-950/50 border border-slate-800 p-3 rounded hover:border-slate-700 transition-all group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-slate-500">{ticker.displaySymbol}</span>
                {ticker.trend === 'up' ? (
                  <ArrowUpRight size={12} className="text-green-400" />
                ) : (
                  <ArrowDownRight size={12} className="text-red-400" />
                )}
              </div>
              <div className="text-base font-bold text-white mb-0.5">{ticker.price}</div>
              <div className={`text-xs font-mono ${ticker.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {ticker.change}
              </div>
            </div>
          ))}

          {/* Gas Price (Static for now) */}
          <div className="bg-slate-950/50 border border-slate-800 p-3 rounded hover:border-slate-700 transition-all group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono text-slate-500">GAS</span>
              <ArrowDownRight size={12} className="text-red-400" />
            </div>
            <div className="text-base font-bold text-white mb-0.5">{gasPrice.price}</div>
            <div className="text-xs font-mono text-red-400">{gasPrice.change}</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Col: Intel Stream */}
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title={t.alpha} icon={Radio}>
            {/* 搜索和刷新控制栏 */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={lang === 'zh' ? "搜索新闻..." : "Search news..."}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 pl-8 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
              </div>
              <button
                onClick={fetchCryptoNews}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-300 transition-all active:scale-90"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-red-400' : ''}`} />
              </button>
            </div>

            {/* 分类筛选 */}
            <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-2 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`whitespace-nowrap px-2.5 py-1 rounded text-[10px] font-bold transition-all border ${activeCategory === cat.id
                    ? 'bg-red-900/30 text-red-400 border-red-900/50'
                    : 'bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-700'
                    }`}
                >
                  {lang === 'zh' ? cat.name : cat.nameEn}
                </button>
              ))}
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="mb-3 p-2.5 bg-red-950/20 border border-red-900/30 rounded flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                <p className="text-xs">{error}</p>
              </div>
            )}

            {/* 新闻列表 */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {loading && articles.length === 0 ? (
                // 加载骨架屏
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-3 bg-slate-950/50 rounded border border-slate-800 animate-pulse">
                    <div className="h-3 bg-slate-800 rounded w-3/4 mb-2" />
                    <div className="h-2 bg-slate-900 rounded w-1/4" />
                  </div>
                ))
              ) : (
                filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    className={`bg-slate-950/50 border rounded transition-all duration-200 overflow-hidden ${expandedId === article.id
                      ? 'border-red-900/50 shadow-lg shadow-red-900/10'
                      : 'border-slate-800 hover:border-slate-700'
                      }`}
                  >
                    {/* 标题区域 - 可点击展开 */}
                    <div
                      className="p-3 cursor-pointer flex items-start gap-2.5 select-none"
                      onClick={() => toggleExpand(article.id)}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        <ChevronRight
                          className={`w-3.5 h-3.5 text-slate-600 transition-transform duration-300 ${expandedId === article.id ? 'rotate-90 text-red-400' : ''
                            }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[9px] font-bold text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                            {article.sourceName}
                          </span>
                          <span className="text-[9px] font-mono text-slate-600">
                            {formatDate(article.publishedAt)}
                          </span>
                        </div>
                        <h3 className={`text-sm leading-snug transition-colors ${expandedId === article.id ? 'font-bold text-white' : 'font-medium text-slate-300'
                          }`}>
                          {article.title}
                        </h3>
                      </div>
                    </div>

                    {/* 详情区域 - 可折叠 */}
                    <div
                      className={`transition-all duration-300 ease-in-out ${expandedId === article.id ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                        }`}
                    >
                      <div className="px-9 pb-3">
                        <div className="bg-slate-900/50 rounded p-3 border-l-2 border-red-500">
                          <p className="text-slate-400 text-xs leading-relaxed mb-3">
                            {article.description}
                          </p>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-red-400 hover:text-red-300 transition-all uppercase tracking-tight"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {lang === 'zh' ? '阅读完整文章' : 'Read Full Article'} <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {!loading && filteredArticles.length === 0 && (
                <div className="text-center py-12 text-slate-600">
                  <Radio className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">{lang === 'zh' ? '未发现相关快讯' : 'No news found'}</p>
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard title={t.radar} icon={Radar}>
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-blue-400 flex items-center gap-2"><Twitter size={12} /> TWITTER TRENDS</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {twitterTrends.map((topic) => (
                  <div key={topic.id} className="bg-slate-950 p-3 rounded border border-slate-800/60 flex justify-between items-center">
                    <div>
                      <div className="text-sm font-bold text-white">{topic.name}</div>
                      <div className="text-xs text-slate-500">{topic.volume} • {topic.context}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono text-green-400">+{topic.change}%</div>
                      <div className="text-[10px] bg-slate-800 px-1 rounded text-slate-400">{topic.phase}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right Col: On-Chain Data */}
        <div className="space-y-6">
          <SectionCard title={t.cex} icon={ArrowRight}>
            <div className="space-y-3">
              {cexFlows.map((flow, i) => (
                <div key={i} className="flex items-center justify-between text-sm p-2 bg-slate-950/50 rounded">
                  <span className="text-slate-400">{flow.exchange}</span>
                  <div className="text-right">
                    <div className={`font-mono ${flow.netFlow24h.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                      {flow.netFlow24h}
                    </div>
                    <div className="text-[10px] text-slate-600 uppercase">{flow.status} ({flow.topToken})</div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title={t.smart} icon={Wallet}>
            <div className="space-y-3">
              {smartMoneyFlows.map((flow, i) => (
                <div key={i} className="p-3 bg-slate-950/50 rounded border-l-2 border-indigo-500">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-white">{flow.token}</span>
                    <span className="text-xs bg-indigo-900/30 text-indigo-300 px-1.5 rounded">{flow.entityType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{flow.entityName}</span>
                    <span className="text-green-400 font-mono">{flow.netFlow24h}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title={t.whale} icon={Ghost}>
            <div className="space-y-3">
              {whaleAlerts.map((whale, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <div className={`p-1.5 rounded-full ${whale.action === 'Buy' ? 'bg-green-900/30 text-green-400' : whale.action === 'Sell' ? 'bg-red-900/30 text-red-400' : 'bg-slate-800 text-slate-400'}`}>
                    {whale.action === 'Buy' ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-slate-300">
                      <span className="font-bold">{whale.amount} {whale.token}</span>
                      <span>{whale.value}</span>
                    </div>
                    <div className="text-slate-600 truncate max-w-[150px]">{whale.walletLabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      <SectionCard title="TELEGRAM ALPHA" icon={MessageCircle}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              { id: 'CryptoMarketAggregator', name: 'Crypto Alpha' },
              { id: 'groupdigest', name: 'Group Digest' }
            ].map((src) => (
              <button
                key={src.id}
                onClick={() => { setActiveChannel(src.id); }}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[10px] font-bold border transition-all ${activeChannel === src.id
                  ? 'bg-blue-600/20 text-blue-400 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                  : 'bg-slate-900/50 text-slate-500 border-slate-800 hover:border-slate-700'
                  }`}
              >
                {src.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="text-slate-500 uppercase tracking-widest">{lang === 'zh' ? '当前源' : 'Source'}:</span>
            <a
              href={`https://t.me/${activeChannel}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline flex items-center gap-1"
            >
              t.me/{activeChannel} <ExternalLink size={10} />
            </a>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar bg-slate-950/30 rounded-lg p-4 border border-slate-800/50 scroll-smooth"
        >
          {tgLoading && tgPosts.length === 0 ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 mb-4 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-slate-800 rounded w-1/4" />
                  <div className="h-10 bg-slate-900 rounded w-full" />
                </div>
              </div>
            ))
          ) : tgPosts.length > 0 ? (
            tgPosts.map((post) => (
              <div key={`${post.id}`} className="flex gap-3 mb-6 group">
                <div className="w-8 h-8 rounded-full bg-blue-900/20 border border-blue-900/30 flex items-center justify-center text-blue-400 flex-shrink-0 shadow-lg shadow-blue-900/10">
                  <MessageCircle size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-bold text-blue-400">
                      {post.author || activeChannel}
                    </span>
                    <span className="text-[10px] font-mono text-slate-600">
                      {post.date ? new Date(post.date).toLocaleString([], { hour: '2-digit', minute: '2-digit' }) : `ID: ${post.id}`}
                    </span>
                  </div>
                  <div className="relative inline-block max-w-full">
                    <div className="bg-slate-900/80 border border-slate-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm hover:border-slate-700 transition-colors">
                      <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap break-words">
                        {post.text}
                      </p>
                    </div>
                    {/* Subtle triangle for the bubble tail */}
                    <div className="absolute top-0 -left-1.5 w-0 h-0 border-t-[8px] border-t-slate-800 border-l-[8px] border-l-transparent" />
                    <div className="absolute top-[1px] -left-1 w-0 h-0 border-t-[7px] border-t-slate-900 border-l-[7px] border-l-transparent" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-slate-600">
              <Ghost className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p className="text-sm font-medium">{lang === 'zh' ? '暂未连接到 Alpha 节点' : 'No Alpha signals found'}</p>
              <p className="text-[10px] uppercase tracking-widest mt-1 opacity-50">Signal monitoring active...</p>
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
};

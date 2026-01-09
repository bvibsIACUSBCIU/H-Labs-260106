import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MessageCircle, ExternalLink, Ghost, RefreshCw } from 'lucide-react';
import { Language } from '../../i18n';
import { SectionCard } from '../../components/SectionCard';

interface TelegramPost {
    id: number;
    text: string;
    date?: string;
    author?: string;
    channel: string;
}

interface TelegramAlphaProps {
    lang: Language;
}

export const TelegramAlpha: React.FC<TelegramAlphaProps> = ({ lang }) => {
    const [activeChannel, setActiveChannel] = useState('all');
    const [tgPosts, setTgPosts] = useState<TelegramPost[]>([]);
    const [tgLoading, setTgLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // 从本地缓存加载消息
    const loadCachedPosts = () => {
        try {
            const cached = localStorage.getItem('tg_posts_all');
            if (cached) {
                setTgPosts(JSON.parse(cached));
            }
        } catch (e) {
            console.error("Failed to load TG cache:", e);
        }
    };

    // 自动滚动到底部
    useEffect(() => {
        if (scrollRef.current && tgPosts.length > 0) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [tgPosts, activeChannel]);

    // 获取 Telegram 频道最新消息列表
    const fetchChannelMessages = async (channel: string) => {
        try {
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://t.me/s/${channel}`)}`;
            const response = await fetch(proxyUrl);
            if (!response.ok) return [];

            const data = await response.json();
            const html = data.contents;
            if (!html) return [];

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const messageWraps = doc.querySelectorAll('.tgme_widget_message');
            const posts: any[] = [];
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

                // 1. 处理换行和链接
                cloned.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
                cloned.querySelectorAll('a').forEach(link => link.remove());

                let text = (cloned as any).innerText || cloned.textContent || '';

                // 2. 核心清理逻辑
                text = text.replace(/https?:\/\/[^\s]+/g, '');
                text = text.replace(/\([^\)]*\)/g, '').replace(/（[^）]*）/g, '');

                if (channel === 'CryptoMarketAggregator') {
                    text = text.replace(/[|｜]{1,}/g, '\n');
                }

                text = text.replace(/^\s*[|｜]\s*/gm, '');
                text = text.replace(/\s*[|｜]\s*$/gm, '');

                // 3. 用户需求逻辑：两个换行替换为一个；三个及以上换行替换为两个
                text = text.replace(/\n{2,}/g, (match) => match.length === 2 ? '\n' : '\n\n');

                // 4. 前缀检测
                if (/^\s*pinned/i.test(text)) {
                    continue;
                }

                if (text.trim()) {
                    posts.push({ id, text: text.trim(), date: dateStr, author, channel });
                }
            }
            return posts;
        } catch (err) {
            console.error(`Error fetching ${channel}:`, err);
            return [];
        }
    };

    const refreshAllChannels = async (forceLoading = false) => {
        if (forceLoading) setTgLoading(true);
        const channels = ['CryptoMarketAggregator', 'groupdigest'];

        try {
            const results = await Promise.all(channels.map(c => fetchChannelMessages(c)));
            const allNewPosts = results.flat();

            setTgPosts(prev => {
                const combined = [...prev];
                allNewPosts.forEach(newPost => {
                    const exists = combined.some(p => p.id === newPost.id && p.channel === newPost.channel);
                    if (!exists) combined.push(newPost);
                });

                const finalPosts = combined
                    .filter(p => !/^\s*pinned/i.test(p.text))
                    .sort((a, b) => new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime())
                    .slice(-40);

                localStorage.setItem('tg_posts_all', JSON.stringify(finalPosts));
                return finalPosts;
            });
        } finally {
            setTgLoading(false);
        }
    };

    useEffect(() => {
        loadCachedPosts();
        refreshAllChannels(true);

        const interval = setInterval(() => refreshAllChannels(false), 90000); // 1.5分钟刷新一次
        return () => clearInterval(interval);
    }, []);

    const filteredPosts = useMemo(() => {
        if (activeChannel === 'all') return tgPosts;
        return tgPosts.filter(p => p.channel === activeChannel);
    }, [tgPosts, activeChannel]);

    return (
        <div className="flex flex-col h-[800px] bg-slate-900/30 rounded-lg border border-slate-800/50 p-4">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-bold text-slate-200">TELEGRAM ALPHA</span>
                </div>
                {tgLoading && <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />}
            </div>

            <div className="flex gap-1 mb-3 overflow-x-auto no-scrollbar">
                {[
                    { id: 'all', name: 'ALL' },
                    { id: 'CryptoMarketAggregator', name: 'ALPHA' },
                    { id: 'groupdigest', name: 'DIGEST' }
                ].map((src) => (
                    <button
                        key={src.id}
                        onClick={() => { setActiveChannel(src.id); }}
                        className={`flex-shrink-0 px-3 py-1 rounded-[4px] text-xs font-bold border transition-all ${activeChannel === src.id
                            ? 'bg-blue-600/10 text-blue-400 border-blue-500/30'
                            : 'bg-slate-950/50 text-slate-500 border-slate-800 hover:border-slate-700'
                            }`}
                    >
                        {src.name}
                    </button>
                ))}
            </div>

            <div
                ref={scrollRef}
                className="flex-1 space-y-4 overflow-y-auto pr-1 custom-scrollbar scroll-smooth"
            >
                {tgLoading && filteredPosts.length === 0 ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-3 mb-4 animate-pulse">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 bg-slate-800 rounded w-1/4" />
                                <div className="h-12 bg-slate-900 rounded w-full" />
                            </div>
                        </div>
                    ))
                ) : filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <div key={`${post.channel}_${post.id}`} className="flex gap-3 mb-5 group">
                            <div className="w-8 h-8 rounded-full bg-blue-900/20 border border-blue-900/30 flex items-center justify-center text-blue-400 flex-shrink-0 shadow-sm">
                                <MessageCircle size={14} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-sm font-bold text-blue-400 truncate max-w-[120px]">
                                        {post.author || post.channel}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-600">
                                        {post.date ? new Date(post.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                    </span>
                                </div>
                                <div className="bg-slate-900/60 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none hover:border-blue-500/20 transition-colors shadow-sm">
                                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap break-words">
                                        {post.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16 text-slate-700">
                        <Ghost className="w-10 h-10 mx-auto mb-3 opacity-20" />
                        <p className="text-xs font-bold uppercase tracking-widest opacity-40">Awaiting Alpha Signals...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

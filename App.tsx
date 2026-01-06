import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Cpu, 
  TrendingUp, 
  ArrowRight,
  Search,
  Users,
  LayoutDashboard,
  Activity,
  CheckCircle2,
  Timer,
  BookOpen,
  ShieldCheck,
  Twitter,
  Gift,
  Link as LinkIcon,
  Code,
  Newspaper,
  Megaphone,
  Radio,
  Terminal,
  LogOut,
  Rocket,
  Target,
  BarChart3,
  MapPin,
  Landmark,
  ShieldAlert,
  Ghost,
  Swords,
  BrainCircuit,
  Wallet,
  Coins,
  GraduationCap,
  Radar,
  MessageCircle,
  AlertTriangle,
  FileText,
  MousePointer2,
  PieChart,
  Globe,
  Layers,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Lock,
  Eye,
  GitCommit,
  Server,
  Flame,
  Hash,
  Droplets,
  Building2,
  Handshake,
  Check,
  Gem,
  Mic2,
  Presentation,
  Share2
} from 'lucide-react';

import { 
  warRoomIntel, 
  whaleAlerts, 
  bountyTasks, 
  academyCourses, 
  twitterTrends,
  telegramAlpha,
  smartMoneyFlows, 
  kolBenefits,
  marketTickers,
  sectorData,
  cexFlows,
  successCases,
  strategicPartners,
  mediaPartners
} from './constants';
import { User, ViewState, TabState } from './types';

// --- TYPES & TRANSLATIONS ---

type Language = 'en' | 'zh';

const translations = {
  en: {
    nav: { services: "Services", cases: "Success Cases", login: "Login" },
    hero: {
      badge: "H LABS VENTURE BUILDER",
      title: <>Build. Scale. Monetize. <br/><span className="text-white">The Web3 Growth Engine.</span></>,
      subtitle: <>We empower the next generation of unicorns with <span className="text-white font-semibold">Hardcore Tech</span>, <span className="text-white font-semibold">Traffic Matrix</span>, and <span className="text-white font-semibold">RWA Solutions</span>.</>,
      cta1: "Access Dashboard",
      cta2: "Apply for Incubation",
      stats: { aum: "Assets Under Management", kol: "KOL Network Reach", projects: "Projects Incubated", partners: "Strategic Partners" }
    },
    pillars: {
      title: "Hardcore Tech Support",
      desc: "Providing end-to-end infrastructure for Web3 projects from zero to one, and one to infinity.",
      p1: { title: "Web3 Infrastructure", desc: "Customized public chains, Wallet solutions, SwapX, Prediction Markets.", items: ["Custom L1/L2 Chains", "MPC Wallet Solutions", "SwapX & Aggregators", "Prediction Markets"] },
      p2: { title: "RWA Sector", desc: "Real World Asset tokenization compliance and technical implementation.", items: ["Asset Tokenization", "Legal Structuring", "On-chain Bonds", "Real Estate on Chain"] },
      p3: { title: "Traffic & Meme", desc: "Viral marketing, Meme culture incubation, and massive traffic injection.", items: ["Meme Incubator", "Viral Campaigns", "Traffic Injection", "Community Takeover"] }
    },
    custody: {
      title: "Institutional Custody & Security",
      desc: "Bank-grade security architecture protecting your assets with absolute compliance.",
      items: [
        { title: "MPC Technology", desc: "Multi-Party Computation wallets eliminating single points of failure." },
        { title: "Double Audits", desc: "Smart contracts audited by top-tier firms (CertiK, SlowMist)." },
        { title: "Global Compliance", desc: "Operating under full legal frameworks and regulatory compliance." },
        { title: "Asset Segregation", desc: "Strict separation of client funds and operational capital." }
      ]
    },
    media: {
      title: "H Media Influence Matrix",
      desc: "Proprietary Traffic Factory + KOL Academy + Full Brand Management",
      s1: { title: "Twitter (X) Ops", desc: "Persona modeling, daily refined content, and growth hacking strategies." },
      s2: { title: "Space / AMA", desc: "One-stop loop: Planning, inviting, hosting, and post-event summaries." },
      s3: { title: "Global Roadshows", desc: "Custom business salons & summits in Dubai, Singapore, Hong Kong." },
      mediaPartners: "Strategic Media Alliance"
    },
    portfolio: {
      title: "From 0 to 1: Battle Records",
      desc: "Real-world success stories powered by H Labs.",
      viewAll: "View All Cases"
    },
    partners: {
      title: "Our Partners",
      subtitle: "Hand in hand, creating benchmarks.",
      desc: "Supported by 400+ industry leading enterprises."
    },
    footer: {
      rights: "© 2024 H Labs Ecosystem.",
      links: ["Services", "Cases", "Twitter", "Contact"]
    },
    dashboard: {
      sidebar: {
        war_room: "War Room",
        kol_portal: "KOL Matrix",
        bounty_hall: "Bounty Hall",
        academy: "Academy",
        fund: "H-Fund",
        disconnect: "Disconnect"
      },
      war_room: {
        title: "WAR ROOM TERMINAL",
        subtitle: "REAL-TIME INTELLIGENCE & MARKET ANALYSIS",
        alpha: "Alpha Stream (Live)",
        radar: "Narrative Radar",
        cex: "CEX Net Flows (24h)",
        smart: "Smart Money",
        whale: "Whale Alerts"
      },
      kol: {
        title: "KOL MATRIX PORTAL",
        subtitle: "Traffic Monetization & Resource Network",
        privileges: "Exclusive Privileges",
        join: "Join the H-Club",
        req: "Minimum Requirement: 10k+ followers or ownership of a community with 500+ active members.",
        connect: "Connect Wallet to Verify"
      },
      bounty: {
        title: "BOUNTY HALL",
        subtitle: "Proof of Work & Earn",
        active: "Total Active",
        pool: "Pool Value",
        filter: "Filter by Type",
        reward: "Reward",
        slots: "Slots",
        claim: "Claim"
      },
      academy: {
        title: "H-ACADEMY",
        subtitle: "Knowledge Base & Alpha Research"
      },
      fund: {
        title: "H-FUND PORTFOLIO",
        subtitle: "Institutional Asset Management",
        restricted_title: "Restricted Access",
        restricted_desc: "Detailed fund metrics, NAV reports, and LP dashboard are only available to accredited investors and whitelisted wallet addresses.",
        request: "REQUEST ACCESS (KYC REQUIRED)",
        public: "Public Portfolio"
      }
    }
  },
  zh: {
    nav: { services: "核心服务", cases: "成功案例", login: "登录终端" },
    hero: {
      badge: "H LABS 风险孵化器",
      title: <>构建. 扩张. 变现. <br/><span className="text-white">Web3 增长引擎.</span></>,
      subtitle: <>我们通过<span className="text-white font-semibold">硬核技术支持</span>、<span className="text-white font-semibold">流量矩阵</span>和<span className="text-white font-semibold">RWA 解决方案</span>，赋能下一代独角兽企业。</>,
      cta1: "进入控制台",
      cta2: "申请孵化",
      stats: { aum: "资产管理规模", kol: "KOL 网络触达", projects: "孵化项目数", partners: "战略合作伙伴" }
    },
    pillars: {
      title: "硬核技术支持",
      desc: "为 Web3 项目提供从 0 到 1 的全套基础设施与赛道支持。",
      p1: { title: "基础设施", desc: "定制公链，钱包，SwapX，预测市场等一站式技术交付。", items: ["定制 L1/L2 公链", "MPC 钱包方案", "SwapX 聚合器", "去中心化预测市场"] },
      p2: { title: "RWA 赛道", desc: "现实资产上链，合规架构搭建与技术实现。", items: ["资产代币化", "合规法律架构", "链上债券/国债", "房地产上链"] },
      p3: { title: "流量与 Meme", desc: "病毒式营销，Meme 文化孵化，海量流量注入。", items: ["Meme 孵化器", "病毒式传播", "精准流量注入", "社区接管 (CTO)"] }
    },
    custody: {
      title: "资金托管与安全",
      desc: "银行级安全架构，为您的资产保驾护航，确保绝对合规与透明。",
      items: [
        { title: "MPC 钱包技术", desc: "采用多方计算技术，彻底消除私钥单点故障风险。" },
        { title: "双重代码审计", desc: "核心合约经由 CertiK 与 SlowMist 等头部机构双重审计。" },
        { title: "全球合规运营", desc: "在完全合规的法律框架与监管要求下运营。" },
        { title: "资金严格隔离", desc: "客户资金与平台运营资金完全隔离，公开透明。" }
      ]
    },
    media: {
      title: "H Media 影响力矩阵",
      desc: "自有流量工厂 + KOL 影响力学院 + 品牌全案",
      s1: { title: "推特 (X) 深度运营", desc: "人格化建模 + 每日精细化内容产出 + 增长黑客手段。" },
      s2: { title: "高频交互 (Space/AMA)", desc: "策划、邀约、主持、会后总结一站式闭环。" },
      s3: { title: "全球高端路演", desc: "迪拜、新加坡、香港等核心枢纽的商务沙龙、展会与投资峰会定制。" },
      mediaPartners: "战略合作媒体"
    },
    portfolio: {
      title: "从 0 到 1 的实战记录",
      desc: "我们亲手打造的成功案例。",
      viewAll: "查看全部案例"
    },
    partners: {
      title: "我们的合作伙伴",
      subtitle: "我们携手，共创标杆",
      desc: "荣获 400 多家行业领军企业的鼎力支持"
    },
    footer: {
      rights: "© 2024 H Labs Ecosystem.",
      links: ["服务", "案例", "推特", "联系我们"]
    },
    dashboard: {
      sidebar: {
        war_room: "作战室",
        kol_portal: "KOL 矩阵",
        bounty_hall: "赏金大厅",
        academy: "H-学院",
        fund: "H-基金",
        disconnect: "断开连接"
      },
      war_room: {
        title: "作战室终端",
        subtitle: "实时情报与市场分析",
        alpha: "Alpha 情报流 (实时)",
        radar: "叙事雷达",
        cex: "CEX 净流向 (24h)",
        smart: "聪明钱监控",
        whale: "巨鲸预警"
      },
      kol: {
        title: "KOL 矩阵门户",
        subtitle: "流量变现与资源网络",
        privileges: "专属权益",
        join: "加入 H-Club",
        req: "最低要求：10k+ 粉丝或拥有 500+ 活跃成员的社区。",
        connect: "连接钱包验证"
      },
      bounty: {
        title: "赏金大厅",
        subtitle: "工作量证明与收益",
        active: "当前活动",
        pool: "奖池总额",
        filter: "筛选类型",
        reward: "奖励",
        slots: "名额",
        claim: "领取"
      },
      academy: {
        title: "H-学院",
        subtitle: "知识库与 Alpha 研究"
      },
      fund: {
        title: "H-基金组合",
        subtitle: "机构级资产管理",
        restricted_title: "访问受限",
        restricted_desc: "详细的基金指标、净值报告和 LP 仪表盘仅对合格投资者和白名单地址开放。",
        request: "申请访问 (需 KYC)",
        public: "公开投资组合"
      }
    }
  }
};

// --- VISUAL COMPONENTS ---

const TerminalHeader = ({ title, subtitle, color = "cyan" }: { title: string, subtitle?: string, color?: string }) => (
  <div className={`flex items-center justify-between mb-6 border-b border-${color}-900/30 pb-4`}>
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2 font-mono">
        <span className={`text-${color}-500`}>//</span> {title}
      </h2>
      {subtitle && <p className={`text-${color}-400/60 text-xs font-mono mt-1 uppercase tracking-wider pl-6`}>{subtitle}</p>}
    </div>
    <div className={`hidden md:flex px-3 py-1 bg-${color}-500/10 border border-${color}-500/30 rounded-sm text-${color}-400 text-xs font-mono animate-pulse items-center gap-2`}>
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${color}-400 opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 bg-${color}-500`}></span>
      </span>
      SYSTEM ONLINE
    </div>
  </div>
);

const TickerTape = () => (
  <div className="w-full bg-slate-950 border-b border-slate-800 h-8 flex items-center overflow-hidden whitespace-nowrap z-50 relative">
    <div className="animate-[scroll_30s_linear_infinite] flex items-center gap-8 px-4">
      {[...marketTickers, ...marketTickers, ...marketTickers].map((t, i) => (
        <div key={i} className="flex items-center gap-2 font-mono text-xs">
          <span className="text-slate-500 font-bold">{t.symbol}</span>
          <span className="text-slate-200">{t.price}</span>
          <span className={`${t.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'} flex items-center`}>
            {t.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {t.change}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const SectionCard = ({ children, title, icon: Icon, className = "" }: { children: React.ReactNode, title: string, icon: any, className?: string }) => (
  <div className={`bg-slate-900/50 border border-slate-800 p-4 rounded-sm backdrop-blur-sm ${className}`}>
    <div className="flex items-center gap-2 mb-4 text-slate-300 font-mono text-sm uppercase tracking-wider border-b border-slate-800/50 pb-2">
      <Icon size={16} className="text-indigo-400" />
      {title}
    </div>
    {children}
  </div>
);

// --- LANDING PAGE SECTIONS ---

const LandingHero = ({ onEnter, lang }: { onEnter: () => void, lang: Language }) => {
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
          {t.title}
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
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

// 核心业务：硬核技术、RWA、流量与Meme
const CorePillarsSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang].pillars;
  return (
    <div className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Pillar 1: Infrastructure */}
          <div className="group bg-slate-900/40 border border-slate-800 hover:border-indigo-500/50 p-8 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-indigo-900/20 rounded-lg flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Server size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t.p1.title}</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {t.p1.desc}
            </p>
            <ul className="space-y-3">
              {t.p1.items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check size={16} className="text-indigo-500" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Pillar 2: RWA */}
          <div className="group bg-slate-900/40 border border-slate-800 hover:border-emerald-500/50 p-8 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-emerald-900/20 rounded-lg flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Landmark size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t.p2.title}</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {t.p2.desc}
            </p>
            <ul className="space-y-3">
              {t.p2.items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check size={16} className="text-emerald-500" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Pillar 3: Traffic & Meme */}
          <div className="group bg-slate-900/40 border border-slate-800 hover:border-rose-500/50 p-8 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-rose-900/20 rounded-lg flex items-center justify-center text-rose-400 mb-6 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <Flame size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t.p3.title}</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {t.p3.desc}
            </p>
            <ul className="space-y-3">
              {t.p3.items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check size={16} className="text-rose-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// 资金托管与安全
const CustodySection = ({ lang }: { lang: Language }) => {
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
                {t.items.map((item, i) => (
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

// H Media 影响力矩阵
const MediaMatrixSection = ({ lang }: { lang: Language }) => {
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
           <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
            {mediaPartners.map((media, i) => (
              <div key={i} className="flex items-center gap-2 text-lg font-bold text-slate-400 hover:text-white transition-colors cursor-default">
                {media}
              </div>
            ))}
           </div>
        </div>
      </div>
    </div>
  );
};

// 成功案例展示 (从 0 到 1)
const PortfolioSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang].portfolio;
  return (
    <div className="py-24 border-t border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{t.title}</h2>
            <p className="text-slate-500">{t.desc}</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-indigo-400 hover:text-white transition-colors mt-4 md:mt-0">
            {t.viewAll} <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {successCases.map((item, i) => (
            <div key={i} className="group relative bg-slate-900/50 border border-slate-800 p-5 rounded-lg overflow-hidden hover:border-slate-600 transition-colors">
              <div className="relative z-10">
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-3 bg-slate-800 text-slate-400 group-hover:bg-indigo-900/30 group-hover:text-indigo-400 transition-colors`}>
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                <p className="text-xs text-slate-500 mb-4 h-8 leading-snug">{item.desc}</p>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <TrendingUp size={14} className="text-green-500" />
                  <span className="text-sm font-mono font-bold text-white">{item.growth}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PartnersSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang].partners;
  return (
    <div className="py-24 border-t border-slate-900 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-indigo-500 font-bold mb-2">{t.subtitle}</h3>
        <h2 className="text-3xl font-bold text-white mb-4">{t.title}</h2>
        <p className="text-slate-400 mb-12">{t.desc}</p>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
          {strategicPartners.map((partner, i) => (
            <div key={i} className="flex items-center gap-3 text-xl font-bold text-slate-500 hover:text-white transition-colors cursor-default">
              <ShieldCheck size={24} className="text-slate-700" />
              {partner}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LandingFooter = ({ lang }: { lang: Language }) => {
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

// --- DASHBOARD COMPONENTS ---

const DashboardSidebar = ({ activeTab, setTab, onLogout, lang }: { activeTab: TabState, setTab: (t: TabState) => void, onLogout: () => void, lang: Language }) => {
  const t = translations[lang].dashboard.sidebar;
  const menuItems = [
    { id: 'war_room', label: t.war_room, icon: Swords },
    { id: 'kol_portal', label: t.kol_portal, icon: Users },
    { id: 'bounty_hall', label: t.bounty_hall, icon: Target },
    { id: 'academy', label: t.academy, icon: GraduationCap },
    { id: 'fund', label: t.fund, icon: PieChart },
  ];

  return (
    <div className="w-20 md:w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-indigo-600 rounded-sm flex items-center justify-center text-white font-bold font-mono shadow-[0_0_15px_rgba(79,70,229,0.5)]">
          H
        </div>
        <span className="hidden md:block font-bold text-lg tracking-tight">H Labs <span className="text-indigo-500 text-xs align-top">OS</span></span>
      </div>
      
      <nav className="flex-1 py-6 space-y-2 px-3">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id as TabState)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 shadow-[0_0_10px_rgba(79,70,229,0.1)]' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`hidden md:block font-medium ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
              {isActive && <div className="hidden md:block ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_5px_rgba(79,70,229,1)]"></div>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-red-400 transition-colors rounded-md hover:bg-red-950/10">
          <LogOut size={18} />
          <span className="hidden md:block text-sm font-medium">{t.disconnect}</span>
        </button>
      </div>
    </div>
  );
};

// --- VIEW: WAR ROOM ---

const WarRoomDashboard = ({ lang }: { lang: Language }) => {
  const t = translations[lang].dashboard.war_room;
  return (
  <div className="space-y-6 animate-in fade-in duration-500">
    <TerminalHeader title={t.title} subtitle={t.subtitle} color="red" />

    {/* Top Row: Market Overview */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {sectorData.map((sector, i) => (
        <div key={i} className="bg-slate-900/40 border border-slate-800 p-4 rounded-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-50">
            {sector.sentiment === 'Hot' ? <Flame size={16} className="text-orange-500" /> : <Activity size={16} className="text-blue-500" />}
          </div>
          <p className="text-slate-500 text-xs uppercase font-mono mb-1">Sector: {sector.name}</p>
          <div className="flex items-end justify-between">
            <h3 className="text-xl font-bold text-white">{sector.leader}</h3>
            <span className={`text-sm font-mono ${sector.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {sector.change24h > 0 ? '+' : ''}{sector.change24h}%
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex justify-between">
            <span>Flow: {sector.flow}</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] ${sector.sentiment === 'Hot' ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-800 text-slate-400'}`}>
              {sector.sentiment}
            </span>
          </div>
        </div>
      ))}
    </div>

    {/* Main Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Col: Intel Stream */}
      <div className="lg:col-span-2 space-y-6">
        <SectionCard title={t.alpha} icon={Radio}>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {warRoomIntel.map((intel) => (
              <div key={intel.id} className="flex gap-4 p-3 hover:bg-slate-800/30 rounded border border-transparent hover:border-slate-800 transition-colors">
                <div className="flex flex-col items-center gap-1 min-w-[60px]">
                  <span className="text-xs font-mono text-slate-500">{intel.time}</span>
                  <div className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                    intel.source === 'Macro' ? 'bg-blue-900/30 text-blue-400' :
                    intel.source === 'OnChain' ? 'bg-purple-900/30 text-purple-400' :
                    'bg-green-900/30 text-green-400'
                  }`}>
                    {intel.source}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-300 leading-relaxed">{intel.content}</p>
                  <div className="flex gap-2 mt-2">
                    {intel.impactLevel === 'High' && (
                      <span className="flex items-center gap-1 text-[10px] text-red-400 bg-red-950/20 px-1.5 py-0.5 rounded border border-red-900/30">
                        <AlertTriangle size={10} /> HIGH IMPACT
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Narrative Console */}
        <SectionCard title={t.radar} icon={Radar}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-blue-400 flex items-center gap-2"><Twitter size={12}/> TWITTER TRENDS</h4>
              {twitterTrends.map((t) => (
                <div key={t.id} className="bg-slate-950 p-3 rounded border border-slate-800/60 flex justify-between items-center">
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.volume} • {t.context}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-green-400">+{t.change}%</div>
                    <div className="text-[10px] bg-slate-800 px-1 rounded text-slate-400">{t.phase}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-blue-400 flex items-center gap-2"><MessageCircle size={12}/> TELEGRAM ALPHA</h4>
              {telegramAlpha.map((t) => (
                <div key={t.id} className="bg-slate-950 p-3 rounded border border-slate-800/60 flex justify-between items-center">
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.volume}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-green-400">+{t.change}%</div>
                    <div className="text-[10px] bg-slate-800 px-1 rounded text-slate-400">{t.phase}</div>
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
  </div>
)};

// --- VIEW: KOL PORTAL ---

const KolPortalView = ({ lang }: { lang: Language }) => {
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

// --- VIEW: BOUNTY HALL ---

const BountyHallView = ({ lang }: { lang: Language }) => {
  const t = translations[lang].dashboard.bounty;
  return (
  <div className="animate-in fade-in duration-500">
    <TerminalHeader title={t.title} subtitle={t.subtitle} color="emerald" />

    <div className="bg-slate-900/30 border border-slate-800 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
        <div className="flex gap-4 text-sm font-mono">
          <span className="text-slate-400">{t.active}: <span className="text-white">12</span></span>
          <span className="text-slate-400">{t.pool}: <span className="text-emerald-400">$45,200</span></span>
        </div>
        <button className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded transition-colors">
          {t.filter}
        </button>
      </div>

      <div className="divide-y divide-slate-800">
        {bountyTasks.map((task) => (
          <div key={task.id} className="p-6 hover:bg-slate-800/30 transition-colors flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                  task.type === 'Content' ? 'bg-blue-900/20 text-blue-400 border-blue-900/30' :
                  task.type === 'Retweet' ? 'bg-sky-900/20 text-sky-400 border-sky-900/30' :
                  'bg-emerald-900/20 text-emerald-400 border-emerald-900/30'
                }`}>
                  {task.type}
                </span>
                <h3 className="text-lg font-bold text-white">{task.title}</h3>
              </div>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Building2 size={14} /> {task.project}
              </p>
            </div>

            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
              <div className="text-center">
                <div className="text-xs text-slate-500 uppercase font-mono">{t.reward}</div>
                <div className="text-emerald-400 font-bold font-mono">{task.reward}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-500 uppercase font-mono">{t.slots}</div>
                <div className="text-white font-mono">{task.filled}/{task.slots}</div>
              </div>
              <button className="px-4 py-2 bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 rounded text-sm font-medium transition-all">
                {t.claim}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)};

// --- VIEW: ACADEMY ---

const AcademyView = ({ lang }: { lang: Language }) => {
  const t = translations[lang].dashboard.academy;
  return (
  <div className="animate-in fade-in duration-500">
    <TerminalHeader title={t.title} subtitle={t.subtitle} color="blue" />

    <div className="grid md:grid-cols-3 gap-6">
      {academyCourses.map((course, i) => (
        <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-lg p-6 hover:border-blue-500/30 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-900/20 rounded-lg text-blue-400">
              <BookOpen size={24} />
            </div>
            <span className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded uppercase tracking-wider">
              {course.level}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mb-4">{course.category}</h3>
          <ul className="space-y-3">
            {course.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-400 hover:text-blue-300 cursor-pointer transition-colors group">
                <ArrowRight size={14} className="mt-1 text-slate-600 group-hover:text-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
)};

// --- VIEW: H-FUND ---

const FundView = ({ lang }: { lang: Language }) => {
  const t = translations[lang].dashboard.fund;
  return (
  <div className="animate-in fade-in duration-500">
    <TerminalHeader title={t.title} subtitle={t.subtitle} color="yellow" />

    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 flex flex-col items-center text-center justify-center min-h-[300px]">
        <Lock size={48} className="text-slate-600 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">{t.restricted_title}</h3>
        <p className="text-slate-400 max-w-md mb-6">
          {t.restricted_desc}
        </p>
        <button className="px-6 py-2 bg-yellow-600/20 text-yellow-500 border border-yellow-600/40 hover:bg-yellow-600/30 rounded font-mono transition-colors">
          {t.request}
        </button>
      </div>

      <div className="space-y-6">
         <SectionCard title={t.public} icon={PieChart}>
           <div className="space-y-4">
             {[
               { name: "Nexus Chain (Seed)", roi: "12x", status: "Vesting" },
               { name: "H-Swap (Series A)", roi: "Unrealized", status: "Active" },
               { name: "Project Z (Strategic)", roi: "8.5x", status: "Exited" }
             ].map((deal, i) => (
               <div key={i} className="flex justify-between items-center p-3 bg-slate-950 rounded border border-slate-800">
                 <div>
                   <div className="text-white font-bold">{deal.name}</div>
                   <div className="text-xs text-slate-500 uppercase">{deal.status}</div>
                 </div>
                 <div className="text-right">
                    <div className="text-yellow-500 font-mono font-bold">{deal.roi}</div>
                    <div className="text-[10px] text-slate-600">ROI</div>
                 </div>
               </div>
             ))}
           </div>
         </SectionCard>
      </div>
    </div>
  </div>
)};

// --- MAIN APP ---

export default function App() {
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [activeTab, setActiveTab] = useState<TabState>('war_room');
  const [lang, setLang] = useState<Language>('zh');

  const enterApp = () => setViewState('terminal');
  const logout = () => setViewState('landing');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {viewState === 'landing' ? (
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

              <button onClick={enterApp} className="text-sm font-medium text-white hover:text-indigo-400 transition-colors">
                {translations[lang].nav.login}
              </button>
            </div>
          </nav>

          <LandingHero onEnter={enterApp} lang={lang} />
          <CorePillarsSection lang={lang} />
          <CustodySection lang={lang} />
          <MediaMatrixSection lang={lang} />
          <PortfolioSection lang={lang} />
          <PartnersSection lang={lang} />
          <LandingFooter lang={lang} />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#050b1d]">
          <DashboardSidebar activeTab={activeTab} setTab={setActiveTab} onLogout={logout} lang={lang} />
          
          <div className="flex-1 flex flex-col h-screen overflow-hidden">
            <TickerTape />
            
            <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative">
              {/* Background Grid for Terminal */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-5 pointer-events-none" />
              
              <div className="relative z-10 max-w-7xl mx-auto">
                {activeTab === 'war_room' && <WarRoomDashboard lang={lang} />}
                {activeTab === 'kol_portal' && <KolPortalView lang={lang} />}
                {activeTab === 'bounty_hall' && <BountyHallView lang={lang} />}
                {activeTab === 'academy' && <AcademyView lang={lang} />}
                {activeTab === 'fund' && <FundView lang={lang} />}
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
export interface TechCase {
  title: string;
  desc: string;
  tech: string[];
  impact: string;
}

export interface MediaChannel {
  name: string;
  reach: string;
  region: string;
}

export interface MediaCategory {
  category: string;
  channels: MediaChannel[];
}

export interface AirdropItem {
  id: string;
  name: string;
  ticker: string;
  amount: string;
  value: string;
  progress: number;
  status: '可领取' | '已领取' | '进行中';
  logo?: string;
}

export interface CourseCategory {
  category: string;
  items: string[];
  level: 'Basic' | 'Intermediate' | 'Advanced' | 'Security' | 'Investor';
}

export interface User {
  handle: string;
  id: string;
  avatar?: string;
  role?: 'User' | 'KOL' | 'Admin';
}

// --- WAR ROOM & TERMINAL TYPES ---

export interface MarketTicker {
  symbol: string;
  price: string;
  change: string; // e.g. "+2.4%"
  trend: 'up' | 'down';
}

export interface SectorData {
  name: string;
  change24h: number;
  leader: string;
  sentiment: 'Hot' | 'Warm' | 'Cool';
  flow: string; // Net inflow
}

export interface CexFlow {
  exchange: string;
  netFlow24h: string; // e.g. "-$45M" (Outflow = Bullish/Accumulation)
  status: 'Accumulation' | 'Distribution' | 'Neutral';
  topToken: string;
}

export interface StablecoinMetric {
  ticker: string;
  name: string;
  totalSupply: string;
  change7d: string; // Issuance change
  inflow24h: string; // Exchange Inflow
  chainDistribution: string; // e.g. "TRC20 52%"
  signal: 'Printing' | 'Burning' | 'Neutral';
}

export interface DevActivity {
  project: string;
  commits24h: number;
  activeDevs: number;
  status: 'High Shipping' | 'Maintenance' | 'Inactive';
  lastUpdate: string;
}

export interface TrendingTopic {
  id: string;
  name: string; // e.g. "$WIF" or "Restaking"
  volume: string; // "12.5k mentions" or "145 groups"
  sentiment: 'Bullish' | 'Bearish' | 'Neutral' | 'FOMO' | 'Fear';
  change: number; // +120%
  phase: 'Discovery' | 'Accumulation' | 'Peak Hype' | 'Distribution';
  context: string; // "Binance listing rumors"
}

export interface IntelItem {
  id: string;
  time: string;
  source: 'Macro' | 'Twitter' | 'OnChain' | 'Telegram';
  content: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  impactLevel: 'High' | 'Medium' | 'Low';
}

export interface WhaleAlert {
  token: string;
  action: 'Buy' | 'Sell' | 'Transfer';
  amount: string;
  value: string;
  walletLabel?: string;
}

export interface SmartMoneyFlow {
  token: string;
  netFlow24h: string;
  entityName: string;
  entityType: string;
  signal: string;
}

// --- KOL & BOUNTY TYPES ---

export interface KOLBenefit {
  title: string;
  desc: string;
  iconType: 'Tool' | 'Money' | 'Safety' | 'Network';
}

export interface BountyTask {
  id: string;
  title: string;
  project: string;
  reward: string;
  type: 'Retweet' | 'Content' | 'Invite' | 'Testnet';
  slots: number;
  filled: number;
  deadline: string;
}

export type ViewState = 'landing' | 'terminal';
export type TabState = 'war_room' | 'kol_portal' | 'bounty_hall' | 'academy' | 'fund';
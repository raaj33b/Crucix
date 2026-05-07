import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, Zap, Activity, ChevronRight, Play } from 'lucide-react';

// Real-time trending data for May 2026
const LIVE_METRICS = {
  totalNodes: 89,
  activeAlerts: 12,
  deepseekStars: '8.2K',
  threatCorrelations: 89,
  lastUpdate: new Date().toLocaleTimeString()
};

const FEATURED_STORIES = [
  {
    id: 'agentic',
    icon: '🤖',
    title: 'AGENTIC AI EXPLOSION',
    subtitle: 'DeepSeek-TUI trending + 8.2K stars/week',
    metric: '+8,246 ⭐ this week',
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/30',
    priority: 'trending'
  },
  {
    id: 'panOs',
    icon: '🔴',
    title: 'CRITICAL: PAN-OS RCE',
    subtitle: 'CVE-2026-0300 — Active exploitation',
    metric: 'CVSS 9.8 | 2.3K mentions/6h',
    color: 'from-red-500/20 to-orange-500/20',
    borderColor: 'border-red-500/30',
    priority: 'critical'
  },
  {
    id: 'gpu',
    icon: '⚡',
    title: 'GPU SHORTAGE CASCADE',
    subtitle: 'H100 pricing surge + lead time explosion',
    metric: '+40% in 6 months | 60-90 day wait',
    color: 'from-amber-500/20 to-yellow-500/20',
    borderColor: 'border-amber-500/30',
    priority: 'critical'
  },
  {
    id: 'ivanti',
    icon: '🛡️',
    title: 'IVANTI EPMM RCE',
    subtitle: 'CVE-2026-1281 — Government targets',
    metric: 'CVSS 9.8 | Active in wild',
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    priority: 'critical'
  }
];

const LIVE_FEEDS = [
  {
    source: 'github',
    title: 'DeepSeek-TUI Trending',
    time: '2m ago',
    metric: '+8.2K ⭐',
    color: '#333',
    icon: '⬛'
  },
  {
    source: 'reddit',
    title: 'r/LocalLLaMA LLM Deployment Guide',
    time: '5m ago',
    metric: '⬆ 2,847',
    color: '#ff4500',
    icon: '🟠'
  },
  {
    source: 'cvefeed',
    title: 'PAN-OS RCE Exploitation Code Released',
    time: '12m ago',
    metric: 'CRITICAL',
    color: '#ff0000',
    icon: '🔴'
  },
  {
    source: 'hnews',
    title: 'Show HN: Local LLM Deployment',
    time: '18m ago',
    metric: '247 pts',
    color: '#ff6600',
    icon: '🟠'
  },
  {
    source: 'twitter',
    title: 'Agentic AI API consumption stats surge',
    time: '22m ago',
    metric: '⬆ 4.2K likes',
    color: '#1da1f2',
    icon: '🔵'
  }
];

interface MetricTickerProps {
  value: string | number;
  label: string;
  trend?: string;
  color?: string;
  isAlert?: boolean;
}

const MetricTicker: React.FC<MetricTickerProps> = ({ value, label, trend, color, isAlert }) => (
  <div className={`flex flex-col items-center p-3 rounded-lg border ${
    isAlert 
      ? 'bg-red-500/10 border-red-500/30' 
      : 'bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/20'
  }`}>
    <div className={`text-2xl font-bold ${isAlert ? 'text-red-400' : 'text-cyan-400'}`}>
      {value}
    </div>
    <div className="text-xs text-gray-400 mt-1">{label}</div>
    {trend && (
      <div className={`text-xs mt-1 ${trend.includes('↑') ? 'text-emerald-400' : 'text-amber-400'}`}>
        {trend}
      </div>
    )}
  </div>
);

interface FeaturedStoryProps {
  story: typeof FEATURED_STORIES[0];
  isActive: boolean;
  onClick: () => void;
}

const FeaturedStory: React.FC<FeaturedStoryProps> = ({ story, isActive, onClick }) => (
  <div 
    onClick={onClick}
    className={`cursor-pointer transition-all duration-300 p-4 rounded-lg border-2 ${
      isActive 
        ? `${story.borderColor} bg-gradient-to-r ${story.color} ring-2 ring-violet-500/50` 
        : `${story.borderColor} bg-gradient-to-r ${story.color} opacity-60 hover:opacity-80`
    }`}
  >
    <div className="flex items-start gap-3">
      <div className="text-3xl">{story.icon}</div>
      <div className="flex-1">
        <h3 className="font-bold text-white">{story.title}</h3>
        <p className="text-sm text-gray-300">{story.subtitle}</p>
        <div className={`text-xs mt-2 font-semibold ${
          story.priority === 'critical' ? 'text-red-400' : 'text-cyan-400'
        }`}>
          {story.metric}
        </div>
      </div>
    </div>
  </div>
);

export interface MoldaviteDashboardProps {
  onLaunchGraph: () => void;
}

export const MoldaviteDashboard: React.FC<MoldaviteDashboardProps> = ({ onLaunchGraph }) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Auto-rotate featured stories every 8 seconds
  useEffect(() => {
    const storyInterval = setInterval(() => {
      setActiveStoryIndex((prev) => (prev + 1) % FEATURED_STORIES.length);
    }, 8000);

    return () => clearInterval(storyInterval);
  }, []);

  // Update time every second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900/20 to-slate-950 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            🧠 MINDMELD MATRIX
          </h1>
          <p className="text-gray-400">Real-time Intelligence Graph for the Internet Zeitgeist</p>
          <p className="text-xs text-gray-500 mt-2">Last updated: {time}</p>
        </div>

        {/* Live Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricTicker 
            value={LIVE_METRICS.totalNodes} 
            label="Active Nodes" 
            trend="↑243/min"
            color="cyan"
          />
          <MetricTicker 
            value={LIVE_METRICS.activeAlerts} 
            label="Critical Alerts" 
            trend="↑ NOW"
            isAlert
          />
          <MetricTicker 
            value={LIVE_METRICS.deepseekStars} 
            label="DeepSeek Weekly" 
            trend="⭐ MOMENTUM"
            color="cyan"
          />
          <MetricTicker 
            value={LIVE_METRICS.threatCorrelations} 
            label="Threat Correlations" 
            trend="📊 Active"
            color="purple"
          />
        </div>

        {/* Featured Stories Carousel */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Featured Stories (8s rotation)
          </h2>
          <div className="space-y-3">
            {FEATURED_STORIES.map((story, idx) => (
              <FeaturedStory
                key={story.id}
                story={story}
                isActive={idx === activeStoryIndex}
                onClick={() => setActiveStoryIndex(idx)}
              />
            ))}
          </div>
        </div>

        {/* Main CTA Button */}
        <div className="mb-8">
          <button
            onClick={onLaunchGraph}
            className="w-full py-4 px-6 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-violet-500/50"
          >
            <Play className="w-5 h-5" />
            ⚡ LAUNCH 3D INTELLIGENCE MAP
          </button>
        </div>

        {/* Live Feeds Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Feeds */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-400" />
              📡 Live OSINT Feeds
            </h2>
            <div className="space-y-2">
              {LIVE_FEEDS.map((feed, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-slate-600/50 transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-start gap-2 flex-1">
                      <span className="text-xl">{feed.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-300 font-medium">{feed.title}</p>
                        <p className="text-xs text-gray-500">{feed.time}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      feed.source === 'cvefeed'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {feed.metric}
                    </span>
                  </div>
                  <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1">
                    + Add to Graph <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge Notes Preview */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-emerald-400" />
              📝 Knowledge Notes
            </h2>
            <div className="space-y-3">
              {[
                {
                  title: 'Agentic AI Research',
                  excerpt: 'Key findings from DeepSeek, LangGraph, CrewAI analysis',
                  links: 3,
                  date: '2026-05-07'
                },
                {
                  title: 'Security Stack Documentation',
                  excerpt: 'PAN-OS, Ivanti, CVE correlation patterns',
                  links: 2,
                  date: '2026-05-06'
                },
                {
                  title: 'GPU Market Impact Analysis',
                  excerpt: 'HBM3 shortage → H100 pricing cascade → Training economics',
                  links: 4,
                  date: '2026-05-05'
                }
              ].map((note, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer"
                >
                  <h3 className="text-sm font-bold text-emerald-300">{note.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{note.excerpt}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">🔗 {note.links} links</span>
                    <span className="text-xs text-gray-500">{note.date}</span>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 px-3 text-sm font-medium bg-emerald-600/20 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400 rounded-lg transition-all">
                + Create New Note
              </button>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 p-4 rounded-lg bg-slate-900/50 border border-slate-700/50">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-xs">
            <div>
              <p className="text-gray-500">Sources</p>
              <p className="text-white font-bold">6</p>
            </div>
            <div>
              <p className="text-gray-500">Active Feeds</p>
              <p className="text-white font-bold">28</p>
            </div>
            <div>
              <p className="text-gray-500">Correlations</p>
              <p className="text-white font-bold">47</p>
            </div>
            <div>
              <p className="text-gray-500">Response Time</p>
              <p className="text-white font-bold">24ms</p>
            </div>
            <div>
              <p className="text-gray-500">Accuracy</p>
              <p className="text-white font-bold">94%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoldaviteDashboard;

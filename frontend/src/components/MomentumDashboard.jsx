import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Sparkles, Loader2, TrendingUp, Info } from 'lucide-react';
import { analyzeMomentum } from '../utils/api';

export default function MomentumDashboard({ matchId, momentumData, teams, isMockAI }) {
  const [selectedWindow, setSelectedWindow] = useState({ start: 75, end: 85, label: "Match Inflection Window (Mins 75-85)" });
  const [loading, setLoading] = useState(false);
  const [momentumAnalysis, setMomentumAnalysis] = useState({}); // Stores analysis text by start-end key
  const [error, setError] = useState(null);

  const homeKey = teams.home.name;
  const awayKey = teams.away.name;

  // Pre-configured shift intervals depending on selected match
  const getMatchWindows = () => {
    if (matchId === 'wc-2022-final') {
      return [
        { start: 0, end: 36, label: "Mins 0-36: Scaloni's Di María Trap" },
        { start: 75, end: 85, label: "Mins 75-85: Mbappé's Double Strike rollercoaster" },
        { start: 105, end: 118, label: "Mins 105-118: Extra Time Rebound & Penalty Chaos" }
      ];
    } else if (matchId === 'cl-2024-final') {
      return [
        { start: 15, end: 40, label: "Mins 15-40: Terzić's Transition Trap" },
        { start: 45, end: 70, label: "Mins 45-70: Ancelotti's Midfield Takeover" },
        { start: 70, end: 85, label: "Mins 70-85: Madrid Double-Strike Breakout" }
      ];
    } else {
      return [
        { start: 0, end: 45, label: "Mins 0-45: Low Block Gridlock" },
        { start: 60, end: 75, label: "Mins 60-75: Pep's Touchline Winger Stretch" },
        { start: 75, end: 90, label: "Mins 75-90: Closing Defensive Suffocation" }
      ];
    }
  };

  const windows = getMatchWindows();

  const handleRequestAnalysis = async (win) => {
    const key = `${win.start}-${win.end}`;
    if (momentumAnalysis[key]) return; // Already loaded

    setLoading(true);
    setError(null);
    try {
      const data = await analyzeMomentum(matchId, win.start, win.end);
      setMomentumAnalysis(prev => ({ ...prev, [key]: data.analysis }));
    } catch (err) {
      console.error(err);
      setError('Failed to analyze momentum shifts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Trigger analysis for default window on load
  React.useEffect(() => {
    const defaultWin = windows[1] || windows[0]; // Take middle or first
    if (defaultWin) {
      setSelectedWindow(defaultWin);
      handleRequestAnalysis(defaultWin);
    }
  }, [matchId]);

  const activeKey = `${selectedWindow.start}-${selectedWindow.end}`;

  // Custom tooltips for recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/90 border border-slate-800 p-3 rounded-xl shadow-lg font-mono text-xs">
          <p className="text-slate-400 font-bold mb-1">Minute {label}'</p>
          {payload.map((item, index) => (
            <p key={index} style={{ color: item.color }} className="font-semibold">
              {item.name}: {item.value}% Control
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Chart Section */}
      <div className="lg:col-span-8 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <span>Interactive Momentum Index</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">Minute-by-Minute Control Graph</span>
        </div>

        {/* Recharts Container */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-950/20 h-[360px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={momentumData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis 
                dataKey="minute" 
                stroke="#475569" 
                fontSize={10} 
                fontFamily="monospace"
                tickFormatter={(tick) => `${tick}'`}
              />
              <YAxis 
                domain={[0, 100]} 
                stroke="#475569" 
                fontSize={10} 
                fontFamily="monospace"
                tickFormatter={(tick) => `${tick}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
              <Line 
                type="monotone" 
                dataKey={homeKey} 
                stroke={teams.home.color} 
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
                name={teams.home.name}
              />
              <Line 
                type="monotone" 
                dataKey={awayKey} 
                stroke={teams.away.color} 
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
                name={teams.away.name}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend Tip */}
        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-900 text-xs text-slate-400 leading-relaxed font-sans flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-300 block mb-0.5">Control Index Calculation:</span>
            Calculated combining ball possession %, territorial territory gains, progressive passes completed, and shots on target. A score over 50% indicates team dominance.
          </div>
        </div>
      </div>

      {/* Explainer Sidebar */}
      <div className="lg:col-span-4 flex flex-col space-y-6">
        
        {/* Momentum Window Selector */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">Analyze Control Pivot</h3>
          <div className="flex flex-col gap-2">
            {windows.map((win, idx) => {
              const isActive = selectedWindow.start === win.start && selectedWindow.end === win.end;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedWindow(win);
                    handleRequestAnalysis(win);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-blue-500/10 border-blue-500/60 text-blue-400 font-semibold'
                      : 'bg-slate-900/60 border-slate-850 text-slate-400 hover:border-slate-800 hover:text-slate-300'
                  }`}
                >
                  <span className="text-xs font-bold leading-snug">{win.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Insight Box */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-850 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-2.5">
            <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              {isMockAI ? 'IBM Granite Emulator / Mock Mode' : 'IBM Granite Momentum Analyst'}
            </span>
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
              {isMockAI ? 'Offline Summary Mode' : 'Granite 3.0 Chat'}
            </span>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-500 text-xs font-mono gap-2">
              <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
              Correlating team statistics...
            </div>
          ) : error ? (
            <div className="text-xs text-red-400 bg-red-950/20 border border-red-900/30 p-3 rounded-lg">
              {error}
            </div>
          ) : momentumAnalysis[activeKey] ? (
            <div className="text-xs text-slate-300 space-y-3 leading-relaxed font-sans prose prose-invert max-w-none">
              {momentumAnalysis[activeKey].split('\n\n').map((para, pIdx) => {
                if (para.startsWith('###')) {
                  return <h4 key={pIdx} className="text-xs font-bold text-blue-400 mt-4">{para.replace(/###/g, '').trim()}</h4>;
                }
                return <p key={pIdx}>{para}</p>;
              })}
            </div>
          ) : (
            <div className="text-xs text-slate-500 italic">Select an inflection window to load analysis.</div>
          )}
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCw, Layers } from 'lucide-react';
import { analyzeTactics } from '../utils/api';

export default function TacticalAnalyzer({ matchId, lineups, tacticalShifts, isMockAI }) {
  const [selectedShiftIndex, setSelectedShiftIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tacticalAnalysis, setTacticalAnalysis] = useState({}); // Stores analysis by shift index
  const [error, setError] = useState(null);

  const currentShift = tacticalShifts[selectedShiftIndex];

  // Request AI breakdown of selected tactical shift
  const handleAnalyzeShift = async (index, shift) => {
    if (tacticalAnalysis[index]) return; // Already analyzed
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeTactics(matchId, shift);
      setTacticalAnalysis(prev => ({ ...prev, [index]: data.analysis }));
    } catch (err) {
      console.error(err);
      setError('Failed to analyze tactical shift. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Trigger analysis on first load of default shift
  React.useEffect(() => {
    if (currentShift && !tacticalAnalysis[selectedShiftIndex]) {
      handleAnalyzeShift(selectedShiftIndex, currentShift);
    }
  }, [selectedShiftIndex, matchId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Tactical board (Pitch Visualizer) */}
      <div className="lg:col-span-5 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <span>Digital Tactical Board</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">Starting Formations</span>
        </div>

        {/* The Pitch */}
        <div className="relative aspect-[3/4] rounded-2xl border border-emerald-950 overflow-hidden football-pitch shadow-2xl p-4 flex flex-col justify-between">
          
          {/* Pitch Lines Overlays */}
          <div className="absolute inset-0 border-[3px] border-emerald-500/10 pointer-events-none rounded-2xl m-3"></div>
          {/* Center line */}
          <div className="absolute top-1/2 left-3 right-3 h-[2px] bg-emerald-500/10 pointer-events-none"></div>
          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-emerald-500/10 pointer-events-none"></div>
          
          {/* Top Penalty Box */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-48 h-20 border-b-2 border-x-2 border-emerald-500/10 pointer-events-none"></div>
          {/* Top Six Yard Box */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-8 border-b-2 border-x-2 border-emerald-500/10 pointer-events-none"></div>

          {/* Bottom Penalty Box */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-48 h-20 border-t-2 border-x-2 border-emerald-500/10 pointer-events-none"></div>
          {/* Bottom Six Yard Box */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-8 border-t-2 border-x-2 border-emerald-500/10 pointer-events-none"></div>

          {/* Render Players */}
          {/* Home Team Players (Bottom Half, y-coord around 10-50, we translate coordinates mapping) */}
          {lineups.home.players.map((p, idx) => (
            <div
              key={`home-${idx}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 group cursor-default"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono shadow-md border-2 border-white/80 transition duration-300 group-hover:scale-110"
                style={{ backgroundColor: lineups.home.color || '#3b82f6', color: '#fff' }}
                title={`${p.name} (${p.role})`}
              >
                {p.number}
              </div>
              <span className="text-[10px] font-semibold text-white bg-slate-950/80 px-1.5 py-0.5 rounded mt-1 border border-slate-800 shadow whitespace-nowrap">
                {p.name.split(' ').pop()}
              </span>
            </div>
          ))}

          {/* Away Team Players (Top Half, y-coord around 50-90) */}
          {lineups.away.players.map((p, idx) => (
            <div
              key={`away-${idx}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 group cursor-default"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono shadow-md border-2 border-white/80 transition duration-300 group-hover:scale-110"
                style={{ backgroundColor: lineups.away.color || '#ef4444', color: '#fff' }}
                title={`${p.name} (${p.role})`}
              >
                {p.number}
              </div>
              <span className="text-[10px] font-semibold text-white bg-slate-950/80 px-1.5 py-0.5 rounded mt-1 border border-slate-800 shadow whitespace-nowrap">
                {p.name.split(' ').pop()}
              </span>
            </div>
          ))}

        </div>

        {/* Legend */}
        <div className="flex justify-between items-center gap-4 text-xs font-mono bg-slate-950/40 border border-slate-900 rounded-xl p-3.5">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full border border-white" style={{ backgroundColor: lineups.home.color }}></span>
            <span className="text-slate-300">{lineups.home.formation}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full border border-white" style={{ backgroundColor: lineups.away.color }}></span>
            <span className="text-slate-300">{lineups.away.formation}</span>
          </div>
        </div>
      </div>

      {/* Tactical adjustments list & AI Explanation */}
      <div className="lg:col-span-7 flex flex-col space-y-6">
        
        {/* Selector Tabs */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">Key Tactical Adaptations</h3>
          <div className="flex flex-col gap-2">
            {tacticalShifts.map((shift, idx) => {
              const isSelected = selectedShiftIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedShiftIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition duration-300 flex justify-between items-center cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-semibold'
                      : 'bg-slate-900/60 border-slate-850 text-slate-400 hover:border-slate-800 hover:text-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                        Min {shift.minute}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-100">{shift.title}</span>
                  </div>
                  <RefreshCw className={`w-4 h-4 text-slate-500 transition-transform duration-500 ${isSelected ? 'rotate-180 text-emerald-400' : ''}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Analysis Pane */}
        {currentShift && (
          <div className="glass-panel p-6 rounded-2xl border border-slate-850 space-y-4">
            
            {/* Shift Context Header */}
            <div className="border-b border-slate-800/80 pb-3">
              <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-widest block mb-1">
                Strategic Summary
              </span>
              <p className="text-sm text-slate-300 font-semibold leading-relaxed">
                {currentShift.summary}
              </p>
            </div>

            {/* AI Generator Panel */}
            <div className="bg-slate-900/40 p-5 rounded-xl border border-emerald-500/10 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-2.5">
                <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  {isMockAI ? 'IBM Granite Emulator / Mock Mode' : 'IBM Granite Tactical Breakdown'}
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                  {isMockAI ? 'Offline Simulator' : 'Granite Instructor v2'}
                </span>
              </div>

              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center text-slate-500 text-xs font-mono gap-2">
                  <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                  Running tactical simulation...
                </div>
              ) : error ? (
                <div className="text-xs text-red-400 bg-red-950/20 border border-red-900/30 p-3 rounded-lg">
                  {error}
                </div>
              ) : tacticalAnalysis[selectedShiftIndex] ? (
                <div className="text-sm text-slate-300 space-y-3 leading-relaxed font-sans prose prose-invert max-w-none">
                  {tacticalAnalysis[selectedShiftIndex].split('\n\n').map((para, pIdx) => {
                    if (para.startsWith('###')) {
                      return <h4 key={pIdx} className="text-sm font-bold text-emerald-400 mt-4">{para.replace(/###/g, '').trim()}</h4>;
                    }
                    return <p key={pIdx}>{para}</p>;
                  })}
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic">Select a shift to trigger AI review.</div>
              )}
            </div>

            {/* Tactical Detail Overlay Info */}
            <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl text-xs text-slate-400 leading-relaxed font-sans">
              <span className="font-semibold text-slate-300 block mb-1">Visualizing Strategy:</span>
              Use the tactical board on the left to see the team shapes during initial kick-off. 
              The analysis details how players moved *off* these baseline markers to transition shapes during the shift.
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

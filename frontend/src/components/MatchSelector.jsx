import React from 'react';
import { Calendar, MapPin, User, ChevronRight } from 'lucide-react';

export default function MatchSelector({ matches, selectedMatchId, onSelectMatch }) {
  const selectedMatch = matches.find(m => m.id === selectedMatchId);

  return (
    <div className="space-y-6">
      {/* Match Quick Selector Tabs */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className="text-lg font-bold text-slate-200 tracking-wide uppercase font-mono">
          Select Tactical Match Feed:
        </h2>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {matches.map((match) => {
            const isSelected = match.id === selectedMatchId;
            return (
              <button
                key={match.id}
                onClick={() => onSelectMatch(match.id)}
                className={`flex-1 md:flex-initial flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-semibold shadow-md shadow-emerald-500/5'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 text-sm">
                  <span>{match.teams.home.logo}</span>
                  <span className="font-mono text-xs">{match.teams.home.short}</span>
                  <span className="text-slate-600">vs</span>
                  <span>{match.teams.away.logo}</span>
                  <span className="font-mono text-xs">{match.teams.away.short}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isSelected ? 'rotate-90 text-emerald-400' : 'text-slate-500'}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Scoreboard Banner */}
      {selectedMatch && (
        <div className="glass-panel rounded-2xl overflow-hidden relative border border-slate-800/80">
          {/* Neon Top Ribbon */}
          <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"></div>
          
          <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-8 bg-slate-950/40">
            {/* Home Team */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left flex-1 justify-end">
              <div>
                <h3 className="text-2xl font-extrabold text-white font-sans">{selectedMatch.teams.home.name}</h3>
                <span className="text-xs text-slate-500 tracking-wider font-mono">HOME TEAM</span>
              </div>
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner"
                style={{ backgroundColor: `${selectedMatch.teams.home.color}20` }}
              >
                {selectedMatch.teams.home.logo}
              </div>
            </div>

            {/* Score & Live Tag */}
            <div className="flex flex-col items-center gap-2 px-6 py-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-lg min-w-[140px]">
              <div className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-blink"></span>
                Analyzed
              </div>
              <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
                {selectedMatch.score}
              </div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                {selectedMatch.status}
              </div>
            </div>

            {/* Away Team */}
            <div className="flex flex-col-reverse md:flex-row items-center gap-4 text-center md:text-right flex-1 justify-start">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner"
                style={{ backgroundColor: `${selectedMatch.teams.away.color}20` }}
              >
                {selectedMatch.teams.away.logo}
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white font-sans">{selectedMatch.teams.away.name}</h3>
                <span className="text-xs text-slate-500 tracking-wider font-mono">AWAY TEAM</span>
              </div>
            </div>
          </div>

          {/* Match Metadata Footer */}
          <div className="border-t border-slate-900 bg-slate-950/70 px-6 py-4 flex flex-wrap justify-between items-center gap-4 text-slate-400 text-xs font-mono">
            <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/60">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" />
              <span>{selectedMatch.competition} • {selectedMatch.date}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/60">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>{selectedMatch.venue}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/60">
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Ref: {selectedMatch.referee}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

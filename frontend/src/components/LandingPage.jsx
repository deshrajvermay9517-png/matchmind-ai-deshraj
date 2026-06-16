import React from 'react';
import { Activity, ShieldAlert, Cpu, TrendingUp, ArrowRight, Play } from 'lucide-react';

export default function LandingPage({ onEnterApp }) {
  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col justify-between football-pitch relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none"></div>

      {/* Header */}
      <header className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Cpu className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">Match<span className="text-emerald-400">Mind</span></span>
              <span className="text-[10px] block font-mono text-emerald-500 tracking-widest font-semibold uppercase leading-3">AI Engine</span>
            </div>
          </div>
          <button 
            onClick={onEnterApp}
            className="px-5 py-2 rounded-xl text-sm font-semibold border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition duration-300 flex items-center gap-2 cursor-pointer"
          >
            Launch Analyzer <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-24 text-center max-w-5xl mx-auto z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-8 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          IBM SkillsBuild AI Challenge Entry
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight font-sans">
          Understand the Game Like a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400">Tactical Master</span>
        </h1>
        
        <p className="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed">
          MatchMind AI uses **IBM Granite** language models to translate raw football events, tactical adjustments, and referee calls into clear, professional-grade insights.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center w-full max-w-md">
          <button 
            onClick={onEnterApp}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-500/25 transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            Start Match Analysis <Play className="w-5 h-5 fill-slate-950" />
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full mt-8">
          
          <div className="glass-panel glass-panel-hover p-6 rounded-2xl text-left transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Event Explainer</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Unpack key match events. Ask Granite to detail how spaces were opened or highlight the passing sequence.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover p-6 rounded-2xl text-left transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4 text-teal-400">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Tactical shifts</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Visualize formations and analyze manager instructions, substitutions, and defensive shape changes in real-time.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover p-6 rounded-2xl text-left transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 text-red-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">VAR Trust Companion</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Deconstruct controversial decisions. Access IFAB rule breakdowns interpreted clearly by AI.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover p-6 rounded-2xl text-left transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Momentum Insight</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Trace the tide of control. Correlate minute-by-minute team momentum shifts to strategic adjustments.
            </p>
          </div>

        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 mt-20 border-t border-slate-800/80 pt-10 w-full">
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-white">IBM Granite</div>
            <div className="text-xs text-emerald-500 uppercase tracking-widest font-mono font-semibold mt-1">Core AI Engine</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-white">99%</div>
            <div className="text-xs text-teal-400 uppercase tracking-widest font-mono font-semibold mt-1">VAR Trust Index</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-white">120+ Mins</div>
            <div className="text-xs text-blue-400 uppercase tracking-widest font-mono font-semibold mt-1">Granular Timeline</div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-6 text-center text-xs text-slate-500 z-10">
        <p>© 2026 MatchMind AI. Built using IBM technology. All rights reserved.</p>
      </footer>
    </div>
  );
}

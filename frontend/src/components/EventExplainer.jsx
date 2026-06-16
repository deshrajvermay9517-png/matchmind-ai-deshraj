import React, { useState } from 'react';
import { Sparkles, Send, HelpCircle, Loader2, ArrowRightLeft, ShieldAlert, Award, FileText } from 'lucide-react';
import { analyzeEvent } from '../utils/api';

export default function EventExplainer({ matchId, events, isMockAI }) {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [loadingEventId, setLoadingEventId] = useState(null);
  const [analyses, setAnalyses] = useState({}); // Stores generated event analyses
  const [customQuestions, setCustomQuestions] = useState({}); // Stores user input text for custom questions
  const [errors, setErrors] = useState({});

  // Helper to fetch AI explanation for a specific event
  const handleRequestAnalysis = async (event, isCustom = false) => {
    const question = isCustom ? customQuestions[event.id] || '' : '';
    setLoadingEventId(event.id);
    setErrors(prev => ({ ...prev, [event.id]: null }));

    try {
      const data = await analyzeEvent(matchId, event, question);
      setAnalyses(prev => ({ ...prev, [event.id]: data.analysis }));
      
      // If it was a custom question, clear that input
      if (isCustom) {
        setCustomQuestions(prev => ({ ...prev, [event.id]: '' }));
      }
    } catch (err) {
      console.error(err);
      setErrors(prev => ({ ...prev, [event.id]: 'AI service failed to generate explanation. Please try again.' }));
    } finally {
      setLoadingEventId(null);
    }
  };

  // Helper to render timeline event icon
  const getEventIcon = (type) => {
    switch (type) {
      case 'goal':
        return (
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Award className="w-5 h-5" />
          </div>
        );
      case 'substitution':
        return (
          <div className="w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
        );
      case 'var':
        return (
          <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Timeline Feed */}
      <div className="lg:col-span-2 space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span>Match Events Timeline</span>
          <span className="text-xs bg-slate-800 text-slate-400 font-mono px-2 py-0.5 rounded-full">
            {events.length} Key Moments
          </span>
        </h3>

        <div className="relative pl-6 border-l-2 border-slate-800 space-y-8 py-2">
          {events.map((event) => {
            const isExpanded = selectedEventId === event.id;
            const hasAnalysis = !!analyses[event.id];
            const isLoading = loadingEventId === event.id;

            return (
              <div key={event.id} className="relative group">
                {/* Timeline node icon */}
                <div className="absolute -left-[42px] top-0.5 bg-[#0b0f19] px-1">
                  {getEventIcon(event.type)}
                </div>

                <div className="glass-panel rounded-2xl border border-slate-800/80 hover:border-slate-700/80 p-5 transition duration-300">
                  {/* Event summary row */}
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-sm font-mono font-bold text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded-md border border-emerald-500/10">
                          {event.minute}'
                        </span>
                        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                          {event.type}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white leading-snug">
                        {event.title}
                      </h4>
                      <p className="text-sm text-slate-400 mt-1">
                        {event.summary}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedEventId(isExpanded ? null : event.id);
                        if (!hasAnalysis && !isExpanded) {
                          handleRequestAnalysis(event);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                        isExpanded
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {isExpanded ? 'Hide Analysis' : 'Explain Event'}
                    </button>
                  </div>

                  {/* Expanded AI Panel */}
                  {isExpanded && (
                    <div className="mt-5 pt-5 border-t border-slate-800/80 space-y-4 fade-enter fade-enter-active">
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900">
                        <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest block mb-2">
                          Live Event Details
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {event.detail}
                        </p>
                      </div>

                      {/* AI Response Container */}
                      <div className="bg-slate-900/40 p-5 rounded-xl border border-emerald-500/10 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800/60 pb-2.5">
                          <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                            {isMockAI ? 'IBM Granite Emulator / Mock Mode' : 'IBM Granite Tactical Insight'}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                            {isMockAI ? 'Offline Simulator' : 'Language Model Layer'}
                          </span>
                        </div>

                        {isLoading ? (
                          <div className="py-8 flex flex-col items-center justify-center text-slate-500 text-xs font-mono gap-2">
                            <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                            Generating tactical analysis...
                          </div>
                        ) : errors[event.id] ? (
                          <div className="text-xs text-red-400 bg-red-950/20 border border-red-900/30 p-3 rounded-lg">
                            {errors[event.id]}
                          </div>
                        ) : hasAnalysis ? (
                          <div className="text-sm text-slate-300 space-y-2 leading-relaxed font-sans prose prose-invert max-w-none">
                            {analyses[event.id].split('\n\n').map((para, pIdx) => {
                              if (para.startsWith('###')) {
                                return <h5 key={pIdx} className="text-sm font-bold text-emerald-400 mt-3">{para.replace(/###/g, '').trim()}</h5>;
                              }
                              return <p key={pIdx}>{para}</p>;
                            })}
                          </div>
                        ) : (
                          <div className="text-xs text-slate-500 italic">No analysis loaded.</div>
                        )}
                      </div>

                      {/* Fan Custom Question Form */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (customQuestions[event.id]?.trim()) {
                            handleRequestAnalysis(event, true);
                          }
                        }}
                        className="flex gap-2"
                      >
                        <input
                          type="text"
                          value={customQuestions[event.id] || ''}
                          onChange={(e) => setCustomQuestions(prev => ({ ...prev, [event.id]: e.target.value }))}
                          placeholder={`Ask Granite: "Why was ${event.player || 'the defense'} positioned here?"`}
                          disabled={isLoading}
                          className="flex-1 bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                        />
                        <button
                          type="submit"
                          disabled={isLoading || !customQuestions[event.id]?.trim()}
                          className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 p-2.5 rounded-xl transition cursor-pointer disabled:opacity-50"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guide Panel */}
      <div className="space-y-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Timeline Analytics</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Match timelines can be overwhelming for casual fans. 
            **MatchMind AI** isolates the critical inflection points of a match and breaks down the systemic causes of events.
          </p>
          <div className="border-t border-slate-900 pt-4 space-y-2 text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Goals & Shots Breakdown</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              <span>Tactical Subs Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>VAR Rules Justification</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ShieldAlert, Sparkles, Send, Loader2, Info, CheckCircle2, XCircle } from 'lucide-react';
import { analyzeVar } from '../utils/api';

export default function VarCompanion({ matchId, varIncidents, isMockAI }) {
  const [selectedVarIndex, setSelectedVarIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [varAnalysis, setVarAnalysis] = useState({}); // Stores generated VAR explanations by index
  const [customQuestions, setCustomQuestions] = useState({}); // Stores user input text for VAR chats
  const [error, setError] = useState(null);

  const currentIncident = varIncidents[selectedVarIndex];

  // Request AI breakdown of selected VAR incident
  const handleRequestAnalysis = async (index, incident, isCustom = false) => {
    const question = isCustom ? customQuestions[index] || '' : '';
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeVar(matchId, incident, question);
      setVarAnalysis(prev => ({ ...prev, [index]: data.analysis }));
      if (isCustom) {
        setCustomQuestions(prev => ({ ...prev, [index]: '' }));
      }
    } catch (err) {
      console.error(err);
      setError('Failed to generate VAR rule explanation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Trigger analysis on first load of default incident
  React.useEffect(() => {
    if (currentIncident && !varAnalysis[selectedVarIndex]) {
      handleRequestAnalysis(selectedVarIndex, currentIncident);
    }
  }, [selectedVarIndex, matchId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* VAR Incident List */}
      <div className="lg:col-span-4 flex flex-col space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-400" />
          <span>VAR Incident Center</span>
        </h3>
        
        <div className="flex flex-col gap-2">
          {varIncidents.length === 0 ? (
            <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6 text-center text-xs text-slate-500 italic">
              No VAR reviews recorded for this match.
            </div>
          ) : (
            varIncidents.map((incident, idx) => {
              const isSelected = selectedVarIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedVarIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition duration-300 flex items-start justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-red-500/10 border-red-500/50 text-red-400 font-semibold'
                      : 'bg-slate-900/60 border-slate-850 text-slate-400 hover:border-slate-800 hover:text-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                      Minute {incident.minute}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100">{incident.title}</h4>
                  </div>
                  {incident.varResult.includes('Upheld') ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Decision Detail & Rules Breakdown */}
      <div className="lg:col-span-8 flex flex-col space-y-6">
        {currentIncident ? (
          <div className="glass-panel p-6 rounded-2xl border border-slate-850 space-y-5">
            
            {/* Referee Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-slate-800/80 pb-4 text-xs font-mono">
              <div className="bg-slate-950/60 border border-slate-900 p-3 rounded-xl">
                <span className="text-slate-500 block mb-0.5 uppercase tracking-wider text-[9px]">Decision Checked</span>
                <span className="text-slate-200 font-semibold leading-tight">{currentIncident.refereeDecision}</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-900 p-3 rounded-xl">
                <span className="text-slate-500 block mb-0.5 uppercase tracking-wider text-[9px]">VAR Ruling</span>
                <span className="text-red-400 font-bold leading-tight">{currentIncident.varResult}</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-900 p-3 rounded-xl sm:col-span-1">
                <span className="text-slate-500 block mb-0.5 uppercase tracking-wider text-[9px]">IFAB Reference</span>
                <span className="text-teal-400 font-semibold leading-tight">{currentIncident.rulesReference.split(':')[0]}</span>
              </div>
            </div>

            {/* Event Description */}
            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-900 text-xs text-slate-300 leading-relaxed font-sans flex items-start gap-3">
              <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-400 block mb-1">Official Review Context:</span>
                {currentIncident.description}
              </div>
            </div>

            {/* Rule Reference Overlay */}
            <div className="bg-teal-500/5 p-4 rounded-xl border border-teal-500/20 text-xs text-slate-300 leading-relaxed font-sans">
              <span className="font-bold text-teal-400 font-mono block mb-1 uppercase tracking-wider text-[10px]">
                IFAB Official Rule:
              </span>
              <p className="italic text-slate-400">
                {currentIncident.rulesReference}
              </p>
            </div>

            {/* AI Companion Answer Box */}
            <div className="bg-slate-900/40 p-5 rounded-xl border border-red-500/10 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-2.5">
                <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                  {isMockAI ? 'IBM Granite Emulator / Mock Mode' : 'IBM Granite Rule Interpreter'}
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                  {isMockAI ? 'Offline Chat Mode' : 'Granite Chat Layer'}
                </span>
              </div>

              {loading ? (
                <div className="py-10 flex flex-col items-center justify-center text-slate-500 text-xs font-mono gap-2">
                  <Loader2 className="w-6 h-6 text-red-400 animate-spin" />
                  Analyzing VAR check protocol and camera angles...
                </div>
              ) : error ? (
                <div className="text-xs text-red-400 bg-red-950/20 border border-red-900/30 p-3 rounded-lg">
                  {error}
                </div>
              ) : varAnalysis[selectedVarIndex] ? (
                <div className="text-sm text-slate-300 space-y-3 leading-relaxed font-sans prose prose-invert max-w-none">
                  {varAnalysis[selectedVarIndex].split('\n\n').map((para, pIdx) => {
                    if (para.startsWith('###')) {
                      return <h4 key={pIdx} className="text-sm font-bold text-red-400 mt-4">{para.replace(/###/g, '').trim()}</h4>;
                    }
                    return <p key={pIdx}>{para}</p>;
                  })}
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic">Initiating VAR rules review...</div>
              )}
            </div>

            {/* User Custom Query form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (customQuestions[selectedVarIndex]?.trim()) {
                  handleRequestAnalysis(selectedVarIndex, currentIncident, true);
                }
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={customQuestions[selectedVarIndex] || ''}
                onChange={(e) => setCustomQuestions(prev => ({ ...prev, [selectedVarIndex]: e.target.value }))}
                placeholder="Ask Granite: 'Was this a natural arm position?' or 'Explain the offside lines'"
                disabled={loading}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500 transition"
              />
              <button
                type="submit"
                disabled={loading || !customQuestions[selectedVarIndex]?.trim()}
                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2.5 rounded-xl transition cursor-pointer disabled:opacity-50 text-xs font-semibold flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Ask VAR
              </button>
            </form>

          </div>
        ) : (
          <div className="glass-panel p-10 rounded-2xl border border-slate-850 text-center text-slate-500 italic">
            Select a match incident from the timeline to deconstruct the refereeing decisions.
          </div>
        )}
      </div>
    </div>
  );
}

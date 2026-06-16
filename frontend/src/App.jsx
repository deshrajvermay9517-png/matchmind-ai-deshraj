import React, { useState, useEffect } from 'react';
import { Cpu, Calendar, Activity, ShieldAlert, TrendingUp, RefreshCw, Sparkles, LogOut, ArrowLeft } from 'lucide-react';
import LandingPage from './components/LandingPage';
import MatchSelector from './components/MatchSelector';
import EventExplainer from './components/EventExplainer';
import TacticalAnalyzer from './components/TacticalAnalyzer';
import VarCompanion from './components/VarCompanion';
import MomentumDashboard from './components/MomentumDashboard';
import { fetchMatches, fetchMatchDetails } from './utils/api';

export default function App() {
  const [screen, setScreen] = useState('landing'); // 'landing' or 'dashboard'
  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline', 'tactics', 'var', 'momentum'
  
  const [matches, setMatches] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState('');
  const [matchDetails, setMatchDetails] = useState(null);
  
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState(null);

  // Load matches summary on mount
  useEffect(() => {
    async function loadMatches() {
      try {
        setError(null);
        const data = await fetchMatches();
        setMatches(data);
        if (data.length > 0) {
          setSelectedMatchId(data[0].id);
        }
      } catch (err) {
        console.error(err);
        setError('Connection failed. Please ensure the MatchMind AI backend is running on http://localhost:5000');
      } finally {
        setLoadingMatches(false);
      }
    }
    loadMatches();
  }, []);

  // Load full match details when selectedMatchId changes
  useEffect(() => {
    if (!selectedMatchId) return;

    async function loadDetails() {
      setLoadingDetails(true);
      setError(null);
      try {
        const data = await fetchMatchDetails(selectedMatchId);
        setMatchDetails(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load match tactical details. Please check the backend console.');
      } finally {
        setLoadingDetails(false);
      }
    }
    loadDetails();
  }, [selectedMatchId]);

  // Main screen renderer
  if (screen === 'landing') {
    return <LandingPage onEnterApp={() => setScreen('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col justify-between relative">
      
      {/* Background radial lines */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-emerald-950/10 to-transparent pointer-events-none"></div>

      {/* Main App Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo & Navigation Back */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setScreen('landing')}
              className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition cursor-pointer"
              title="Return to Landing Page"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center">
                <Cpu className="w-4.5 h-4.5 text-slate-950" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight leading-none">MatchMind <span className="text-emerald-400">AI</span></h1>
                <span className="text-[9px] block font-mono text-emerald-500 uppercase tracking-widest leading-none mt-1">Live Match Explainer</span>
              </div>
            </div>
          </div>

          {/* AI Connection Status Badge */}
          <div className="flex items-center gap-2">
            {matchDetails && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/10 bg-emerald-500/5 text-xs text-emerald-400 font-mono font-semibold shadow-inner shadow-emerald-500/5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI: {matchDetails.isMockAI ? 'IBM Granite Emulator / Mock Mode' : 'IBM Granite (Live via watsonx.ai)'}</span>
              </div>
            )}
            
            <button 
              onClick={() => {
                if (selectedMatchId) {
                  // Reload match details
                  setSelectedMatchId(prev => prev);
                }
              }}
              className="p-2 rounded-lg border border-slate-850 bg-slate-900/40 text-slate-400 hover:text-slate-200 transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full z-10 space-y-8">
        
        {/* Loading matches splash */}
        {loadingMatches ? (
          <div className="h-96 flex flex-col items-center justify-center text-slate-400 gap-3">
            <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
            <span className="text-sm font-mono uppercase tracking-wider">Synchronizing match schedules...</span>
          </div>
        ) : error ? (
          // Connection Error State
          <div className="glass-panel p-8 rounded-2xl border-red-500/20 bg-red-500/5 max-w-xl mx-auto text-center space-y-4">
            <ShieldAlert className="w-12 h-12 text-red-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Connection Failed</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {error}
            </p>
            <div className="pt-2">
              <button 
                onClick={() => window.location.reload()}
                className="bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 px-5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition cursor-pointer"
              >
                Retry Connection
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Match selector & score banner */}
            <MatchSelector 
              matches={matches} 
              selectedMatchId={selectedMatchId} 
              onSelectMatch={setSelectedMatchId} 
            />

            {/* Feature Tabs Nav */}
            <div className="border-b border-slate-900 flex flex-wrap gap-1">
              {[
                { id: 'timeline', label: 'Match Event Explainer', icon: Calendar, color: 'text-emerald-400' },
                { id: 'tactics', label: 'Tactical Shift Analyzer', icon: Cpu, color: 'text-teal-400' },
                { id: 'var', label: 'VAR Trust Companion', icon: ShieldAlert, color: 'text-red-400' },
                { id: 'momentum', label: 'Momentum Insight Dashboard', icon: TrendingUp, color: 'text-blue-400' }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-emerald-500 text-emerald-400 bg-slate-950/20'
                        : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-800'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? tab.color : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Details Panel Loader */}
            {loadingDetails || !matchDetails ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-500 font-mono text-xs gap-2">
                <RefreshCw className="w-6 h-6 text-emerald-500 animate-spin" />
                <span>Running analytical overlay...</span>
              </div>
            ) : (
              // Active Tab Render
              <div className="min-h-[400px]">
                {activeTab === 'timeline' && (
                  <EventExplainer 
                    matchId={selectedMatchId} 
                    events={matchDetails.events} 
                    isMockAI={matchDetails.isMockAI}
                  />
                )}
                
                {activeTab === 'tactics' && (
                  <TacticalAnalyzer 
                    matchId={selectedMatchId} 
                    lineups={matchDetails.lineups} 
                    tacticalShifts={matchDetails.tacticalShifts} 
                    isMockAI={matchDetails.isMockAI}
                  />
                )}

                {activeTab === 'var' && (
                  <VarCompanion 
                    matchId={selectedMatchId} 
                    varIncidents={matchDetails.varIncidents} 
                    isMockAI={matchDetails.isMockAI}
                  />
                )}

                {activeTab === 'momentum' && (
                  <MomentumDashboard 
                    matchId={selectedMatchId} 
                    momentumData={matchDetails.momentum} 
                    teams={matchDetails.teams} 
                    isMockAI={matchDetails.isMockAI}
                  />
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Main Footer */}
      <footer className="border-t border-slate-950 bg-slate-950/40 py-6 text-center text-xs text-slate-600 z-10 font-mono">
        <p>MatchMind AI Core • IBM SkillsBuild Builders Challenge Entry • React + Express + IBM Granite</p>
      </footer>
    </div>
  );
}

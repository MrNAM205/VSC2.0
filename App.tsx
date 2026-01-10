
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import KnowledgeView from './components/KnowledgeView';
import CognitionConsole from './components/CognitionConsole';
import Drafter from './components/Drafter';
import ScriptViewer from './components/ScriptViewer';
import Archive from './components/Archive';
import Jarvis from './components/Jarvis';
import Dialogos from './components/Dialogos';
import EndorsementStudio from './components/EndorsementStudio';
import Vault from './components/Vault';
import FilingNavigator from './components/FilingNavigator';
import PersonaManager from './components/PersonaManager';
import TrustBuilder from './components/TrustBuilder';
import TopicExplorer from './components/TopicExplorer';
import RemedyTracker from './components/RemedyTracker';
import PlaybookEngine from './components/PlaybookEngine';
import ResearchLab from './components/ResearchLab';
import MediaInterceptor from './components/MediaInterceptor';
import PropertyTaxModule from './components/PropertyTaxModule';
import ForbiddenDecoder from './components/ForbiddenDecoder';
import { ArchiveEntry } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeResourceId, setActiveResourceId] = useState<string | null>(null);
  const [activePayload, setActivePayload] = useState<any>(null);
  const [archive, setArchive] = useState<ArchiveEntry[]>([]);

  const handleArchive = (entry: ArchiveEntry) => {
    setArchive(prev => [...prev, entry]);
  };

  const handleNavigate = (view: string, resourceId?: string, payload?: any) => {
    setCurrentView(view);
    if (resourceId) {
        setActiveResourceId(resourceId);
    }
    if (payload) {
        setActivePayload(payload);
    }
  };

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return <Dashboard />;
      case 'decoder': return <ForbiddenDecoder onArchive={handleArchive} onNavigate={handleNavigate} />;
      case 'tax': return <PropertyTaxModule onArchive={handleArchive} onNavigate={handleNavigate} />;
      case 'media': return <MediaInterceptor onArchive={handleArchive} onNavigate={handleNavigate} />;
      case 'lab': return <ResearchLab />;
      case 'playbooks': return <PlaybookEngine onArchive={handleArchive} />;
      case 'topics': return <TopicExplorer onNavigate={handleNavigate} />;
      case 'filing': return <FilingNavigator onNavigate={handleNavigate} initialWorkflowId={activeResourceId} payload={activePayload} />;
      case 'remedy': return <RemedyTracker onNavigate={handleNavigate} />;
      case 'identity': return <PersonaManager />;
      case 'trust': return <TrustBuilder />;
      case 'jarvis': return <Jarvis onNavigate={handleNavigate} />;
      case 'dialogos': return <Dialogos />;
      case 'endorsement': return <EndorsementStudio />;
      case 'vault': return <Vault />;
      case 'knowledge': return <KnowledgeView />;
      case 'cognition': return <CognitionConsole onArchive={handleArchive} />;
      case 'drafter': return <Drafter onArchive={handleArchive} initialTemplateId={activeResourceId} payload={activePayload} />;
      case 'scripts': return <ScriptViewer initialScriptId={activeResourceId} />;
      case 'archive': return <Archive entries={archive} />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <main className="flex-1 relative flex flex-col min-w-0">
        <header className="h-16 border-b border-sovereign-800/30 bg-slate-900 flex items-center justify-between px-8 shadow-sm shrink-0 z-20">
            <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-sovereign-600 tracking-widest">SESSION ID:</span>
                <span className="font-mono text-xs text-slate-400">0x{Date.now().toString(16).toUpperCase()}</span>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1 bg-sovereign-900/20 rounded border border-sovereign-800/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-sovereign-300 tracking-wide uppercase">Lawful Mode</span>
                </div>
            </div>
        </header>
        <div className="flex-1 overflow-hidden relative">
            {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;

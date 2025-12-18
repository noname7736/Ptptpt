
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import HardwareView from './components/HardwareView';
import NetworkView from './components/NetworkView';
import SecurityView from './components/SecurityView';
import AICommandCenter from './components/AICommandCenter';

export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  HARDWARE = 'HARDWARE',
  NETWORK = 'NETWORK',
  SECURITY = 'SECURITY',
  AI_COMMAND = 'AI_COMMAND'
}

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);
  const [systemLoad, setSystemLoad] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLoad(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(10, Math.min(95, prev + delta));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderView = () => {
    switch (activeView) {
      case ViewType.DASHBOARD: return <DashboardView systemLoad={systemLoad} />;
      case ViewType.HARDWARE: return <HardwareView />;
      case ViewType.NETWORK: return <NetworkView />;
      case ViewType.SECURITY: return <SecurityView />;
      case ViewType.AI_COMMAND: return <AICommandCenter />;
      default: return <DashboardView systemLoad={systemLoad} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0b] text-gray-200 overflow-hidden">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeView={activeView} />
        <main className="flex-1 overflow-y-auto p-6 dragon-gradient">
          <div className="max-w-7xl mx-auto h-full">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;

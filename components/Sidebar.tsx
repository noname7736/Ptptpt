
import React from 'react';
import { ViewType } from '../App';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const menuItems = [
    { type: ViewType.DASHBOARD, label: 'Central Command', icon: 'M4 6h16M4 12h16M4 18h16' },
    { type: ViewType.AI_COMMAND, label: 'Sovereign AI Console', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { type: ViewType.HARDWARE, label: 'Hardware Grid', icon: 'M5 12h14M12 5l7 7-7 7' },
    { type: ViewType.NETWORK, label: 'Network Gravity', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { type: ViewType.SECURITY, label: 'Sovereign Root', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  ];

  return (
    <div className="w-64 bg-[#111114] border-r border-gray-800 flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-bold text-white">DR</div>
          <h1 className="text-xl font-bold text-white tracking-wider uppercase leading-tight">Dragon <br/><span className="text-red-500 text-sm">Sovereign Enterprise</span></h1>
        </div>
      </div>
      
      <nav className="flex-1 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.type}
            onClick={() => setActiveView(item.type)}
            className={`w-full flex items-center px-6 py-4 transition-all duration-200 ${
              activeView === item.type 
                ? 'bg-red-600/10 text-red-500 border-r-4 border-red-600 scale-[1.02]' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <svg className="w-5 h-5 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className="font-semibold text-sm uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-800">
        <div className="bg-gray-900 rounded-lg p-3">
          <p className="text-[10px] text-gray-500 uppercase font-extrabold mb-2 tracking-widest">Enterprise Guard</p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[11px] font-bold text-gray-300 uppercase tracking-tighter italic">Absolute Sovereign Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

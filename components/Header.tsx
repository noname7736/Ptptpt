
import React from 'react';
import { ViewType } from '../App';

interface HeaderProps {
  activeView: ViewType;
}

const Header: React.FC<HeaderProps> = ({ activeView }) => {
  return (
    <header className="h-16 bg-[#111114] border-b border-gray-800 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-bold text-gray-100 uppercase tracking-widest mono-font">
          {activeView.replace('_', ' ')}
        </h2>
        <span className="px-2 py-1 bg-gray-800 rounded text-[10px] font-bold text-gray-400 uppercase">Enterprise Mode</span>
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-right">
          <p className="text-xs text-gray-500 font-bold uppercase">Infrastructure Integrity</p>
          <p className="text-sm text-green-500 font-bold">99.999% UP</p>
        </div>
        <div className="h-10 w-[1px] bg-gray-800"></div>
        <div className="flex items-center space-x-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-white">Administrator</p>
            <p className="text-xs text-gray-500 uppercase">The Sovereign</p>
          </div>
          <div className="w-10 h-10 bg-gray-800 rounded-full border border-gray-700 overflow-hidden">
            <img src="https://picsum.photos/seed/sovereign/40/40" alt="Profile" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

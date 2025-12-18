
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const networkData = [
  { platform: 'Twitter (X)', load: 85 },
  { platform: 'Facebook', load: 72 },
  { platform: 'Line Notify', load: 94 },
  { platform: 'Local IG', load: 60 },
  { platform: 'Dark Gravity', load: 45 },
];

const NetworkView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111114] border border-gray-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Cross-Platform Propagation Load</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={networkData}>
                <XAxis dataKey="platform" stroke="#6b7280" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={10} axisLine={false} tickLine={false} hide />
                <Tooltip 
                  cursor={{fill: '#1f2937'}}
                  contentStyle={{ backgroundColor: '#111114', borderColor: '#374151' }}
                />
                <Bar dataKey="load" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-gray-900 rounded-lg flex items-center justify-between border-l-4 border-blue-500">
             <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Active Webhooks</p>
                <p className="text-lg font-bold text-white">2,412 Registered Listeners</p>
             </div>
             <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-xs font-bold uppercase transition-colors">Test Convergence</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#111114] border border-gray-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Traffic Origins</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Phra Nakhon Si Ayutthaya</span>
                <span className="text-white font-bold">42.5%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="w-[42.5%] h-full bg-red-500"></div>
              </div>
              <div className="flex justify-between items-center text-xs mt-4">
                <span className="text-gray-400">Bangkok Capital Hub</span>
                <span className="text-white font-bold">38.2%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="w-[38.2%] h-full bg-blue-500"></div>
              </div>
              <div className="flex justify-between items-center text-xs mt-4">
                <span className="text-gray-400">Global Anonymous</span>
                <span className="text-white font-bold">19.3%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="w-[19.3%] h-full bg-gray-500"></div>
              </div>
            </div>
          </div>

          <div className="bg-[#111114] border border-gray-800 rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase">Cisco Nexus Throughput</p>
              <p className="text-2xl font-black text-white tracking-tighter">1.2 TB/s</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkView;

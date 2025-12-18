
import React from 'react';

const HardwareView: React.FC = () => {
  const hardwareStack = [
    { 
      brand: 'HPE', 
      model: 'ProLiant DL380 Gen10', 
      role: 'Soul-Binding Logic Node', 
      specs: '2x Intel Xeon Scalable 8380, 1.5TB RAM', 
      status: 'Optimal',
      temp: '42°C'
    },
    { 
      brand: 'Dell', 
      model: 'PowerEdge R750', 
      role: 'Gravity Compute Cluster', 
      specs: '2x Xeon Platinum 8360Y, 2TB RAM', 
      status: 'High Load',
      temp: '48°C'
    },
    { 
      brand: 'IBM', 
      model: 'Elastic Storage System', 
      role: 'Absolute Truth Repository', 
      specs: '10 PB NVMe All-Flash', 
      status: 'Syncing',
      temp: '38°C'
    },
    { 
      brand: 'Cisco', 
      model: 'Nexus 9300-GX', 
      role: 'Global Zero-Latency Hub', 
      specs: '400G Throughput, 1.6Tbps capacity', 
      status: 'Streaming',
      temp: '45°C'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-red-600/10 border border-red-500/20 p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-red-600 p-2 rounded">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Enterprise Iron Grid</h3>
            <p className="text-sm text-gray-400">Silicon Root of Trust enabled across all 12 main processing nodes.</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 font-bold uppercase">Total Rack Load</p>
          <p className="text-2xl font-black text-white uppercase tracking-widest">12.4 kW</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {hardwareStack.map((node, i) => (
          <div key={i} className="bg-[#111114] border border-gray-800 rounded-xl p-6 hover:shadow-2xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="px-2 py-0.5 bg-gray-800 rounded text-[10px] font-bold text-gray-300 uppercase mr-2">{node.brand}</span>
                <h4 className="text-xl font-bold text-white mt-1">{node.model}</h4>
              </div>
              <div className="text-right">
                <p className={`text-xs font-bold uppercase ${node.status === 'Optimal' ? 'text-green-500' : 'text-yellow-500'}`}>
                  ● {node.status}
                </p>
                <p className="text-[10px] text-gray-500 mono-font mt-1">Uptime: 247d 12h</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Functional Role</p>
                <p className="text-sm text-gray-200">{node.role}</p>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Specifications</p>
                <p className="text-sm text-gray-200">{node.specs}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="w-2/3 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${node.status === 'Optimal' ? 'bg-green-500' : 'bg-yellow-500'}`} 
                  style={{ width: `${Math.random() * 40 + 20}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400 font-bold uppercase">{node.temp} Core Temp</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HardwareView;

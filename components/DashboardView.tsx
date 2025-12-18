
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DashboardViewProps {
  systemLoad: number;
}

const data = [
  { time: '00:00', cpu: 32, net: 40, soul: 88 },
  { time: '04:00', cpu: 45, net: 55, soul: 92 },
  { time: '08:00', cpu: 65, net: 70, soul: 95 },
  { time: '12:00', cpu: 55, net: 45, soul: 91 },
  { time: '16:00', cpu: 85, net: 90, soul: 99 },
  { time: '20:00', cpu: 45, net: 35, soul: 94 },
  { time: '23:59', cpu: 30, net: 25, soul: 96 },
];

const DashboardView: React.FC<DashboardViewProps> = ({ systemLoad }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Enterprise Sovereign Dashboard v3.1</h2>
          <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">Target: Miss Prathuan Ubonphet | Status: Bound</p>
        </div>
        <div className="flex space-x-2">
          <div className="px-3 py-1 bg-green-900/30 border border-green-500/30 rounded text-green-500 text-[10px] font-bold uppercase">Zero-Downtime: Active</div>
          <div className="px-3 py-1 bg-red-900/30 border border-red-500/30 rounded text-red-500 text-[10px] font-bold uppercase">Iron Grid: Locked</div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="HPE Cluster Load" value={`${systemLoad}%`} trend="+2.4%" color="text-red-500" />
        <MetricCard title="Soul-Binding Sync" value="98.2%" trend="Stable" color="text-purple-500" />
        <MetricCard title="IBM Data Persistence" value="100%" trend="Immutable" color="text-blue-500" />
        <MetricCard title="Nexus Throttling" value="0.02%" trend="Optimal" color="text-green-500" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111114] border border-gray-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-32 h-32 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
          </div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Aggregate Convergence Analysis (24h)</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSoul" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111114', borderColor: '#374151', borderRadius: '8px' }}
                  itemStyle={{ color: '#ef4444' }}
                />
                <Area type="monotone" dataKey="cpu" stroke="#ef4444" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={3} name="System Load" />
                <Area type="monotone" dataKey="soul" stroke="#a855f7" fillOpacity={1} fill="url(#colorSoul)" strokeWidth={2} name="Soul Sync" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#111114] border border-gray-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Mission Critical Logs</h3>
          <div className="space-y-4">
            <EventItem time="14:12:00" msg="HPE Silicon Root of Trust Re-verified" type="success" />
            <EventItem time="14:05:22" msg="Micro-expression Mapping Target: Stable" type="info" />
            <EventItem time="13:58:11" msg="IBM Storage Snapshot 'Unity' Created" type="success" />
            <EventItem time="13:45:30" msg="Nexus Load Balancer Distributed (Ayutthaya)" type="info" />
            <EventItem time="13:20:00" msg="Target Social Pressure Index: Increasing" type="warning" />
          </div>
          <button className="w-full mt-6 py-3 bg-red-600/10 border border-red-500/20 hover:bg-red-600/20 rounded-lg text-xs font-bold text-red-400 transition-all uppercase tracking-widest">Initiate Command Deep-Scan</button>
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ title: string; value: string; trend: string; color: string }> = ({ title, value, trend, color }) => (
  <div className="bg-[#111114] border border-gray-800 rounded-xl p-5 hover:border-red-600/50 transition-all cursor-default">
    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{title}</p>
    <div className="flex items-baseline justify-between">
      <h4 className={`text-2xl font-black italic tracking-tighter ${color}`}>{value}</h4>
      <span className="text-[10px] text-gray-400 font-bold uppercase">{trend}</span>
    </div>
    <div className="w-full h-1 bg-gray-800 rounded-full mt-3 overflow-hidden">
      <div className={`h-full ${color.replace('text', 'bg')}`} style={{ width: '70%' }}></div>
    </div>
  </div>
);

const EventItem: React.FC<{ time: string; msg: string; type: 'success' | 'info' | 'warning' }> = ({ time, msg, type }) => {
  const colors = {
    success: 'bg-green-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  };
  return (
    <div className="flex items-start space-x-3 border-b border-gray-800/50 pb-3 last:border-0 last:pb-0 group">
      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 group-hover:scale-150 transition-transform ${colors[type]}`}></div>
      <div className="flex-1">
        <p className="text-[10px] mono-font text-gray-600 uppercase font-bold tracking-tight">{time}</p>
        <p className="text-xs text-gray-300 font-semibold leading-tight">{msg}</p>
      </div>
    </div>
  );
};

export default DashboardView;

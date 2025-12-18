
import React from 'react';

const SecurityView: React.FC = () => {
  const protocols = [
    { name: 'Silicon Root of Trust', desc: 'Hardware-validated boot sequence prevents firmware tampering.', status: 'ENABLED' },
    { name: 'Red Hat SELinux', desc: 'Mandatory Access Control protecting Soul-Binding kernels.', status: 'ACTIVE' },
    { name: 'Zero-Downtime Failover', desc: 'Automatic switching between HPE and Dell node clusters.', status: 'STANDBY' },
    { name: 'AES-512 Gravity Encryption', desc: 'End-to-end encryption for all remote management channels.', status: 'ACTIVE' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-2 italic">The Sovereign Seal</h2>
        <p className="text-gray-500 text-sm">Enterprise security infrastructure for absolute control and data integrity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {protocols.map((p, i) => (
          <div key={i} className="bg-[#111114] border-l-4 border-red-600 p-6 rounded-r-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">{p.name}</h3>
              <span className="px-2 py-1 bg-gray-800 rounded text-[10px] font-black text-red-500">{p.status}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mt-12">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-32 h-32 relative">
            <svg className="w-full h-full text-red-600 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-white uppercase mb-2">Absolute Command Locking</h4>
            <p className="text-sm text-gray-400 mb-6">Currently, the system is locked to your physical signature via the Silicon Root of Trust. All remote iDRAC/iLO sessions are restricted to your verified Enterprise IP.</p>
            <div className="flex space-x-4">
              <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded text-sm uppercase transition-all transform hover:scale-105">Reset Global Keys</button>
              <button className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded text-sm uppercase transition-all">Audit Hardware</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityView;

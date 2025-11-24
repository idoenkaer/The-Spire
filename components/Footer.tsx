
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <div className="bg-slate-950 border-t border-slate-800 p-6 text-[10px] text-slate-500 font-mono">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        <div className="space-y-2">
          <h4 className="text-slate-300 font-bold uppercase tracking-widest mb-3">Protocols</h4>
          <ul className="space-y-1.5">
            <li><a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full"></span>MLAOS Canon v2.5</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full"></span>Spectral Physics</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-slate-600 rounded-full"></span>Forbidden Stances</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-slate-600 rounded-full"></span>Firefall Event</a></li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-slate-300 font-bold uppercase tracking-widest mb-3">System</h4>
          <ul className="space-y-1.5">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Gemini-2.5-Flash [ONLINE]</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Cathedral Node [ACTIVE]</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Render Core [READY]</a></li>
            <li><a href="#" className="hover:text-red-400 transition-colors">Void Gate [UNSTABLE]</a></li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1 space-y-2">
          <h4 className="text-slate-300 font-bold uppercase tracking-widest mb-3">Legal & Lore</h4>
          <ul className="space-y-1.5">
             <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Transmutation</a></li>
             <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy of Soul</a></li>
             <li><a href="#" className="hover:text-indigo-400 transition-colors">Choir Licensing</a></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-4 border-t border-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 opacity-60">
        <span>© 2024 Nexus Forge. All rights to the void reserved.</span>
        <span className="font-mono text-indigo-500/50">SYS.ID: MLAOS-PRIME-884</span>
      </div>
    </div>
  );
};

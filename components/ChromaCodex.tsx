
import React, { useState, useMemo } from 'react';
import { CHROMA_PROFILES, CHROMA_LIBRARY } from '../constants';
import { Button } from './ui/Button';
import { IconSparkles } from './Icons';

interface ChromaCodexProps {
  onClose: () => void;
  onSelect: (value: string) => void;
}

export const ChromaCodex: React.FC<ChromaCodexProps> = ({ onClose, onSelect }) => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return CHROMA_PROFILES.filter(p => 
      p.label.toLowerCase().includes(term) || 
      (CHROMA_LIBRARY[p.value] || '').toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
      {/* Container */}
      <div className="w-full max-w-4xl h-[85vh] bg-slate-900 border border-slate-700 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
           <div>
             <h2 className="text-xl font-bold text-indigo-400 flex items-center gap-2">
               <IconSparkles className="w-5 h-5" />
               MLAOS Chroma Codex
             </h2>
             <p className="text-xs text-slate-500 font-mono mt-1 tracking-wider">INDEXING NODE 884 // TOTAL ENTRIES: {CHROMA_PROFILES.length}</p>
           </div>
           <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors font-mono text-xs uppercase">✕ Close Access</button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/50">
           <input 
             type="text" 
             placeholder="Search by name, physics, mood, or choir..." 
             className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-600 font-mono"
             value={search}
             onChange={e => setSearch(e.target.value)}
             autoFocus
           />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-700">
           {filtered.map(item => {
             const description = CHROMA_LIBRARY[item.value] || "Standard spectrum definition.";
             const isFirefall = item.value.includes("FIREFALL");
             const isSeismic = item.value.includes("SCREAM") || item.value.includes("ROAR") || item.value.includes("PLEA");
             const isTaboo = item.value.includes("PROVOCATION") || item.value.includes("GEOMETRY");
             
             let borderColor = "border-slate-800";
             let bgColor = "bg-slate-900";
             let titleColor = "text-slate-200";

             if (isFirefall) {
                 borderColor = "border-amber-900/50";
                 bgColor = "bg-amber-950/20";
                 titleColor = "text-amber-500";
             } else if (isSeismic) {
                 borderColor = "border-rose-900/50";
                 bgColor = "bg-rose-950/20";
                 titleColor = "text-rose-400";
             } else if (isTaboo) {
                 borderColor = "border-purple-900/50";
                 bgColor = "bg-purple-950/20";
                 titleColor = "text-purple-400";
             }
             
             return (
               <div key={item.value} className={`p-4 rounded-lg border transition-all hover:bg-slate-800/80 group ${borderColor} ${bgColor}`}>
                 <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-bold text-sm tracking-wide ${titleColor} group-hover:text-indigo-300`}>
                      {item.label}
                    </h3>
                    <Button size="sm" variant={isFirefall ? 'danger' : 'secondary'} onClick={() => { onSelect(item.value); onClose(); }}>
                      Equip Protocol
                    </Button>
                 </div>
                 <p className="text-xs text-slate-400 font-mono leading-relaxed border-l-2 border-slate-800 pl-3">
                   {description}
                 </p>
               </div>
             )
           })}
           {filtered.length === 0 && (
             <div className="text-center py-20 text-slate-500">
               <div className="mb-2 font-mono text-xs uppercase">Query yielded null results</div>
               <div className="text-[10px] text-slate-600">Try searching for "Gold", "Rupture", or "Defiance"</div>
             </div>
           )}
        </div>
        
        {/* Footer Status */}
        <div className="p-2 border-t border-slate-800 bg-slate-950 text-[10px] text-slate-600 font-mono text-center uppercase">
            System Online • Library Version 2.5 • Access Granted
        </div>
      </div>
    </div>
  );
};

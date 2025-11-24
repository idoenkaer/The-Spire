
import React from 'react';
import { IconDownload, IconSparkles, IconHistory } from './Icons';
import { GenerationResult } from '../types';
import { Button } from './ui/Button';
import { Rain } from './Rain';

interface ImageResultProps {
  result: GenerationResult | null;
  history: GenerationResult[];
  onSelectHistory: (item: GenerationResult) => void;
  isGenerating: boolean;
}

const ImageResult: React.FC<ImageResultProps> = ({ result, history, onSelectHistory, isGenerating }) => {
  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result.imageUrl;
    link.download = `nexus-avatar-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 h-full bg-slate-950 flex flex-col relative overflow-hidden">
        {/* Background Ambient Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
            <Rain opacity={0.15} intensity={80} speed={1.2} />
        </div>

      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        {isGenerating ? (
            <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-md animate-pulse">
                <div className="w-64 h-64 md:w-96 md:h-96 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-slate-700/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                    <IconSparkles className="w-12 h-12 text-indigo-500/50 animate-pulse" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-medium text-slate-200">Forging your avatar...</h3>
                    <p className="text-slate-500 text-sm">Consulting the neural matrix. This may take a moment.</p>
                </div>
            </div>
        ) : result ? (
          <div className="flex flex-col items-center space-y-6 w-full max-w-2xl animate-in zoom-in-95 duration-500">
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-800">
              <img 
                src={result.imageUrl} 
                alt="Generated Avatar" 
                className="w-full h-auto max-h-[70vh] object-contain bg-slate-900" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                 <Button onClick={handleDownload} variant="primary">
                    <IconDownload className="w-4 h-4 mr-2" />
                    Download High Res
                 </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4 max-w-md p-8 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <IconSparkles className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-200">Ready to Create</h2>
            <p className="text-slate-400">
              Configure your character's traits in the panel to the left and hit generate to bring them to life.
            </p>
          </div>
        )}
      </div>

      {/* History Bar */}
      {history.length > 0 && (
        <div className="h-32 border-t border-slate-800 bg-slate-900/80 backdrop-blur z-20 flex flex-col">
            <div className="px-4 py-2 flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider border-b border-slate-800/50">
                <IconHistory className="w-3 h-3" />
                Session History
            </div>
            <div className="flex-1 overflow-x-auto flex items-center gap-4 p-4 scrollbar-thin scrollbar-thumb-slate-700">
            {history.map((item, idx) => (
                <button 
                key={item.timestamp}
                onClick={() => onSelectHistory(item)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${result?.timestamp === item.timestamp ? 'border-indigo-500 ring-2 ring-indigo-500/30' : 'border-slate-700 hover:border-slate-500'}`}
                >
                <img src={item.imageUrl} className="w-full h-full object-cover" alt="History" />
                </button>
            ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default ImageResult;

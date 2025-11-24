
import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { IconDice, IconSparkles } from './Icons';
import { getChromaFromRoll } from '../constants';

interface ChromaDiceRollerProps {
  onApply: (chromaValue: string) => void;
}

export const ChromaDiceRoller: React.FC<ChromaDiceRollerProps> = ({ onApply }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [finalResult, setFinalResult] = useState<{ roll: number, tier: string, profile: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRolling) {
      interval = setInterval(() => {
        setCurrentNumber(Math.floor(Math.random() * 100) + 1);
      }, 50);

      // Stop rolling after 1.5s
      setTimeout(() => {
        clearInterval(interval);
        const finalRoll = Math.floor(Math.random() * 100) + 1;
        const result = getChromaFromRoll(finalRoll);
        
        setCurrentNumber(finalRoll);
        setFinalResult({ roll: finalRoll, tier: result.tier, profile: result.profile });
        setIsRolling(false);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isRolling]);

  const handleRoll = () => {
    setFinalResult(null);
    setIsRolling(true);
  };

  if (!isOpen) {
    return (
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={() => setIsOpen(true)}
        className="w-full mt-2 border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/30"
      >
        <IconDice className="w-4 h-4 mr-2" />
        Roll D100 Chroma Table
      </Button>
    );
  }

  return (
    <div className="mt-4 p-4 rounded-xl bg-black/60 border border-indigo-500/50 backdrop-blur-sm relative overflow-hidden animate-in fade-in zoom-in-95">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <div className="flex justify-between w-full items-start">
           <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Ritual Roll</h4>
           <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white text-xs">✕</button>
        </div>

        {/* The Die */}
        <div className="w-24 h-24 rounded-2xl bg-slate-900 border-2 border-indigo-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)]">
           <span className={`text-4xl font-mono font-bold ${isRolling ? 'text-slate-400 blur-sm' : 'text-white'}`}>
             {currentNumber.toString().padStart(2, '0')}
           </span>
        </div>

        {/* Result Area */}
        <div className="min-h-[60px] w-full flex flex-col items-center justify-center">
            {isRolling ? (
                <span className="text-xs text-indigo-400 animate-pulse">Consulting the void...</span>
            ) : finalResult ? (
                <div className="space-y-2 w-full animate-in slide-in-from-bottom-2">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500">{finalResult.tier}</div>
                    <div className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
                        {finalResult.profile.replace('FIREFALL:', '').replace('SOLAR:', '').replace('SCREAM:', '')}
                    </div>
                </div>
            ) : (
                <span className="text-xs text-slate-500">Press roll to determine fate.</span>
            )}
        </div>

        {/* Actions */}
        {!finalResult ? (
            <Button onClick={handleRoll} disabled={isRolling} fullWidth className="shadow-indigo-500/20">
                {isRolling ? 'Rolling...' : 'Cast Die'}
            </Button>
        ) : (
            <div className="flex gap-2 w-full">
                <Button variant="secondary" onClick={handleRoll} fullWidth size="sm">Reroll</Button>
                <Button 
                    variant="primary" 
                    onClick={() => {
                        onApply(finalResult.profile);
                        setIsOpen(false);
                    }} 
                    fullWidth 
                    size="sm"
                >
                    <IconSparkles className="w-3 h-3 mr-1" />
                    Apply
                </Button>
            </div>
        )}
      </div>
    </div>
  );
};

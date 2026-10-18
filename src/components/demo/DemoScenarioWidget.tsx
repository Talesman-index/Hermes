import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  RotateCcw, 
  ChevronUp, 
  ChevronDown, 
  Check, 
  Sparkles, 
  ArrowRight,
  Info
} from 'lucide-react';

export const DemoScenarioWidget: React.FC = () => {
  const { runDemoNextStep, resetDemoScenario, currentDemoStepIndex, shipments, setActiveRole } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const scenarioSteps = [
    { step: 1, title: 'Création expédition', role: 'client', desc: 'Client crée HMD-DEMO-001 (Cotonou ➔ Parakou)' },
    { step: 2, title: 'Affectation collecte', role: 'arena', desc: 'Arena affecte Koffi Mensah à la collecte' },
    { step: 3, title: 'Collecte à domicile', role: 'courier', desc: 'Koffi récupère le colis chez Client Démo A' },
    { step: 4, title: 'Dépôt agence car', role: 'courier', desc: 'Koffi dépose le colis au guichet Cotonou' },
    { step: 5, title: 'Embarquement car', role: 'carrier', desc: 'Compagnie confirme le chargement et départ' },
    { step: 6, title: 'Arrivée Parakou', role: 'carrier', desc: 'Compagnie confirme l’arrivée à la gare Parakou' },
    { step: 7, title: 'Affectation livraison', role: 'arena', desc: 'Arena affecte Bio Sabi au dernier kilomètre' },
    { step: 8, title: 'Retrait agence', role: 'courier', desc: 'Bio Sabi retire le colis au guichet Parakou' },
    { step: 9, title: 'Livraison finale', role: 'courier', desc: 'Bio Sabi remet le colis contre code secret' },
    { step: 10, title: 'Parcours achevé', role: 'client', desc: 'Client & transporteur constatent le succès' },
  ];

  return (
    <div className="fixed bottom-20 sm:bottom-4 right-3 left-3 sm:left-auto sm:right-4 z-40 max-w-sm transition-all">
      <div className="bg-[#0B0F19]/95 backdrop-blur-xl text-white rounded-3xl shadow-2xl border border-slate-800 overflow-hidden">
        {/* Toggle Bar */}
        <div className="p-3.5 bg-[#070A11] flex items-center justify-between text-xs">
          <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-2 h-2 rounded-full bg-[#D4F63D] animate-ping" />
            <span className="font-bold text-[#D4F63D]">Guide Pitch Démo</span>
            <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded-full text-white font-bold">
              {currentDemoStepIndex}/10
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => runDemoNextStep()}
              className="py-1 px-2.5 rounded-xl bg-[#D4F63D] hover:bg-[#c2e62a] text-[#0B0F19] font-black transition-all cursor-pointer flex items-center gap-1 text-[11px] shadow-sm active:scale-95"
              title="Avancer au rôle suivant dans la démonstration"
            >
              <Play size={10} className="fill-current" />
              <span>Suivant</span>
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
          </div>
        </div>

        {/* Collapsed Preview */}
        {!isExpanded && (
          <div className="px-3.5 py-2 text-[11px] text-slate-300 flex items-center justify-between bg-[#0B0F19]">
            <span className="truncate">
              Prochain rôle : <strong className="text-[#D4F63D]">{scenarioSteps[currentDemoStepIndex - 1]?.title || 'Cycle terminé'}</strong>
            </span>
            <button 
              onClick={() => setIsExpanded(true)}
              className="text-[10px] text-teal-400 hover:underline shrink-0 ml-2 font-semibold cursor-pointer"
            >
              Détails
            </button>
          </div>
        )}

        {/* Expanded Steps List */}
        {isExpanded && (
          <div className="p-3.5 space-y-2.5 max-h-72 overflow-y-auto bg-[#0B0F19] text-xs">
            <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-slate-800 text-slate-400">
              <span className="font-medium">Parcours commercial 3 à 5 min</span>
              <button
                onClick={resetDemoScenario}
                className="text-[#D4F63D] hover:underline flex items-center gap-1 font-bold cursor-pointer"
              >
                <RotateCcw size={10} />
                <span>Recommencer</span>
              </button>
            </div>

            <div className="space-y-1.5">
              {scenarioSteps.map((s) => {
                const isCurrent = s.step === currentDemoStepIndex;
                const isPast = s.step < currentDemoStepIndex;
                return (
                  <div
                    key={s.step}
                    onClick={() => {
                      setActiveRole(s.role as any);
                    }}
                    className={`p-2.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between ${
                      isCurrent
                        ? 'bg-[#D4F63D]/15 border border-[#D4F63D]/40 text-white'
                        : isPast
                        ? 'bg-white/5 text-slate-400'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${
                          isCurrent
                            ? 'bg-[#D4F63D] text-[#0B0F19]'
                            : isPast
                            ? 'bg-emerald-900 text-emerald-200'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isPast ? <Check size={10} className="stroke-[3]" /> : s.step}
                      </span>
                      <div>
                        <p className={`font-bold ${isCurrent ? 'text-[#D4F63D]' : ''}`}>
                          {s.title}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate max-w-[200px]">{s.desc}</p>
                      </div>
                    </div>

                    {isCurrent && (
                      <span className="text-[9px] font-black text-[#D4F63D] bg-[#D4F63D]/20 px-1.5 py-0.5 rounded-md animate-pulse">
                        ACTIF
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

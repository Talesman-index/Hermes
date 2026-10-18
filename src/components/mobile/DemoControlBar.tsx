import React from 'react';
import { useMobileApp } from '../../context/MobileAppContext';
import { WORKFLOW_STAGES } from '../../types';
import { Play, RotateCcw, Smartphone, Monitor, ChevronRight, Sparkles, Check } from 'lucide-react';

export const DemoControlBar: React.FC = () => {
  const { 
    activeShipment, 
    advanceStep, 
    rewindStep, 
    resetDemoData, 
    deviceFrame, 
    toggleDeviceFrame,
    activeTab,
    openTracking,
    openOnboarding
  } = useMobileApp();

  const currentStage = WORKFLOW_STAGES.find((w) => w.step === activeShipment.currentStep);
  const nextStage = WORKFLOW_STAGES.find((w) => w.step === activeShipment.currentStep + 1);

  return (
    <aside aria-label="Contrôles de démonstration" className="w-full bg-[#0B0F19] text-white border-b border-slate-800 px-3 py-2 text-xs shadow-md">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Demo badge & active shipment step */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4F63D]/15 text-[#D4F63D] border border-[#D4F63D]/30 font-bold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4F63D] animate-ping" />
            DÉMO CLIENT HERMES
          </span>

          <div className="hidden sm:flex items-center gap-1 text-slate-300">
            <span className="font-mono text-xs font-bold text-white">{activeShipment.reference}</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">
              Étape <strong className="text-[#D4F63D] font-mono">{activeShipment.currentStep}/9</strong> : {currentStage?.title}
            </span>
          </div>
        </div>

        {/* Right: Actions for the presenter */}
        <div className="flex items-center gap-2">
          {activeShipment.currentStep < 9 ? (
            <button
              onClick={() => {
                advanceStep();
                if (activeTab === 'home' || activeTab === 'shipments') {
                  openTracking(activeShipment.id);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D4F63D] hover:bg-[#c2e62a] text-[#0B0F19] font-black text-xs shadow-md shadow-[#D4F63D]/25 transition-all active:scale-95 cursor-pointer"
              title="Passer à l'étape suivante du parcours logistique"
            >
              <Play size={11} className="fill-current" />
              <span>Étape suivante ({activeShipment.currentStep + 1}/9)</span>
              {nextStage && <span className="hidden md:inline font-normal text-slate-900/80">· {nextStage.title}</span>}
              <ChevronRight size={13} className="stroke-[3]" />
            </button>
          ) : (
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
              <Check size={12} className="stroke-[3]" />
              <span>Colis livré avec succès</span>
            </div>
          )}

          <button
            onClick={resetDemoData}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
            title="Réinitialiser le scénario de démo au départ"
          >
            <RotateCcw size={12} />
            <span className="hidden sm:inline">Réinitialiser</span>
          </button>

          <button
            onClick={openOnboarding}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-[#D4F63D] hover:text-white transition-colors cursor-pointer text-xs font-bold"
            title="Afficher l'onboarding de présentation 3D"
          >
            <Sparkles size={12} className="text-[#D4F63D]" />
            <span className="hidden sm:inline">Onboarding</span>
          </button>

          {/* Device Frame View Switcher (Desktop only) */}
          <button
            onClick={toggleDeviceFrame}
            className="hidden lg:inline-flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs"
            title={deviceFrame ? 'Passer en affichage plein écran' : 'Afficher le cadre smartphone iPhone'}
          >
            {deviceFrame ? <Monitor size={13} /> : <Smartphone size={13} />}
            <span>{deviceFrame ? 'Plein écran' : 'Cadre mobile'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

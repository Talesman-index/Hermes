import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveRole } from '../../types';
import { 
  Package, 
  RotateCcw, 
  Play, 
  User, 
  Bike, 
  Bus, 
  ShieldCheck, 
  Home, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activeRole, 
    setActiveRole, 
    resetDemoScenario, 
    runDemoNextStep, 
    currentDemoStepIndex,
    selectedShipment 
  } = useApp();

  const navItems: { role: ActiveRole; label: string; icon: React.ElementType; badge?: string }[] = [
    { role: 'landing', label: 'Accueil', icon: Home },
    { role: 'client', label: 'Espace Client', icon: User, badge: 'Envois' },
    { role: 'courier', label: 'Coursiers Hermes', icon: Bike, badge: 'Missions' },
    { role: 'carrier', label: 'Compagnies Car', icon: Bus, badge: 'Interurbain' },
    { role: 'arena', label: 'Strategy ARENA', icon: ShieldCheck, badge: 'Tour de contrôle' },
  ];

  const getStepLabel = (step: number) => {
    switch (step) {
      case 1:
        return 'Créer l’expédition (Client)';
      case 2:
        return 'Affecter collecte (Arena)';
      case 3:
        return 'Collecter colis (Coursier Cotonou)';
      case 4:
        return 'Déposer en gare (Coursier)';
      case 5:
        return 'Départ autocar (Compagnie)';
      case 6:
        return 'Arrivée Parakou (Compagnie)';
      case 7:
        return 'Affecter livraison (Arena)';
      case 8:
        return 'Retrait gare (Coursier)';
      case 9:
        return 'Livraison finale destinataire';
      case 10:
        return 'Cycle complété avec succès !';
      default:
        return 'Dérouler le scénario';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-xl border-b border-slate-800/80 text-white shadow-lg transition-all">
      {/* Top micro bar: Demo context & live simulator stepper */}
      <div className="bg-[#070A11] border-b border-slate-800/60 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4F63D]/10 text-[#D4F63D] border border-[#D4F63D]/30 font-semibold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4F63D] animate-ping" />
              PILOTE BÉNIN · RNIE 2
            </span>
            <span className="text-slate-400 font-medium hidden sm:inline">
              Cotonou ➔ Parakou (420 km)
            </span>
          </div>

          {/* Quick Guided Demo Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => runDemoNextStep()}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4F63D] hover:bg-[#c4e82d] text-[#0B0F19] font-bold text-xs shadow-md shadow-[#D4F63D]/20 transition-all active:scale-95 cursor-pointer"
              title="Avancer automatiquement au prochain rôle dans le scénario"
            >
              <Play size={11} className="fill-current" />
              <span>Étape démo {currentDemoStepIndex}/10</span>
              <span className="hidden md:inline font-normal text-slate-900/80">· {getStepLabel(currentDemoStepIndex)}</span>
              <ChevronRight size={13} />
            </button>

            <button
              onClick={resetDemoScenario}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
              title="Réinitialiser le scénario"
            >
              <RotateCcw size={11} />
              <span className="hidden sm:inline">Réinitialiser</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand */}
        <div 
          onClick={() => setActiveRole('landing')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#D4F63D] text-[#0B0F19] flex items-center justify-center font-black shadow-lg shadow-[#D4F63D]/25 group-hover:scale-105 transition-transform">
            <Package size={22} className="stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">HERMES</span>
              <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.2 rounded-md bg-[#D4F63D]/20 text-[#D4F63D] border border-[#D4F63D]/30">
                PROTOTYPE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              by <span className="font-semibold text-slate-200">Strategy ARENA</span>
            </p>
          </div>
        </div>

        {/* Roles Navigation Pill (Desktop & Tablets) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#121929] p-1.5 rounded-2xl border border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRole === item.role;
            return (
              <button
                key={item.role}
                onClick={() => setActiveRole(item.role)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#D4F63D] text-[#0B0F19] shadow-sm font-bold shadow-[#D4F63D]/20 scale-[1.02]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon size={15} className={isActive ? 'text-[#0B0F19]' : 'text-slate-400'} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`hidden xl:inline text-[9px] px-1.5 py-0.5 rounded font-mono ${
                      isActive ? 'bg-[#0B0F19]/15 text-[#0B0F19]' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Active Demo Reference Preview */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800/80">
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">Colis pilote</p>
            <p className="text-xs font-mono font-bold text-[#D4F63D]">
              {selectedShipment ? selectedShipment.reference : 'HMD-DEMO-001'}
            </p>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#D4F63D] animate-pulse" />
        </div>
      </div>
    </header>
  );
};

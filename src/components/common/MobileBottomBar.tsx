import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveRole } from '../../types';
import { Home, Package, Bike, Bus, ShieldCheck } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { activeRole, setActiveRole, currentDemoStepIndex } = useApp();

  const tabs: { role: ActiveRole; label: string; icon: React.ElementType }[] = [
    { role: 'landing', label: 'Accueil', icon: Home },
    { role: 'client', label: 'Client', icon: Package },
    { role: 'courier', label: 'Coursier', icon: Bike },
    { role: 'carrier', label: 'Compagnie', icon: Bus },
    { role: 'arena', label: 'Arena', icon: ShieldCheck },
  ];

  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-50">
      <nav className="bg-[#0B0F19]/95 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl p-1.5 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeRole === tab.role;

          return (
            <button
              key={tab.role}
              onClick={() => setActiveRole(tab.role)}
              className={`flex-1 py-2 px-1 flex flex-col items-center justify-center gap-1 rounded-xl transition-all duration-200 cursor-pointer relative ${
                isActive
                  ? 'bg-[#D4F63D] text-[#0B0F19] font-bold shadow-md shadow-[#D4F63D]/20 scale-[1.02]'
                  : 'text-slate-400 hover:text-white active:scale-95'
              }`}
            >
              <div className="relative">
                <Icon size={18} className={isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
                {tab.role === 'client' && currentDemoStepIndex === 1 && !isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D4F63D] animate-ping" />
                )}
                {tab.role === 'courier' && (currentDemoStepIndex === 3 || currentDemoStepIndex === 4 || currentDemoStepIndex === 8 || currentDemoStepIndex === 9) && !isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D4F63D] animate-ping" />
                )}
                {tab.role === 'carrier' && (currentDemoStepIndex === 5 || currentDemoStepIndex === 6) && !isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D4F63D] animate-ping" />
                )}
              </div>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

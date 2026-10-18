import React from 'react';
import { useMobileApp } from '../../context/MobileAppContext';
import { MobileTab } from '../../types';
import { Home, PlusCircle, PackageCheck, Box, User } from 'lucide-react';

export const MobileNavBar: React.FC = () => {
  const { activeTab, setActiveTab, shipments } = useMobileApp();

  const activeCount = shipments.filter((s) => s.currentStep < 9).length;

  const tabs: { id: MobileTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'create', label: 'Expédier', icon: PlusCircle },
    { id: 'shipments', label: 'Mes colis', icon: Box, badge: activeCount },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <nav aria-label="Navigation principale" className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F19]/95 backdrop-blur-xl border-t border-slate-800/80 px-4 py-2 pb-safe max-w-md mx-auto">
      <div className="flex items-center justify-around gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer relative ${
                isActive
                  ? 'bg-emerald-600 text-white font-black shadow-lg shadow-emerald-600/30 scale-[1.03]'
                  : 'text-slate-400 hover:text-white active:scale-95'
              }`}
            >
              <div className="relative">
                <Icon size={20} className={isActive ? 'stroke-[2.6]' : 'stroke-[1.8]'} />
                {tab.badge && tab.badge > 0 && !isActive && (
                  <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-bold tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

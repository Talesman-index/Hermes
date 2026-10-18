import React from 'react';
import { useMobileApp } from '../../context/MobileAppContext';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export const MobileFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { deviceFrame } = useMobileApp();

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-start py-0 sm:py-6 selection:bg-[#D4F63D] selection:text-[#0B0F19]">
      {/* Smartphone Mockup Wrapper on Desktop / Tablet */}
      <div
        className={`w-full transition-all duration-300 ${
          deviceFrame
            ? 'max-w-[420px] sm:my-3 sm:rounded-[44px] sm:border-[10px] sm:border-[#0B0F19] sm:shadow-2xl sm:shadow-slate-900/40 relative sm:overflow-hidden bg-[#F7F9F5]'
            : 'max-w-md w-full bg-[#F7F9F5]'
        }`}
      >
        {/* iOS Native Status Bar (Simulated) */}
        <div className="bg-[#F7F9F5] pt-3 pb-2 px-6 flex items-center justify-between text-xs font-semibold text-slate-800 select-none z-30 sticky top-0">
          <span className="font-bold text-xs tracking-tight">9:41</span>

          {/* Dynamic Island Pill */}
          <div className="w-24 h-4 rounded-full bg-[#0B0F19] mx-auto hidden sm:block shadow-inner" />

          <div className="flex items-center gap-1.5 text-slate-700">
            <Signal size={12} className="stroke-[2.5]" />
            <Wifi size={13} className="stroke-[2.5]" />
            <BatteryMedium size={14} className="stroke-[2.5]" />
          </div>
        </div>

        {/* Screen Content Container */}
        <div className="px-4 py-2 min-h-[820px] flex flex-col justify-between">
          {children}
        </div>

        {/* Home Indicator Bar (Simulated bottom pill) */}
        <div className="w-32 h-1 bg-slate-300 rounded-full mx-auto my-2 hidden sm:block pointer-events-none" />
      </div>
    </div>
  );
};

import React from 'react';
import { useMobileApp } from '../../context/MobileAppContext';

export const MobileFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { deviceFrame } = useMobileApp();

  return (
    <div className="min-h-screen bg-[#F0F4F2] flex flex-col items-center justify-start py-0 sm:py-4 selection:bg-emerald-600 selection:text-white">
      {/* Smartphone Mockup Wrapper on Desktop / Tablet */}
      <div
        className={`w-full transition-all duration-300 ${
          deviceFrame
            ? 'max-w-[420px] sm:my-2 sm:rounded-[36px] sm:shadow-2xl sm:shadow-emerald-950/20 relative sm:overflow-hidden bg-[#F7F9F5]'
            : 'max-w-md w-full bg-[#F7F9F5]'
        }`}
      >
        {/* Screen Content Container */}
        <div className="px-4 py-2 min-h-[820px] flex flex-col justify-between">
          {children}
        </div>
      </div>
    </div>
  );
};

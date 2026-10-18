import React from 'react';

interface HermesLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light' | 'mono';
  showSubtitle?: boolean;
  className?: string;
}

export const HermesLogo: React.FC<HermesLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
  className = '',
}) => {
  // Dimensions mapping
  const iconSizes = {
    sm: 32,
    md: 40,
    lg: 52,
    xl: 68,
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const s = iconSizes[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Dynamic Geometric Hermes Winged Emblem */}
      <div 
        className="relative flex items-center justify-center shrink-0 rounded-2xl bg-[#0B0F19] text-[#D4F63D] shadow-lg shadow-[#D4F63D]/20 transition-transform duration-300 hover:scale-105"
        style={{ width: s, height: s }}
      >
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/4 h-3/4"
        >
          {/* Subtle background glow circle */}
          <circle cx="24" cy="24" r="20" fill="#D4F63D" fillOpacity="0.12" />

          {/* Winged Hermes stylized 'H' and parcel box */}
          {/* Left vertical pillar */}
          <path 
            d="M12 11V37C12 38.1046 12.8954 39 14 39H16C17.1046 39 18 38.1046 18 37V11C18 9.89543 17.1046 9 16 9H14C12.8954 9 12 9.89543 12 11Z" 
            fill="#D4F63D" 
          />

          {/* Right vertical pillar */}
          <path 
            d="M30 11V37C30 38.1046 30.8954 39 32 39H34C35.1046 39 36 38.1046 36 37V11C36 9.89543 35.1046 9 34 9H32C30.8954 9 30 9.89543 30 11Z" 
            fill="#D4F63D" 
          />

          {/* Dynamic forward bridge (represents speed, connection, route) */}
          <path 
            d="M16 21H32V27H16V21Z" 
            fill="#D4F63D" 
          />

          {/* Upper winged aerodynamic chevron (Hermes caduceus wing) */}
          <path 
            d="M18 15L24 9L30 15L24 18L18 15Z" 
            fill="#FFFFFF" 
          />

          {/* Central energetic dot / package pin */}
          <circle cx="24" cy="24" r="2.5" fill="#0B0F19" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span 
            className={`font-black tracking-tight font-sans ${textSizes[size]} ${
              variant === 'light' ? 'text-white' : 'text-slate-900'
            }`}
          >
            HERMES
          </span>
          <span className="text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded-md bg-[#D4F63D] text-[#0B0F19]">
            BÉNIN
          </span>
        </div>

        {showSubtitle && (
          <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-0.5">
            by <strong className={variant === 'light' ? 'text-slate-200' : 'text-slate-700'}>Strategy ARENA</strong>
          </p>
        )}
      </div>
    </div>
  );
};

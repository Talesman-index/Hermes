import React from 'react';

interface HermesLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light' | 'mono';
  showSubtitle?: boolean;
  withCard?: boolean;
  className?: string;
}

export const HermesLogo: React.FC<HermesLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
  withCard = false,
  className = '',
}) => {
  // Dimensions mapping
  const iconSizes = {
    sm: 30,
    md: 40,
    lg: 52,
    xl: 66,
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  const s = iconSizes[size];

  const content = (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Winged Hermes Emblem matching user reference: horizontal wing slats on left + forward soaring silhouette on right */}
      <div 
        className="relative flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105"
        style={{ width: s, height: (s * 32) / 44 }}
      >
        <svg 
          viewBox="0 0 64 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          <defs>
            <linearGradient id="hermesWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>

          {/* Left Wing Slats (3 horizontal aerodynamic speed feathers) */}
          {/* Top feather */}
          <path 
            d="M4 14C4 11.7909 5.79086 10 8 10H28L24 16H8C5.79086 16 4 14.2091 4 14Z" 
            fill="url(#hermesWingGrad)" 
          />
          {/* Middle feather */}
          <path 
            d="M10 20C10 17.7909 11.7909 16 14 16H30L26 22H14C11.7909 22 10 20.2091 10 20Z" 
            fill="url(#hermesWingGrad)" 
          />
          {/* Bottom feather */}
          <path 
            d="M16 26C16 23.7909 17.7909 22 20 22H32L28 28H20C17.7909 28 16 26.2091 16 26Z" 
            fill="url(#hermesWingGrad)" 
          />

          {/* Dynamic Forward-Soaring Hermes Figure Silhouette (Right side) */}
          {/* Head & upper helmet wing */}
          <path 
            d="M32 10C34.5 7.5 38 6 42 7C43.5 10 42 13 40 15L35 18L32 10Z" 
            fill="url(#hermesWingGrad)" 
          />
          {/* Forward leaning aerodynamic torso and wing body */}
          <path 
            d="M26 14L38 12C41.5 14 43 17 41 21L36 29L32 25L28 34L25 32L29 24L25 21L26 14Z" 
            fill="url(#hermesWingGrad)" 
          />
          {/* Forward speed trail / dynamic lower foot */}
          <path 
            d="M34 26L38 31L32 40L29 38L33 30L34 26Z" 
            fill="url(#hermesWingGrad)" 
          />
        </svg>
      </div>

      {/* Typography: HERMES Bold Italic + Slogan 'Votre colis, notre mission.' */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline gap-1.5">
          <span 
            className={`font-black italic tracking-wide font-sans ${titleSizes[size]} ${
              variant === 'light' ? 'text-white' : 'text-slate-900'
            }`}
          >
            HERMES
          </span>
          <span className="text-[9px] font-black tracking-wider uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
            BÉNIN
          </span>
        </div>

        {showSubtitle && (
          <p 
            className={`font-semibold tracking-tight ${subtitleSizes[size]} ${
              variant === 'light' ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Votre colis, notre mission.
          </p>
        )}
      </div>
    </div>
  );

  if (withCard) {
    return (
      <div className="inline-flex items-center bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-slate-100">
        {content}
      </div>
    );
  }

  return content;
};

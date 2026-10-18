import React from 'react';

interface HermesLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'dark' | 'light';
  colorScheme?: 'emerald' | 'gold' | 'white';
  showSubtitle?: boolean;
  withCard?: boolean;
  layout?: 'horizontal' | 'vertical';
  animated?: boolean;
  className?: string;
}

export const HermesLogo: React.FC<HermesLogoProps> = ({
  size = 'md',
  variant = 'dark',
  colorScheme = 'emerald',
  showSubtitle = true,
  withCard = false,
  layout = 'horizontal',
  animated = false,
  className = '',
}) => {
  // Dimensions mapping
  const dimensions = {
    xs: { iconW: 28, iconH: 18, title: 'text-sm', sub: 'text-[8px]', gap: 'gap-1.5' },
    sm: { iconW: 36, iconH: 24, title: 'text-base', sub: 'text-[9px]', gap: 'gap-2' },
    md: { iconW: 48, iconH: 32, title: 'text-xl', sub: 'text-[11px]', gap: 'gap-2.5' },
    lg: { iconW: 64, iconH: 42, title: 'text-2xl', sub: 'text-xs', gap: 'gap-3' },
    xl: { iconW: 84, iconH: 56, title: 'text-3xl', sub: 'text-sm', gap: 'gap-3.5' },
    '2xl': { iconW: 110, iconH: 72, title: 'text-4xl', sub: 'text-base', gap: 'gap-4' },
  };

  const dim = dimensions[size];

  // SVG Unique gradient ID to prevent DOM collision
  const gradId = `hermesWingGrad_${size}_${colorScheme}`;
  const tipId = `hermesWingTip_${size}_${colorScheme}`;
  const goldId = `hermesWingGold_${size}_${colorScheme}`;

  const wingIcon = (
    <div 
      className={`relative flex items-center justify-center shrink-0 ${
        animated ? 'animate-float-gentle' : 'transition-transform duration-300 group-hover:scale-105'
      }`}
      style={{ width: dim.iconW, height: dim.iconH }}
    >
      <svg 
        viewBox="0 0 120 78" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm overflow-visible"
      >
        <defs>
          {colorScheme === 'emerald' ? (
            <>
              {/* Primary Emerald Gradient */}
              <linearGradient id={gradId} x1="10%" y1="90%" x2="90%" y2="10%">
                <stop offset="0%" stopColor="#047857" />
                <stop offset="45%" stopColor="#059669">
                  {animated && (
                    <animate attributeName="stop-color" values="#059669;#10B981;#059669" dur="2.2s" repeatCount="indefinite" />
                  )}
                </stop>
                <stop offset="85%" stopColor="#10B981">
                  {animated && (
                    <animate attributeName="stop-color" values="#10B981;#34D399;#10B981" dur="2.2s" repeatCount="indefinite" />
                  )}
                </stop>
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>

              {/* Soaring Tip Gradient with light gloss */}
              <linearGradient id={tipId} x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="65%" stopColor="#10B981">
                  {animated && (
                    <animate attributeName="stop-color" values="#10B981;#6EE7B7;#10B981" dur="2.2s" repeatCount="indefinite" />
                  )}
                </stop>
                <stop offset="100%" stopColor="#6EE7B7">
                  {animated && (
                    <animate attributeName="stop-color" values="#6EE7B7;#A7F3D0;#6EE7B7" dur="2.2s" repeatCount="indefinite" />
                  )}
                </stop>
              </linearGradient>

              {/* Sacred Golden Talaria Heel Gradient */}
              <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="45%" stopColor="#F59E0B">
                  {animated && (
                    <animate attributeName="stop-color" values="#F59E0B;#FBBF24;#F59E0B" dur="2.2s" repeatCount="indefinite" />
                  )}
                </stop>
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </>
          ) : colorScheme === 'gold' ? (
            <>
              <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B45309" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
              <linearGradient id={tipId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
              <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </>
          ) : (
            <>
              <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
              <linearGradient id={tipId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>
              <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </>
          )}
        </defs>

        {/* 
          HERMES MYTHOLOGICAL WING (Talaria - Aile d'Hermès)
          Aerodynamic multi-tiered feathers fanning upward & outward
        */}

        {/* FEATHER 1 - Primary Flight Feather (Highest soaring plume with razor-sharp tip) */}
        <path 
          d="M 16 58 C 24 38, 48 18, 84 10 C 98 7, 108 8, 114 10 C 115 11, 112 13.5, 102 18 C 86 26, 64 35, 42 44 C 28 50, 20 55, 16 58 Z" 
          fill={`url(#${tipId})`}
          className={animated ? 'animate-feather-primary' : ''}
        />

        {/* FEATHER 2 - Secondary Flight Feather (Aerodynamic mid-high plume) */}
        <path 
          d="M 22 62 C 32 45, 56 32, 82 25 C 94 22, 101 24, 105 26 C 106 27, 101 29.5, 93 34 C 78 42, 58 49, 38 54 C 28 57, 23 60, 22 62 Z" 
          fill={`url(#${gradId})`}
          className={animated ? 'animate-feather-secondary' : ''}
        />

        {/* FEATHER 3 - Tertiary Plume (Mid-wing power curve) */}
        <path 
          d="M 28 66 C 38 52, 58 43, 76 39 C 85 37, 89 39, 91 41 C 92 42, 87 44, 80 48 C 67 54, 51 59, 37 62 C 31 64, 29 65, 28 66 Z" 
          fill={`url(#${gradId})`}
          className={animated ? 'animate-feather-tertiary' : ''}
        />

        {/* FEATHER 4 - Covert Plume (Base stabilizing curve) */}
        <path 
          d="M 32 69 C 42 58, 56 52, 67 51 C 73 50, 75 52, 76 54 C 76 55, 71 57, 63 60 C 53 64, 43 67, 33 69 Z" 
          fill={`url(#${gradId})`}
          className={animated ? 'animate-feather-tertiary' : ''}
        />

        {/* 
          GOLDEN TALARIA HEEL (Talon ailé doré de la sandale d'Hermès)
          Sacred golden spur anchoring the divine wing
        */}
        <path 
          d="M 6 54 C 4 58, 5 65, 10 69 C 15 72, 23 72, 31 69 C 23 66, 17 62, 13 56 C 11 52, 8 51, 6 54 Z" 
          fill={`url(#${goldId})`}
          className={animated ? 'animate-feather-heel' : ''}
        />
        <path 
          d="M 12 59 C 18 51, 28 46, 40 43 C 32 47, 24 53, 17 61 C 14 64, 12 64, 12 59 Z" 
          fill={`url(#${goldId})`}
          opacity="0.85"
          className={animated ? 'animate-feather-heel' : ''}
        />

        {/* Speed Beacon / Golden Flight Spark */}
        <circle 
          cx="114" 
          cy="10" 
          r="2.2" 
          fill={`url(#${goldId})`} 
          className={animated ? 'animate-beacon-spark' : ''}
        />
        <circle 
          cx="114" 
          cy="10" 
          r="4.5" 
          fill={`url(#${goldId})`} 
          opacity="0.35" 
          className={animated ? 'animate-ping' : ''}
        />
      </svg>
    </div>
  );

  const brandText = (
    <div className={`flex flex-col leading-tight ${layout === 'vertical' ? 'items-center text-center mt-3' : ''}`}>
      <div className={`flex items-center gap-2 ${layout === 'vertical' ? 'justify-center' : ''}`}>
        <span 
          className={`font-black italic tracking-wider font-sans ${dim.title} ${
            variant === 'light' ? 'text-white' : 'text-slate-900'
          }`}
        >
          HERMES
        </span>
        <span className="text-[9px] font-black tracking-widest uppercase text-emerald-600">
          BÉNIN
        </span>
      </div>

      {showSubtitle && (
        <p 
          className={`font-semibold tracking-tight italic ${dim.sub} mt-0.5 ${
            variant === 'light' ? 'text-emerald-200' : 'text-slate-500'
          }`}
        >
          Votre colis, notre mission.
        </p>
      )}
    </div>
  );

  const content = layout === 'vertical' ? (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {wingIcon}
      {brandText}
    </div>
  ) : (
    <div className={`inline-flex items-center ${dim.gap} select-none ${className}`}>
      {wingIcon}
      {brandText}
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


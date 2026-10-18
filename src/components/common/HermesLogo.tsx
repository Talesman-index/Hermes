import React from 'react';

interface HermesLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light';
  colorScheme?: 'emerald' | 'gold' | 'white';
  showSubtitle?: boolean;
  withCard?: boolean;
  className?: string;
}

export const HermesLogo: React.FC<HermesLogoProps> = ({
  size = 'md',
  variant = 'dark',
  colorScheme = 'emerald',
  showSubtitle = true,
  withCard = false,
  className = '',
}) => {
  // Dimensions mapping
  const dimensions = {
    xs: { iconW: 24, iconH: 16, title: 'text-sm', sub: 'text-[8px]', gap: 'gap-1.5' },
    sm: { iconW: 32, iconH: 22, title: 'text-base', sub: 'text-[9px]', gap: 'gap-2' },
    md: { iconW: 42, iconH: 28, title: 'text-xl', sub: 'text-[11px]', gap: 'gap-2.5' },
    lg: { iconW: 56, iconH: 38, title: 'text-2xl', sub: 'text-xs', gap: 'gap-3' },
    xl: { iconW: 72, iconH: 48, title: 'text-3xl', sub: 'text-sm', gap: 'gap-3.5' },
  };

  const dim = dimensions[size];

  // SVG Unique gradient ID to prevent collisions
  const gradId = `hermesWingGrad_${size}_${colorScheme}`;
  const accentId = `hermesWingAccent_${size}_${colorScheme}`;

  const content = (
    <div className={`inline-flex items-center ${dim.gap} select-none ${className}`}>
      {/* 
        HERMES MYTHOLOGICAL WING EMBLEM (Aile d'Hermès - Mythologie Grecque)
        Sculpted aerodynamic wing symbolizing the swift messenger god of Greek mythology.
        Features 3 soaring feathers with speed lines and aerodynamic forward thrust.
      */}
      <div 
        className="relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ width: dim.iconW, height: dim.iconH }}
      >
        <svg 
          viewBox="0 0 54 36" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs overflow-visible"
        >
          <defs>
            {colorScheme === 'emerald' ? (
              <>
                <linearGradient id={gradId} x1="0%" y1="20%" x2="100%" y2="80%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="60%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
                <linearGradient id={accentId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </>
            ) : colorScheme === 'gold' ? (
              <>
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id={accentId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </>
            ) : (
              <>
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E2E8F0" />
                </linearGradient>
                <linearGradient id={accentId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A7F3D0" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
              </>
            )}
          </defs>

          {/* 
            WING FEATHER 1 - Top primary flight feather (Grand empennage supérieur)
            Soars majestically from lower heel forward-upward to a tapered sharp tip
          */}
          <path 
            d="M3 21C6 14.5 13.5 8 24 5C33 2.5 43.5 2.2 51 2C51.8 2.8 49.5 6.5 42 10.5C31.5 16 19.5 20.5 8.5 22.5L3 21Z" 
            fill={`url(#${gradId})`} 
          />

          {/* 
            WING FEATHER 2 - Middle flight feather (Plume intermédiaire de vitesse)
            Parallel aerodynamic glide with distinct negative-space separation
          */}
          <path 
            d="M7 24C12 18.5 20 13 30 10.5C38 8.8 45 9 46.5 9.8C46.5 11.2 41.5 15 34 18.2C25 22 15.5 25 10.5 25.8L7 24Z" 
            fill={`url(#${gradId})`} 
          />

          {/* 
            WING FEATHER 3 - Lower feather (Empennage inférieur d'appui)
            Shorter swift curve for dynamic lift
          */}
          <path 
            d="M12 27C17 22.5 24.5 18.5 33 17C38.5 16.2 41 16.8 41 17.5C40 19 35 22 28 24.2C21.5 26.2 16 27.8 13.5 28L12 27Z" 
            fill={`url(#${gradId})`} 
          />

          {/* 
            HERMES GOLDEN TALARIA HEEL ACCENT (Talon ailé doré de la sandale d'Hermès)
            Subtle golden feather anchor symbolizing the sacred gold of Hermes
          */}
          <path 
            d="M1 20.5C0.5 22.8 1.5 25.8 4 27.5C7.5 29.8 13 29.5 16.5 28C11.5 26.5 6 24.8 3 22L1 20.5Z" 
            fill={`url(#${accentId})`} 
          />

          {/* Speed flight dot / courier beacon */}
          <circle cx="51.5" cy="2" r="1.5" fill={`url(#${accentId})`} />
        </svg>
      </div>

      {/* Typography: HERMES Bold Italic + Badge BÉNIN + Slogan */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span 
            className={`font-black italic tracking-wider font-sans ${dim.title} ${
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
            className={`font-semibold tracking-tight italic ${dim.sub} ${
              variant === 'light' ? 'text-emerald-200' : 'text-slate-500'
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

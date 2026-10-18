import React, { useState, useEffect } from 'react';
import { HermesLogo } from './HermesLogo';
import { Sparkles, MapPin } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ 
  onComplete, 
  minDurationMs = 1900 
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Connexion au réseau logistique...');
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / minDurationMs) * 100, 100);
      setProgress(rawProgress);

      if (rawProgress < 35) {
        setStatusText('Connexion au réseau logistique...');
      } else if (rawProgress < 75) {
        setStatusText('Corridor Cotonou ➔ Parakou (RNIE 2)...');
      } else if (rawProgress < 98) {
        setStatusText('Initialisation de votre espace...');
      } else {
        setStatusText('Bienvenue sur HERMES');
      }

      if (rawProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setHidden(true);
            if (onComplete) onComplete();
          }, 650);
        }, 150);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [minDurationMs, onComplete]);

  if (hidden) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-8 select-none transition-all duration-700 ease-out ${
        fadeOut ? 'opacity-0 scale-105 pointer-events-none backdrop-blur-none' : 'opacity-100 scale-100 backdrop-blur-md'
      }`}
      style={{
        background: 'radial-gradient(circle at 50% 35%, #F0FDF4 0%, #F8FAF9 55%, #FFFFFF 100%)'
      }}
    >
      {/* Top subtle badge */}
      <div className="pt-4 flex items-center gap-1.5 opacity-80 animate-in fade-in duration-500">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
          Plateforme Bénin · 2026
        </span>
      </div>

      {/* Center Hero Card with Winged Logo and Slogan */}
      <div className="flex flex-col items-center text-center space-y-6 my-auto">
        {/* Soft floating glow container */}
        <div className="relative animate-float-gentle">
          {/* Ambient colored background blur */}
          <div className="absolute inset-0 -m-4 bg-gradient-to-r from-amber-400/20 via-emerald-400/20 to-amber-500/20 rounded-full blur-2xl" />

          {/* Logo Card with soft shadow */}
          <div className="relative bg-white/90 backdrop-blur-xl px-7 py-5 rounded-3xl shadow-xl shadow-emerald-950/5 border border-emerald-100/80">
            <HermesLogo size="xl" showSubtitle={true} />
          </div>
        </div>

        {/* Soft Progress Track */}
        <div className="space-y-2.5 w-52 max-w-xs">
          <div className="relative h-1.5 w-full bg-slate-100/90 rounded-full overflow-hidden shadow-inner border border-slate-200/40">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-emerald-500 to-emerald-600 transition-all duration-150 ease-out shadow-xs"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Micro status text */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-500">
            <span className="truncate">{statusText}</span>
          </div>
        </div>
      </div>

      {/* Bottom Corridor Footnote */}
      <div className="pb-3 text-center space-y-1 text-slate-400 text-[10px]">
        <div className="flex items-center justify-center gap-1 font-bold text-slate-600">
          <MapPin size={11} className="text-emerald-600" />
          <span>Cotonou · Bohicon · Parakou</span>
        </div>
        <p className="font-medium">by Strategy ARENA</p>
      </div>
    </div>
  );
};

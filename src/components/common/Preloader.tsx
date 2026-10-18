import React, { useState, useEffect } from 'react';
import { HermesLogo } from './HermesLogo';
import { MapPin, Navigation, Sparkles, ShieldCheck } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ 
  onComplete, 
  minDurationMs = 2100 
}) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  const steps = [
    { text: 'Connexion aux hubs logistiques...', sub: 'Cotonou · Bohicon · Parakou' },
    { text: 'Synchronisation du Corridor RNIE 2...', sub: 'Axe Nord-Sud en direct' },
    { text: 'Optimisation des tournées coursiers...', sub: 'Algorithme d’acheminement actif' },
    { text: 'Espace prêt · Bienvenue sur HERMES !', sub: 'Votre colis, notre mission' },
  ];

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / minDurationMs) * 100, 100);
      setProgress(rawProgress);

      if (rawProgress < 28) {
        setStepIndex(0);
      } else if (rawProgress < 60) {
        setStepIndex(1);
      } else if (rawProgress < 88) {
        setStepIndex(2);
      } else {
        setStepIndex(3);
      }

      if (rawProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setHidden(true);
            if (onComplete) onComplete();
          }, 650);
        }, 220);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [minDurationMs, onComplete]);

  const handleSkip = () => {
    setFadeOut(true);
    setTimeout(() => {
      setHidden(true);
      if (onComplete) onComplete();
    }, 400);
  };

  if (hidden) return null;

  return (
    <div 
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col justify-between items-center px-6 py-8 select-none transition-all duration-700 ease-out cursor-pointer overflow-hidden ${
        fadeOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at 50% 36%, #ECFDF5 0%, #F8FAF9 48%, #F0FDF4 100%)'
      }}
    >
      {/* Ambient background decorative elements */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-emerald-300/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-amber-300/15 blur-3xl pointer-events-none" />

      {/* TOP HEADER: Official Platform Badge */}
      <div className="w-full max-w-sm flex items-center justify-between pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-emerald-100 shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
          </span>
          <span className="text-[10px] font-black tracking-wider text-emerald-950 uppercase">
            Réseau National · Bénin 2026
          </span>
        </div>

        <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
          <ShieldCheck size={12} className="text-emerald-600" />
          <span>Sécurisé</span>
        </div>
      </div>

      {/* CENTER HERO: Majestic Hermes Mythological Wing Showcase */}
      <div className="flex flex-col items-center justify-center my-auto w-full max-w-sm">
        {/* Pulsing Concentric Aura Rings */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Outer gentle wave */}
          <div className="absolute w-44 h-44 rounded-full bg-emerald-400/10 animate-ping duration-1000 pointer-events-none" />
          {/* Mid aura */}
          <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-emerald-400/20 via-amber-300/20 to-emerald-500/20 blur-xl pointer-events-none" />
          
          {/* Seamless Logo Presentation (sans fond) */}
          <div className="relative flex flex-col items-center py-2">
            <HermesLogo 
              size="2xl" 
              layout="vertical"
              animated={true}
              showSubtitle={true}
            />
          </div>
        </div>

        {/* PROGRESS SECTION */}
        <div className="w-full px-2 space-y-3.5 mt-2">
          {/* Progress bar header with percentage */}
          <div className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-1.5 text-slate-700">
              <Sparkles size={13} className="text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="font-extrabold text-[11px] uppercase tracking-wide">
                Chargement
              </span>
            </div>
            <span className="font-mono text-emerald-800 text-[13px] font-black bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Precision Glowing Progress Track */}
          <div className="relative h-2 w-full bg-slate-200/60 rounded-full overflow-hidden shadow-inner border border-slate-200/50">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-600 transition-all duration-150 ease-out relative shadow-sm"
              style={{ width: `${progress}%` }}
            >
              {/* White-hot leading spark */}
              <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white/90 rounded-full blur-[1px] shadow-sm animate-pulse" />
            </div>
          </div>

          {/* Morphing Micro-status message */}
          <div className="h-10 flex flex-col items-center justify-center text-center">
            <p className="text-[12px] font-bold text-slate-800 transition-all duration-300">
              {steps[stepIndex].text}
            </p>
            <p className="text-[10px] font-medium text-emerald-700/80 mt-0.5 transition-all duration-300">
              {steps[stepIndex].sub}
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM FOOTER: Animated Highway Corridor Hubs */}
      <div className="w-full max-w-sm pb-1 flex flex-col items-center space-y-3">
        {/* RNIE 2 Axis Visualizer: Cotonou -> Bohicon -> Parakou */}
        <div className="w-full bg-white/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-emerald-100/70 shadow-xs flex items-center justify-between text-[10px] font-bold text-slate-600">
          <div className="flex items-center gap-1">
            <MapPin size={11} className="text-emerald-600 shrink-0" />
            <span>Cotonou</span>
          </div>

          {/* Animated Road Track */}
          <div className="relative flex-1 mx-3 h-1 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 bottom-0 w-3 rounded-full bg-gradient-to-r from-amber-400 to-emerald-500 animate-route-drive"
              style={{
                animation: 'routeDrive 2s ease-in-out infinite'
              }}
            />
          </div>

          <div className="flex items-center gap-1">
            <span className="text-slate-400">·</span>
            <span className="text-slate-700">Bohicon</span>
            <span className="text-slate-400">·</span>
          </div>

          <div className="flex items-center gap-1">
            <Navigation size={10} className="text-amber-600 shrink-0 rotate-45" />
            <span>Parakou</span>
          </div>
        </div>

        {/* Corridor Signature */}
        <div className="flex items-center justify-between w-full px-2 text-[9px] text-slate-400 font-semibold">
          <span>Corridor Nord-Sud Bénin</span>
          <span>by Strategy ARENA</span>
        </div>
      </div>
    </div>
  );
};


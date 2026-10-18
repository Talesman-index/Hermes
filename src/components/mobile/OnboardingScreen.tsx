import React, { useState } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  Package, 
  Check 
} from 'lucide-react';
import { HermesLogo } from '../common/HermesLogo';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      tag: '01 · Premier Kilomètre',
      title: 'Collecte directement\nà votre porte',
      subtitle: 'Un coursier partenaire Hermes récupère votre colis chez vous ou à votre commerce. Fini les déplacements et l’attente aux gares.',
      image: '/images/onboarding-collecte.jpg',
      alt: 'Coursier Hermes pour la collecte à domicile',
      buttonText: 'Suivant',
      badge: 'Cotonou',
      badgeColor: 'bg-emerald-600 text-white',
      accentLabel: 'Zéro déplacement en agence',
    },
    {
      id: 2,
      tag: '02 · Transport Interurbain',
      title: 'Trajet sécurisé sur le corridor RNIE 2',
      subtitle: 'Votre colis voyage en soute d’autocars partenaires entre Cotonou et Parakou. Suivi en temps réel et heure d’arrivée garantie.',
      image: '/images/onboarding-transit.jpg',
      alt: 'Transport interurbain Cotonou Parakou',
      buttonText: 'Suivant',
      badge: '420 km · RNIE 2',
      badgeColor: 'bg-emerald-700 text-white',
      accentLabel: 'Heure d’arrivée estimée en direct',
    },
    {
      id: 3,
      tag: '03 · Dernier Kilomètre',
      title: 'Remise garantie contre code PIN secret',
      subtitle: 'Livraison en main propre au destinataire à Parakou. La remise n’est validée qu’après saisie du code PIN confidentiel à 6 chiffres.',
      image: '/images/onboarding-delivery.jpg',
      alt: 'Remise sécurisée avec code PIN',
      buttonText: 'Commencer maintenant',
      badge: 'Code PIN sécurisé',
      badgeColor: 'bg-emerald-600 text-white',
      accentLabel: '100% garanti et sans litige',
    },
  ];

  const slide = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col h-[790px] -mx-4 -my-2 bg-[#E9F4EE] relative overflow-hidden select-none">
      {/* Soft Sky Ambient Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D8EEE2] via-[#EAF5EF] to-white pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-30 flex items-center justify-between px-6 pt-4 pb-2">
        <div className="flex items-center">
          <HermesLogo size="sm" showSubtitle={false} />
        </div>

        <button
          onClick={onComplete}
          className="text-xs font-bold text-slate-700 hover:text-emerald-800 bg-white/80 hover:bg-white backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-900/10 transition-all cursor-pointer shadow-xs active:scale-95"
        >
          Passer
        </button>
      </div>

      {/* Top Half: Scenic Illustration */}
      <div className="relative flex-1 flex items-center justify-center px-4 z-10">
        <div className="relative w-full max-w-[340px] aspect-square rounded-3xl overflow-hidden shadow-xl border-2 border-white/60 bg-white">
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover object-center animate-in fade-in zoom-in-95 duration-500"
          />

          {/* Floating Pill Tag on Illustration */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-md border border-emerald-100 flex items-center gap-1.5 animate-in slide-in-from-top-2 duration-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-extrabold text-slate-800 tracking-tight">
              {slide.accentLabel}
            </span>
          </div>

          {/* Floating City/Route Pill */}
          <div className="absolute bottom-3 right-3 bg-emerald-950/90 text-white backdrop-blur-md px-3 py-1 rounded-full shadow-lg border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
            <MapPin size={11} className="text-emerald-400" />
            <span>{slide.badge}</span>
          </div>
        </div>
      </div>

      {/* Bottom Half: Curved White Bottom Sheet Card (exact layout of Image 2) */}
      <div className="relative z-20 bg-white rounded-t-[36px] shadow-2xl px-6 pt-6 pb-7 border-t border-emerald-100/60 flex flex-col justify-between">
        {/* Pagination Dots (Image 2 style: pill for active, small circles for inactive) */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {slides.map((s, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'w-7 h-2 bg-emerald-600 rounded-full shadow-sm shadow-emerald-600/30' 
                    : 'w-2 h-2 bg-slate-200 hover:bg-slate-300 rounded-full'
                }`}
                title={`Écran ${idx + 1}`}
              />
            );
          })}
        </div>

        {/* Text Area */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100/80">
            <Sparkles size={11} className="text-emerald-600" />
            <span>{slide.tag}</span>
          </div>

          <h2 className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight leading-tight whitespace-pre-line">
            {slide.title}
          </h2>

          <p className="text-xs sm:text-[13px] text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
            {slide.subtitle}
          </p>
        </div>

        {/* CTA Button (Vibrant Emerald Green Pill from Image 2) */}
        <button
          onClick={handleNext}
          className="w-full py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm tracking-wide shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transition-all"
        >
          <span>{slide.buttonText}</span>
          <ArrowRight size={17} className="stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

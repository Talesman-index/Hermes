import React, { useState } from 'react';
import { 
  ArrowRight, 
  Bike, 
  Bus, 
  KeyRound, 
  Sparkles, 
  MapPin, 
  Package, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: 'Coordination Porte-à-Porte · Bénin',
      title: 'Livré.\nÀ l’heure.',
      subtitle: 'Suivi en temps réel et coordination intelligente pour chaque colis entre Cotonou et Parakou.',
      image: '/images/godash-hero.jpg',
      alt: 'Route logistique Cotonou Parakou',
      isHeroStyle: true,
      buttonText: 'Continuer',
      features: [
        'Collecte à domicile à Cotonou',
        'Transport en autocar régulier',
        'Livraison directe à Parakou'
      ]
    },
    {
      id: 2,
      badge: '01 · Premier Kilomètre',
      title: 'Collecte directement\nchez vous.',
      subtitle: 'Un coursier partenaire Hermes récupère votre colis à votre domicile ou commerce. Fini les files d’attente aux gares.',
      image: '/images/black-courier.jpg',
      alt: 'Coursier partenaire Hermes',
      isHeroStyle: false,
      buttonText: 'Suivant',
      features: [
        'Zéro déplacement en agence',
        'Étiquetage et vérification sur place',
        'Prise en charge en quelques minutes'
      ]
    },
    {
      id: 3,
      badge: '02 & 03 · Dernier Kilomètre',
      title: 'Remise garantie\ncontre code secret.',
      subtitle: 'À l’arrivée à Parakou, votre colis est livré en main propre au destinataire contre validation d’un code PIN confidentiel.',
      image: '/images/black-customer.jpg',
      alt: 'Destinataire recevant son colis avec le sourire',
      isHeroStyle: false,
      buttonText: 'Commencer maintenant',
      features: [
        'Transport en soute d’autocars réguliers',
        'Validation par code PIN à 6 chiffres',
        'Preuve de livraison instantanée'
      ]
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
    <div className="flex flex-col justify-between min-h-[790px] -mx-4 -my-2 p-5 bg-[#D4F63D] text-[#0B0F19] relative overflow-hidden transition-all duration-300">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pt-2 z-20">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-[#0B0F19] text-[#D4F63D] flex items-center justify-center font-black shadow-md">
            <Package size={20} className="stroke-[2.8]" />
          </div>
          <div>
            <span className="font-black text-lg tracking-tight font-sans text-[#0B0F19]">HERMES</span>
            <span className="text-[9px] font-extrabold uppercase ml-1 px-1.5 py-0.2 rounded bg-[#0B0F19] text-[#D4F63D]">
              BÉNIN
            </span>
          </div>
        </div>

        <button
          onClick={onComplete}
          className="text-xs font-black text-[#0B0F19] bg-white/70 hover:bg-white px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-xs active:scale-95"
        >
          Passer
        </button>
      </div>

      {/* Main Slide Body */}
      <div className="space-y-4 my-auto z-10 pt-2">
        {/* Title and subtitle exactly like GoDash */}
        <div className="space-y-1.5 px-1">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0B0F19]/15 text-[#0B0F19]">
            {slide.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0B0F19] tracking-tight leading-[1.08] whitespace-pre-line mt-1">
            {slide.title}
          </h1>
          <p className="text-xs text-slate-800 leading-relaxed font-medium max-w-xs">
            {slide.subtitle}
          </p>
        </div>

        {/* 3D Illustration Card */}
        <div className="relative rounded-3xl overflow-hidden border-3 border-[#0B0F19] shadow-2xl bg-[#0B0F19] aspect-square max-h-[320px] mx-auto group">
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover object-center animate-in zoom-in-95 duration-500"
          />

          {/* Floating corridor indicator */}
          <div className="absolute bottom-3 left-3 right-3 bg-[#0B0F19]/90 backdrop-blur-md rounded-2xl p-2 px-3 flex items-center justify-between text-[11px] text-white">
            <span className="flex items-center gap-1 font-bold text-slate-200">
              <MapPin size={12} className="text-[#D4F63D]" />
              Cotonou ➔ Parakou
            </span>
            <span className="font-mono font-black text-[#D4F63D]">RNIE 2 · 420 km</span>
          </div>
        </div>

        {/* Feature Highlights Pills */}
        <div className="space-y-1.5 max-w-sm mx-auto">
          {slide.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-black/10 text-xs font-bold text-slate-900 shadow-xs"
            >
              <div className="w-4 h-4 rounded-full bg-[#0B0F19] text-[#D4F63D] flex items-center justify-center shrink-0 font-black text-[9px]">
                ✓
              </div>
              <span className="text-[11px]">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="space-y-4 pt-3 z-20">
        {/* Pagination Dots (GoDash style) */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((s, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? 'w-8 bg-[#0B0F19] shadow-md' : 'w-2.5 bg-[#0B0F19]/30 hover:bg-[#0B0F19]/50'
                }`}
                title={`Aller à l'écran ${idx + 1}`}
              />
            );
          })}
        </div>

        {/* Large Rounded Black Pill Button (exact GoDash 'Get Started' style) */}
        <button
          onClick={handleNext}
          className="w-full py-4 px-6 rounded-2xl bg-[#0B0F19] hover:bg-slate-900 text-white font-black text-sm flex items-center justify-center gap-2 shadow-2xl shadow-black/30 active:scale-98 transition-all cursor-pointer"
        >
          <span>{slide.buttonText}</span>
          <ArrowRight size={18} className="stroke-[2.8]" />
        </button>
      </div>
    </div>
  );
};

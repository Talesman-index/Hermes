import React, { useState } from 'react';
import { useMobileApp } from '../../context/MobileAppContext';
import { WORKFLOW_STAGES, MobileShipmentStep } from '../../types';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  Package, 
  Bus, 
  Bike, 
  CheckCircle2, 
  Building2, 
  Truck, 
  ClipboardCheck, 
  PackageCheck,
  ShieldCheck, 
  Phone, 
  ChevronRight, 
  Sparkles, 
  QrCode,
  Zap,
  ExternalLink,
  Receipt,
  CreditCard
} from 'lucide-react';

export const TrackingScreen: React.FC = () => {
  const { activeShipment, advanceStep, rewindStep, setActiveTab } = useMobileApp();
  const [copied, setCopied] = useState(false);

  const currentStage = WORKFLOW_STAGES.find((w) => w.step === activeShipment.currentStep);
  const progressPercent = Math.min(100, Math.max(11, (activeShipment.currentStep / 9) * 100));

  const handleCopy = () => {
    navigator.clipboard.writeText(activeShipment.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStageIcon = (step: MobileShipmentStep, isCompleted: boolean, isCurrent: boolean) => {
    switch (step) {
      case 1: return ClipboardCheck;
      case 2: return Bike;
      case 3: return PackageCheck;
      case 4: return Building2;
      case 5: return Bus;
      case 6: return MapPin;
      case 7: return Bike;
      case 8: return Truck;
      case 9: return CheckCircle2;
      default: return Package;
    }
  };

  return (
    <div className="space-y-5 pb-28 animate-in fade-in duration-200">
      {/* Top Bar with Back and Copy Reference */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('home')}
          className="w-9 h-9 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs"
        >
          <ArrowLeft size={16} />
        </button>

        <div className="text-center">
          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Suivi d'expédition</p>
          <div className="flex items-center gap-1.5 justify-center">
            <span className="font-mono font-black text-sm text-slate-900">{activeShipment.reference}</span>
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer transition-colors"
              title="Copier le numéro de suivi"
            >
              {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
            </button>
          </div>
        </div>

        <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 whitespace-nowrap shrink-0">
          {activeShipment.currentStep === 9 ? 'Livré' : `Étape ${activeShipment.currentStep}/9`}
        </span>
      </div>

      {/* Main Status Hero Card */}
      <div className="bg-[#0B1F17] text-white p-5 rounded-3xl shadow-xl border border-emerald-900/60 space-y-4 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Statut actuel
            </span>
            <h1 className="text-xl font-black text-white mt-0.5">
              {currentStage?.title}
            </h1>
            <p className="text-xs text-slate-300 mt-1 leading-snug">
              {currentStage?.description}
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-slate-700 shadow-md">
            <img 
              src="/images/parcel-box.jpg" 
              alt="Colis Hermes 3D" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Corridor Route Visualizer */}
        <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 space-y-2.5 relative z-10">
          <div className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-1.5 text-emerald-300">
              <MapPin size={13} />
              <span>Cotonou</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-300 font-mono">
              <Bus size={13} className="text-emerald-400" />
              <span>RNIE 2 · 420 km</span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-300">
              <MapPin size={13} />
              <span>Parakou</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-300">
            <span>Dernière mise à jour : {activeShipment.updatedAt}</span>
            <span className="text-emerald-400 font-bold">Liaison en autocar régulier</span>
          </div>
        </div>

        {/* Security PIN Box */}
        <div className="bg-white/5 rounded-2xl p-3 border border-white/10 flex items-center justify-between gap-3 text-xs relative z-10">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-300">Code secret de remise (PIN)</p>
            <p className="text-xl font-mono font-black text-emerald-400 tracking-wider select-all mt-0.5">
              {activeShipment.securityPin}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400">À dicter au coursier</span>
            <p className="text-[11px] text-emerald-300 font-bold">Validation finale</p>
          </div>
        </div>

        {/* Maps Pickup Point & Paid Shipping Fee Info */}
        <div className="grid grid-cols-2 gap-2 text-xs relative z-10">
          {/* Pickup Maps Location */}
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-300 flex items-center gap-1">
                <MapPin size={11} className="text-emerald-400" />
                <span>Collecte Maps</span>
              </span>
              {activeShipment.pickupLocation && (
                <a
                  href={activeShipment.pickupLocation.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300"
                  title="Voir sur Google Maps"
                >
                  <ExternalLink size={10} />
                </a>
              )}
            </div>
            <p className="font-bold text-white text-[11px] truncate">
              {activeShipment.pickupLocation?.district || activeShipment.sender.address.split(',')[0]}
            </p>
            <p className="text-[9px] text-emerald-300/80 font-mono">
              {activeShipment.pickupLocation
                ? `${activeShipment.pickupLocation.lat.toFixed(4)}°, ${activeShipment.pickupLocation.lng.toFixed(4)}°`
                : 'GPS Cotonou vérifié'}
            </p>
          </div>

          {/* Paid Shipping Fee Badge */}
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-300 flex items-center gap-1">
                <Receipt size={11} className="text-emerald-400" />
                <span>Frais réglés</span>
              </span>
              <span className="text-[8px] font-black uppercase bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                Acquitté
              </span>
            </div>
            <p className="font-mono font-black text-emerald-400 text-sm">
              {activeShipment.serviceFee || '5 000 FCFA'}
            </p>
            <p className="text-[9px] text-slate-300 truncate">
              {activeShipment.payment?.method || 'MTN Mobile Money'}
            </p>
          </div>
        </div>

        {/* Companion Black Courier Card */}
        <div className="bg-white/5 rounded-2xl p-3 border border-white/10 flex items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm shrink-0">
              <img src="/images/black-courier.jpg" alt="Coursier Hermes" className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-300">Coursier partenaire</p>
              <p className="text-xs font-bold text-white">Koffi Mensah · Cotonou</p>
              <p className="text-[10px] text-emerald-400 font-mono">+229 97 10 20 30</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <a 
              href="tel:+22997102030" 
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Phone size={12} className="stroke-[2.8]" />
              <span>Appeler</span>
            </a>
          </div>
        </div>
      </div>

      {/* Flagship Vertical Timeline (The 9 Stages Exact PRD Representation) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/90 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-black text-slate-900">Progression détaillée (9 étapes)</h2>
            <p className="text-[11px] text-slate-400">Parcours complet de bout-en-bout</p>
          </div>
          <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
            Étape {activeShipment.currentStep}/9
          </span>
        </div>

        <div className="space-y-5 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
          {WORKFLOW_STAGES.map((stage) => {
            const isCompleted = stage.step < activeShipment.currentStep;
            const isCurrent = stage.step === activeShipment.currentStep;
            const isUpcoming = stage.step > activeShipment.currentStep;

            const Icon = getStageIcon(stage.step, isCompleted, isCurrent);

            // Find history timestamp if available
            const historyItem = activeShipment.history.find((h) => h.step === stage.step);
            const displayTime = historyItem ? historyItem.timestamp : isCurrent ? 'En cours' : 'À venir';

            return (
              <div 
                key={stage.step}
                className={`relative flex items-start gap-3.5 text-xs group transition-all duration-300 ${
                  isUpcoming ? 'opacity-40' : 'opacity-100'
                }`}
              >
                {/* Step Circle Node */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 font-bold transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : isCurrent
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-500/30 scale-110 shadow-lg'
                      : 'bg-slate-100 text-slate-400 border border-slate-300'
                  }`}
                >
                  {isCompleted ? (
                    <Check size={15} className="stroke-[3]" />
                  ) : (
                    <Icon size={15} className={isCurrent ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
                  )}
                </div>

                {/* Content Box */}
                <div
                  className={`flex-1 p-3.5 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-emerald-50/60 border-emerald-300 shadow-sm'
                      : isCompleted
                      ? 'bg-slate-50/70 border-slate-200/80'
                      : 'bg-slate-50/40 border-slate-200/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`font-black text-xs ${isCurrent ? 'text-emerald-950' : 'text-slate-800'}`}>
                      {stage.step}. {stage.title}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        isCurrent
                          ? 'bg-emerald-600 text-white'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200/60 text-slate-400'
                      }`}
                    >
                      {displayTime}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-snug">
                    {stage.description}
                  </p>

                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Acteur : <strong className="text-slate-700 font-semibold">{stage.actor}</strong></span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <MapPin size={10} /> {stage.location}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual Step Forward Demo Controller (Inside tracking screen for instant presentation) */}
      <div className="bg-slate-100 rounded-3xl p-4 border border-slate-200 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
            <Zap size={14} className="text-amber-500 fill-current" />
            Contrôle Démonstration Transporteur
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Sans backend</span>
        </div>

        <div className="flex items-center gap-2">
          {activeShipment.currentStep < 9 ? (
            <button
              onClick={() => advanceStep(activeShipment.id)}
              className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/25 active:scale-98 transition-all"
            >
              <span>Valider l'étape suivante ({activeShipment.currentStep + 1}/9)</span>
              <ChevronRight size={15} className="stroke-[3]" />
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('delivered')}
              className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
            >
              <CheckCircle2 size={16} />
              <span>Voir l'écran de livraison terminée</span>
            </button>
          )}

          {activeShipment.currentStep > 1 && (
            <button
              onClick={() => rewindStep(activeShipment.id)}
              className="px-3.5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 font-bold text-xs cursor-pointer"
              title="Revenir à l'étape précédente"
            >
              Retour
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

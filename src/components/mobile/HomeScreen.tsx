import React, { useState } from 'react';
import { useMobileApp } from '../../context/MobileAppContext';
import { WORKFLOW_STAGES } from '../../types';
import { 
  Package, 
  Menu, 
  ArrowUpRight, 
  Calculator, 
  FileText, 
  PlusCircle, 
  MapPin, 
  CheckCircle2, 
  Bus, 
  Bike, 
  KeyRound, 
  ChevronRight, 
  Clock, 
  Sparkles,
  Info,
  X
} from 'lucide-react';
import { HermesLogo } from '../common/HermesLogo';

export const HomeScreen: React.FC = () => {
  const { setActiveTab, openTracking, activeShipment, shipments, openOnboarding } = useMobileApp();

  const [calcModal, setCalcModal] = useState(false);
  const [tarifsModal, setTarifsModal] = useState(false);

  const currentStage = WORKFLOW_STAGES.find((w) => w.step === activeShipment.currentStep);
  const isDelivered = activeShipment.currentStep === 9;

  return (
    <div className="space-y-4 pb-28 animate-in fade-in duration-300">
      {/* Top Header Bar matching GoDash (Hamburger - HERMES Pill - Black Courier Avatar) */}
      <div className="flex items-center justify-between pt-1">
        {/* Hamburger Menu button */}
        <button
          onClick={() => setActiveTab('profile')}
          className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center text-slate-800 hover:bg-slate-50 cursor-pointer active:scale-95 transition-all"
          title="Menu & Profil"
        >
          <Menu size={18} className="stroke-[2.5]" />
        </button>

        {/* Brand Logo Card (exact style of user reference) */}
        <div 
          onClick={openOnboarding}
          className="bg-white/95 px-3 py-1.5 rounded-2xl shadow-xs border border-slate-100 hover:border-emerald-200 transition-all cursor-pointer select-none group"
          title="Voir l'onboarding de présentation"
        >
          <HermesLogo size="sm" showSubtitle={false} />
        </div>

        {/* Right Circular Avatar: Mon Profil */}
        <div 
          onClick={() => setActiveTab('profile')}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm bg-slate-800 cursor-pointer hover:scale-105 transition-transform"
          title="Mon profil utilisateur"
        >
          <img 
            src="/images/black-customer.jpg" 
            alt="Mon profil" 
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Hero Current Delivery Card (Emerald Curved Card matching illustrations) */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-3xl p-5 shadow-xl shadow-emerald-600/25 border border-emerald-500/30 space-y-4 relative overflow-hidden">
        {/* Top Meta & Circular Arrow Button */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-100">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Livraison en cours · {currentStage?.title}</span>
            </div>
            <h2 className="text-2xl font-mono font-black text-white tracking-tight mt-0.5">
              {activeShipment.reference}
            </h2>
          </div>

          <button
            onClick={() => openTracking(activeShipment.id)}
            className="w-10 h-10 rounded-full bg-white text-emerald-800 flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer active:scale-95"
            title="Consulter le suivi détaillé"
          >
            <ArrowUpRight size={18} className="stroke-[3]" />
          </button>
        </div>

        {/* Dates & ETA */}
        <div className="flex items-center justify-between text-xs font-bold text-emerald-100">
          <span>{activeShipment.createdAt.split('·')[0]}</span>
          <span className="text-white font-extrabold font-mono bg-emerald-800/60 px-2 py-0.5 rounded-full border border-emerald-400/30">Délai : ~8h de trajet</span>
        </div>

        {/* Dotted Progress Track with Animated Vehicle */}
        <div className="relative py-2">
          {/* Dotted Track Line */}
          <div className="absolute top-1/2 left-3 right-3 -translate-y-1/2 border-b-2 border-dashed border-white/40 z-0" />

          {/* Node 1 : Collecte Cotonou */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-white text-emerald-700 flex items-center justify-center text-[10px] font-black shadow-xs">
                ✓
              </div>
              <span className="text-[10px] font-extrabold mt-1 text-emerald-50">Cotonou</span>
            </div>

            {/* Node 2 : Autocar RNIE 2 */}
            <div className="flex flex-col items-center">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shadow-xs ${
                activeShipment.currentStep >= 5 ? 'bg-white text-emerald-700' : 'bg-emerald-800/80 text-emerald-200'
              }`}>
                {activeShipment.currentStep >= 5 ? '✓' : '2'}
              </div>
              <span className="text-[10px] font-bold mt-1 text-emerald-100">Bohicon</span>
            </div>

            {/* Vehicle Icon placed according to current step */}
            <div className="flex flex-col items-center animate-bounce">
              <div className="w-7 h-7 rounded-xl bg-white text-emerald-700 flex items-center justify-center shadow-md">
                <Bus size={14} className="text-emerald-700" />
              </div>
              <span className="text-[9px] font-black mt-0.5 text-white uppercase tracking-wider drop-shadow-xs">
                En route
              </span>
            </div>

            {/* Node 3 : Arrivée Parakou */}
            <div className="flex flex-col items-center">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shadow-xs ${
                isDelivered ? 'bg-white text-emerald-700' : 'bg-emerald-800/80 text-emerald-200'
              }`}>
                {isDelivered ? '✓' : '3'}
              </div>
              <span className="text-[10px] font-extrabold mt-1 text-emerald-50">Parakou</span>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-1 flex items-center justify-between text-[11px] text-emerald-100 font-medium border-t border-emerald-500/40">
          <span className="truncate max-w-[210px]">{activeShipment.description}</span>
          <span className="font-mono font-bold text-white bg-emerald-800/50 px-2 py-0.5 rounded-full">Étape {activeShipment.currentStep}/9</span>
        </div>
      </div>

      {/* Row of 3 Quick Action Squircle Tiles (Exact GoDash Layout: Create / Calculate / Receipts) */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* 1. Create Tile */}
        <button
          onClick={() => setActiveTab('create')}
          className="bg-white p-3.5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col items-center text-center justify-center space-y-2 group active:scale-95"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            <Package size={22} className="stroke-[2.5]" />
          </div>
          <span className="text-xs font-black text-slate-900">Créer</span>
        </button>

        {/* 2. Calculate Tile */}
        <button
          onClick={() => setCalcModal(true)}
          className="bg-white p-3.5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col items-center text-center justify-center space-y-2 group active:scale-95"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
            <Calculator size={22} className="stroke-[2.2]" />
          </div>
          <span className="text-xs font-black text-slate-900">Calculer</span>
        </button>

        {/* 3. Receipts / Tarifs Tile */}
        <button
          onClick={() => setTarifsModal(true)}
          className="bg-white p-3.5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col items-center text-center justify-center space-y-2 group active:scale-95"
        >
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
            <FileText size={22} className="stroke-[2.2]" />
          </div>
          <span className="text-xs font-black text-slate-900">Tarifs</span>
        </button>
      </div>

      {/* Active Shipments Section */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
            Expéditions actives
          </h3>
          <button
            onClick={() => setActiveTab('shipments')}
            className="text-[11px] font-black text-emerald-700 hover:text-emerald-900 cursor-pointer"
          >
            Voir tout
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {shipments.slice(0, 2).map((shipment) => {
            const isShipmentDelivered = shipment.currentStep === 9;
            return (
              <div
                key={shipment.id}
                onClick={() => openTracking(shipment.id)}
                className="bg-white p-3.5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-400/80 transition-all cursor-pointer flex flex-col justify-between space-y-2 group active:scale-98"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-black text-slate-900">🇧🇯</span>
                    <span className="text-[10px] font-extrabold text-slate-600">Bénin</span>
                  </div>

                  <span
                    className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                      isShipmentDelivered
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {isShipmentDelivered ? 'Livré' : 'En transit'}
                  </span>
                </div>

                <div>
                  <p className="font-extrabold text-xs text-slate-900 leading-tight">
                    Cotonou ➔ Parakou
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                    {shipment.reference}
                  </p>
                </div>

                <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                  <span className="truncate max-w-[85px]">{shipment.recipient.name.split(' ')[0]}</span>
                  <ChevronRight size={12} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Services & Parcours Section (with photo cards) */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
            Le parcours logistique en 3 temps
          </h3>
          <button
            onClick={openOnboarding}
            className="text-[11px] font-black text-emerald-700 hover:underline cursor-pointer"
          >
            Comment ça marche ?
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1 : Coursier First Mile */}
          <div 
            onClick={openOnboarding}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="h-28 overflow-hidden bg-slate-900 relative">
              <img 
                src="/images/onboarding-collecte.jpg" 
                alt="Coursier Hermes" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 bg-emerald-900/90 text-white text-[9px] font-black px-2 py-0.5 rounded-full border border-emerald-500/30">
                1er Km
              </span>
            </div>
            <div className="p-3 space-y-1">
              <p className="font-extrabold text-xs text-slate-900">Collecte à domicile</p>
              <p className="text-[10px] text-slate-500 leading-tight">Le coursier récupère votre colis à Cotonou.</p>
            </div>
          </div>

          {/* Card 2 : Destinataire Last Mile */}
          <div 
            onClick={openOnboarding}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="h-28 overflow-hidden bg-slate-900 relative">
              <img 
                src="/images/onboarding-delivery.jpg" 
                alt="Client destinataire" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs">
                Dernier Km
              </span>
            </div>
            <div className="p-3 space-y-1">
              <p className="font-extrabold text-xs text-slate-900">Livraison finale</p>
              <p className="text-[10px] text-slate-500 leading-tight">Remise sécurisée contre code secret PIN.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal 1: Calculate Distance & Time */}
      {calcModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Calculator size={16} />
                </div>
                <h3 className="font-black text-slate-900 text-sm">Calculateur de corridor</h3>
              </div>
              <button onClick={() => setCalcModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                <span className="text-[10px] text-emerald-700 font-bold uppercase">Trajet direct</span>
                <p className="font-extrabold text-slate-900 text-sm">Cotonou ➔ Parakou</p>
                <p className="text-slate-500">Route Nationale Inter-États RNIE 2</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <p className="text-[10px] text-emerald-800 font-bold uppercase">Distance</p>
                  <p className="text-lg font-black text-emerald-950 font-mono">420 km</p>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <p className="text-[10px] text-emerald-800 font-bold uppercase">Délai estimé</p>
                  <p className="text-lg font-black text-emerald-950 font-mono">~ 8 heures</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 text-[11px] text-slate-600 space-y-1">
                <p>• <strong>1er km :</strong> Collecte à Cotonou en ~30 min.</p>
                <p>• <strong>Interurbain :</strong> Départ autocar régulier chaque matin.</p>
                <p>• <strong>Dernier km :</strong> Livraison dès arrivée du car à Parakou.</p>
              </div>
            </div>

            <button
              onClick={() => {
                setCalcModal(false);
                setActiveTab('create');
              }}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs cursor-pointer shadow-md shadow-emerald-600/30 active:scale-[0.98] transition-all"
            >
              Créer une expédition sur ce trajet
            </button>
          </div>
        </div>
      )}

      {/* Modal 2: Tarifs & Conditions */}
      {tarifsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <FileText size={16} />
                </div>
                <h3 className="font-black text-slate-900 text-sm">Tarification & Pilote</h3>
              </div>
              <button onClick={() => setTarifsModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span>Frais de service :</span>
                  <span className="font-mono bg-amber-200/80 px-2 py-0.5 rounded font-black">À confirmer</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-snug">
                  Conformément au PRD, aucun prix n'est présenté comme définitif avant la validation du modèle économique avec les transporteurs partenaires.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-slate-700">
                <p className="font-bold text-slate-900">Ce que comprend le service :</p>
                <p>✓ Déplacement du coursier chez vous à Cotonou</p>
                <p>✓ Enregistrement et étiquetage sécurisé</p>
                <p>✓ Transport en soute d'autocar partenaire</p>
                <p>✓ Livraison en main propre avec code PIN à Parakou</p>
              </div>
            </div>

            <button
              onClick={() => setTarifsModal(false)}
              className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

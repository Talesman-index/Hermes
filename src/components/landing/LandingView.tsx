import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Package, 
  ArrowRight, 
  Bike, 
  Bus, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Zap, 
  TrendingUp,
  ChevronRight,
  Calculator,
  Compass,
  FileText,
  PhoneCall,
  KeyRound
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const { setActiveRole, runDemoNextStep, shipments } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'first' | 'transit' | 'last'>('all');

  return (
    <div className="space-y-14 pb-24">
      {/* Hero Section inspired by GoDash & modern logistics SaaS */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B0F19] via-[#0F172A] to-[#0B0F19] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-slate-800/80">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4F63D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4F63D]/15 border border-[#D4F63D]/40 text-[#D4F63D] text-xs font-bold tracking-wide">
              <Sparkles size={14} className="text-[#D4F63D]" />
              Solution Logistique Porte-à-Porte · Bénin
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Livré. À l'heure. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4F63D] via-[#a3e635] to-teal-300">
                Sans bouger de chez vous.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
              HERMES révolutionne le transport de colis entre les villes du Bénin : collecte à votre porte par coursier, transit sécurisé par autocars partenaires, et remise en main propre à destination.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => setActiveRole('client')}
                className="px-7 py-4 rounded-2xl bg-[#D4F63D] hover:bg-[#c2e62a] text-[#0B0F19] font-black text-base shadow-xl shadow-[#D4F63D]/25 transition-all transform active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <span>Simuler un envoi maintenant</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </button>

              <button
                onClick={() => runDemoNextStep()}
                className="px-6 py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-base border border-slate-700/80 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Zap size={18} className="text-[#D4F63D]" />
                <span>Parcours démo interactif</span>
              </button>
            </div>

            {/* Micro stats banner */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs text-slate-400 font-medium">Corridor Pilote</p>
                <p className="text-sm font-extrabold text-white mt-0.5">Cotonou ➔ Parakou</p>
                <p className="text-[10px] text-[#D4F63D] mt-0.5 font-medium">420 km · ~8 heures</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs text-slate-400 font-medium">Porte-à-Porte</p>
                <p className="text-sm font-extrabold text-white mt-0.5">100% sans agence</p>
                <p className="text-[10px] text-teal-300 mt-0.5 font-medium">Collecte & Livraison</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs text-slate-400 font-medium">Sécurité Remise</p>
                <p className="text-sm font-extrabold text-white mt-0.5">Code PIN Unique</p>
                <p className="text-[10px] text-amber-300 mt-0.5 font-medium">Preuve traçable</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Isometric Corridor Illustration with live cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-slate-900 group">
              <img 
                src="/images/corridor-road.jpg" 
                alt="Corridor logistique Cotonou Parakou"
                className="w-full h-[400px] object-cover transform group-hover:scale-102 transition-transform duration-700" 
              />

              {/* Floating Live Badge: Departure Cotonou */}
              <div className="absolute top-4 left-4 bg-[#0B0F19]/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-2.5 shadow-lg flex items-center gap-2.5 animate-float-gentle">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Départ</p>
                  <p className="text-xs font-bold text-white">Cotonou (Littoral)</p>
                </div>
              </div>

              {/* Floating Live Badge: Destination Parakou */}
              <div className="absolute top-4 right-4 bg-[#0B0F19]/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-2.5 shadow-lg flex items-center gap-2.5 animate-float-slow">
                <div className="w-8 h-8 rounded-xl bg-[#D4F63D]/20 text-[#D4F63D] flex items-center justify-center">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Arrivée</p>
                  <p className="text-xs font-bold text-white">Parakou (Borgou)</p>
                </div>
              </div>

              {/* Bottom active transit card inside illustration */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0B0F19]/95 backdrop-blur-xl border border-slate-700/90 rounded-2xl p-3.5 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4F63D] animate-ping" />
                    <div>
                      <p className="text-xs font-bold text-white">Colis pilote en transit : HMD-DEMO-001</p>
                      <p className="text-[11px] text-slate-300">Autocar en route · RNIE 2 via Bohicon</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveRole('client')}
                    className="px-3 py-1.5 rounded-xl bg-[#D4F63D] text-[#0B0F19] text-xs font-black flex items-center gap-1 cursor-pointer hover:bg-[#c4ea2d]"
                  >
                    <span>Suivre</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Tiles (Directly inspired by GoDash "Create / Calculate / Receipts") */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          onClick={() => setActiveRole('client')}
          className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#D4F63D] transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#0B0F19] text-[#D4F63D] flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform shadow-md">
            <Package size={24} className="stroke-[2.2]" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-teal-700 transition-colors">Créer un envoi</h3>
            <p className="text-slate-500 text-xs mt-1 leading-snug">Formulaire guidé en 3 étapes pour expédier de Cotonou à Parakou.</p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-teal-700">
            <span>Commencer</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => setActiveRole('client')}
          className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#D4F63D] transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#D4F63D]/25 text-[#0B0F19] flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform shadow-sm">
            <Compass size={24} className="stroke-[2.2]" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-teal-700 transition-colors">Suivi en direct</h3>
            <p className="text-slate-500 text-xs mt-1 leading-snug">Timeline d'expédition, statut en direct et code de sécurité PIN.</p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-teal-700">
            <span>Accéder au tracking</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => setActiveRole('courier')}
          className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#D4F63D] transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform shadow-sm">
            <Bike size={24} className="stroke-[2.2]" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-teal-700 transition-colors">Espace Coursier</h3>
            <p className="text-slate-500 text-xs mt-1 leading-snug">Missions attribuées, prise en charge chez le client et validation dépôt.</p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-teal-700">
            <span>Voir les missions</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => setActiveRole('carrier')}
          className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#D4F63D] transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform shadow-sm">
            <Bus size={24} className="stroke-[2.2]" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-amber-800 transition-colors">Compagnies Car</h3>
            <p className="text-slate-500 text-xs mt-1 leading-snug">Point de contrôle en agence : enregistrement au car et remise à l'arrivée.</p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-amber-800">
            <span>Guichet partenaire</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </section>

      {/* The 3-Step Storyboard (Inspired by Dash UI in Figma) */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
              L'Architecture Porte-à-Porte
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Comment fonctionne HERMES en 3 étapes ?
            </h2>
          </div>
          <p className="text-slate-500 text-sm max-w-md">
            Chaque opération est exécutée par un intervenant spécialisé et supervisée en direct par Strategy ARENA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 : First Mile */}
          <div className="rounded-3xl p-6 bg-slate-50/80 border border-slate-200/80 hover:border-teal-400 transition-all flex flex-col justify-between relative group hover:shadow-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#0B0F19] text-[#D4F63D] font-black text-sm flex items-center justify-center">
                  01
                </span>
                <span className="text-[11px] font-bold text-teal-800 bg-teal-100/70 px-2.5 py-0.5 rounded-full">
                  1er Kilomètre
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-teal-600/10 text-teal-700 flex items-center justify-center">
                <Bike size={30} className="stroke-[2.2]" />
              </div>

              <h3 className="font-extrabold text-slate-900 text-xl">Collecte à Cotonou</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dès confirmation, un coursier partenaire Hermes se rend au domicile ou commerce de l'expéditeur, vérifie le colis et l'achemine à l'agence de la compagnie de transport.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs text-slate-600 font-medium">
              <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
              <span>Zéro déplacement pour l'expéditeur</span>
            </div>
          </div>

          {/* Card 2 : Interurban Transit (Center Star) */}
          <div className="rounded-3xl p-6 bg-[#0B0F19] text-white border border-slate-800 shadow-xl flex flex-col justify-between relative group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#D4F63D] text-[#0B0F19] font-black text-sm flex items-center justify-center">
                  02
                </span>
                <span className="text-[11px] font-bold text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  Liaison Interurbaine
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#D4F63D] flex items-center justify-center">
                <Bus size={30} className="stroke-[2.2]" />
              </div>

              <h3 className="font-extrabold text-white text-xl">Transport en Autocar</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                La compagnie partenaire embarque le colis dans sa soute sécurisée et assure le voyage routier entre Cotonou et Parakou sur ses lignes régulières.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-[#D4F63D] font-medium">
              <ShieldCheck size={16} className="text-[#D4F63D] shrink-0" />
              <span>Flotte et réseau de transport valorisés</span>
            </div>
          </div>

          {/* Card 3 : Last Mile */}
          <div className="rounded-3xl p-6 bg-slate-50/80 border border-slate-200/80 hover:border-teal-400 transition-all flex flex-col justify-between relative group hover:shadow-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#0B0F19] text-[#D4F63D] font-black text-sm flex items-center justify-center">
                  03
                </span>
                <span className="text-[11px] font-bold text-teal-800 bg-teal-100/70 px-2.5 py-0.5 rounded-full">
                  Dernier Kilomètre
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-teal-600/10 text-teal-700 flex items-center justify-center">
                <Package size={30} className="stroke-[2.2]" />
              </div>

              <h3 className="font-extrabold text-slate-900 text-xl">Livraison à Parakou</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                À l'arrivée du car à la gare de Parakou, un second coursier Hermes récupère le colis au guichet bagages et le livre directement au destinataire contre validation d'un code PIN secret.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs text-slate-600 font-medium">
              <KeyRound size={16} className="text-teal-600 shrink-0" />
              <span>Preuve de livraison par code secret</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance Banner for Transport Companies (PRD Section 1 & Section 6) */}
      <section className="bg-gradient-to-br from-slate-900 to-[#0B0F19] rounded-3xl p-6 sm:p-10 border border-slate-800 text-white shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4F63D]/15 text-[#D4F63D] text-xs font-bold border border-[#D4F63D]/30">
              <ShieldCheck size={14} />
              Partenariat Gagnant-Gagnant pour les Transporteurs
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">
              HERMES ne remplace pas les compagnies de transport.
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Nous valorisons vos liaisons régulières en apportant des colis pré-enregistrés, étiquetés et déposés directement à vos agences par nos coursiers. Vos autocars maximisent le remplissage de leurs soutes sans charge de livraison urbaine.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <p className="font-bold text-[#D4F63D]">Zéro modification d'horaire</p>
                <p className="text-slate-400 mt-1">Vos bus partent selon votre planning habituel.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <p className="font-bold text-[#D4F63D]">Zéro logistique urbaine</p>
                <p className="text-slate-400 mt-1">HERMES s'occupe de la collecte et de la distribution.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <p className="font-bold text-[#D4F63D]">Revenu complémentaire</p>
                <p className="text-slate-400 mt-1">Monétisation immédiate de l'espace bagage disponible.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <p className="font-bold text-[#D4F63D]">Application ultra-simple</p>
                <p className="text-slate-400 mt-1">Un clic au départ, un clic à l'arrivée. Zéro tracas.</p>
              </div>
            </div>
          </div>

          {/* Right Mascot card with courier */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="bg-[#121929] rounded-3xl p-5 border border-slate-700/80 shadow-2xl w-full max-w-sm text-center space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-slate-800">
                <img 
                  src="/images/courier-mascot.jpg" 
                  alt="Coursier Hermes" 
                  className="w-full h-56 object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0B0F19]/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-bold text-[#D4F63D] border border-slate-700">
                  Coursier Partenaire Démo
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-white text-base">Espace Compagnie de Transport</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Testez l'interface épurée conçue pour les agents de guichet.
                </p>
              </div>

              <button
                onClick={() => setActiveRole('carrier')}
                className="w-full py-3 rounded-2xl bg-[#D4F63D] hover:bg-[#c3e82d] text-[#0B0F19] font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#D4F63D]/20 cursor-pointer"
              >
                <span>Accéder à l'Espace Guichet Compagnie</span>
                <ChevronRight size={14} className="stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Interactive Roles Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700">
            Navigation Démo Multi-Rôles
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            4 espaces synchronisés en temps réel
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => setActiveRole('client')}
            className="p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-[#D4F63D] hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0B0F19] text-[#D4F63D] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Package size={22} className="stroke-[2.2]" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-lg group-hover:text-teal-700 transition-colors">Espace Client</h4>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                Création en 3 étapes guidées, consultation du statut et timeline complète avec code PIN.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>Ouvrir l'espace</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => setActiveRole('courier')}
            className="p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-[#D4F63D] hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Bike size={22} className="stroke-[2.2]" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-lg group-hover:text-teal-700 transition-colors">Coursier Hermes</h4>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                Interface mobile dédiée aux livreurs : confirmation de collecte à Cotonou et remise finale à Parakou.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>Ouvrir l'espace</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => setActiveRole('carrier')}
            className="p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-[#D4F63D] hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Bus size={22} className="stroke-[2.2]" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-lg group-hover:text-amber-800 transition-colors">Compagnie Partenaire</h4>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                Enregistrement au guichet bagages en 1 clic : prise en charge dans le car et arrivée en gare.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
              <span>Ouvrir l'espace</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => setActiveRole('arena')}
            className="p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-[#D4F63D] hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-[#D4F63D] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <ShieldCheck size={22} className="stroke-[2.2]" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-lg group-hover:text-slate-900 transition-colors">Strategy ARENA</h4>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                Tour de contrôle logistique : attribution des coursiers, suivi en temps réel et gestion des incidents.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
              <span>Superviser</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

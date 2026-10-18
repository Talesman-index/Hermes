import React, { useState } from 'react';
import { useMobileApp } from '../../context/MobileAppContext';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Bell, 
  CreditCard, 
  Sparkles, 
  HelpCircle, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle2, 
  ExternalLink, 
  Sliders, 
  FileText, 
  LogOut,
  X,
  Check,
  Building2,
  Package
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { 
    setActiveTab, 
    openOnboarding, 
    resetDemoData, 
    showToast,
    shipments
  } = useMobileApp();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);

  const deliveredCount = shipments.filter((s) => s.currentStep === 9).length;
  const activeCount = shipments.filter((s) => s.currentStep < 9).length;

  const handleReset = () => {
    resetDemoData();
    showToast('Données de démonstration réinitialisées.');
  };

  return (
    <div className="space-y-4 pb-28 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">Mon Profil</h1>
        <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
          Compte Vérifié
        </span>
      </div>

      {/* Main Profile Identity Card */}
      <div className="bg-gradient-to-br from-[#0B1F17] via-[#0E2F23] to-[#0B1F17] text-white rounded-3xl p-5 shadow-xl border border-emerald-900/60 relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          {/* Avatar with emerald ring */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-400 shadow-lg shrink-0">
            <img 
              src="/images/black-customer.jpg" 
              alt="Photo de profil" 
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0B1F17] flex items-center justify-center">
              <Check size={9} className="text-white stroke-[3]" />
            </div>
          </div>

          {/* Name & Contact */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-black text-white truncate">Koffi Mensah</h2>
              <span className="text-xs">🇧🇯</span>
            </div>
            <p className="text-xs text-emerald-300 font-mono mt-0.5">+229 97 10 20 30</p>
            <div className="flex items-center gap-1 text-[11px] text-slate-300 mt-1">
              <MapPin size={11} className="text-emerald-400 shrink-0" />
              <span className="truncate">Haie Vive, Cotonou · Bénin</span>
            </div>
          </div>
        </div>

        {/* Corridor Pill */}
        <div className="mt-4 pt-3 border-t border-emerald-800/60 flex items-center justify-between text-xs relative z-10">
          <span className="text-slate-300 text-[11px]">Corridor principal :</span>
          <span className="font-extrabold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-700/50">
            Cotonou ➔ Parakou (RNIE 2)
          </span>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-lg font-mono font-black text-slate-900">{shipments.length + 12}</p>
          <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">Total Envois</p>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-lg font-mono font-black text-emerald-600">{activeCount}</p>
          <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">En cours</p>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-lg font-mono font-black text-emerald-700">100%</p>
          <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">Remise réussie</p>
        </div>
      </div>

      {/* Group 1: Mon Compte & Carnet d'adresses */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-xs space-y-1">
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 mb-2">
          Mon Compte & Carnet d'adresses
        </p>

        {/* Adresses enregistrées */}
        <button
          onClick={() => setAddressModalOpen(true)}
          className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <MapPin size={17} />
            </div>
            <div>
              <p className="font-extrabold text-xs text-slate-900">Adresses favorites</p>
              <p className="text-[11px] text-slate-500">Haie Vive (Cotonou) & Banikanni (Parakou)</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Sécurité et Code PIN */}
        <button
          onClick={() => setSecurityModalOpen(true)}
          className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck size={17} />
            </div>
            <div>
              <p className="font-extrabold text-xs text-slate-900">Sécurité & Code PIN</p>
              <p className="text-[11px] text-slate-500">Protection systématique à 6 chiffres</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Group 2: Préférences de notifications */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-xs space-y-3">
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 mb-1">
          Alertes & Notifications Bénin
        </p>

        {/* SMS Alertes */}
        <div className="flex items-center justify-between px-2.5 py-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Bell size={16} />
            </div>
            <div>
              <p className="font-bold text-xs text-slate-800">Alertes SMS instantanées</p>
              <p className="text-[10px] text-slate-400">À chaque étape validée (1 à 9)</p>
            </div>
          </div>
          <button
            onClick={() => {
              setNotificationsEnabled(!notificationsEnabled);
              showToast(notificationsEnabled ? 'Alertes SMS désactivées' : 'Alertes SMS activées');
            }}
            className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-0.5 ${
              notificationsEnabled ? 'bg-emerald-600' : 'bg-slate-200'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
              notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* WhatsApp Notification */}
        <div className="flex items-center justify-between px-2.5 py-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Phone size={16} />
            </div>
            <div>
              <p className="font-bold text-xs text-slate-800">Suivi WhatsApp & Reçu</p>
              <p className="text-[10px] text-slate-400">Lien direct de tracking par message</p>
            </div>
          </div>
          <button
            onClick={() => {
              setWhatsappAlerts(!whatsappAlerts);
              showToast(whatsappAlerts ? 'Suivi WhatsApp désactivé' : 'Suivi WhatsApp activé');
            }}
            className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-0.5 ${
              whatsappAlerts ? 'bg-emerald-600' : 'bg-slate-200'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
              whatsappAlerts ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

      {/* Group 3: Découverte & Support */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-xs space-y-1">
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 mb-2">
          Expérience & Démonstration
        </p>

        {/* Replay Onboarding */}
        <button
          onClick={openOnboarding}
          className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Sparkles size={17} />
            </div>
            <div>
              <p className="font-extrabold text-xs text-slate-900">Revoir l'Onboarding HERMES</p>
              <p className="text-[11px] text-slate-500">Les 3 temps de la logistique en images</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Assistance & Contact */}
        <a
          href="tel:+22997102030"
          className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
              <HelpCircle size={17} />
            </div>
            <div>
              <p className="font-extrabold text-xs text-slate-900">Support & Assistance Bénin</p>
              <p className="text-[11px] text-slate-500">Ligne directe coordination transport</p>
            </div>
          </div>
          <ExternalLink size={14} className="text-slate-400 group-hover:text-emerald-700 transition-colors" />
        </a>

        {/* Reset Demo */}
        <button
          onClick={handleReset}
          className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-amber-50/50 transition-colors cursor-pointer text-left group text-amber-900"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <RotateCcw size={17} />
            </div>
            <div>
              <p className="font-extrabold text-xs text-amber-950">Réinitialiser le parcours démo</p>
              <p className="text-[11px] text-amber-800/80">Remettre l'expédition à l'étape 1/9</p>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
            Démo
          </span>
        </button>
      </div>

      {/* Footer Branding */}
      <div className="text-center pt-2 space-y-1">
        <p className="text-xs font-black text-slate-700 tracking-tight font-sans">
          HERMES <span className="text-emerald-700">BÉNIN</span>
        </p>
        <p className="text-[10px] text-slate-400">
          Développé par <strong>Strategy ARENA</strong> · Version Démo MVP 1.0
        </p>
      </div>

      {/* Modal 1: Adresses Favorites */}
      {addressModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <MapPin size={16} />
                </div>
                <h3 className="font-black text-slate-900 text-sm">Mes Adresses Enregistrées</h3>
              </div>
              <button onClick={() => setAddressModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Collecte Fréquente · Cotonou
                  </span>
                  <span className="text-emerald-600 font-bold text-[10px]">Par défaut</span>
                </div>
                <p className="font-extrabold text-slate-900 text-sm">Rue 340, Haie Vive</p>
                <p className="text-slate-500">Immeuble blanc, 2e étage face pharmacie</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                  Destination Fréquente · Parakou
                </span>
                <p className="font-extrabold text-slate-900 text-sm">Quartier Banikanni, Parakou</p>
                <p className="text-slate-500">Portail vert près de la grande voie inter-États</p>
              </div>
            </div>

            <button
              onClick={() => {
                setAddressModalOpen(false);
                showToast('Adresses enregistrées');
              }}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs cursor-pointer shadow-md shadow-emerald-600/30"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal 2: Sécurité & PIN */}
      {securityModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <ShieldCheck size={16} />
                </div>
                <h3 className="font-black text-slate-900 text-sm">Sécurité & Code Secret PIN</h3>
              </div>
              <button onClick={() => setSecurityModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5 text-emerald-950">
                <p className="font-black text-sm">Comment fonctionne le code PIN ?</p>
                <p className="text-xs leading-relaxed text-emerald-900">
                  À chaque expédition, HERMES génère un code secret unique à 6 chiffres transmis uniquement au destinataire désigné.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-800">Garanties anti-fraude :</p>
                <p>✓ Aucun colis n'est remis sans saisie du code valide.</p>
                <p>✓ Horodatage et géolocalisation de la remise.</p>
                <p>✓ Reçu numérique instantané envoyé aux deux parties.</p>
              </div>
            </div>

            <button
              onClick={() => setSecurityModalOpen(false)}
              className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs cursor-pointer"
            >
              Compris
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

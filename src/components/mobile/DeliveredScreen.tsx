import React from 'react';
import { useMobileApp } from '../../context/MobileAppContext';
import { WORKFLOW_STAGES } from '../../types';
import { 
  CheckCircle2, 
  Package, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  PlusCircle, 
  Share2, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export const DeliveredScreen: React.FC = () => {
  const { activeShipment, setActiveTab } = useMobileApp();

  return (
    <div className="space-y-6 pb-28 text-center animate-in zoom-in-95 duration-300">
      {/* Success Badge & Illustration */}
      <div className="relative mx-auto w-32 h-32 rounded-3xl overflow-hidden border-4 border-emerald-500 shadow-2xl bg-slate-900 mt-2">
        <img 
          src="/images/onboarding-delivery.jpg" 
          alt="Livraison terminée avec succès" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex items-end justify-center pb-2">
          <span className="text-[10px] font-black uppercase text-white bg-emerald-600 px-2 py-0.5 rounded-full border border-emerald-400/50 shadow-sm">
            Livré 100%
          </span>
        </div>
      </div>

      {/* Main Message */}
      <div className="space-y-1.5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
          <CheckCircle2 size={14} className="stroke-[3]" />
          Mission achevée
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Votre colis a été livré !
        </h1>
        <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
          Le colis a été remis en main propre au destinataire final à Parakou contre validation du code PIN secret.
        </p>
      </div>

      {/* Shipment Recap Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm text-left space-y-3.5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Référence d'expédition</span>
            <p className="font-mono font-black text-slate-900 text-base">{activeShipment.reference}</p>
          </div>
          <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
            Terminé
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-400 text-[10px]">Trajet :</span>
            <p className="font-bold text-slate-800">Cotonou ➔ Parakou</p>
          </div>
          <div>
            <span className="text-slate-400 text-[10px]">Type :</span>
            <p className="font-bold text-slate-800">{activeShipment.packageType}</p>
          </div>
          <div className="col-span-2">
            <span className="text-slate-400 text-[10px]">Contenu :</span>
            <p className="font-semibold text-slate-700">{activeShipment.description}</p>
          </div>
          <div>
            <span className="text-slate-400 text-[10px]">Expéditeur :</span>
            <p className="font-bold text-slate-800">{activeShipment.sender.name}</p>
          </div>
          <div>
            <span className="text-slate-400 text-[10px]">Destinataire :</span>
            <p className="font-bold text-slate-800">{activeShipment.recipient.name}</p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Validation PIN : <strong className="font-mono text-slate-800">{activeShipment.securityPin}</strong></span>
          <span>{activeShipment.updatedAt}</span>
        </div>
      </div>

      {/* Completed Stages History Archive */}
      <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200/80 text-left space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-900 text-xs uppercase tracking-wider">
            Historique complet (9 jalons validés)
          </h3>
          <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            100% complété
          </span>
        </div>

        <div className="space-y-2">
          {WORKFLOW_STAGES.map((s) => (
            <div key={s.step} className="flex items-center justify-between text-xs py-1 border-b border-slate-200/40 last:border-none">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
                <span className="font-semibold text-slate-800">{s.step}. {s.title}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{s.location}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Action Button: Nouvelle Expédition */}
      <div className="space-y-3 pt-2">
        <button
          onClick={() => setActiveTab('create')}
          className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 cursor-pointer active:scale-95 transition-all"
        >
          <PlusCircle size={18} className="stroke-[2.5]" />
          <span>Nouvelle expédition</span>
          <ArrowRight size={18} className="stroke-[2.5]" />
        </button>

        <button
          onClick={() => setActiveTab('home')}
          className="w-full py-3 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
        >
          Retourner à l'accueil
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useMobileApp } from '../../context/MobileAppContext';
import { 
  ArrowLeft, 
  MapPin, 
  Package, 
  User, 
  Check, 
  ChevronRight, 
  Info, 
  Sparkles, 
  Phone, 
  CheckCircle2, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  QrCode
} from 'lucide-react';

export const CreateShipmentScreen: React.FC = () => {
  const { createNewShipment, openTracking, setActiveTab } = useMobileApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [createdShipmentId, setCreatedShipmentId] = useState<string | null>(null);
  const [createdRef, setCreatedRef] = useState<string>('');

  // Step 1: Trajet
  const [originAddress, setOriginAddress] = useState('Rue 340, Haie Vive, Cotonou');
  const [originNotes, setOriginNotes] = useState('Immeuble beige face à la pharmacie');
  const [destinationAddress, setDestinationAddress] = useState('Quartier Banikanni, Parakou');
  const [destinationNotes, setDestinationNotes] = useState('Près de la station et du grand marché');

  // Step 2: Colis
  const [packageType, setPackageType] = useState('Colis standard');
  const [description, setDescription] = useState('Carton de fournitures et échantillons');
  const [estimatedWeight, setEstimatedWeight] = useState('2.0 kg');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Step 3: Informations
  const [senderName, setSenderName] = useState('Cabinet Stratégie Cotonou');
  const [senderPhone, setSenderPhone] = useState('+229 97 00 10 20');
  const [recipientName, setRecipientName] = useState('M. Bio Sabi Parakou');
  const [recipientPhone, setRecipientPhone] = useState('+229 95 00 30 40');

  const handleConfirm = () => {
    const created = createNewShipment({
      originAddress,
      destinationAddress,
      originNotes,
      destinationNotes,
      packageType,
      description,
      estimatedWeight,
      specialInstructions,
      senderName,
      senderPhone,
      recipientName,
      recipientPhone,
    });

    setCreatedShipmentId(created.id);
    setCreatedRef(created.reference);
  };

  // If created, render the instant confirmation screen with tracking reference
  if (createdShipmentId) {
    return (
      <div className="space-y-6 py-6 pb-24 text-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-2xl shadow-emerald-600/30">
          <CheckCircle2 size={42} className="stroke-[2.8]" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
            Expédition Enregistrée
          </span>
          <h2 className="text-2xl font-black text-slate-900">Demande confirmée avec succès !</h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Un coursier partenaire Hermes a été notifié pour la collecte à votre domicile à Cotonou.
          </p>
        </div>

        {/* Tracking Number Card */}
        <div className="bg-[#0B1F17] text-white p-5 rounded-3xl shadow-xl border border-emerald-850/80 space-y-3 max-w-xs mx-auto">
          <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-300/80">Numéro de suivi</p>
          <p className="text-2xl font-mono font-black text-emerald-400 tracking-wider select-all">
            {createdRef}
          </p>
          <div className="pt-2 border-t border-emerald-900/60 flex items-center justify-between text-[11px] text-slate-300">
            <span>Corridor : Cotonou ➔ Parakou</span>
            <span className="text-emerald-400 font-bold">Étape 1/9</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => openTracking(createdShipmentId)}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 cursor-pointer active:scale-95 transition-all"
          >
            <Compass size={18} className="stroke-[2.5]" />
            <span>Suivre mon colis en direct</span>
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
  }

  return (
    <div className="space-y-5 pb-24 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            if (step > 1) setStep((s) => (s - 1) as any);
            else setActiveTab('home');
          }}
          className="w-9 h-9 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs"
        >
          <ArrowLeft size={16} />
        </button>

        <h1 className="text-base font-black text-slate-900">Nouvelle expédition</h1>

        <div className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-xl">
          {step}/4
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="grid grid-cols-4 gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step >= i ? 'bg-emerald-600' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* STEP 1: TRAJET */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/90 space-y-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full">
              Étape 1 · Trajet
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-1">Adresses de collecte et livraison</h2>
            <p className="text-xs text-slate-400">Le coursier se déplace directement aux adresses indiquées.</p>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Départ</span>
                <p className="font-extrabold text-slate-900">Cotonou (Littoral)</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Destination</span>
                <p className="font-extrabold text-slate-900">Parakou (Borgou)</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Adresse de récupération à Cotonou *
              </label>
              <input
                type="text"
                required
                value={originAddress}
                onChange={(e) => setOriginAddress(e.target.value)}
                placeholder="Ex: Rue 340, Haie Vive, Cotonou"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Repère ou indication de collecte
              </label>
              <input
                type="text"
                value={originNotes}
                onChange={(e) => setOriginNotes(e.target.value)}
                placeholder="Ex: Immeuble beige face pharmacie"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="pt-1">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Adresse de livraison finale à Parakou *
              </label>
              <input
                type="text"
                required
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
                placeholder="Ex: Quartier Banikanni, Parakou"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Repère pour le livreur de Parakou
              </label>
              <input
                type="text"
                value={destinationNotes}
                onChange={(e) => setDestinationNotes(e.target.value)}
                placeholder="Ex: Portail vert près de la grande voie"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!originAddress.trim() || !destinationAddress.trim()) {
                alert('Veuillez renseigner les adresses de départ et de destination.');
                return;
              }
              setStep(2);
            }}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/25 active:scale-98 transition-all"
          >
            <span>Continuer vers le Colis</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* STEP 2: COLIS */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/90 space-y-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full">
              Étape 2 · Colis
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-1">Nature et caractéristiques du colis</h2>
            <p className="text-xs text-slate-400">Précisez le contenu pour adapter l'emballage et le transport.</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Type de colis</label>
              <select
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Colis standard">Colis standard / Carton scellé</option>
                <option value="Documents / Plis urgents">Documents confidentiels / Plis urgents</option>
                <option value="Matériel électronique">Matériel électronique / Informatique</option>
                <option value="Mode & Textiles">Vêtements / Textiles / Chaussures</option>
                <option value="Pharmacie & Soins">Produits pharmaceutiques / Soins</option>
                <option value="Pièces mécaniques">Pièces détachées mécaniques</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description courte du contenu *</label>
              <input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Échantillons commerciaux et catalogue 2026"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Poids approximatif (facultatif)</label>
              <input
                type="text"
                value={estimatedWeight}
                onChange={(e) => setEstimatedWeight(e.target.value)}
                placeholder="Ex: 2.5 kg"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Consignes particulières (facultatif)</label>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Ex: Fragile, ne pas poser d'objet lourd."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
            >
              Retour
            </button>
            <button
              type="button"
              onClick={() => {
                if (!description.trim()) {
                  alert('Veuillez renseigner une description du colis.');
                  return;
                }
                setStep(3);
              }}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/25 active:scale-98 transition-all"
            >
              <span>Continuer vers les Contacts</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: INFORMATIONS */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/90 space-y-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full">
              Étape 3 · Informations
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-1">Expéditeur et Destinataire</h2>
            <p className="text-xs text-slate-400">Ces numéros recevront les notifications et le code de livraison.</p>
          </div>

          <div className="space-y-4">
            {/* Sender */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-[10px] uppercase font-bold text-teal-800">Expéditeur (Cotonou)</span>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Nom complet *</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Téléphone de contact *</label>
                <input
                  type="tel"
                  required
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Recipient */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-[10px] uppercase font-bold text-amber-800">Destinataire (Parakou)</span>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Nom complet *</label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Téléphone joignable *</label>
                <input
                  type="tel"
                  required
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
            >
              Retour
            </button>
            <button
              type="button"
              onClick={() => {
                if (!senderName.trim() || !senderPhone.trim() || !recipientName.trim() || !recipientPhone.trim()) {
                  alert('Veuillez renseigner tous les champs de contact.');
                  return;
                }
                setStep(4);
              }}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/25 active:scale-98 transition-all"
            >
              <span>Vérifier le Récapitulatif</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CONFIRMATION (PRD Exigence Frais à confirmer) */}
      {step === 4 && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/90 space-y-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full">
              Étape 4 · Récapitulatif
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-1">Vérification de l'expédition</h2>
            <p className="text-xs text-slate-400">Contrôlez les informations avant enregistrement.</p>
          </div>

          {/* Detailed summary card */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200">
              <div>
                <span className="text-slate-400 text-[10px]">Liaison :</span>
                <p className="font-extrabold text-slate-900">Cotonou ➔ Parakou</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Type :</span>
                <p className="font-extrabold text-slate-900">{packageType}</p>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 text-[10px]">Description :</span>
                <p className="font-semibold text-slate-800">{description}</p>
              </div>
            </div>

            <div className="space-y-1.5 pb-2 border-b border-slate-200">
              <p className="text-[10px] uppercase font-bold text-teal-800">Collecte (Cotonou)</p>
              <p className="font-bold text-slate-900">{senderName} ({senderPhone})</p>
              <p className="text-slate-600">{originAddress}</p>
            </div>

            <div className="space-y-1.5 pb-2 border-b border-slate-200">
              <p className="text-[10px] uppercase font-bold text-amber-800">Livraison finale (Parakou)</p>
              <p className="font-bold text-slate-900">{recipientName} ({recipientPhone})</p>
              <p className="text-slate-600">{destinationAddress}</p>
            </div>

            {/* Service fee note as specified in PRD */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-2 text-amber-900">
              <Info size={16} className="text-amber-700 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">Frais de service :</span>
                  <span className="font-mono font-black text-xs text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    À confirmer
                  </span>
                </div>
                <p className="text-[10px] text-amber-800 mt-1 leading-snug">
                  La tarification finale sera validée lors de la phase pilote avec les compagnies de transport partenaires.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
            >
              Modifier
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-emerald-600/30 active:scale-95 transition-all"
            >
              <Check size={18} className="stroke-[3]" />
              <span>Confirmer l'expédition</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

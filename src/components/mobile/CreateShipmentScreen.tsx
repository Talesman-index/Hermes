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
  QrCode,
  Navigation,
  ExternalLink,
  CreditCard,
  Lock,
  Receipt,
  Crosshair,
  Bus
} from 'lucide-react';
import { PickupLocation, ShipmentPayment } from '../../types';
import { PickupLocationPickerModal } from './PickupLocationPickerModal';
import { PaymentModal } from './PaymentModal';

export const CreateShipmentScreen: React.FC = () => {
  const { createNewShipment, openTracking, setActiveTab } = useMobileApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [createdShipmentId, setCreatedShipmentId] = useState<string | null>(null);
  const [createdRef, setCreatedRef] = useState<string>('');
  const [createdShipment, setCreatedShipment] = useState<any>(null);

  // Modals state
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Step 1: Trajet & Localisation Maps
  const [originAddress, setOriginAddress] = useState('Rue 340, Haie Vive, Cotonou');
  const [originNotes, setOriginNotes] = useState('Immeuble beige face à la pharmacie');
  const [destinationAddress, setDestinationAddress] = useState('Quartier Banikanni, Parakou');
  const [destinationNotes, setDestinationNotes] = useState('Près de la station et du grand marché');
  const [pickupLocation, setPickupLocation] = useState<PickupLocation>({
    lat: 6.3571,
    lng: 2.4048,
    address: 'Rue 340, Haie Vive, Cotonou',
    district: 'Haie Vive (Camp Guézo)',
    mapUrl: 'https://maps.google.com/?q=6.3571,2.4048',
    notes: 'Immeuble beige face à la pharmacie',
  });

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

  // Step 4: Frais d'expédition & Règlement
  const [payment, setPayment] = useState<ShipmentPayment | null>(null);

  // Fee calculation engine for corridor Cotonou -> Parakou (420 km)
  const getFeeDetails = () => {
    switch (packageType) {
      case 'Documents / Plis urgents':
        return {
          total: 3500,
          formatted: '3 500 FCFA',
          pickup: 1500,
          corridor: 1000,
          delivery: 1000,
        };
      case 'Matériel électronique':
        return {
          total: 6000,
          formatted: '6 000 FCFA',
          pickup: 1500,
          corridor: 3500,
          delivery: 1000,
        };
      default:
        return {
          total: 5000,
          formatted: '5 000 FCFA',
          pickup: 1500,
          corridor: 2500,
          delivery: 1000,
        };
    }
  };

  const feeDetails = getFeeDetails();

  const handleLocationSelected = (loc: PickupLocation) => {
    setPickupLocation(loc);
    setOriginAddress(loc.address);
    if (loc.notes) {
      setOriginNotes(loc.notes);
    }
  };

  const handlePaymentSuccess = (completedPayment: ShipmentPayment) => {
    setPayment(completedPayment);
    setIsPaymentModalOpen(false);

    // Auto-confirm the shipment with the payment recorded
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
      pickupLocation,
      payment: completedPayment,
      serviceFee: completedPayment.amountFormatted,
    });

    setCreatedShipmentId(created.id);
    setCreatedRef(created.reference);
    setCreatedShipment(created);
  };

  const handleDirectConfirm = () => {
    // If not paid via modal, proceed with automatic MTN MoMo default payment or pending
    if (!payment) {
      setIsPaymentModalOpen(true);
      return;
    }

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
      pickupLocation,
      payment,
      serviceFee: payment.amountFormatted,
    });

    setCreatedShipmentId(created.id);
    setCreatedRef(created.reference);
    setCreatedShipment(created);
  };

  // If created, render the instant confirmation screen with tracking reference, payment receipt, and maps pin
  if (createdShipmentId) {
    return (
      <div className="space-y-6 py-6 pb-24 text-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-2xl shadow-emerald-600/30">
          <CheckCircle2 size={42} className="stroke-[2.8]" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              Expédition & Paiement Validés
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">Demande confirmée avec succès !</h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Vos frais d'expédition sont réglés et votre position GPS a été transmise au coursier Hermes à Cotonou.
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
            <span className="text-emerald-400 font-bold whitespace-nowrap shrink-0">Étape 1/9</span>
          </div>
        </div>

        {/* Payment & GPS Confirmation Recap */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm text-left text-xs space-y-3 max-w-xs mx-auto">
          {/* Payment receipt line */}
          <div className="flex items-start gap-2.5 pb-2.5 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Receipt size={16} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">Frais d'expédition</span>
                <span className="font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                  {createdShipment?.serviceFee || feeDetails.formatted}
                </span>
              </div>
              <p className="font-bold text-slate-800 text-[11px] mt-0.5">
                Acquitté via {createdShipment?.payment?.method || 'MTN Mobile Money'}
              </p>
              <p className="text-[10px] text-slate-400 font-mono">
                Réf : {createdShipment?.payment?.transactionId || 'TXN-MOMO-2026-CONFIRMED'}
              </p>
            </div>
          </div>

          {/* GPS Pickup line */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <MapPin size={16} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">Collecte Maps GPS</span>
                <span className="text-[10px] font-bold text-emerald-700 font-mono">
                  {pickupLocation.lat.toFixed(4)}°, {pickupLocation.lng.toFixed(4)}°
                </span>
              </div>
              <p className="font-bold text-slate-800 text-[11px] mt-0.5">
                {pickupLocation.district || 'Cotonou'}
              </p>
              <a
                href={pickupLocation.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-emerald-600 hover:text-emerald-800 font-bold flex items-center gap-1 mt-1 inline-flex cursor-pointer"
              >
                <span>Ouvrir la localisation dans Google Maps</span>
                <ExternalLink size={10} />
              </a>
            </div>
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

      {/* STEP 1: TRAJET & LOCALISATION MAPS */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/90 space-y-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full">
              Étape 1 · Trajet & Localisation
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-1">Adresses de collecte et livraison</h2>
            <p className="text-xs text-slate-400">Précisez le lieu de ramassage GPS et la destination finale.</p>
          </div>

          <div className="space-y-3.5">
            {/* POINT A: COLLECTE COTONOU (AVEC LOCALISATION GPS) */}
            <div className="p-4 rounded-3xl bg-slate-50/90 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                    <MapPin size={16} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-xs">Collecte à Cotonou</h3>
                    <p className="text-[10px] text-slate-400">Ramassage par le coursier Hermes</p>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-200 whitespace-nowrap shrink-0 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  GPS Activé
                </span>
              </div>

              {/* Integrated GPS Location Bar */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-slate-900 text-xs truncate">
                      {pickupLocation.district || 'Cotonou Littoral'}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded whitespace-nowrap shrink-0">
                      {pickupLocation.lat.toFixed(4)}°, {pickupLocation.lng.toFixed(4)}°
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">
                    {pickupLocation.address}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={pickupLocation.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    title="Voir sur Google Maps"
                  >
                    <ExternalLink size={13} />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsMapModalOpen(true)}
                    className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-[11px] flex items-center gap-1.5 shadow-sm cursor-pointer transition-all whitespace-nowrap"
                  >
                    <Crosshair size={13} className="stroke-[2.5]" />
                    <span>Pointer</span>
                  </button>
                </div>
              </div>

              {/* Text Fields for Pickup */}
              <div className="space-y-2 pt-0.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Adresse ou rue exacte à Cotonou *
                  </label>
                  <input
                    type="text"
                    required
                    value={originAddress}
                    onChange={(e) => setOriginAddress(e.target.value)}
                    placeholder="Ex: Rue 340, Haie Vive, Cotonou"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Repère ou consigne pour le coursier
                  </label>
                  <input
                    type="text"
                    value={originNotes}
                    onChange={(e) => setOriginNotes(e.target.value)}
                    placeholder="Ex: Immeuble beige face pharmacie, 1er étage"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* ROUTE CORRIDOR SEPARATOR */}
            <div className="flex items-center justify-center gap-2 py-0.5 text-[10px] text-slate-400 font-bold">
              <div className="h-px bg-slate-200 flex-1" />
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-mono whitespace-nowrap shrink-0">
                <Bus size={12} className="text-emerald-600" />
                <span>Liaison autocar RNIE 2 · 420 km</span>
              </div>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            {/* POINT B: LIVRAISON PARAKOU */}
            <div className="p-4 rounded-3xl bg-slate-50/90 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
                    <MapPin size={16} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-xs">Livraison à Parakou</h3>
                    <p className="text-[10px] text-slate-400">Remise finale au destinataire</p>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-200 whitespace-nowrap shrink-0">
                  Dernier km
                </span>
              </div>

              <div className="space-y-2 pt-0.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Adresse ou quartier à Parakou *
                  </label>
                  <input
                    type="text"
                    required
                    value={destinationAddress}
                    onChange={(e) => setDestinationAddress(e.target.value)}
                    placeholder="Ex: Quartier Banikanni, Parakou"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Repère pour le livreur de Parakou
                  </label>
                  <input
                    type="text"
                    value={destinationNotes}
                    onChange={(e) => setDestinationNotes(e.target.value)}
                    placeholder="Ex: Portail vert près de la grande voie"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
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
            className="w-full py-4 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-between cursor-pointer shadow-lg shadow-emerald-600/25 active:scale-[0.98] transition-all group"
          >
            <span>Continuer vers le Colis</span>
            <ChevronRight size={18} className="stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
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
            <p className="text-xs text-slate-400">Le tarif d'expédition s'adapte automatiquement à votre type de colis.</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Type de colis</label>
              <select
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Colis standard">Colis standard / Carton scellé (5 000 FCFA)</option>
                <option value="Documents / Plis urgents">Documents confidentiels / Plis urgents (3 500 FCFA)</option>
                <option value="Matériel électronique">Matériel électronique / Informatique (6 000 FCFA)</option>
                <option value="Mode & Textiles">Vêtements / Textiles / Chaussures (5 000 FCFA)</option>
                <option value="Pharmacie & Soins">Produits pharmaceutiques / Soins (5 000 FCFA)</option>
                <option value="Pièces mécaniques">Pièces détachées mécaniques (6 000 FCFA)</option>
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

          <div className="flex items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 cursor-pointer transition-colors shadow-xs active:scale-95"
              title="Retour au Trajet"
            >
              <ArrowLeft size={18} />
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
              className="flex-1 py-4 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-between cursor-pointer shadow-lg shadow-emerald-600/25 active:scale-[0.98] transition-all group"
            >
              <span>Continuer vers les Contacts</span>
              <ChevronRight size={18} className="stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: INFORMATIONS CONTACTS */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/90 space-y-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full">
              Étape 3 · Informations
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-1">Expéditeur et Destinataire</h2>
            <p className="text-xs text-slate-400">Ces numéros recevront les notifications SMS et le code secret PIN.</p>
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
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
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
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 cursor-pointer transition-colors shadow-xs active:scale-95"
              title="Retour au Colis"
            >
              <ArrowLeft size={18} />
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
              className="flex-1 py-4 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-between cursor-pointer shadow-lg shadow-emerald-600/25 active:scale-[0.98] transition-all group"
            >
              <span>Vérifier le Récapitulatif</span>
              <ChevronRight size={18} className="stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: RÉCAPITULATIF & PAIEMENT DES FRAIS D'EXPÉDITION */}
      {step === 4 && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/90 space-y-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full">
              Étape 4 · Récapitulatif & Règlement
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-1">Frais d'expédition et Confirmation</h2>
            <p className="text-xs text-slate-400">Réglez les frais en ligne par Mobile Money pour déclencher le coursier.</p>
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

            {/* Pickup Point Summary with GPS badge */}
            <div className="space-y-1.5 pb-2 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase font-bold text-teal-800">Collecte (Cotonou)</p>
                <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                  GPS {pickupLocation.lat.toFixed(4)}°, {pickupLocation.lng.toFixed(4)}°
                </span>
              </div>
              <p className="font-bold text-slate-900">{senderName} ({senderPhone})</p>
              <p className="text-slate-600">{originAddress}</p>
              {pickupLocation.district && (
                <p className="text-[10px] text-slate-400">Zone : {pickupLocation.district}</p>
              )}
            </div>

            <div className="space-y-1.5 pb-2 border-b border-slate-200">
              <p className="text-[10px] uppercase font-bold text-amber-800">Livraison finale (Parakou)</p>
              <p className="font-bold text-slate-900">{recipientName} ({recipientPhone})</p>
              <p className="text-slate-600">{destinationAddress}</p>
            </div>

            {/* DYNAMIC SHIPPING FEE BREAKDOWN CARD */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-emerald-200/80">
                <div className="flex items-center gap-1.5">
                  <CreditCard size={15} className="text-emerald-700" />
                  <span className="font-extrabold text-xs">Frais d'expédition complets</span>
                </div>
                <span className="font-mono font-black text-sm text-emerald-900 bg-white px-2.5 py-0.5 rounded-lg border border-emerald-300 shadow-xs">
                  {feeDetails.formatted}
                </span>
              </div>

              {/* Itemized transparency breakdown */}
              <div className="space-y-1 text-[11px] text-emerald-800">
                <div className="flex justify-between">
                  <span>• Collecte domicile coursier Cotonou :</span>
                  <span className="font-mono font-bold">{feeDetails.pickup.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span>• Transport autocar RNIE 2 (420 km) :</span>
                  <span className="font-mono font-bold">{feeDetails.corridor.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span>• Livraison finale Parakou :</span>
                  <span className="font-mono font-bold">{feeDetails.delivery.toLocaleString()} FCFA</span>
                </div>
              </div>

              {/* Payment Status Info */}
              {payment ? (
                <div className="mt-2 pt-2 border-t border-emerald-200 flex items-center justify-between bg-white/80 p-2 rounded-xl text-[10px]">
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <CheckCircle2 size={13} className="text-emerald-600 stroke-[3]" />
                    <span>Payé par {payment.method}</span>
                  </span>
                  <span className="font-mono text-slate-500">{payment.transactionId}</span>
                </div>
              ) : (
                <div className="mt-2 pt-2 border-t border-emerald-200 flex items-center justify-between text-[10px] text-emerald-900">
                  <span className="flex items-center gap-1 font-bold">
                    <Lock size={12} className="text-emerald-700" />
                    <span>Règlement Mobile Money sécurisé</span>
                  </span>
                  <span className="font-mono font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                    MTN MoMo / Moov
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons: Premium mobile full-width CTA layout */}
          <div className="space-y-2.5 pt-2">
            {payment ? (
              <button
                type="button"
                onClick={handleDirectConfirm}
                className="w-full py-4 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-xl shadow-emerald-600/30 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Check size={16} className="stroke-[3]" />
                  </div>
                  <span className="text-sm font-extrabold tracking-tight">Confirmer l'expédition</span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-700/80 px-3 py-1.5 rounded-xl border border-emerald-400/30 font-mono font-bold text-xs text-white">
                  <span>Payé ✓</span>
                  <ArrowRight size={14} className="stroke-[3] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full py-4 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-xl shadow-emerald-600/30 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Lock size={15} className="stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-extrabold tracking-tight">Payer & Valider l'envoi</span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-700/80 px-3 py-1.5 rounded-xl border border-emerald-400/30 font-mono font-bold text-xs text-white">
                  <span>{feeDetails.formatted}</span>
                  <ArrowRight size={14} className="stroke-[3] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            )}

            <button
              type="button"
              onClick={() => setStep(3)}
              className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Modifier les informations</span>
            </button>
          </div>
        </div>
      )}

      {/* MAPS PICKER MODAL */}
      {isMapModalOpen && (
        <PickupLocationPickerModal
          initialLocation={pickupLocation}
          initialAddress={originAddress}
          onSelectLocation={handleLocationSelected}
          onClose={() => setIsMapModalOpen(false)}
        />
      )}

      {/* BENIN PAYMENT MODAL */}
      {isPaymentModalOpen && (
        <PaymentModal
          amount={feeDetails.total}
          amountFormatted={feeDetails.formatted}
          senderPhone={senderPhone}
          senderName={senderName}
          packageType={packageType}
          onPaymentSuccess={handlePaymentSuccess}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      )}
    </div>
  );
};

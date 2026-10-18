import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge, getStatusConfig } from '../common/StatusBadge';
import { ShipmentStatus } from '../../types';
import { 
  Package, 
  MapPin, 
  User, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Search, 
  PlusCircle, 
  QrCode, 
  ShieldCheck, 
  AlertTriangle, 
  Bus, 
  ArrowRight, 
  Bike, 
  FileText, 
  Printer, 
  Check, 
  Info,
  ChevronRight,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Zap,
  Navigation
} from 'lucide-react';

export const ClientView: React.FC = () => {
  const { 
    shipments, 
    selectedShipment, 
    setSelectedShipmentId, 
    createShipment, 
    carriers,
    setActiveRole
  } = useApp();

  const [activeTab, setActiveTab] = useState<'track' | 'create'>('track');
  const [searchTerm, setSearchTerm] = useState('');

  // Form states for 3-step wizard
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [packageType, setPackageType] = useState('Colis standard');
  const [description, setDescription] = useState('');
  const [estimatedWeight, setEstimatedWeight] = useState('1.5 kg');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedCarrierId, setSelectedCarrierId] = useState(carriers[0]?.id || 'carrier-1');

  // Sender info
  const [senderName, setSenderName] = useState('Cabinet Stratégie Cotonou');
  const [senderPhone, setSenderPhone] = useState('+229 97 00 10 20');
  const [senderAddress, setSenderAddress] = useState('Rue 340, Haie Vive, Cotonou');
  const [senderNotes, setSenderNotes] = useState('Immeuble beige, 2e étage');

  // Recipient info
  const [recipientName, setRecipientName] = useState('M. Bio Sabi Parakou');
  const [recipientPhone, setRecipientPhone] = useState('+229 95 00 30 40');
  const [recipientAddress, setRecipientAddress] = useState('Quartier Banikanni, Parakou');
  const [recipientNotes, setRecipientNotes] = useState('Portail vert près de la pharmacie');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Veuillez renseigner une courte description du colis.');
      return;
    }

    const created = createShipment({
      description,
      packageType,
      estimatedWeight,
      specialInstructions,
      carrierId: selectedCarrierId,
      sender: {
        name: senderName,
        phone: senderPhone,
        address: senderAddress,
        notes: senderNotes
      },
      recipient: {
        name: recipientName,
        phone: recipientPhone,
        address: recipientAddress,
        notes: recipientNotes
      }
    });

    // Reset wizard and switch to tracking
    setWizardStep(1);
    setDescription('');
    setActiveTab('track');
    setSelectedShipmentId(created.id);
  };

  const allFilteredShipments = shipments.filter(
    (s) =>
      s.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.recipient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStepProgressIndex = (status: ShipmentStatus) => {
    switch (status) {
      case 'registered': return 0;
      case 'pickup_assigned': return 1;
      case 'picked_up': return 2;
      case 'deposited_at_agency': return 3;
      case 'in_transit': return 4;
      case 'arrived_at_destination': return 5;
      case 'delivery_assigned': return 6;
      case 'out_for_delivery': return 7;
      case 'delivered': return 8;
      case 'incident': return -1;
      default: return 0;
    }
  };

  const currentStepIdx = selectedShipment ? getStepProgressIndex(selectedShipment.currentStatus) : 0;
  const progressPercent = currentStepIdx === -1 ? 50 : Math.min(100, Math.max(12, ((currentStepIdx + 1) / 9) * 100));

  return (
    <div className="space-y-6">
      {/* Top Header & Mode Toggle Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B0F19] bg-[#D4F63D] px-2.5 py-0.5 rounded-full">
              Espace Expéditeur
            </span>
            <span className="text-xs text-slate-400">· Cotonou ➔ Parakou</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {activeTab === 'track' ? 'Suivi de vos expéditions' : 'Créer une expédition porte-à-porte'}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Collecte à Cotonou, transport en car régulier, et remise à Parakou sans déplacement.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 bg-[#0B0F19] p-1.5 rounded-2xl shrink-0">
          <button
            onClick={() => setActiveTab('track')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'track'
                ? 'bg-[#D4F63D] text-[#0B0F19] shadow-md shadow-[#D4F63D]/20 scale-[1.02]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Search size={14} className="stroke-[2.5]" />
            <span>Suivre un colis</span>
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'create'
                ? 'bg-[#D4F63D] text-[#0B0F19] shadow-md shadow-[#D4F63D]/20 scale-[1.02]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <PlusCircle size={14} className="stroke-[2.5]" />
            <span>Créer un envoi</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CREATE SHIPMENT (PRD ÉCRAN 02) */}
      {activeTab === 'create' && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/90 overflow-hidden">
          {/* Stepper Header */}
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200/80">
            <div className="flex items-center justify-between max-w-xl mx-auto">
              <div className={`flex items-center gap-2 text-xs font-bold ${wizardStep >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${wizardStep >= 1 ? 'bg-[#0B0F19] text-[#D4F63D]' : 'bg-slate-200 text-slate-600'}`}>
                  1
                </span>
                <span>Colis & Transport</span>
              </div>
              <div className="w-8 sm:w-16 h-0.5 bg-slate-200" />
              <div className={`flex items-center gap-2 text-xs font-bold ${wizardStep >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${wizardStep >= 2 ? 'bg-[#0B0F19] text-[#D4F63D]' : 'bg-slate-200 text-slate-600'}`}>
                  2
                </span>
                <span>Expéditeur (Cotonou)</span>
              </div>
              <div className="w-8 sm:w-16 h-0.5 bg-slate-200" />
              <div className={`flex items-center gap-2 text-xs font-bold ${wizardStep >= 3 ? 'text-slate-900' : 'text-slate-400'}`}>
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${wizardStep >= 3 ? 'bg-[#0B0F19] text-[#D4F63D]' : 'bg-slate-200 text-slate-600'}`}>
                  3
                </span>
                <span>Destinataire (Parakou)</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleCreateSubmit} className="p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
            {/* Step 1: Package details */}
            {wizardStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="bg-[#D4F63D]/15 p-4 rounded-2xl border border-[#D4F63D]/40 flex items-start gap-3 text-xs text-slate-900">
                  <div className="w-6 h-6 rounded-lg bg-[#0B0F19] text-[#D4F63D] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <strong className="font-extrabold">Corridor pilote Cotonou ➔ Parakou (RNIE 2) :</strong>
                    <p className="text-slate-600 mt-0.5">
                      Un coursier collecte votre colis à domicile à Cotonou et le remet à la compagnie de car que vous sélectionnez.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Ville de collecte</label>
                    <input 
                      type="text" 
                      value="Cotonou (Littoral)" 
                      disabled 
                      className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-2xl text-slate-700 font-bold text-sm cursor-not-allowed" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Ville de livraison finale</label>
                    <input 
                      type="text" 
                      value="Parakou (Borgou)" 
                      disabled 
                      className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-2xl text-slate-700 font-bold text-sm cursor-not-allowed" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Catégorie de colis</label>
                  <select
                    value={packageType}
                    onChange={(e) => setPackageType(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-800 text-sm font-medium focus:ring-2 focus:ring-[#D4F63D] focus:border-slate-800 focus:outline-none"
                  >
                    <option value="Colis standard">Colis standard / Carton scellé</option>
                    <option value="Documents / Plis urgents">Documents officiels / Plis urgents</option>
                    <option value="Électronique / Matériel">Matériel électronique / Accessoires</option>
                    <option value="Mode & Habillement">Vêtements / Textiles / Chaussures</option>
                    <option value="Produits médicaux / Pharmacie">Produits pharmaceutiques / Soins</option>
                    <option value="Pièces mécaniques / Outillage">Pièces détachées mécaniques</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Description du contenu *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Échantillons commerciaux et catalogue 2026"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-800 text-sm focus:ring-2 focus:ring-[#D4F63D] focus:border-slate-800 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Poids estimé</label>
                    <input
                      type="text"
                      placeholder="Ex: 2.5 kg"
                      value={estimatedWeight}
                      onChange={(e) => setEstimatedWeight(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-800 text-sm focus:ring-2 focus:ring-[#D4F63D] focus:border-slate-800 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Compagnie de car partenaire</label>
                    <select
                      value={selectedCarrierId}
                      onChange={(e) => setSelectedCarrierId(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-800 text-sm font-semibold focus:ring-2 focus:ring-[#D4F63D] focus:border-slate-800 focus:outline-none"
                    >
                      {carriers.map((carrier) => (
                        <option key={carrier.id} value={carrier.id}>
                          {carrier.name} (Départ {carrier.nextDeparture})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Instructions particulières (facultatif)</label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Fragile, manipuler avec soin, ne pas coucher."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-2xl text-slate-800 text-sm focus:ring-2 focus:ring-[#D4F63D] focus:border-slate-800 focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (!description.trim()) {
                        alert('Veuillez renseigner la description du colis.');
                        return;
                      }
                      setWizardStep(2);
                    }}
                    className="px-6 py-3 rounded-2xl bg-[#0B0F19] hover:bg-slate-800 text-[#D4F63D] font-black text-sm flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
                  >
                    <span>Continuer vers l'Expéditeur</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Sender details */}
            {wizardStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                    <User size={16} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">Point de Collecte (Cotonou)</h3>
                    <p className="text-[11px] text-slate-500">Adresse où le coursier Hermes récupèrera le colis</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Nom complet ou Société *</label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-800 text-sm focus:ring-2 focus:ring-[#D4F63D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Numéro de téléphone joignable *</label>
                  <input
                    type="tel"
                    required
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-800 text-sm focus:ring-2 focus:ring-[#D4F63D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Adresse précise à Cotonou *</label>
                  <input
                    type="text"
                    required
                    value={senderAddress}
                    onChange={(e) => setSenderAddress(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-800 text-sm focus:ring-2 focus:ring-[#D4F63D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Repère visuel pour le coursier</label>
                  <input
                    type="text"
                    placeholder="Ex: Face à la pharmacie, portail blanc"
                    value={senderNotes}
                    onChange={(e) => setSenderNotes(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-800 text-sm focus:ring-2 focus:ring-[#D4F63D] focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer"
                  >
                    Retour
                  </button>

                  <button
                    type="button"
                    onClick={() => setWizardStep(3)}
                    className="px-6 py-3 rounded-2xl bg-[#0B0F19] hover:bg-slate-800 text-[#D4F63D] font-black text-sm flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
                  >
                    <span>Continuer vers le Destinataire</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Recipient details & Summary confirmation */}
            {wizardStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">Point de Livraison Finale (Parakou)</h3>
                    <p className="text-[11px] text-slate-500">Adresse de remise au destinataire</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Nom complet du destinataire *</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-800 text-sm focus:ring-2 focus:ring-[#D4F63D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Téléphone du destinataire (reçoit le code PIN) *</label>
                  <input
                    type="tel"
                    required
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-800 text-sm focus:ring-2 focus:ring-[#D4F63D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Adresse de livraison à Parakou *</label>
                  <input
                    type="text"
                    required
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-800 text-sm focus:ring-2 focus:ring-[#D4F63D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Indications pour le coursier de Parakou</label>
                  <input
                    type="text"
                    placeholder="Ex: Quartier Banikanni, près de la grande voie"
                    value={recipientNotes}
                    onChange={(e) => setRecipientNotes(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-800 text-sm focus:ring-2 focus:ring-[#D4F63D] focus:outline-none"
                  />
                </div>

                {/* Recap Card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs space-y-2.5">
                  <p className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">
                    Récapitulatif de l'expédition
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-slate-600">
                    <div>
                      <span className="text-slate-400">Trajet :</span> <strong className="text-slate-900">Cotonou ➔ Parakou</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Type :</span> <strong className="text-slate-900">{packageType}</strong>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400">Contenu :</span> <strong className="text-slate-900">{description || 'Non renseigné'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Autocar :</span> <strong className="text-slate-900">{carriers.find(c => c.id === selectedCarrierId)?.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Mode :</span> <span className="bg-[#D4F63D] text-[#0B0F19] font-bold px-2 py-0.5 rounded-full text-[10px]">Porte-à-Porte Démo</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer"
                  >
                    Retour
                  </button>

                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-2xl bg-[#D4F63D] hover:bg-[#c3e82d] text-[#0B0F19] font-black text-sm flex items-center gap-2 cursor-pointer shadow-xl shadow-[#D4F63D]/25 active:scale-95"
                  >
                    <Check size={18} className="stroke-[3]" />
                    <span>Confirmer et créer l'envoi</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      )}

      {/* TAB 2: LIVE TRACKING (PRD ÉCRAN 03 - Inspired by Image 1 & 3) */}
      {activeTab === 'track' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Shipment selector & Search */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/90 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Rechercher un envoi
                </label>
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {allFilteredShipments.length} colis
                </span>
              </div>

              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Réf (ex: HMD-DEMO-001) ou nom..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4F63D]"
                />
              </div>

              {/* Quick Shipment Cards List */}
              <div className="space-y-2.5 max-h-[460px] overflow-y-auto pt-1">
                {allFilteredShipments.map((shipment) => {
                  const isSelected = selectedShipment?.id === shipment.id;
                  return (
                    <div
                      key={shipment.id}
                      onClick={() => setSelectedShipmentId(shipment.id)}
                      className={`p-3.5 rounded-2xl border text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0B0F19] text-white border-[#0B0F19] shadow-lg scale-[1.01]'
                          : 'bg-white border-slate-200/90 hover:border-slate-300 text-slate-800 hover:bg-slate-50/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`font-mono font-extrabold text-sm ${isSelected ? 'text-[#D4F63D]' : 'text-slate-900'}`}>
                          {shipment.reference}
                        </span>
                        <StatusBadge status={shipment.currentStatus} size="sm" />
                      </div>
                      <p className={`font-medium truncate ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                        {shipment.description}
                      </p>
                      <div className={`flex items-center justify-between text-[11px] mt-2 pt-2 border-t ${isSelected ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-400'}`}>
                        <span>{shipment.sender.name.split(' ')[0]} ➔ {shipment.recipient.name.split(' ')[0]}</span>
                        <span className="font-semibold">{shipment.origin} → {shipment.destination}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Simulated 3D Parcel Box & Security PIN Card */}
            {selectedShipment && (
              <div className="bg-[#0B0F19] text-white p-5 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4F63D] bg-[#D4F63D]/15 px-2 py-0.5 rounded-full border border-[#D4F63D]/30">
                      Preuve de Livraison
                    </span>
                    <p className="text-xs text-slate-300 mt-1">Code secret confidentiel</p>
                  </div>
                  <ShieldCheck size={22} className="text-[#D4F63D]" />
                </div>

                <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 text-center space-y-1">
                  <p className="text-[10px] text-slate-400">À dicter au coursier Hermes à l'arrivée</p>
                  <p className="text-3xl font-mono font-black tracking-widest text-[#D4F63D] select-all">
                    {selectedShipment.securityCode}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-1 text-xs text-slate-400">
                  <div className="w-14 h-14 bg-white rounded-2xl p-1.5 shrink-0 flex items-center justify-center">
                    <QrCode size={44} className="text-slate-900" />
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Le coursier saisit ce code pour certifier le transfert et clôturer la livraison avec succès.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Active Shipment Details & Tracking Card */}
          {selectedShipment ? (
            <div className="lg:col-span-8 space-y-6">
              {/* GoDash Style Active Route Hero Card */}
              <div className="bg-gradient-to-br from-[#0B0F19] via-[#121929] to-[#0B0F19] text-white p-6 sm:p-7 rounded-3xl shadow-2xl border border-slate-800 space-y-6 relative overflow-hidden">
                {/* Background 3D parcel preview */}
                <div className="absolute right-4 -bottom-6 w-36 h-36 opacity-30 pointer-events-none rounded-2xl overflow-hidden hidden sm:block">
                  <img src="/images/parcel-box.jpg" alt="Colis 3D" className="w-full h-full object-cover" />
                </div>

                <div className="flex flex-wrap items-start justify-between gap-4 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        Expédition en cours
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-xs text-[#D4F63D] font-mono font-bold">
                        {selectedShipment.carrierName}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-3xl font-mono font-black text-white">
                        {selectedShipment.reference}
                      </h2>
                      <StatusBadge status={selectedShipment.currentStatus} size="md" />
                    </div>

                    <p className="text-slate-300 text-sm mt-1 font-medium">
                      {selectedShipment.description}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">Délai estimé</p>
                    <p className="text-lg font-black text-[#D4F63D]">~ 8h de trajet</p>
                    <p className="text-[11px] text-slate-400">RNIE 2 · 420 km</p>
                  </div>
                </div>

                {/* Animated Corridor Route Tracker (GoDash style) */}
                <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-3 relative z-10">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2 text-teal-400">
                      <div className="w-6 h-6 rounded-lg bg-teal-500/20 flex items-center justify-center">
                        <MapPin size={13} />
                      </div>
                      <span>Cotonou</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <Bus size={14} className="text-[#D4F63D]" />
                      <span>Transit interurbain</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#D4F63D]">
                      <div className="w-6 h-6 rounded-lg bg-[#D4F63D]/20 flex items-center justify-center">
                        <MapPin size={13} />
                      </div>
                      <span>Parakou</span>
                    </div>
                  </div>

                  {/* Visual Progress Bar with moving vehicle dot */}
                  <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-400 via-[#D4F63D] to-[#D4F63D] rounded-full transition-all duration-700"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate max-w-[45%]">De : {selectedShipment.sender.address}</span>
                    <span className="truncate max-w-[45%] text-right">Vers : {selectedShipment.recipient.address}</span>
                  </div>
                </div>

                {/* Active Courier companion card if assigned (inspired by Image 3 Richard Dheo card) */}
                {(selectedShipment.pickupCourierName || selectedShipment.deliveryCourierName) && (
                  <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 flex items-center justify-between gap-3 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#D4F63D] text-[#0B0F19] flex items-center justify-center font-bold">
                        <Bike size={20} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">
                          {selectedShipment.currentStatus.includes('delivery') || selectedShipment.currentStatus === 'out_for_delivery'
                            ? 'Coursier Livraison Parakou'
                            : 'Coursier Collecte Cotonou'}
                        </p>
                        <p className="text-xs font-bold text-white">
                          {selectedShipment.deliveryCourierName || selectedShipment.pickupCourierName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => alert(`Appel simulé vers le coursier (${selectedShipment.deliveryCourierName || selectedShipment.pickupCourierName})`)}
                        className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                        title="Appeler le coursier"
                      >
                        <Phone size={14} />
                      </button>
                      <button 
                        onClick={() => alert('Messagerie simulée : Le coursier est informé de votre demande.')}
                        className="w-8 h-8 rounded-xl bg-[#D4F63D] hover:bg-[#c4ea2d] text-[#0B0F19] flex items-center justify-center cursor-pointer transition-colors font-bold"
                        title="Envoyer un message"
                      >
                        <MessageSquare size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Incident Banner if any */}
              {selectedShipment.currentStatus === 'incident' && selectedShipment.incident && (
                <div className="p-5 rounded-3xl bg-rose-50 border border-rose-200 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                    <AlertTriangle size={20} />
                  </div>
                  <div className="text-xs text-rose-900 space-y-1">
                    <strong className="font-extrabold text-sm text-rose-800">Incident sous supervision active Strategy ARENA :</strong>
                    <p className="leading-relaxed">{selectedShipment.incident.reason}</p>
                    <p className="text-[11px] text-rose-700 font-mono">Signalé le {selectedShipment.incident.declaredAt}. Les équipes s'en occupent.</p>
                  </div>
                </div>
              )}

              {/* Addresses Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-teal-700 font-black text-xs uppercase tracking-wider">
                    <User size={14} />
                    <span>Expéditeur (Cotonou)</span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{selectedShipment.sender.name}</p>
                  <p className="text-slate-600 text-xs flex items-center gap-1.5">
                    <Phone size={12} className="text-slate-400" /> {selectedShipment.sender.phone}
                  </p>
                  <p className="text-slate-500 text-xs">{selectedShipment.sender.address}</p>
                  {selectedShipment.sender.notes && (
                    <p className="text-slate-400 text-xs italic bg-slate-50 p-2 rounded-xl">Repère : {selectedShipment.sender.notes}</p>
                  )}
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-amber-700 font-black text-xs uppercase tracking-wider">
                    <MapPin size={14} />
                    <span>Destinataire (Parakou)</span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{selectedShipment.recipient.name}</p>
                  <p className="text-slate-600 text-xs flex items-center gap-1.5">
                    <Phone size={12} className="text-slate-400" /> {selectedShipment.recipient.phone}
                  </p>
                  <p className="text-slate-500 text-xs">{selectedShipment.recipient.address}</p>
                  {selectedShipment.recipient.notes && (
                    <p className="text-slate-400 text-xs italic bg-slate-50 p-2 rounded-xl">Repère : {selectedShipment.recipient.notes}</p>
                  )}
                </div>
              </div>

              {/* Timeline of Logistics Events */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/90 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-black text-slate-900 text-base">Historique des Transferts & Preuves</h3>
                    <p className="text-xs text-slate-400">Traçabilité complète à chaque passage de relais</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                    {selectedShipment.events.length} jalons validés
                  </span>
                </div>

                <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                  {selectedShipment.events.map((event, idx) => {
                    const isLatest = idx === 0;
                    return (
                      <div key={event.id} className="relative flex items-start gap-4 text-xs group">
                        {/* Dot */}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-transform ${
                            isLatest
                              ? 'bg-[#0B0F19] text-[#D4F63D] shadow-md shadow-[#D4F63D]/20 scale-110'
                              : 'bg-slate-100 text-slate-400 border border-slate-300'
                          }`}
                        >
                          {isLatest ? <Check size={14} className="stroke-[3]" /> : <Clock size={12} />}
                        </div>

                        {/* Content */}
                        <div className="flex-1 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70 space-y-1">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <span className="font-extrabold text-slate-900 text-sm">{event.title}</span>
                            <span className="text-[11px] font-mono text-slate-400">{event.timestamp}</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed text-xs">{event.description}</p>
                          <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                            <span>Acteur : <strong className="text-slate-700 font-semibold">{event.actor}</strong></span>
                            {event.location && (
                              <span className="flex items-center gap-1 text-slate-500">
                                <MapPin size={11} /> {event.location}
                              </span>
                            )}
                            {event.proofCode && (
                              <span className="font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">
                                PIN validé : {event.proofCode}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-8 bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
              <Package size={44} className="mx-auto text-slate-300" />
              <p className="font-bold text-slate-700">Aucune expédition sélectionnée</p>
              <p className="text-xs text-slate-400">Sélectionnez un colis dans la liste pour consulter son suivi.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

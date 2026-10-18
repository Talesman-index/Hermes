import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Bike, 
  MapPin, 
  Phone, 
  Package, 
  CheckCircle2, 
  Building2, 
  Clock, 
  AlertTriangle, 
  Navigation, 
  ShieldCheck, 
  KeyRound, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Check,
  Sparkles
} from 'lucide-react';

export const CourierView: React.FC = () => {
  const { 
    shipments, 
    couriers, 
    activeCourierId, 
    setActiveCourierId, 
    confirmPickup, 
    confirmAgencyDeposit, 
    confirmDestinationPickup, 
    confirmDelivery, 
    declareIncident,
    setSelectedShipmentId,
    setActiveRole
  } = useApp();

  const [activeCityTab, setActiveCityTab] = useState<'Cotonou' | 'Parakou'>('Cotonou');
  const [deliveryCodeInput, setDeliveryCodeInput] = useState<{ [id: string]: string }>({});
  const [incidentModalShipmentId, setIncidentModalShipmentId] = useState<string | null>(null);
  const [incidentReason, setIncidentReason] = useState('');

  // Selected courier profile
  const currentCourier = couriers.find((c) => c.id === activeCourierId) || couriers[0];

  // Filter shipments based on city and courier mission
  const cotonouPickupMissions = shipments.filter(
    (s) =>
      s.origin === 'Cotonou' &&
      ['registered', 'pickup_assigned', 'picked_up'].includes(s.currentStatus)
  );

  const parakouDeliveryMissions = shipments.filter(
    (s) =>
      s.destination === 'Parakou' &&
      ['arrived_at_destination', 'delivery_assigned', 'out_for_delivery'].includes(s.currentStatus)
  );

  const activeMissions = activeCityTab === 'Cotonou' ? cotonouPickupMissions : parakouDeliveryMissions;

  const handleDeliverySubmit = (shipmentId: string, expectedCode: string) => {
    const entered = deliveryCodeInput[shipmentId] || '';
    if (!entered.trim()) {
      alert(`Veuillez entrer le code de sécurité (Code démo : ${expectedCode})`);
      return;
    }
    const ok = confirmDelivery(shipmentId, entered);
    if (ok) {
      setDeliveryCodeInput((prev) => ({ ...prev, [shipmentId]: '' }));
    }
  };

  const handleIncidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentModalShipmentId || !incidentReason.trim()) return;
    declareIncident(incidentModalShipmentId, incidentReason);
    setIncidentModalShipmentId(null);
    setIncidentReason('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Mobile-first Header Card with Courier Mascot */}
      <div className="bg-[#0B0F19] text-white p-5 sm:p-6 rounded-3xl shadow-xl border border-slate-800 space-y-5 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4F63D]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#D4F63D] shadow-md bg-slate-800">
                <img 
                  src="/images/courier-mascot.jpg" 
                  alt="Mascot Coursier" 
                  className="w-full h-full object-cover object-top" 
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#D4F63D] border-2 border-[#0B0F19] flex items-center justify-center text-[9px] font-black text-[#0B0F19]">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white">Application Coursier</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4F63D]/20 text-[#D4F63D] border border-[#D4F63D]/30">
                  En service
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {currentCourier.name} · <span className="text-[#D4F63D]">{currentCourier.phone}</span>
              </p>
            </div>
          </div>

          {/* Quick Courier Picker */}
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-2xl text-xs">
            {couriers.map((courier) => {
              const isSelected = courier.id === activeCourierId;
              return (
                <button
                  key={courier.id}
                  onClick={() => {
                    setActiveCourierId(courier.id);
                    setActiveCityTab(courier.city);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#D4F63D] text-[#0B0F19] shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {courier.name.split(' ')[0]} ({courier.city.slice(0, 3)})
                </button>
              );
            })}
          </div>
        </div>

        {/* City Mission Switcher */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-800/80">
          <button
            onClick={() => setActiveCityTab('Cotonou')}
            className={`py-3 px-4 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeCityTab === 'Cotonou'
                ? 'bg-[#D4F63D] text-[#0B0F19] shadow-lg shadow-[#D4F63D]/20 scale-[1.02]'
                : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            <Bike size={16} className="stroke-[2.5]" />
            <span>Collectes Cotonou</span>
            <span className={`w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center ${
              activeCityTab === 'Cotonou' ? 'bg-[#0B0F19] text-[#D4F63D]' : 'bg-white/15 text-white'
            }`}>
              {cotonouPickupMissions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveCityTab('Parakou')}
            className={`py-3 px-4 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeCityTab === 'Parakou'
                ? 'bg-[#D4F63D] text-[#0B0F19] shadow-lg shadow-[#D4F63D]/20 scale-[1.02]'
                : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            <Package size={16} className="stroke-[2.5]" />
            <span>Livraisons Parakou</span>
            <span className={`w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center ${
              activeCityTab === 'Parakou' ? 'bg-[#0B0F19] text-[#D4F63D]' : 'bg-white/15 text-white'
            }`}>
              {parakouDeliveryMissions.length}
            </span>
          </button>
        </div>
      </div>

      {/* Active Missions List */}
      <div className="space-y-4">
        {activeMissions.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl border border-slate-200/90 text-center space-y-3 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-[#D4F63D]/20 text-[#0B0F19] flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} className="text-[#0B0F19]" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Aucune mission en attente à {activeCityTab}</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Toutes les missions de cette zone ont été traitées ou sont actuellement prises en charge.
            </p>
          </div>
        ) : (
          activeMissions.map((shipment) => {
            const isPickupCity = activeCityTab === 'Cotonou';
            const isPickedUp = shipment.currentStatus === 'picked_up';
            const isOutForDelivery = shipment.currentStatus === 'out_for_delivery';
            const isArrived = shipment.currentStatus === 'arrived_at_destination' || shipment.currentStatus === 'delivery_assigned';

            return (
              <div 
                key={shipment.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden space-y-4 p-5"
              >
                {/* Top Mission Meta */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-[#0B0F19] text-[#D4F63D] flex items-center justify-center font-bold">
                      {isPickupCity ? <Bike size={16} /> : <Package size={16} />}
                    </span>
                    <div>
                      <p className="font-mono font-extrabold text-slate-900 text-sm">{shipment.reference}</p>
                      <p className="text-[10px] text-slate-400 font-medium">Autocar : {shipment.carrierName}</p>
                    </div>
                  </div>
                  <StatusBadge status={shipment.currentStatus} size="sm" />
                </div>

                {/* Package description */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                  <p className="font-bold text-slate-800">{shipment.description}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Type : {shipment.packageType} · Poids : {shipment.estimatedWeight || '1.5 kg'}
                  </p>
                  {shipment.specialInstructions && (
                    <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-xl mt-2 border border-amber-200">
                      ⚠️ Consignes : {shipment.specialInstructions}
                    </p>
                  )}
                </div>

                {/* Contact & Location Details */}
                <div className="space-y-2 text-xs">
                  {isPickupCity ? (
                    <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/60 space-y-1">
                      <p className="font-bold text-teal-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                        <MapPin size={13} /> Collecte chez l'expéditeur
                      </p>
                      <p className="font-semibold text-slate-900 text-sm">{shipment.sender.name}</p>
                      <p className="text-slate-600">{shipment.sender.address}</p>
                      {shipment.sender.notes && (
                        <p className="text-slate-500 italic">Repère : {shipment.sender.notes}</p>
                      )}
                      <div className="pt-2 flex items-center gap-2">
                        <a 
                          href={`tel:${shipment.sender.phone}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-colors"
                        >
                          <Phone size={12} />
                          <span>Appeler {shipment.sender.phone}</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 space-y-1">
                      <p className="font-bold text-amber-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                        <MapPin size={13} /> Livraison finale au destinataire
                      </p>
                      <p className="font-semibold text-slate-900 text-sm">{shipment.recipient.name}</p>
                      <p className="text-slate-600">{shipment.recipient.address}</p>
                      {shipment.recipient.notes && (
                        <p className="text-slate-500 italic">Repère : {shipment.recipient.notes}</p>
                      )}
                      <div className="pt-2 flex items-center gap-2">
                        <a 
                          href={`tel:${shipment.recipient.phone}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-colors"
                        >
                          <Phone size={12} />
                          <span>Appeler {shipment.recipient.phone}</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Big Action Buttons (Thumb-friendly for mobile) */}
                <div className="pt-2 space-y-2">
                  {/* Cotonou Step 1: Confirm Pickup at customer's home */}
                  {isPickupCity && !isPickedUp && (
                    <button
                      onClick={() => confirmPickup(shipment.id)}
                      className="w-full py-3.5 rounded-2xl bg-[#0B0F19] hover:bg-slate-800 text-[#D4F63D] font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all cursor-pointer"
                    >
                      <Check size={18} className="stroke-[3]" />
                      <span>Confirmer la collecte chez le client</span>
                    </button>
                  )}

                  {/* Cotonou Step 2: Confirm Deposit at carrier agency */}
                  {isPickupCity && isPickedUp && (
                    <button
                      onClick={() => confirmAgencyDeposit(shipment.id)}
                      className="w-full py-3.5 rounded-2xl bg-[#D4F63D] hover:bg-[#c2e62a] text-[#0B0F19] font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D4F63D]/25 active:scale-98 transition-all cursor-pointer"
                    >
                      <Building2 size={18} className="stroke-[2.5]" />
                      <span>Valider le dépôt à l'agence {shipment.carrierName}</span>
                    </button>
                  )}

                  {/* Parakou Step 1: Collect parcel from bus station desk */}
                  {!isPickupCity && isArrived && (
                    <button
                      onClick={() => confirmDestinationPickup(shipment.id)}
                      className="w-full py-3.5 rounded-2xl bg-[#0B0F19] hover:bg-slate-800 text-[#D4F63D] font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all cursor-pointer"
                    >
                      <Building2 size={18} className="stroke-[2.5]" />
                      <span>Retirer le colis au guichet {shipment.carrierName}</span>
                    </button>
                  )}

                  {/* Parakou Step 2: Delivery with Security PIN validation */}
                  {!isPickupCity && isOutForDelivery && (
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <KeyRound size={14} className="text-[#0B0F19]" /> Code secret de remise
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded font-bold">
                          Démo PIN : {shipment.securityCode}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Entrez le code à 6 chiffres..."
                          value={deliveryCodeInput[shipment.id] || ''}
                          onChange={(e) =>
                            setDeliveryCodeInput({
                              ...deliveryCodeInput,
                              [shipment.id]: e.target.value.toUpperCase()
                            })
                          }
                          className="flex-1 px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-center font-mono font-black text-base uppercase tracking-widest focus:ring-2 focus:ring-[#D4F63D] focus:outline-none"
                        />

                        <button
                          onClick={() => handleDeliverySubmit(shipment.id, shipment.securityCode)}
                          className="px-5 py-2.5 rounded-xl bg-[#D4F63D] hover:bg-[#c2e62a] text-[#0B0F19] font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#D4F63D]/20 active:scale-95"
                        >
                          <Check size={16} className="stroke-[3]" />
                          <span>Valider la remise</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Incident reporting toggle */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => {
                        setSelectedShipmentId(shipment.id);
                        setActiveRole('client');
                      }}
                      className="text-[11px] text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Voir le suivi complet</span>
                      <ExternalLink size={12} />
                    </button>

                    <button
                      onClick={() => setIncidentModalShipmentId(shipment.id)}
                      className="text-[11px] text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <AlertTriangle size={12} />
                      <span>Signaler un incident</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Incident Modal Drawer */}
      {incidentModalShipmentId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Déclarer un incident</h3>
                <p className="text-xs text-slate-400">Le coordinateur Arena sera immédiatement alerté.</p>
              </div>
            </div>

            <form onSubmit={handleIncidentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Motif de l'incident *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ex: Expéditeur absent au point de rendez-vous, report demandé..."
                  value={incidentReason}
                  onChange={(e) => setIncidentReason(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIncidentModalShipmentId(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs cursor-pointer shadow-md"
                >
                  Transmettre l'incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

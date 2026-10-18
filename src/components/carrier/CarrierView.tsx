import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Bus, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Package, 
  Calendar, 
  ShieldCheck, 
  Truck, 
  Phone, 
  Info,
  ChevronRight,
  ExternalLink,
  Check,
  Sparkles
} from 'lucide-react';

export const CarrierView: React.FC = () => {
  const { 
    shipments, 
    carriers, 
    confirmCarrierBoarding, 
    confirmCarrierArrival,
    confirmDestinationPickup,
    setSelectedShipmentId,
    setActiveRole
  } = useApp();

  const [selectedCarrierId, setSelectedCarrierId] = useState<string>(carriers[0]?.id || 'carrier-1');
  const [activeTab, setActiveTab] = useState<'pending' | 'transit' | 'arrived' | 'all'>('pending');

  const currentCarrier = carriers.find((c) => c.id === selectedCarrierId) || carriers[0];

  // Filter shipments for this carrier
  const carrierShipments = shipments.filter((s) => s.carrierId === currentCarrier.id);

  // Categorize
  const depositedAtAgency = carrierShipments.filter((s) => s.currentStatus === 'deposited_at_agency');
  const inTransit = carrierShipments.filter((s) => s.currentStatus === 'in_transit');
  const arrivedAtDestination = carrierShipments.filter(
    (s) => s.currentStatus === 'arrived_at_destination' || s.currentStatus === 'delivery_assigned'
  );
  const completedOrOut = carrierShipments.filter(
    (s) => s.currentStatus === 'out_for_delivery' || s.currentStatus === 'delivered'
  );

  const displayedShipments = (() => {
    switch (activeTab) {
      case 'pending': return depositedAtAgency;
      case 'transit': return inTransit;
      case 'arrived': return arrivedAtDestination;
      default: return carrierShipments;
    }
  })();

  return (
    <div className="space-y-6">
      {/* Top Banner: Transporteur Partner Context */}
      <div className="bg-[#0B0F19] text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-slate-800 space-y-5 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-[#0B0F19] flex items-center justify-center font-bold shadow-lg shadow-amber-400/20">
              <Bus size={30} className="stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">Guichet Compagnie Partenaire</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Opérateur Démo
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Interface simple pour les chefs de gare et agents de guichet bagages.
              </p>
            </div>
          </div>

          {/* Carrier Switcher */}
          <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl">
            <label className="text-xs font-bold text-slate-300 pl-2">Compagnie :</label>
            <select
              value={selectedCarrierId}
              onChange={(e) => setSelectedCarrierId(e.target.value)}
              className="px-3 py-1.5 bg-[#0B0F19] border border-slate-700 rounded-xl text-xs font-bold text-[#D4F63D] focus:outline-none focus:ring-2 focus:ring-[#D4F63D]"
            >
              {carriers.map((carrier) => (
                <option key={carrier.id} value={carrier.id}>
                  {carrier.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Carrier Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs relative z-10">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-[10px] uppercase font-bold text-slate-400">Gare Cotonou (Départ)</p>
            <p className="font-bold text-white mt-0.5 text-sm">{currentCarrier.agencyCotonou}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-[10px] uppercase font-bold text-slate-400">Gare Parakou (Arrivée)</p>
            <p className="font-bold text-white mt-0.5 text-sm">{currentCarrier.agencyParakou}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold text-amber-300">Prochain Départ Autocar</p>
              <p className="font-black text-white mt-0.5 text-sm">{currentCarrier.nextDeparture} · {currentCarrier.busNumber || 'Car Régulier'}</p>
            </div>
            <Clock size={20} className="text-amber-400" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-[#0B0F19] p-1.5 rounded-2xl text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'pending'
                ? 'bg-[#D4F63D] text-[#0B0F19] shadow-md shadow-[#D4F63D]/20 scale-[1.02]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>À charger à Cotonou</span>
            <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${
              activeTab === 'pending' ? 'bg-[#0B0F19] text-[#D4F63D]' : 'bg-white/15 text-white'
            }`}>
              {depositedAtAgency.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('transit')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'transit'
                ? 'bg-[#D4F63D] text-[#0B0F19] shadow-md shadow-[#D4F63D]/20 scale-[1.02]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>En transport routier</span>
            <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${
              activeTab === 'transit' ? 'bg-[#0B0F19] text-[#D4F63D]' : 'bg-white/15 text-white'
            }`}>
              {inTransit.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('arrived')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'arrived'
                ? 'bg-[#D4F63D] text-[#0B0F19] shadow-md shadow-[#D4F63D]/20 scale-[1.02]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Réceptionnés à Parakou</span>
            <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${
              activeTab === 'arrived' ? 'bg-[#0B0F19] text-[#D4F63D]' : 'bg-white/15 text-white'
            }`}>
              {arrivedAtDestination.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'all'
                ? 'bg-[#D4F63D] text-[#0B0F19] shadow-md shadow-[#D4F63D]/20 scale-[1.02]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Tous les colis ({carrierShipments.length})</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Dépôt par coursier ➔ Soute autocar ➔ Guichet Parakou
        </div>
      </div>

      {/* Shipments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedShipments.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200/90 text-center space-y-3 shadow-sm">
            <Package size={44} className="mx-auto text-slate-300" />
            <h3 className="font-extrabold text-slate-800 text-lg">Aucun colis dans cet onglet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Utilisez le scénario de démo ou l'espace client pour créer ou faire progresser des expéditions vers cette compagnie.
            </p>
          </div>
        ) : (
          displayedShipments.map((shipment) => {
            const isDeposited = shipment.currentStatus === 'deposited_at_agency';
            const isTransit = shipment.currentStatus === 'in_transit';
            const isArrived = shipment.currentStatus === 'arrived_at_destination' || shipment.currentStatus === 'delivery_assigned';

            return (
              <div
                key={shipment.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Reference & Badge */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-mono font-black text-slate-900 text-base">
                      {shipment.reference}
                    </span>
                    <StatusBadge status={shipment.currentStatus} size="sm" />
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">{shipment.description}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {shipment.packageType} · {shipment.estimatedWeight || '1.5 kg'}
                    </p>
                  </div>

                  {/* Corridor Route pill */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>Cotonou ➔ Parakou</span>
                      <span className="font-mono text-slate-400 font-normal">RNIE 2</span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center justify-between">
                      <span>Remis par coursier : {shipment.pickupCourierName || 'Coursier Cotonou'}</span>
                    </div>
                  </div>
                </div>

                {/* Single-Click Actions for the Transport Company */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {/* Step A : Agency confirms loading into the bus */}
                  {isDeposited && (
                    <button
                      onClick={() => confirmCarrierBoarding(shipment.id)}
                      className="w-full py-3 rounded-2xl bg-[#0B0F19] hover:bg-slate-800 text-[#D4F63D] font-black text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
                    >
                      <Bus size={16} />
                      <span>Confirmer le chargement en car & départ</span>
                    </button>
                  )}

                  {/* Step B : Agency confirms bus arrival at Parakou station */}
                  {isTransit && (
                    <button
                      onClick={() => confirmCarrierArrival(shipment.id)}
                      className="w-full py-3 rounded-2xl bg-[#D4F63D] hover:bg-[#c2e62a] text-[#0B0F19] font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-[#D4F63D]/20 active:scale-98 transition-all cursor-pointer"
                    >
                      <CheckCircle2 size={16} className="stroke-[2.5]" />
                      <span>Confirmer l'arrivée du car à Parakou</span>
                    </button>
                  )}

                  {/* Step C : Parcel arrived at station desk */}
                  {isArrived && (
                    <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200 text-center space-y-1">
                      <p className="text-xs font-extrabold text-teal-900">Disponible au guichet bagages</p>
                      <p className="text-[11px] text-teal-700">En attente de retrait par le coursier de Parakou</p>
                    </div>
                  )}

                  {/* Tracking link */}
                  <button
                    onClick={() => {
                      setSelectedShipmentId(shipment.id);
                      setActiveRole('client');
                    }}
                    className="w-full text-center text-[11px] text-slate-400 hover:text-slate-700 font-bold flex items-center justify-center gap-1 py-1 cursor-pointer"
                  >
                    <span>Consulter le suivi public</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

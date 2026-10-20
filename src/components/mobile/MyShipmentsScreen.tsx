import React, { useState } from 'react';
import { useMobileApp } from '../../context/MobileAppContext';
import { WORKFLOW_STAGES } from '../../types';
import { 
  Package, 
  Search, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Bus, 
  ArrowUpRight,
  Filter
} from 'lucide-react';

export const MyShipmentsScreen: React.FC = () => {
  const { shipments, openTracking } = useMobileApp();
  const [filter, setFilter] = useState<'all' | 'active' | 'delivered'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShipments = shipments.filter((s) => {
    const matchesSearch =
      s.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.recipient.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === 'active') return s.currentStep < 9;
    if (filter === 'delivered') return s.currentStep === 9;
    return true;
  });

  return (
    <div className="space-y-4 pb-28 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-black text-slate-900">Mes expéditions</h1>
          <p className="text-xs text-slate-400">Historique et suivi de vos envois</p>
        </div>
        <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
          {shipments.length} colis
        </span>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher par référence, contenu ou destinataire..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-emerald-600 text-white font-black shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Tous ({shipments.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer ${
            filter === 'active'
              ? 'bg-emerald-600 text-white font-black shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          En cours ({shipments.filter((s) => s.currentStep < 9).length})
        </button>
        <button
          onClick={() => setFilter('delivered')}
          className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer ${
            filter === 'delivered'
              ? 'bg-emerald-600 text-white font-black shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Livrées ({shipments.filter((s) => s.currentStep === 9).length})
        </button>
      </div>

      {/* Shipments Cards List */}
      <div className="space-y-3">
        {filteredShipments.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl border border-slate-200/90 text-center space-y-2">
            <Package size={36} className="mx-auto text-slate-300" />
            <p className="font-bold text-slate-700 text-sm">Aucun colis correspondant</p>
            <p className="text-xs text-slate-400">Modifiez votre recherche ou créez un nouvel envoi.</p>
          </div>
        ) : (
          filteredShipments.map((shipment) => {
            const isDelivered = shipment.currentStep === 9;
            const stageInfo = WORKFLOW_STAGES.find((w) => w.step === shipment.currentStep);
            const progress = (shipment.currentStep / 9) * 100;

            return (
              <div
                key={shipment.id}
                onClick={() => openTracking(shipment.id)}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-400/80 transition-all cursor-pointer space-y-3 group"
              >
                {/* Reference and Status Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-mono font-black text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors shrink-0">
                      {shipment.reference}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium truncate">· {shipment.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 whitespace-nowrap shrink-0">
                      {shipment.serviceFee || '5 000 FCFA'}
                    </span>
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0 ${
                        isDelivered
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {isDelivered ? 'Livré' : `Étape ${shipment.currentStep}/9`}
                    </span>
                  </div>
                </div>

                {/* Description & Route with Pickup District */}
                <div>
                  <p className="text-xs font-bold text-slate-800 leading-snug">{shipment.description}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <MapPin size={11} className="text-emerald-600 shrink-0" />
                    <span>
                      {shipment.pickupLocation?.district ? `${shipment.pickupLocation.district} (Cotonou)` : shipment.origin} ➔ {shipment.destination} · Pour {shipment.recipient.name}
                    </span>
                  </p>
                </div>

                {/* Step Preview & Progress */}
                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-extrabold text-slate-700 flex items-center gap-1">
                      {isDelivered ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Bus size={12} className="text-slate-600" />}
                      <span>{stageInfo?.title}</span>
                    </span>
                    <span className="text-slate-400 font-mono text-[10px]">{Math.round(progress)}%</span>
                  </div>

                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isDelivered ? 'bg-emerald-500' : 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-900 group-hover:text-emerald-700 pt-1">
                  <span>Voir le suivi détaillé</span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <ChevronRight size={13} className="stroke-[2.5]" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

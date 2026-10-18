import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { Shipment, ShipmentStatus } from '../../types';
import { 
  ShieldCheck, 
  Package, 
  Bike, 
  Bus, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  UserCheck, 
  MapPin, 
  Eye, 
  X, 
  Phone, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Check
} from 'lucide-react';

export const ArenaDashboard: React.FC = () => {
  const { 
    shipments, 
    couriers, 
    assignPickupCourier, 
    assignDeliveryCourier, 
    declareIncident, 
    resolveIncident,
    setSelectedShipmentId,
    setActiveRole
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'delivered' | 'incident'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedForDetails, setSelectedForDetails] = useState<Shipment | null>(null);

  // Assignment modal states
  const [assignModal, setAssignModal] = useState<{
    isOpen: boolean;
    shipment: Shipment | null;
    type: 'pickup' | 'delivery';
  }>({
    isOpen: false,
    shipment: null,
    type: 'pickup'
  });
  const [selectedCourierId, setSelectedCourierId] = useState('');

  // Incident state
  const [incidentReasonInput, setIncidentReasonInput] = useState('');
  const [resolutionNotesInput, setResolutionNotesInput] = useState('');

  // Metrics computation
  const totalShipments = shipments.length;
  const inProgressShipments = shipments.filter(
    (s) => !['delivered', 'incident'].includes(s.currentStatus)
  ).length;
  const deliveredShipments = shipments.filter((s) => s.currentStatus === 'delivered').length;
  const incidentShipments = shipments.filter((s) => s.currentStatus === 'incident').length;

  const filteredShipments = shipments.filter((s) => {
    const matchesSearch =
      s.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.carrierName.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'active') return !['delivered', 'incident'].includes(s.currentStatus);
    if (statusFilter === 'delivered') return s.currentStatus === 'delivered';
    if (statusFilter === 'incident') return s.currentStatus === 'incident';
    return true;
  });

  const handleOpenAssign = (shipment: Shipment, type: 'pickup' | 'delivery') => {
    const city = type === 'pickup' ? 'Cotonou' : 'Parakou';
    const cityCouriers = couriers.filter((c) => c.city === city);
    setSelectedCourierId(cityCouriers[0]?.id || '');
    setAssignModal({
      isOpen: true,
      shipment,
      type
    });
  };

  const handleSaveAssign = () => {
    if (!assignModal.shipment || !selectedCourierId) return;
    if (assignModal.type === 'pickup') {
      assignPickupCourier(assignModal.shipment.id, selectedCourierId);
    } else {
      assignDeliveryCourier(assignModal.shipment.id, selectedCourierId);
    }
    // Update local selection if drawer open
    const updated = shipments.find((s) => s.id === assignModal.shipment?.id);
    if (updated) setSelectedForDetails(updated);
    setAssignModal({ isOpen: false, shipment: null, type: 'pickup' });
  };

  const handleDeclareIncident = (shipmentId: string) => {
    if (!incidentReasonInput.trim()) return;
    declareIncident(shipmentId, incidentReasonInput);
    setIncidentReasonInput('');
  };

  const handleResolveIncident = (shipmentId: string) => {
    if (!resolutionNotesInput.trim()) return;
    resolveIncident(shipmentId, resolutionNotesInput);
    setResolutionNotesInput('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B0F19] bg-[#D4F63D] px-2.5 py-0.5 rounded-full">
              Supervision Centrale
            </span>
            <span className="text-xs text-slate-400">· Strategy ARENA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Tour de Contrôle Opérationnelle
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Coordination de bout-en-bout, affectation des missions, surveillance des transferts et gestion des incidents.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-200">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4F63D] animate-ping" />
          <span>Synchronisation en temps réel</span>
        </div>
      </div>

      {/* KPI Cards (PRD Écran 04) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total */}
        <div 
          onClick={() => setStatusFilter('all')}
          className={`p-5 rounded-3xl bg-white border cursor-pointer transition-all ${
            statusFilter === 'all' ? 'border-[#0B0F19] shadow-xl ring-2 ring-[#0B0F19]' : 'border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Total Expéditions</p>
            <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
              <Package size={20} />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 mt-2 font-mono">{totalShipments}</p>
          <p className="text-[11px] text-slate-400 mt-1">Corridor Cotonou ➔ Parakou</p>
        </div>

        {/* En cours */}
        <div 
          onClick={() => setStatusFilter('active')}
          className={`p-5 rounded-3xl bg-white border cursor-pointer transition-all ${
            statusFilter === 'active' ? 'border-[#0B0F19] shadow-xl ring-2 ring-[#0B0F19]' : 'border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-extrabold uppercase tracking-wider text-teal-700">En cours</p>
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              <Bus size={20} />
            </div>
          </div>
          <p className="text-3xl font-black text-teal-900 mt-2 font-mono">{inProgressShipments}</p>
          <p className="text-[11px] text-teal-700 mt-1">Collecte, car ou dernier km</p>
        </div>

        {/* Livrées */}
        <div 
          onClick={() => setStatusFilter('delivered')}
          className={`p-5 rounded-3xl bg-white border cursor-pointer transition-all ${
            statusFilter === 'delivered' ? 'border-[#0B0F19] shadow-xl ring-2 ring-[#0B0F19]' : 'border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">Livrées</p>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-900 mt-2 font-mono">{deliveredShipments}</p>
          <p className="text-[11px] text-emerald-700 mt-1">Remises avec code PIN validé</p>
        </div>

        {/* Incidents */}
        <div 
          onClick={() => setStatusFilter('incident')}
          className={`p-5 rounded-3xl bg-white border cursor-pointer transition-all ${
            statusFilter === 'incident' ? 'border-rose-600 shadow-xl ring-2 ring-rose-600' : 'border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-extrabold uppercase tracking-wider text-rose-700">Incidents</p>
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
              <AlertTriangle size={20} />
            </div>
          </div>
          <p className="text-3xl font-black text-rose-700 mt-2 font-mono">{incidentShipments}</p>
          <p className="text-[11px] text-rose-600 mt-1">Anomalies nécessitant action</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/90 overflow-hidden">
        {/* Table Filters & Search */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filtrer par réf, expéditeur, destinataire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4F63D]"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold overflow-x-auto bg-[#0B0F19] p-1.5 rounded-2xl">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                statusFilter === 'all' ? 'bg-[#D4F63D] text-[#0B0F19] font-black' : 'text-slate-300 hover:text-white'
              }`}
            >
              Tous ({totalShipments})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                statusFilter === 'active' ? 'bg-[#D4F63D] text-[#0B0F19] font-black' : 'text-slate-300 hover:text-white'
              }`}
            >
              En cours ({inProgressShipments})
            </button>
            <button
              onClick={() => setStatusFilter('delivered')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                statusFilter === 'delivered' ? 'bg-[#D4F63D] text-[#0B0F19] font-black' : 'text-slate-300 hover:text-white'
              }`}
            >
              Livrées ({deliveredShipments})
            </button>
            <button
              onClick={() => setStatusFilter('incident')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                statusFilter === 'incident' ? 'bg-rose-500 text-white font-black' : 'text-slate-300 hover:text-white'
              }`}
            >
              Incidents ({incidentShipments})
            </button>
          </div>
        </div>

        {/* Table responsive */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-black uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3 px-4">Référence</th>
                <th className="py-3 px-4">Expéditeur (Cotonou)</th>
                <th className="py-3 px-4">Destinataire (Parakou)</th>
                <th className="py-3 px-4">Autocar</th>
                <th className="py-3 px-4">Statut</th>
                <th className="py-3 px-4">Coursiers</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredShipments.map((shipment) => {
                const needsPickupAssign = shipment.currentStatus === 'registered';
                const needsDeliveryAssign = shipment.currentStatus === 'arrived_at_destination';

                return (
                  <tr key={shipment.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-extrabold text-slate-900">
                      {shipment.reference}
                      <p className="font-sans font-normal text-[11px] text-slate-400 truncate max-w-[160px]">
                        {shipment.description}
                      </p>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800">{shipment.sender.name}</p>
                      <p className="text-[11px] text-slate-400">{shipment.sender.phone}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800">{shipment.recipient.name}</p>
                      <p className="text-[11px] text-slate-400">{shipment.recipient.phone}</p>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {shipment.carrierName}
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={shipment.currentStatus} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 space-y-1">
                      {needsPickupAssign ? (
                        <button
                          onClick={() => handleOpenAssign(shipment, 'pickup')}
                          className="px-2.5 py-1 rounded-xl bg-[#0B0F19] text-[#D4F63D] font-bold text-[10px] flex items-center gap-1 cursor-pointer hover:bg-slate-800"
                        >
                          <UserCheck size={11} />
                          <span>Affecter collecte</span>
                        </button>
                      ) : (
                        <p className="text-[11px] text-slate-600">
                          1er km : <strong>{shipment.pickupCourierName || '-'}</strong>
                        </p>
                      )}

                      {needsDeliveryAssign ? (
                        <button
                          onClick={() => handleOpenAssign(shipment, 'delivery')}
                          className="px-2.5 py-1 rounded-xl bg-[#D4F63D] text-[#0B0F19] font-black text-[10px] flex items-center gap-1 cursor-pointer hover:bg-[#c2e62a]"
                        >
                          <UserCheck size={11} />
                          <span>Affecter livraison</span>
                        </button>
                      ) : (
                        <p className="text-[11px] text-slate-600">
                          Dernier km : <strong>{shipment.deliveryCourierName || '-'}</strong>
                        </p>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedForDetails(shipment)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Eye size={13} />
                          <span>Détails</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedShipmentId(shipment.id);
                            setActiveRole('client');
                          }}
                          className="px-2 py-1.5 rounded-xl text-slate-400 hover:text-slate-800 cursor-pointer"
                          title="Voir dans le suivi public"
                        >
                          <ExternalLink size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignment Modal */}
      {assignModal.isOpen && assignModal.shipment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#0B0F19] text-[#D4F63D] flex items-center justify-center font-bold">
                  <UserCheck size={18} />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {assignModal.type === 'pickup'
                    ? 'Affecter un coursier à la collecte (Cotonou)'
                    : 'Affecter un coursier à la livraison finale (Parakou)'}
                </h3>
              </div>
              <button
                onClick={() => setAssignModal({ isOpen: false, shipment: null, type: 'pickup' })}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl text-xs space-y-1">
              <p className="font-mono font-bold text-slate-900">Réf : {assignModal.shipment.reference}</p>
              <p className="text-slate-600">{assignModal.shipment.description}</p>
              <p className="text-slate-500">
                Lieu : {assignModal.type === 'pickup' ? assignModal.shipment.sender.address : assignModal.shipment.recipient.address}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Choisir le coursier disponible :</label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {couriers
                  .filter((c) => c.city === (assignModal.type === 'pickup' ? 'Cotonou' : 'Parakou'))
                  .map((courier) => {
                    const isSelected = selectedCourierId === courier.id;
                    return (
                      <div
                        key={courier.id}
                        onClick={() => setSelectedCourierId(courier.id)}
                        className={`p-3 rounded-2xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-[#0B0F19] text-white border-[#0B0F19] shadow-md'
                            : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Bike size={16} className={isSelected ? 'text-[#D4F63D]' : 'text-slate-400'} />
                          <div>
                            <p className="font-bold">{courier.name}</p>
                            <p className={`text-[11px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>{courier.phone} · {courier.zone}</p>
                          </div>
                        </div>
                        {isSelected && <Check size={16} className="text-[#D4F63D] stroke-[3]" />}
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setAssignModal({ isOpen: false, shipment: null, type: 'pickup' })}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveAssign}
                className="px-6 py-2.5 rounded-2xl bg-[#D4F63D] hover:bg-[#c2e62a] text-[#0B0F19] font-black text-xs cursor-pointer shadow-md shadow-[#D4F63D]/25"
              >
                Confirmer l'affectation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Slide-over Drawer */}
      {selectedForDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-lg h-full overflow-y-auto p-6 space-y-6 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-xl text-slate-900">
                  {selectedForDetails.reference}
                </span>
                <StatusBadge status={selectedForDetails.currentStatus} size="sm" />
              </div>
              <button
                onClick={() => setSelectedForDetails(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="p-4 rounded-2xl bg-[#0B0F19] text-white space-y-2">
              <p className="text-[10px] uppercase font-bold text-slate-400">Autocar Partenaire</p>
              <p className="font-bold text-sm text-[#D4F63D]">{selectedForDetails.carrierName}</p>
              <p className="text-xs text-slate-300">Corridor : Cotonou ➔ Parakou (420 km)</p>
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
                <span>Code secret de remise :</span>
                <span className="font-mono font-black text-[#D4F63D]">{selectedForDetails.securityCode}</span>
              </div>
            </div>

            {/* Incident Panel */}
            {selectedForDetails.currentStatus === 'incident' && selectedForDetails.incident ? (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                  <AlertTriangle size={16} />
                  <span>Incident en cours : {selectedForDetails.incident.reason}</span>
                </div>
                <p className="text-[11px] text-rose-700">Déclaré le {selectedForDetails.incident.declaredAt}</p>
                
                <div className="space-y-2 pt-2 border-t border-rose-200">
                  <label className="block text-[11px] font-bold text-slate-700">Résoudre l'incident :</label>
                  <input
                    type="text"
                    placeholder="Notes de résolution (ex: Client joint, reprogrammé)..."
                    value={resolutionNotesInput}
                    onChange={(e) => setResolutionNotesInput(e.target.value)}
                    className="w-full p-2.5 bg-white border border-rose-300 rounded-xl text-xs text-slate-800 focus:outline-none"
                  />
                  <button
                    onClick={() => handleResolveIncident(selectedForDetails.id)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Clôturer l'incident et rétablir le flux
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-800">Simuler un incident sur ce colis :</label>
                <input
                  type="text"
                  placeholder="Ex: Retard bus ou destinataire injoignable..."
                  value={incidentReasonInput}
                  onChange={(e) => setIncidentReasonInput(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none"
                />
                <button
                  onClick={() => handleDeclareIncident(selectedForDetails.id)}
                  className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Déclarer l'incident
                </button>
              </div>
            )}

            {/* Event Log */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm">Journal d'audit ({selectedForDetails.events.length})</h4>
              <div className="space-y-2 text-xs">
                {selectedForDetails.events.map((ev) => (
                  <div key={ev.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-0.5">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>{ev.title}</span>
                      <span className="font-mono text-[10px] text-slate-400 font-normal">{ev.timestamp}</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">{ev.description}</p>
                    <p className="text-[10px] text-teal-700 font-medium">Acteur : {ev.actor}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

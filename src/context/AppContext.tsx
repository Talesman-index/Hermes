import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActiveRole, Carrier, Courier, Shipment, ShipmentEvent, ShipmentStatus } from '../types';
import { INITIAL_CARRIERS, INITIAL_COURIERS, INITIAL_SHIPMENTS } from '../data/mockData';
import confetti from 'canvas-confetti';

interface AppContextType {
  shipments: Shipment[];
  selectedShipment: Shipment | undefined;
  selectedShipmentId: string;
  activeRole: ActiveRole;
  couriers: Courier[];
  carriers: Carrier[];
  activeCourierId: string;
  toastMessage: string | null;
  // Navigation & selection
  setActiveRole: (role: ActiveRole) => void;
  setSelectedShipmentId: (id: string) => void;
  setActiveCourierId: (id: string) => void;
  showToast: (msg: string) => void;
  // Business actions
  createShipment: (data: {
    description: string;
    packageType: string;
    estimatedWeight?: string;
    specialInstructions?: string;
    sender: { name: string; phone: string; address: string; notes?: string };
    recipient: { name: string; phone: string; address: string; notes?: string };
    carrierId?: string;
  }) => Shipment;
  assignPickupCourier: (shipmentId: string, courierId: string) => void;
  confirmPickup: (shipmentId: string, notes?: string) => void;
  confirmAgencyDeposit: (shipmentId: string, notes?: string) => void;
  confirmCarrierBoarding: (shipmentId: string, busNumber?: string) => void;
  confirmCarrierArrival: (shipmentId: string) => void;
  assignDeliveryCourier: (shipmentId: string, courierId: string) => void;
  confirmDestinationPickup: (shipmentId: string) => void;
  confirmDelivery: (shipmentId: string, proofCode: string) => boolean;
  declareIncident: (shipmentId: string, reason: string) => void;
  resolveIncident: (shipmentId: string, notes: string) => void;
  // Demo helpers
  resetDemoScenario: () => void;
  runDemoNextStep: () => { step: number; title: string; nextRole: ActiveRole };
  currentDemoStepIndex: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'hermes_demo_shipments_v1.0';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shipments, setShipments] = useState<Shipment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_SHIPMENTS;
  });

  const [selectedShipmentId, setSelectedShipmentId] = useState<string>('shipment-demo-001');
  const [activeRole, setActiveRole] = useState<ActiveRole>('landing');
  const [couriers] = useState<Courier[]>(INITIAL_COURIERS);
  const [carriers] = useState<Carrier[]>(INITIAL_CARRIERS);
  const [activeCourierId, setActiveCourierId] = useState<string>('courier-ctn-1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shipments));
    } catch {
      // ignore
    }
  }, [shipments]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3800);
  };

  const selectedShipment = shipments.find((s) => s.id === selectedShipmentId) || shipments[0];

  const nowTimestamp = () => {
    const d = new Date();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `Aujourd'hui, ${hours}:${minutes}`;
  };

  const addEventToShipment = (
    shipmentId: string,
    newStatus: ShipmentStatus,
    title: string,
    description: string,
    actor: ShipmentEvent['actor'],
    location?: string,
    proofCode?: string,
    additionalUpdates: Partial<Shipment> = {}
  ) => {
    const newEvent: ShipmentEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: nowTimestamp(),
      status: newStatus,
      title,
      description,
      actor,
      location,
      proofCode
    };

    setShipments((prev) =>
      prev.map((s) => {
        if (s.id !== shipmentId) return s;
        return {
          ...s,
          ...additionalUpdates,
          currentStatus: newStatus,
          updatedAt: nowTimestamp(),
          events: [newEvent, ...s.events]
        };
      })
    );
  };

  // 1. Create shipment
  const createShipment: AppContextType['createShipment'] = (data) => {
    const count = shipments.length + 1;
    const ref = `HMD-CTN-${String(count).padStart(3, '0')}`;
    const carrier = carriers.find((c) => c.id === data.carrierId) || carriers[0];
    const newId = `shipment-${Date.now()}`;
    const secCode = `HRM-${Math.floor(1000 + Math.random() * 9000)}`;

    const newShipment: Shipment = {
      id: newId,
      reference: ref,
      origin: 'Cotonou',
      destination: 'Parakou',
      packageType: data.packageType || 'Colis standard',
      description: data.description,
      estimatedWeight: data.estimatedWeight || '1.5 kg',
      specialInstructions: data.specialInstructions,
      sender: data.sender,
      recipient: data.recipient,
      carrierId: carrier.id,
      carrierName: carrier.name,
      currentStatus: 'registered',
      securityCode: secCode,
      createdAt: nowTimestamp(),
      updatedAt: nowTimestamp(),
      events: [
        {
          id: `evt-${Date.now()}`,
          timestamp: nowTimestamp(),
          status: 'registered',
          title: 'Demande enregistrée',
          description: `Expédition créée de Cotonou à Parakou. Code de sécurité: ${secCode}.`,
          actor: 'Client',
          location: 'Cotonou'
        }
      ]
    };

    setShipments((prev) => [newShipment, ...prev]);
    setSelectedShipmentId(newId);
    showToast(`Expédition ${ref} créée avec succès !`);
    return newShipment;
  };

  // 2. Assign pickup courier
  const assignPickupCourier = (shipmentId: string, courierId: string) => {
    const courier = couriers.find((c) => c.id === courierId);
    if (!courier) return;

    addEventToShipment(
      shipmentId,
      'pickup_assigned',
      'Collecte attribuée',
      `Mission de collecte confiée au coursier Hermes ${courier.name} (${courier.phone}).`,
      'Strategy ARENA',
      courier.zone,
      undefined,
      {
        pickupCourierId: courier.id,
        pickupCourierName: courier.name
      }
    );
    showToast(`Collecte attribuée à ${courier.name}.`);
  };

  // 3. Confirm pickup
  const confirmPickup = (shipmentId: string, notes?: string) => {
    const shipment = shipments.find((s) => s.id === shipmentId);
    if (!shipment) return;

    addEventToShipment(
      shipmentId,
      'picked_up',
      'Colis collecté chez l’expéditeur',
      notes
        ? `Colis récupéré. Note du coursier : "${notes}". En route pour l’agence.`
        : `Colis pris en charge par le coursier Hermes (${shipment.pickupCourierName || 'Koffi Mensah'}) chez l'expéditeur.`,
      'Coursier Hermes',
      shipment.sender.address
    );
    showToast(`Prise en charge confirmée chez l'expéditeur.`);
  };

  // 4. Confirm agency deposit
  const confirmAgencyDeposit = (shipmentId: string, notes?: string) => {
    const shipment = shipments.find((s) => s.id === shipmentId);
    if (!shipment) return;

    addEventToShipment(
      shipmentId,
      'deposited_at_agency',
      'Déposé en agence de départ (Cotonou)',
      notes
        ? `Déposé au guichet bagages de ${shipment.carrierName}. Note : "${notes}".`
        : `Colis déposé au guichet de la compagnie ${shipment.carrierName} à Cotonou. En attente de départ.`,
      'Coursier Hermes',
      'Agence Cotonou'
    );
    showToast(`Colis déposé en agence avec succès.`);
  };

  // 5. Confirm carrier boarding
  const confirmCarrierBoarding = (shipmentId: string, busNumber?: string) => {
    const shipment = shipments.find((s) => s.id === shipmentId);
    if (!shipment) return;

    const busLabel = busNumber ? `à bord du car ${busNumber}` : 'à bord du car interurbain';
    addEventToShipment(
      shipmentId,
      'in_transit',
      'Pris en charge par la compagnie',
      `Colis embarqué ${busLabel}. Acheminement interurbain Cotonou ➔ Parakou en cours.`,
      'Compagnie',
      'Corridor RNIE 2'
    );
    showToast(`Colis pris en charge par la compagnie.`);
  };

  // 6. Confirm carrier arrival at Parakou
  const confirmCarrierArrival = (shipmentId: string) => {
    const shipment = shipments.find((s) => s.id === shipmentId);
    if (!shipment) return;

    addEventToShipment(
      shipmentId,
      'arrived_at_destination',
      'Arrivé à destination (Parakou)',
      `Le car est arrivé à la gare de Parakou. Colis déchargé et prêt pour remise au coursier final.`,
      'Compagnie',
      'Agence Parakou'
    );
    showToast(`Arrivée confirmée à l'agence de Parakou.`);
  };

  // 7. Assign delivery courier
  const assignDeliveryCourier = (shipmentId: string, courierId: string) => {
    const courier = couriers.find((c) => c.id === courierId);
    if (!courier) return;

    addEventToShipment(
      shipmentId,
      'delivery_assigned',
      'Livraison attribuée au coursier de destination',
      `Mission de retrait en agence et livraison confiée à ${courier.name} (${courier.phone}).`,
      'Strategy ARENA',
      'Parakou',
      undefined,
      {
        deliveryCourierId: courier.id,
        deliveryCourierName: courier.name
      }
    );
    showToast(`Livraison attribuée à ${courier.name} (Parakou).`);
  };

  // 8. Confirm destination pickup
  const confirmDestinationPickup = (shipmentId: string) => {
    const shipment = shipments.find((s) => s.id === shipmentId);
    if (!shipment) return;

    addEventToShipment(
      shipmentId,
      'out_for_delivery',
      'Retiré par le coursier de destination',
      `Colis retiré au guichet de la compagnie par ${shipment.deliveryCourierName || 'Bio Sabi'}. En cours de livraison finale.`,
      'Coursier Hermes',
      'Parakou (Dernier kilomètre)'
    );
    showToast(`Colis retiré en agence. En cours de livraison.`);
  };

  // 9. Confirm delivery
  const confirmDelivery = (shipmentId: string, proofCode: string) => {
    const shipment = shipments.find((s) => s.id === shipmentId);
    if (!shipment) return false;

    // Check code or allow demo bypass
    const isValid = proofCode.trim().toUpperCase() === shipment.securityCode.trim().toUpperCase() || proofCode.trim() === '1234';

    if (!isValid) {
      showToast(`Code incorrect. Le code attendu est ${shipment.securityCode}.`);
      return false;
    }

    addEventToShipment(
      shipmentId,
      'delivered',
      'Livré au destinataire',
      `Colis remis en main propre à ${shipment.recipient.name} contre validation du code sécurisé. Opération achevée.`,
      'Coursier Hermes',
      shipment.recipient.address,
      proofCode
    );

    showToast(`Livraison confirmée avec succès ! 🎉`);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    return true;
  };

  // 10. Declare incident
  const declareIncident = (shipmentId: string, reason: string) => {
    const incId = `inc-${Date.now()}`;
    const newIncident = {
      id: incId,
      shipmentId,
      reason,
      declaredAt: nowTimestamp(),
      declaredBy: 'Strategy ARENA / Opérateur',
      status: 'open' as const
    };

    addEventToShipment(
      shipmentId,
      'incident',
      'Incident signalé',
      `Anomalie : ${reason}. Prise en charge prioritaire par Strategy ARENA.`,
      'Strategy ARENA',
      undefined,
      undefined,
      { incident: newIncident }
    );
    showToast(`Incident consigné et notifié.`);
  };

  // 11. Resolve incident
  const resolveIncident = (shipmentId: string, notes: string) => {
    const shipment = shipments.find((s) => s.id === shipmentId);
    if (!shipment || !shipment.incident) return;

    const resolvedIncident = {
      ...shipment.incident,
      status: 'resolved' as const,
      resolutionNotes: notes
    };

    addEventToShipment(
      shipmentId,
      'registered',
      'Incident résolu',
      `Résolution validée : ${notes}. Reprise des opérations.`,
      'Strategy ARENA',
      undefined,
      undefined,
      { incident: resolvedIncident }
    );
    showToast(`Incident résolu avec succès.`);
  };

  // Reset to initial demo scenario
  const resetDemoScenario = () => {
    setShipments(INITIAL_SHIPMENTS);
    setSelectedShipmentId('shipment-demo-001');
    setActiveRole('landing');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    showToast('Scénario de démonstration réinitialisé.');
  };

  // Interactive 1-click wizard steps as defined in PRD Section 7
  // Returns next suggested step for presenter
  const getDemoStep = (): number => {
    const s = shipments.find((item) => item.id === 'shipment-demo-001');
    if (!s) return 1;
    switch (s.currentStatus) {
      case 'registered':
        return s.pickupCourierId ? 3 : 2;
      case 'pickup_assigned':
        return 3;
      case 'picked_up':
        return 4;
      case 'deposited_at_agency':
        return 5;
      case 'in_transit':
        return 6;
      case 'arrived_at_destination':
        return s.deliveryCourierId ? 8 : 7;
      case 'delivery_assigned':
        return 8;
      case 'out_for_delivery':
        return 9;
      case 'delivered':
        return 10;
      default:
        return 1;
    }
  };

  const currentDemoStepIndex = getDemoStep();

  const runDemoNextStep = (): { step: number; title: string; nextRole: ActiveRole } => {
    const s = shipments.find((item) => item.id === 'shipment-demo-001');
    setSelectedShipmentId('shipment-demo-001');

    if (!s) {
      resetDemoScenario();
      return { step: 1, title: 'Accueil Démo', nextRole: 'landing' };
    }

    switch (s.currentStatus) {
      case 'registered':
        if (!s.pickupCourierId) {
          assignPickupCourier('shipment-demo-001', 'courier-ctn-1');
          setActiveRole('arena');
          return { step: 2, title: 'Affecter coursier collecte (Arena)', nextRole: 'arena' };
        } else {
          setActiveCourierId('courier-ctn-1');
          confirmPickup('shipment-demo-001');
          setActiveRole('courier');
          return { step: 3, title: 'Collecter le colis (Coursier Cotonou)', nextRole: 'courier' };
        }
      case 'pickup_assigned':
        setActiveCourierId('courier-ctn-1');
        confirmPickup('shipment-demo-001');
        setActiveRole('courier');
        return { step: 3, title: 'Collecter le colis (Coursier Cotonou)', nextRole: 'courier' };
      case 'picked_up':
        confirmAgencyDeposit('shipment-demo-001');
        setActiveRole('courier');
        return { step: 4, title: 'Déposer à l’agence (Coursier Cotonou)', nextRole: 'courier' };
      case 'deposited_at_agency':
        confirmCarrierBoarding('shipment-demo-001', 'BUS-CTN-482');
        setActiveRole('carrier');
        return { step: 5, title: 'Prise en charge et départ (Compagnie)', nextRole: 'carrier' };
      case 'in_transit':
        confirmCarrierArrival('shipment-demo-001');
        setActiveRole('carrier');
        return { step: 6, title: 'Arrivée à Parakou (Compagnie)', nextRole: 'carrier' };
      case 'arrived_at_destination':
        if (!s.deliveryCourierId) {
          assignDeliveryCourier('shipment-demo-001', 'courier-pk-1');
          setActiveRole('arena');
          return { step: 7, title: 'Affecter coursier livraison (Arena)', nextRole: 'arena' };
        } else {
          setActiveCourierId('courier-pk-1');
          confirmDestinationPickup('shipment-demo-001');
          setActiveRole('courier');
          return { step: 8, title: 'Retrait en agence (Coursier Parakou)', nextRole: 'courier' };
        }
      case 'delivery_assigned':
        setActiveCourierId('courier-pk-1');
        confirmDestinationPickup('shipment-demo-001');
        setActiveRole('courier');
        return { step: 8, title: 'Retrait en agence (Coursier Parakou)', nextRole: 'courier' };
      case 'out_for_delivery':
        confirmDelivery('shipment-demo-001', s.securityCode);
        setActiveRole('client');
        return { step: 9, title: 'Livraison finale au destinataire', nextRole: 'client' };
      case 'delivered':
        setActiveRole('client');
        return { step: 10, title: 'Parcours achevé !', nextRole: 'client' };
      default:
        setActiveRole('landing');
        return { step: 1, title: 'Accueil', nextRole: 'landing' };
    }
  };

  return (
    <AppContext.Provider
      value={{
        shipments,
        selectedShipment,
        selectedShipmentId,
        activeRole,
        couriers,
        carriers,
        activeCourierId,
        toastMessage,
        setActiveRole,
        setSelectedShipmentId,
        setActiveCourierId,
        showToast,
        createShipment,
        assignPickupCourier,
        confirmPickup,
        confirmAgencyDeposit,
        confirmCarrierBoarding,
        confirmCarrierArrival,
        assignDeliveryCourier,
        confirmDestinationPickup,
        confirmDelivery,
        declareIncident,
        resolveIncident,
        resetDemoScenario,
        runDemoNextStep,
        currentDemoStepIndex
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

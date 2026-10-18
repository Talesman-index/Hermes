// ==========================================
// HERMES MOBILE MVP TYPES (PRD MOBILE-FIRST)
// ==========================================

export type MobileShipmentStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type MobileTab = 'home' | 'create' | 'shipments' | 'track' | 'delivered' | 'profile';

export interface WorkflowStage {
  step: MobileShipmentStep;
  title: string;
  description: string;
  actor: string;
  location: string;
}

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    step: 1,
    title: 'Demande confirmée',
    description: "Votre demande d'expédition a été enregistrée.",
    actor: 'Expéditeur',
    location: 'Cotonou',
  },
  {
    step: 2,
    title: 'Hermes en route',
    description: "Un partenaire se dirige vers l'adresse de récupération.",
    actor: 'Coursier Hermes',
    location: 'Cotonou (Haie Vive)',
  },
  {
    step: 3,
    title: 'Colis récupéré',
    description: 'Votre colis a été collecté à domicile.',
    actor: 'Coursier Hermes',
    location: 'Cotonou',
  },
  {
    step: 4,
    title: "Déposé à l'agence",
    description: "Le colis a été remis à l'agence de transport.",
    actor: 'Agence Autocar',
    location: 'Gare routière Cotonou',
  },
  {
    step: 5,
    title: 'En transport',
    description: 'La compagnie partenaire transporte le colis vers Parakou.',
    actor: 'Autocar Partenaire',
    location: 'RNIE 2 (vers Bohicon / Parakou)',
  },
  {
    step: 6,
    title: 'Arrivé à Parakou',
    description: "Le colis est arrivé à l'agence de destination.",
    actor: 'Agence Autocar',
    location: 'Gare routière Parakou',
  },
  {
    step: 7,
    title: 'Pris en charge pour livraison',
    description: 'Un Hermes a récupéré le colis à destination.',
    actor: 'Coursier Hermes',
    location: 'Gare Parakou',
  },
  {
    step: 8,
    title: 'En cours de livraison',
    description: 'Le colis est en route vers le destinataire.',
    actor: 'Coursier Hermes',
    location: 'Parakou (Banikanni)',
  },
  {
    step: 9,
    title: 'Livré',
    description: 'Le destinataire a reçu le colis.',
    actor: 'Destinataire final',
    location: 'Parakou',
  },
];

export interface MobileShipment {
  id: string;
  reference: string;
  origin: string;
  destination: string;
  packageType: string;
  description: string;
  estimatedWeight?: string;
  specialInstructions?: string;
  currentStep: MobileShipmentStep;
  sender: {
    name: string;
    phone: string;
    address: string;
    notes?: string;
  };
  recipient: {
    name: string;
    phone: string;
    address: string;
    notes?: string;
  };
  carrierName: string;
  securityPin: string;
  serviceFee: string; // 'À confirmer'
  createdAt: string;
  updatedAt: string;
  history: {
    step: MobileShipmentStep;
    timestamp: string;
    title: string;
    description: string;
    location: string;
  }[];
}

// ==========================================
// SHARED / COMPATIBILITY LOGISTICS TYPES
// ==========================================

export type ShipmentStatus =
  | 'registered'
  | 'pickup_assigned'
  | 'picked_up'
  | 'deposited_at_agency'
  | 'in_transit'
  | 'arrived_at_destination'
  | 'delivery_assigned'
  | 'out_for_delivery'
  | 'delivered'
  | 'incident';

export interface ShipmentEvent {
  id: string;
  timestamp: string;
  status: ShipmentStatus;
  title: string;
  description: string;
  actor: 'Client' | 'Coursier Hermes' | 'Compagnie' | 'Strategy ARENA';
  location?: string;
  proofCode?: string;
}

export interface Courier {
  id: string;
  name: string;
  phone: string;
  city: 'Cotonou' | 'Parakou';
  zone: string;
  rating: number;
  activeMissionsCount: number;
  avatar?: string;
}

export interface CourierMission {
  id: string;
  shipmentId: string;
  shipmentRef: string;
  type: 'pickup' | 'delivery';
  courierId: string;
  courierName: string;
  city: 'Cotonou' | 'Parakou';
  status: 'assigned' | 'in_progress' | 'completed';
  address: string;
  contactName: string;
  contactPhone: string;
  notes?: string;
  packageDescription: string;
  assignedAt: string;
  completedAt?: string;
}

export interface Carrier {
  id: string;
  name: string;
  phone: string;
  agencyCotonou: string;
  agencyParakou: string;
  nextDeparture: string;
  busNumber?: string;
}

export interface Incident {
  id: string;
  shipmentId: string;
  reason: string;
  declaredAt: string;
  declaredBy: string;
  status: 'open' | 'resolved';
  resolutionNotes?: string;
}

export interface Shipment {
  id: string;
  reference: string;
  origin: string;
  destination: string;
  packageType: string;
  description: string;
  estimatedWeight?: string;
  specialInstructions?: string;
  sender: {
    name: string;
    phone: string;
    address: string;
    notes?: string;
  };
  recipient: {
    name: string;
    phone: string;
    address: string;
    notes?: string;
  };
  carrierId: string;
  carrierName: string;
  currentStatus: ShipmentStatus;
  events: ShipmentEvent[];
  pickupCourierId?: string;
  pickupCourierName?: string;
  deliveryCourierId?: string;
  deliveryCourierName?: string;
  incident?: Incident;
  securityCode: string;
  createdAt: string;
  updatedAt: string;
}

export type ActiveRole =
  | 'landing'
  | 'client'
  | 'courier'
  | 'carrier'
  | 'arena';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MobileShipment, MobileShipmentStep, MobileTab, WORKFLOW_STAGES, PickupLocation, ShipmentPayment } from '../types';
import confetti from 'canvas-confetti';

interface CreateShipmentInput {
  originAddress: string;
  destinationAddress: string;
  originNotes?: string;
  destinationNotes?: string;
  packageType: string;
  description: string;
  estimatedWeight?: string;
  specialInstructions?: string;
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientPhone: string;
  pickupLocation?: PickupLocation;
  payment?: ShipmentPayment;
  serviceFee?: string;
}

interface MobileAppContextType {
  shipments: MobileShipment[];
  activeShipment: MobileShipment;
  activeShipmentId: string;
  activeTab: MobileTab;
  deviceFrame: boolean;
  toastMessage: string | null;
  showOnboarding: boolean;
  // Navigation
  setActiveTab: (tab: MobileTab) => void;
  openTracking: (shipmentId: string) => void;
  toggleDeviceFrame: () => void;
  showToast: (msg: string) => void;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  // Core actions
  createNewShipment: (input: CreateShipmentInput) => MobileShipment;
  advanceStep: (shipmentId?: string) => void;
  rewindStep: (shipmentId?: string) => void;
  resetDemoData: () => void;
}

const MobileAppContext = createContext<MobileAppContextType | undefined>(undefined);

const STORAGE_KEY = 'hermes_mobile_mvp_v2';

const INITIAL_SHIPMENTS: MobileShipment[] = [
  {
    id: 'demo-shipment-01',
    reference: 'HMD-2026-0891',
    origin: 'Cotonou',
    destination: 'Parakou',
    packageType: 'Colis standard',
    description: 'Échantillons artisanaux & catalogue commercial',
    estimatedWeight: '2.5 kg',
    specialInstructions: 'Manipuler avec soin, ne pas mouiller.',
    currentStep: 5, // En transport
    carrierName: 'Compagnie Transporteur Partenaire Démo',
    securityPin: '748 219',
    serviceFee: '5 000 FCFA',
    pickupLocation: {
      lat: 6.3571,
      lng: 2.4048,
      address: 'Rue 340, Haie Vive, Cotonou',
      district: 'Haie Vive (Camp Guézo)',
      mapUrl: 'https://maps.google.com/?q=6.3571,2.4048',
      notes: 'Immeuble beige face pharmacie'
    },
    payment: {
      status: 'paid',
      method: 'MTN Mobile Money',
      amount: 5000,
      amountFormatted: '5 000 FCFA',
      transactionId: 'TXN-MTN-884920',
      paidAt: '18 Oct 2026 · 07:46',
      phoneNumber: '+229 97 10 20 30'
    },
    createdAt: '18 Oct 2026 · 07:45',
    updatedAt: '18 Oct 2026 · 11:30',
    sender: {
      name: 'Cabinet Stratégie Cotonou',
      phone: '+229 97 10 20 30',
      address: 'Rue 340, Haie Vive, Cotonou',
      notes: 'Immeuble blanc, 2e étage face pharmacie',
    },
    recipient: {
      name: 'M. Bio Sabi Parakou',
      phone: '+229 95 40 50 60',
      address: 'Quartier Banikanni, Parakou',
      notes: 'Portail vert près de la grande voie',
    },
    history: [
      {
        step: 1,
        timestamp: '07:45',
        title: 'Demande confirmée',
        description: "Votre demande d'expédition a été enregistrée.",
        location: 'Cotonou',
      },
      {
        step: 2,
        timestamp: '08:15',
        title: 'Hermes en route',
        description: "Un partenaire se dirige vers l'adresse de récupération.",
        location: 'Cotonou (Haie Vive)',
      },
      {
        step: 3,
        timestamp: '08:45',
        title: 'Colis récupéré',
        description: 'Votre colis a été collecté à domicile.',
        location: 'Cotonou',
      },
      {
        step: 4,
        timestamp: '09:20',
        title: "Déposé à l'agence",
        description: "Le colis a été remis à l'agence de transport.",
        location: 'Gare routière Cotonou',
      },
      {
        step: 5,
        timestamp: '10:00',
        title: 'En transport',
        description: 'La compagnie partenaire transporte le colis vers Parakou.',
        location: 'RNIE 2 (en route)',
      },
    ],
  },
  {
    id: 'demo-shipment-02',
    reference: 'HMD-2026-0422',
    origin: 'Cotonou',
    destination: 'Parakou',
    packageType: 'Documents / Plis urgents',
    description: 'Dossiers contractuels scellés',
    estimatedWeight: '0.8 kg',
    currentStep: 9, // Livré
    carrierName: 'Autocar Régulier Interurbain',
    securityPin: '519 384',
    serviceFee: '3 500 FCFA',
    pickupLocation: {
      lat: 6.3688,
      lng: 2.4109,
      address: 'Cadjehoun, Cotonou',
      district: 'Cadjehoun (Étoile Rouge)',
      mapUrl: 'https://maps.google.com/?q=6.3688,2.4109'
    },
    payment: {
      status: 'paid',
      method: 'Moov Money',
      amount: 3500,
      amountFormatted: '3 500 FCFA',
      transactionId: 'TXN-MOOV-492104',
      paidAt: '17 Oct 2026 · 09:12',
      phoneNumber: '+229 96 11 22 33'
    },
    createdAt: '17 Oct 2026 · 09:10',
    updatedAt: '17 Oct 2026 · 17:45',
    sender: {
      name: 'Amina Touré',
      phone: '+229 96 11 22 33',
      address: 'Cadjehoun, Cotonou',
    },
    recipient: {
      name: 'Dr. Alassane Gado',
      phone: '+229 94 88 77 66',
      address: 'Quartier Albarika, Parakou',
    },
    history: WORKFLOW_STAGES.map((s) => ({
      step: s.step,
      timestamp: `Hier, ${7 + s.step}:15`,
      title: s.title,
      description: s.description,
      location: s.location,
    })),
  },
  {
    id: 'demo-shipment-03',
    reference: 'HMD-2026-0955',
    origin: 'Cotonou',
    destination: 'Parakou',
    packageType: 'Matériel électronique',
    description: 'Carton accessoires informatiques',
    estimatedWeight: '3.2 kg',
    currentStep: 2, // Hermes en route
    carrierName: 'Compagnie Transporteur Partenaire Démo',
    securityPin: '892 410',
    serviceFee: '6 000 FCFA',
    pickupLocation: {
      lat: 6.3765,
      lng: 2.4532,
      address: 'Akpakpa, Cotonou',
      district: 'Akpakpa (Carrefour PK3)',
      mapUrl: 'https://maps.google.com/?q=6.3765,2.4532'
    },
    payment: {
      status: 'paid',
      method: 'MTN Mobile Money',
      amount: 6000,
      amountFormatted: '6 000 FCFA',
      transactionId: 'TXN-MTN-391850',
      paidAt: '18 Oct 2026 · 09:32',
      phoneNumber: '+229 97 88 99 00'
    },
    createdAt: '18 Oct 2026 · 09:30',
    updatedAt: '18 Oct 2026 · 09:50',
    sender: {
      name: 'Koffi Agbossou',
      phone: '+229 97 88 99 00',
      address: 'Akpakpa, Cotonou',
    },
    recipient: {
      name: 'Roland Kora',
      phone: '+229 95 33 22 11',
      address: 'Zongo, Parakou',
    },
    history: [
      {
        step: 1,
        timestamp: '09:30',
        title: 'Demande confirmée',
        description: "Votre demande d'expédition a été enregistrée.",
        location: 'Cotonou',
      },
      {
        step: 2,
        timestamp: '09:50',
        title: 'Hermes en route',
        description: "Un partenaire se dirige vers l'adresse de récupération.",
        location: 'Cotonou (Akpakpa)',
      },
    ],
  },
];

export const MobileAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shipments, setShipments] = useState<MobileShipment[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: MobileShipment[] = JSON.parse(stored);
        return parsed.map((s) => ({
          ...s,
          serviceFee: !s.serviceFee || s.serviceFee === 'À confirmer' ? '5 000 FCFA' : s.serviceFee,
        }));
      }
    } catch {
      // fallback
    }
    return INITIAL_SHIPMENTS;
  });

  const [activeShipmentId, setActiveShipmentId] = useState<string>('demo-shipment-01');
  const [activeTab, setActiveTab] = useState<MobileTab>('home');
  const [deviceFrame, setDeviceFrame] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    try {
      return localStorage.getItem('hermes_onboarding_dismissed') !== 'true';
    } catch {
      return true;
    }
  });

  const openOnboarding = () => {
    setShowOnboarding(true);
  };

  const closeOnboarding = () => {
    setShowOnboarding(false);
    try {
      localStorage.setItem('hermes_onboarding_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shipments));
    } catch {
      // ignore
    }
  }, [shipments]);

  const activeShipment = shipments.find((s) => s.id === activeShipmentId) || shipments[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const openTracking = (shipmentId: string) => {
    setActiveShipmentId(shipmentId);
    const target = shipments.find((s) => s.id === shipmentId);
    if (target && target.currentStep === 9) {
      setActiveTab('delivered');
    } else {
      setActiveTab('track');
    }
  };

  const toggleDeviceFrame = () => {
    setDeviceFrame((prev) => !prev);
  };

  const createNewShipment = (input: CreateShipmentInput): MobileShipment => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const randomPin = `${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const calculatedFee = input.serviceFee || (input.payment ? input.payment.amountFormatted : '5 000 FCFA');

    const newShipment: MobileShipment = {
      id: `shipment-${Date.now()}`,
      reference: `HMD-2026-${randomCode}`,
      origin: 'Cotonou',
      destination: 'Parakou',
      packageType: input.packageType,
      description: input.description,
      estimatedWeight: input.estimatedWeight || '1.5 kg',
      specialInstructions: input.specialInstructions,
      currentStep: 1, // Étape 1 : Demande confirmée
      carrierName: 'Compagnie Transporteur Partenaire Démo',
      securityPin: randomPin,
      serviceFee: calculatedFee,
      pickupLocation: input.pickupLocation,
      payment: input.payment,
      createdAt: `Aujourd'hui · ${timeStr}`,
      updatedAt: `Aujourd'hui · ${timeStr}`,
      sender: {
        name: input.senderName,
        phone: input.senderPhone,
        address: input.originAddress,
        notes: input.originNotes,
      },
      recipient: {
        name: input.recipientName,
        phone: input.recipientPhone,
        address: input.destinationAddress,
        notes: input.destinationNotes,
      },
      history: [
        {
          step: 1,
          timestamp: timeStr,
          title: 'Demande confirmée',
          description: "Votre demande d'expédition a été enregistrée.",
          location: 'Cotonou',
        },
      ],
    };

    setShipments((prev) => [newShipment, ...prev]);
    setActiveShipmentId(newShipment.id);
    showToast(`Expédition créée avec succès ! Réf : ${newShipment.reference}`);
    return newShipment;
  };

  const advanceStep = (targetShipmentId?: string) => {
    const id = targetShipmentId || activeShipmentId;
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        if (s.currentStep >= 9) return s;

        const nextStep = (s.currentStep + 1) as MobileShipmentStep;
        const stageInfo = WORKFLOW_STAGES.find((w) => w.step === nextStep)!;
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const updatedHistory = [
          ...s.history,
          {
            step: nextStep,
            timestamp: timeStr,
            title: stageInfo.title,
            description: stageInfo.description,
            location: stageInfo.location,
          },
        ];

        if (nextStep === 9) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        }

        return {
          ...s,
          currentStep: nextStep,
          updatedAt: `Aujourd'hui · ${timeStr}`,
          history: updatedHistory,
        };
      })
    );

    // If step 9 reached on the active shipment, navigate to delivered view
    const current = shipments.find((s) => s.id === id);
    if (current && current.currentStep === 8) {
      showToast('🎉 Félicitations ! Colis livré avec succès.');
      setActiveTab('delivered');
    } else {
      const nextStage = WORKFLOW_STAGES.find((w) => w.step === (current ? current.currentStep + 1 : 2));
      if (nextStage) {
        showToast(`Étape suivante : ${nextStage.title}`);
      }
    }
  };

  const rewindStep = (targetShipmentId?: string) => {
    const id = targetShipmentId || activeShipmentId;
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        if (s.currentStep <= 1) return s;

        const prevStep = (s.currentStep - 1) as MobileShipmentStep;
        return {
          ...s,
          currentStep: prevStep,
          history: s.history.slice(0, prevStep),
        };
      })
    );
    showToast('Étape précédente restaurée');
  };

  const resetDemoData = () => {
    setShipments(INITIAL_SHIPMENTS);
    setActiveShipmentId('demo-shipment-01');
    setActiveTab('home');
    showToast('Données de démonstration réinitialisées au départ');
  };

  return (
    <MobileAppContext.Provider
      value={{
        shipments,
        activeShipment,
        activeShipmentId,
        activeTab,
        deviceFrame,
        toastMessage,
        showOnboarding,
        setActiveTab,
        openTracking,
        toggleDeviceFrame,
        showToast,
        openOnboarding,
        closeOnboarding,
        createNewShipment,
        advanceStep,
        rewindStep,
        resetDemoData,
      }}
    >
      {children}
    </MobileAppContext.Provider>
  );
};

export const useMobileApp = () => {
  const context = useContext(MobileAppContext);
  if (!context) {
    throw new Error('useMobileApp must be used within a MobileAppProvider');
  }
  return context;
};

import { Carrier, Courier, Shipment } from '../types';

export const INITIAL_CARRIERS: Carrier[] = [
  {
    id: 'carrier-1',
    name: 'Compagnie Étoile du Nord — Démo',
    phone: '+229 97 00 11 22',
    agencyCotonou: 'Gare Jonquet / Missebo, Cotonou',
    agencyParakou: 'Gare Routière Centrale, Parakou',
    nextDeparture: '14:30',
    busNumber: 'BUS-CTN-482'
  },
  {
    id: 'carrier-2',
    name: 'Trans-Bénin Lignes — Démo',
    phone: '+229 95 33 44 55',
    agencyCotonou: 'Carrefour Vèdoko, Cotonou',
    agencyParakou: 'Avenue Mathieu Kérékou, Parakou',
    nextDeparture: '16:00',
    busNumber: 'BUS-CTN-910'
  }
];

export const INITIAL_COURIERS: Courier[] = [
  {
    id: 'courier-ctn-1',
    name: 'Koffi Mensah',
    phone: '+229 97 12 34 56',
    city: 'Cotonou',
    zone: 'Cadjehoun / Haie Vive / Fidjrossè',
    rating: 4.9,
    activeMissionsCount: 1,
    avatar: 'KM'
  },
  {
    id: 'courier-ctn-2',
    name: 'Roland Dossou',
    phone: '+229 96 23 45 67',
    city: 'Cotonou',
    zone: 'Akpakpa / Port / Dantokpa',
    rating: 4.8,
    activeMissionsCount: 0,
    avatar: 'RD'
  },
  {
    id: 'courier-pk-1',
    name: 'Bio Sabi',
    phone: '+229 95 34 56 78',
    city: 'Parakou',
    zone: 'Centre-ville / Banikanni / Albarika',
    rating: 4.9,
    activeMissionsCount: 1,
    avatar: 'BS'
  },
  {
    id: 'courier-pk-2',
    name: 'Karimou Alassane',
    phone: '+229 94 45 67 89',
    city: 'Parakou',
    zone: 'Camp Adagbe / Zongo / Titirou',
    rating: 4.7,
    activeMissionsCount: 0,
    avatar: 'KA'
  }
];

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: 'shipment-demo-001',
    reference: 'HMD-DEMO-001',
    origin: 'Cotonou',
    destination: 'Parakou',
    packageType: 'Colis standard / Pièces & documents',
    description: 'Dossier d’appel d’offres et échantillons textiles',
    estimatedWeight: '2.5 kg',
    specialInstructions: 'Manipuler avec soin. Appeler 15 min avant l’arrivée.',
    sender: {
      name: 'Client Démo A (Cabinet Stratégie Cotonou)',
      phone: '+229 97 00 10 20',
      address: 'Rue 340, Haie Vive, Cotonou',
      notes: 'Immeuble beige, 2e étage'
    },
    recipient: {
      name: 'Client Démo B (M. Bio Parakou)',
      phone: '+229 95 00 30 40',
      address: 'Quartier Banikanni, près de la pharmacie, Parakou',
      notes: 'Maison à portail vert'
    },
    carrierId: 'carrier-1',
    carrierName: 'Compagnie Étoile du Nord — Démo',
    currentStatus: 'registered',
    securityCode: 'HRM-7241',
    createdAt: '18 Oct 2026, 08:30',
    updatedAt: '18 Oct 2026, 08:30',
    events: [
      {
        id: 'evt-001-1',
        timestamp: '18 Oct 2026, 08:30',
        status: 'registered',
        title: 'Demande enregistrée',
        description: 'La demande d’expédition Cotonou ➔ Parakou a été créée sur la plateforme HERMES.',
        actor: 'Client',
        location: 'Cotonou (Haie Vive)'
      }
    ]
  },
  {
    id: 'shipment-demo-002',
    reference: 'HMD-CTN-089',
    origin: 'Cotonou',
    destination: 'Parakou',
    packageType: 'Électronique / Matériel informatique',
    description: '2 Tablettes professionnelles et chargeurs',
    estimatedWeight: '1.8 kg',
    specialInstructions: 'Fragile, ne pas exposer à la chaleur.',
    sender: {
      name: 'Boutique Tech Plus',
      phone: '+229 96 11 22 33',
      address: 'Boulevard Saint-Michel, Cotonou'
    },
    recipient: {
      name: 'Coopérative Agricole Nord',
      phone: '+229 94 55 66 77',
      address: 'Zone Industrielle, Parakou'
    },
    carrierId: 'carrier-1',
    carrierName: 'Compagnie Étoile du Nord — Démo',
    pickupCourierId: 'courier-ctn-1',
    pickupCourierName: 'Koffi Mensah',
    currentStatus: 'deposited_at_agency',
    securityCode: 'HRM-3918',
    createdAt: '18 Oct 2026, 06:45',
    updatedAt: '18 Oct 2026, 08:15',
    events: [
      {
        id: 'evt-002-1',
        timestamp: '18 Oct 2026, 06:45',
        status: 'registered',
        title: 'Demande enregistrée',
        description: 'Expédition enregistrée via HERMES.',
        actor: 'Client',
        location: 'Cotonou'
      },
      {
        id: 'evt-002-2',
        timestamp: '18 Oct 2026, 07:10',
        status: 'pickup_assigned',
        title: 'Collecte attribuée',
        description: 'Mission attribuée au coursier Koffi Mensah.',
        actor: 'Strategy ARENA'
      },
      {
        id: 'evt-002-3',
        timestamp: '18 Oct 2026, 07:45',
        status: 'picked_up',
        title: 'Colis collecté',
        description: 'Colis récupéré chez Boutique Tech Plus.',
        actor: 'Coursier Hermes',
        location: 'Boulevard Saint-Michel, Cotonou'
      },
      {
        id: 'evt-002-4',
        timestamp: '18 Oct 2026, 08:15',
        status: 'deposited_at_agency',
        title: 'Déposé en agence de départ',
        description: 'Colis remis au guichet de l’agence Étoile du Nord à Cotonou.',
        actor: 'Coursier Hermes',
        location: 'Gare Jonquet, Cotonou'
      }
    ]
  },
  {
    id: 'shipment-demo-003',
    reference: 'HMD-CTN-074',
    origin: 'Cotonou',
    destination: 'Parakou',
    packageType: 'Pharmacie / Produits médicaux',
    description: 'Produits d’hygiène et réactifs d’analyse',
    estimatedWeight: '3.2 kg',
    specialInstructions: 'Transport climatisé si possible.',
    sender: {
      name: 'Laboratoire Central',
      phone: '+229 97 88 99 00',
      address: 'Zone Résidentielle, Cotonou'
    },
    recipient: {
      name: 'Clinique Espoir Parakou',
      phone: '+229 95 22 44 66',
      address: 'Quartier Albarika, Parakou'
    },
    carrierId: 'carrier-1',
    carrierName: 'Compagnie Étoile du Nord — Démo',
    pickupCourierId: 'courier-ctn-2',
    pickupCourierName: 'Roland Dossou',
    currentStatus: 'in_transit',
    securityCode: 'HRM-5829',
    createdAt: '18 Oct 2026, 05:30',
    updatedAt: '18 Oct 2026, 07:30',
    events: [
      {
        id: 'evt-003-1',
        timestamp: '18 Oct 2026, 05:30',
        status: 'registered',
        title: 'Demande enregistrée',
        description: 'Expédition enregistrée.',
        actor: 'Client'
      },
      {
        id: 'evt-003-2',
        timestamp: '18 Oct 2026, 06:15',
        status: 'picked_up',
        title: 'Colis collecté',
        description: 'Colis pris en charge à Cotonou.',
        actor: 'Coursier Hermes'
      },
      {
        id: 'evt-003-3',
        timestamp: '18 Oct 2026, 06:50',
        status: 'deposited_at_agency',
        title: 'Déposé en agence',
        description: 'Déposé à l’agence Cotonou.',
        actor: 'Coursier Hermes'
      },
      {
        id: 'evt-003-4',
        timestamp: '18 Oct 2026, 07:30',
        status: 'in_transit',
        title: 'Pris en charge par la compagnie',
        description: 'Colis embarqué à bord du car BUS-CTN-482 à destination de Parakou.',
        actor: 'Compagnie',
        location: 'En route sur le corridor RNIE 2'
      }
    ]
  },
  {
    id: 'shipment-demo-004',
    reference: 'HMD-CTN-061',
    origin: 'Cotonou',
    destination: 'Parakou',
    packageType: 'Mode & Habillement',
    description: 'Carton de prêt-à-porter traditionnel brodé',
    estimatedWeight: '4.5 kg',
    sender: {
      name: 'Atelier Couture Sika',
      phone: '+229 96 77 88 99',
      address: 'Missèbo, Cotonou'
    },
    recipient: {
      name: 'Mme Chantal Tossou',
      phone: '+229 95 11 33 55',
      address: 'Quartier Zongo, Parakou'
    },
    carrierId: 'carrier-2',
    carrierName: 'Trans-Bénin Lignes — Démo',
    pickupCourierId: 'courier-ctn-1',
    pickupCourierName: 'Koffi Mensah',
    deliveryCourierId: 'courier-pk-1',
    deliveryCourierName: 'Bio Sabi',
    currentStatus: 'arrived_at_destination',
    securityCode: 'HRM-1944',
    createdAt: '17 Oct 2026, 14:00',
    updatedAt: '18 Oct 2026, 08:00',
    events: [
      {
        id: 'evt-004-1',
        timestamp: '17 Oct 2026, 14:00',
        status: 'registered',
        title: 'Demande enregistrée',
        description: 'Création de la commande.',
        actor: 'Client'
      },
      {
        id: 'evt-004-2',
        timestamp: '17 Oct 2026, 17:30',
        status: 'in_transit',
        title: 'Pris en charge par le transporteur',
        description: 'Départ du car depuis Cotonou.',
        actor: 'Compagnie'
      },
      {
        id: 'evt-004-3',
        timestamp: '18 Oct 2026, 08:00',
        status: 'arrived_at_destination',
        title: 'Arrivé à destination (Parakou)',
        description: 'Le car est arrivé à la gare de Parakou. Colis disponible au guichet bagages.',
        actor: 'Compagnie',
        location: 'Gare Routière Centrale, Parakou'
      }
    ]
  },
  {
    id: 'shipment-demo-005',
    reference: 'HMD-CTN-042',
    origin: 'Cotonou',
    destination: 'Parakou',
    packageType: 'Pièces détachées mécaniques',
    description: 'Injecteurs pompe et filtres moteur diesel',
    estimatedWeight: '5.0 kg',
    sender: {
      name: 'Garage Moderne Bénin',
      phone: '+229 97 44 55 66',
      address: 'Akpakpa, Cotonou'
    },
    recipient: {
      name: 'Société Transport Sahel',
      phone: '+229 95 66 77 88',
      address: 'Route de Malanville, Parakou'
    },
    carrierId: 'carrier-1',
    carrierName: 'Compagnie Étoile du Nord — Démo',
    pickupCourierId: 'courier-ctn-2',
    pickupCourierName: 'Roland Dossou',
    deliveryCourierId: 'courier-pk-2',
    deliveryCourierName: 'Karimou Alassane',
    currentStatus: 'delivered',
    securityCode: 'HRM-9023',
    createdAt: '16 Oct 2026, 09:00',
    updatedAt: '17 Oct 2026, 16:20',
    events: [
      {
        id: 'evt-005-1',
        timestamp: '16 Oct 2026, 09:00',
        status: 'registered',
        title: 'Demande enregistrée',
        description: 'Commande initiée.',
        actor: 'Client'
      },
      {
        id: 'evt-005-2',
        timestamp: '16 Oct 2026, 11:30',
        status: 'picked_up',
        title: 'Colis collecté',
        description: 'Prise en charge chez l’expéditeur.',
        actor: 'Coursier Hermes'
      },
      {
        id: 'evt-005-3',
        timestamp: '16 Oct 2026, 13:00',
        status: 'deposited_at_agency',
        title: 'Déposé en agence Cotonou',
        description: 'Enregistré chez Étoile du Nord.',
        actor: 'Coursier Hermes'
      },
      {
        id: 'evt-005-4',
        timestamp: '16 Oct 2026, 14:00',
        status: 'in_transit',
        title: 'Transport Cotonou ➔ Parakou',
        description: 'Car parti de Cotonou.',
        actor: 'Compagnie'
      },
      {
        id: 'evt-005-5',
        timestamp: '17 Oct 2026, 08:30',
        status: 'arrived_at_destination',
        title: 'Arrivé à Parakou',
        description: 'Réceptionné à l’agence Parakou.',
        actor: 'Compagnie'
      },
      {
        id: 'evt-005-6',
        timestamp: '17 Oct 2026, 14:15',
        status: 'out_for_delivery',
        title: 'Retiré par le coursier Parakou',
        description: 'Pris en charge pour livraison finale.',
        actor: 'Coursier Hermes'
      },
      {
        id: 'evt-005-7',
        timestamp: '17 Oct 2026, 16:20',
        status: 'delivered',
        title: 'Livré au destinataire',
        description: 'Remis en mains propres contre code sécurisé.',
        actor: 'Coursier Hermes',
        location: 'Route de Malanville, Parakou',
        proofCode: 'HRM-9023'
      }
    ]
  },
  {
    id: 'shipment-demo-006',
    reference: 'HMD-CTN-019',
    origin: 'Cotonou',
    destination: 'Parakou',
    packageType: 'Colis fragile / Verrerie',
    description: 'Flacons d’huiles essentielles artisanales',
    estimatedWeight: '1.2 kg',
    sender: {
      name: 'Bénin Naturels',
      phone: '+229 97 99 00 11',
      address: 'Fidjrossè Calvaire, Cotonou'
    },
    recipient: {
      name: 'Boutique Beauté du Nord',
      phone: '+229 94 33 22 11',
      address: 'Grand Marché Arzeke, Parakou'
    },
    carrierId: 'carrier-1',
    carrierName: 'Compagnie Étoile du Nord — Démo',
    pickupCourierId: 'courier-ctn-1',
    pickupCourierName: 'Koffi Mensah',
    currentStatus: 'incident',
    securityCode: 'HRM-6612',
    createdAt: '17 Oct 2026, 11:00',
    updatedAt: '18 Oct 2026, 07:15',
    incident: {
      id: 'inc-001',
      shipmentId: 'shipment-demo-006',
      reason: 'Adresse expéditeur fermée lors de la première tentative de collecte.',
      declaredAt: '18 Oct 2026, 07:15',
      declaredBy: 'Coursier Hermes (Koffi Mensah)',
      status: 'open',
      resolutionNotes: 'Nouvelle tentative programmée à 11h après confirmation téléphonique.'
    },
    events: [
      {
        id: 'evt-006-1',
        timestamp: '17 Oct 2026, 11:00',
        status: 'registered',
        title: 'Demande enregistrée',
        description: 'Expédition créée.',
        actor: 'Client'
      },
      {
        id: 'evt-006-2',
        timestamp: '17 Oct 2026, 14:00',
        status: 'pickup_assigned',
        title: 'Collecte attribuée',
        description: 'Attribuée à Koffi Mensah.',
        actor: 'Strategy ARENA'
      },
      {
        id: 'evt-006-3',
        timestamp: '18 Oct 2026, 07:15',
        status: 'incident',
        title: 'Incident signalé',
        description: 'Adresse expéditeur fermée. Contact établi pour reprogrammation.',
        actor: 'Coursier Hermes',
        location: 'Fidjrossè Calvaire, Cotonou'
      }
    ]
  }
];

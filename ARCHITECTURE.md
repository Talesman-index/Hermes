# HERMES — Guide de Transition : Du Prototype Local au MVP avec Backend

Ce document détaille la feuille de route technique pour transformer ce prototype de démonstration frontend en une plateforme opérationnelle prête pour le pilote commercial sur le corridor **Cotonou ➔ Parakou**.

---

## 1. État Actuel du Prototype

L'architecture actuelle a été pensée selon les principes d'isolation de responsabilités :

- **Couche Présentation :** Composants React modulaires par acteur (`client/`, `courier/`, `carrier/`, `arena/`).
- **Couche État & Logique Métier :** Centralisée dans `src/context/AppContext.tsx`.
- **Couche Données :** Modélisée avec des types stricts dans `src/types/index.ts` et initialisée par `src/data/mockData.ts` avec persistance `localStorage`.

> **Avantage :** Les composants React consomment des méthodes d'action (`createShipment`, `confirmPickup`, `confirmAgencyDeposit`, etc.) sans jamais dépendre directement du format de stockage. Le remplacement du mock par des appels API REST ou GraphQL se fera sans restructurer les interfaces.

---

## 2. Architecture Cible Recommandée

### 2.1 Backend & Base de Données
- **Stack recommandée :** Node.js (NestJS ou Express/TypeScript) ou backend Serverless avec **PostgreSQL** (via Supabase ou Prisma ORM).
- **Temps Réel :** WebSockets ou Supabase Realtime pour pousser instantanément les changements de statut aux coursiers, compagnies et superviseurs sans rechargement.

### 2.2 Schéma Relationnel Cible (PostgreSQL)

```sql
-- 1. Expéditions
CREATE TABLE shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference VARCHAR(20) UNIQUE NOT NULL,
  origin VARCHAR(50) NOT NULL DEFAULT 'Cotonou',
  destination VARCHAR(50) NOT NULL DEFAULT 'Parakou',
  package_type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  estimated_weight VARCHAR(20),
  special_instructions TEXT,
  
  -- Expéditeur
  sender_name VARCHAR(100) NOT NULL,
  sender_phone VARCHAR(25) NOT NULL,
  sender_address TEXT NOT NULL,
  sender_notes TEXT,
  
  -- Destinataire
  recipient_name VARCHAR(100) NOT NULL,
  recipient_phone VARCHAR(25) NOT NULL,
  recipient_address TEXT NOT NULL,
  recipient_notes TEXT,
  
  -- Transporteur & Statut
  carrier_id UUID REFERENCES carriers(id),
  current_status VARCHAR(30) NOT NULL DEFAULT 'registered',
  security_code VARCHAR(10) NOT NULL,
  
  -- Coursiers assignés
  pickup_courier_id UUID REFERENCES couriers(id),
  delivery_courier_id UUID REFERENCES couriers(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Événements et Audit Trail
CREATE TABLE shipment_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID REFERENCES shipments(id) ON DELETE CASCADE,
  status VARCHAR(30) NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  actor VARCHAR(50) NOT NULL,
  location VARCHAR(100),
  proof_code VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Coursiers
CREATE TABLE couriers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(25) UNIQUE NOT NULL,
  city VARCHAR(50) NOT NULL,
  zone VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE
);

-- 4. Compagnies partenaires
CREATE TABLE carriers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(25),
  agency_cotonou TEXT NOT NULL,
  agency_parakou TEXT NOT NULL
);
```

---

## 3. Intégrations Spécifiques au Marché Béninois

### 3.1 Passerelles Mobile Money
- **Opérateurs :** MTN Mobile Money (MoMo) & Moov Money Bénin.
- **Agrégateurs recommandés :** FedaPay, Kkiapay ou CinetPay.
- **Règle de paiement :** Pré-autorisation ou paiement à la commande avec déblocage à la livraison.

### 3.2 Notifications SMS & WhatsApp
- **SMS Transactionnels :** Envoi automatique du code secret PIN par SMS au destinataire lors du départ du car de Cotonou.
- **Fournisseurs :** Twilio, Termii ou Infobip.
- **WhatsApp Business Cloud API :** Reçu d'expédition et lien de tracking direct envoyé à l'expéditeur et au destinataire.

### 3.3 Authentification & Rôles
- **Coursiers :** Connexion par numéro de téléphone + OTP SMS (sans mot de passe complexe).
- **Guichet Transporteur :** Compte station sécurisé avec PIN ou code agence.
- **Strategy ARENA :** Authentification OAuth2 / JWT avec 2FA.

---

## 4. Étapes de Migration Recommandées

1. **Phase 1 — API Client & Mock Replacement :**
   - Créer un dossier `src/services/api.ts`.
   - Remplacer les mutations locales de `AppContext.tsx` par des appels `fetch()` / `axios`.
2. **Phase 2 — Base de Données & Auth :**
   - Déployer le schéma PostgreSQL ci-dessus.
   - Mettre en place l'authentification par rôle (Client, Coursier, Compagnie, Admin Arena).
3. **Phase 3 — Déploiement Mobile & PWA :**
   - Activer le manifeste PWA pour que les coursiers puissent installer l'application sur Android sans passer par le Play Store.
4. **Phase 4 — Pilote Grandeur Nature :**
   - Démarrer sur 10 expéditions tests réelles entre Cotonou et Parakou avec une compagnie partenaire signataire.

import React from 'react';
import { ShipmentStatus } from '../../types';
import { 
  Clock, 
  Bike, 
  PackageCheck, 
  Building2, 
  Bus, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

interface StatusBadgeProps {
  status: ShipmentStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const getStatusConfig = (status: ShipmentStatus) => {
  switch (status) {
    case 'registered':
      return {
        label: 'Demande enregistrée',
        icon: Clock,
        bg: 'bg-slate-100 text-slate-700 border-slate-300',
        dot: 'bg-slate-400',
        step: 1
      };
    case 'pickup_assigned':
      return {
        label: 'Collecte attribuée',
        icon: Bike,
        bg: 'bg-blue-50 text-blue-700 border-blue-200',
        dot: 'bg-blue-500',
        step: 2
      };
    case 'picked_up':
      return {
        label: 'Colis collecté',
        icon: PackageCheck,
        bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        dot: 'bg-indigo-500',
        step: 3
      };
    case 'deposited_at_agency':
      return {
        label: 'Déposé en agence',
        icon: Building2,
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
        step: 4
      };
    case 'in_transit':
      return {
        label: 'En transport interurbain',
        icon: Bus,
        bg: 'bg-teal-50 text-teal-800 border-teal-300',
        dot: 'bg-teal-500',
        step: 5
      };
    case 'arrived_at_destination':
      return {
        label: 'Arrivé à Parakou',
        icon: MapPin,
        bg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
        dot: 'bg-cyan-500',
        step: 6
      };
    case 'delivery_assigned':
      return {
        label: 'Livraison attribuée',
        icon: Bike,
        bg: 'bg-sky-50 text-sky-800 border-sky-200',
        dot: 'bg-sky-500',
        step: 7
      };
    case 'out_for_delivery':
      return {
        label: 'En cours de livraison',
        icon: Truck,
        bg: 'bg-purple-50 text-purple-700 border-purple-200',
        dot: 'bg-purple-500',
        step: 8
      };
    case 'delivered':
      return {
        label: 'Livré au destinataire',
        icon: CheckCircle2,
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-300',
        dot: 'bg-emerald-500',
        step: 9
      };
    case 'incident':
      return {
        label: 'Incident signalé',
        icon: AlertTriangle,
        bg: 'bg-rose-50 text-rose-700 border-rose-300',
        dot: 'bg-rose-500',
        step: 0
      };
    default:
      return {
        label: status,
        icon: Clock,
        bg: 'bg-slate-100 text-slate-700 border-slate-200',
        dot: 'bg-slate-400',
        step: 0
      };
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = getStatusConfig(status);
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs font-medium px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-semibold px-3 py-1.5 gap-2'
  }[size];

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-all duration-150 ${config.bg} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
      <Icon size={iconSizes} className="shrink-0" />
      <span className="truncate">{config.label}</span>
    </span>
  );
};

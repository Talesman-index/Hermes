import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Navigation, 
  X, 
  Check, 
  ExternalLink, 
  Compass, 
  Crosshair, 
  Search,
  Sparkles,
  Info
} from 'lucide-react';
import { PickupLocation } from '../../types';

interface PickupLocationPickerModalProps {
  initialLocation?: PickupLocation | null;
  initialAddress?: string;
  onSelectLocation: (location: PickupLocation) => void;
  onClose: () => void;
}

// Preset popular districts in Cotonou for quick & precise pickup
const COTONOU_DISTRICTS = [
  { name: 'Haie Vive', sub: 'Camp Guézo / Cocotiers', lat: 6.3571, lng: 2.4048 },
  { name: 'Cadjehoun', sub: 'Aéroport / Étoile Rouge', lat: 6.3688, lng: 2.4109 },
  { name: 'Ganhi', sub: 'Centre Commercial / Port', lat: 6.3639, lng: 2.4348 },
  { name: 'Akpakpa', sub: 'Carrefour PK3 / Ciné Concorde', lat: 6.3765, lng: 2.4532 },
  { name: 'Fidjrossè', sub: 'Plage / Calvaire', lat: 6.3612, lng: 2.3689 },
  { name: 'Kouhounou', sub: 'Stade GMK / Agla', lat: 6.3854, lng: 2.3912 },
  { name: 'Zongo', sub: 'Grande Mosquée / Halles', lat: 6.3695, lng: 2.4278 },
  { name: 'Maro-Militaire', sub: 'Zone résidentielle', lat: 6.3621, lng: 2.3985 },
];

export const PickupLocationPickerModal: React.FC<PickupLocationPickerModalProps> = ({
  initialLocation,
  initialAddress = 'Rue 340, Haie Vive, Cotonou',
  onSelectLocation,
  onClose,
}) => {
  const [lat, setLat] = useState<number>(initialLocation?.lat || 6.3571);
  const [lng, setLng] = useState<number>(initialLocation?.lng || 2.4048);
  const [address, setAddress] = useState<string>(initialLocation?.address || initialAddress);
  const [district, setDistrict] = useState<string>(initialLocation?.district || 'Haie Vive');
  const [notes, setNotes] = useState<string>(initialLocation?.notes || '');
  const [isLocating, setIsLocating] = useState(false);
  const [gpsSuccess, setGpsSuccess] = useState(false);
  const [mapMode, setMapMode] = useState<'street' | 'satellite'>('street');

  // Convert lat/lng to map coordinates (x: 0-100%, y: 0-100%) inside Cotonou bounding box
  // Lat: 6.345 (south ocean) to 6.395 (north)
  // Lng: 2.355 (west Fidjrossè) to 2.465 (east Akpakpa)
  const minLat = 6.345;
  const maxLat = 6.395;
  const minLng = 2.355;
  const maxLng = 2.465;

  const pinX = Math.min(95, Math.max(5, ((lng - minLng) / (maxLng - minLng)) * 100));
  const pinY = Math.min(95, Math.max(5, (1 - (lat - minLat) / (maxLat - minLat)) * 100));

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) / rect.width;
    const clickY = (e.clientY - rect.top) / rect.height;

    const newLng = Number((minLng + clickX * (maxLng - minLng)).toFixed(4));
    const newLat = Number((maxLat - clickY * (maxLat - minLat)).toFixed(4));

    setLng(newLng);
    setLat(newLat);
    setGpsSuccess(false);

    // Find nearest district
    let nearest = COTONOU_DISTRICTS[0];
    let minDistance = 999;
    COTONOU_DISTRICTS.forEach((d) => {
      const dist = Math.sqrt(Math.pow(d.lat - newLat, 2) + Math.pow(d.lng - newLng, 2));
      if (dist < minDistance) {
        minDistance = dist;
        nearest = d;
      }
    });

    setDistrict(nearest.name);
    setAddress(`Repère proche ${nearest.name}, Cotonou`);
  };

  const handleSelectDistrict = (d: typeof COTONOU_DISTRICTS[0]) => {
    setLat(d.lat);
    setLng(d.lng);
    setDistrict(d.name);
    setAddress(`${d.name} (${d.sub}), Cotonou`);
    setGpsSuccess(false);
  };

  const handleUseCurrentGPS = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = Number(position.coords.latitude.toFixed(4));
          const userLng = Number(position.coords.longitude.toFixed(4));
          setLat(userLat);
          setLng(userLng);
          setAddress(`Position GPS détectée (${userLat}, ${userLng})`);
          setDistrict('Ma position GPS exacte');
          setIsLocating(false);
          setGpsSuccess(true);
        },
        () => {
          // If permission denied or desktop, simulate user location in Haie Vive, Cotonou
          setTimeout(() => {
            setLat(6.3575);
            setLng(2.4052);
            setDistrict('Haie Vive');
            setAddress('Haie Vive, Cotonou (Position simulée)');
            setIsLocating(false);
            setGpsSuccess(true);
          }, 800);
        },
        { timeout: 7000 }
      );
    } else {
      setTimeout(() => {
        setLat(6.3575);
        setLng(2.4052);
        setDistrict('Haie Vive');
        setAddress('Haie Vive, Cotonou (Position simulée)');
        setIsLocating(false);
        setGpsSuccess(true);
      }, 600);
    }
  };

  const googleMapsUrl = `https://maps.google.com/?q=${lat},${lng}`;

  const handleConfirm = () => {
    onSelectLocation({
      lat,
      lng,
      address,
      district,
      mapUrl: googleMapsUrl,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[92vh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/30">
              <MapPin size={18} className="stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-black text-slate-900 text-base">Localisation Maps de collecte</h2>
              <p className="text-[11px] text-slate-400">Pour le ramassage du colis par le coursier</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* GPS Action Button & Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleUseCurrentGPS}
            disabled={isLocating}
            className="flex-1 py-2.5 px-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-black text-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
          >
            <Navigation size={14} className={isLocating ? 'animate-spin' : 'stroke-[2.5]'} />
            <span>{isLocating ? 'Détection GPS...' : 'Utiliser ma position GPS actuelle'}</span>
            {gpsSuccess && <Check size={14} className="text-emerald-600 stroke-[3]" />}
          </button>

          <div className="flex rounded-2xl bg-slate-100 p-0.5 border border-slate-200 text-[10px] font-bold">
            <button
              type="button"
              onClick={() => setMapMode('street')}
              className={`px-2.5 py-1.5 rounded-xl cursor-pointer transition-all ${
                mapMode === 'street' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Plan
            </button>
            <button
              type="button"
              onClick={() => setMapMode('satellite')}
              className={`px-2.5 py-1.5 rounded-xl cursor-pointer transition-all ${
                mapMode === 'satellite' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Satellite
            </button>
          </div>
        </div>

        {/* Interactive Map Visualizer */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-700">Cliquez sur la carte pour déplacer le point</span>
            <span className="font-mono text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 whitespace-nowrap shrink-0">
              {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
            </span>
          </div>

          <div 
            onClick={handleMapClick}
            className={`relative w-full h-48 rounded-2xl overflow-hidden cursor-crosshair border-2 border-slate-200 transition-all shadow-inner select-none ${
              mapMode === 'satellite' ? 'bg-[#0f1d19]' : 'bg-[#e5ece8]'
            }`}
          >
            {/* Background Map Graphic (Vectorized Cotonou Corridor Layout) */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path 
                    d="M 24 0 L 0 0 0 24" 
                    fill="none" 
                    stroke={mapMode === 'satellite' ? '#1c362d' : '#d2ded7'} 
                    strokeWidth="0.8" 
                  />
                </pattern>
              </defs>

              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Ocean Atlantique (Bottom South) */}
              <path 
                d="M 0 170 Q 120 160 250 165 T 500 170 L 500 220 L 0 220 Z" 
                fill={mapMode === 'satellite' ? '#0d2836' : '#bfdbfe'} 
                opacity="0.85" 
              />
              <text x="15" y="185" fill={mapMode === 'satellite' ? '#38bdf8' : '#2563eb'} fontSize="9" fontWeight="bold">
                OCÉAN ATLANTIQUE (GOLFE DE GUINÉE)
              </text>

              {/* Lac Nokoué / Lagune de Cotonou (North-East) */}
              <ellipse 
                cx="380" 
                cy="30" 
                rx="90" 
                ry="30" 
                fill={mapMode === 'satellite' ? '#0d2836' : '#bfdbfe'} 
                opacity="0.75" 
              />
              <text x="330" y="32" fill={mapMode === 'satellite' ? '#38bdf8' : '#2563eb'} fontSize="8" fontWeight="bold">
                LAC NOKOUÉ
              </text>

              {/* RNIE 2 Corridor towards Bohicon / Parakou (Northwards Highway) */}
              <path 
                d="M 220 160 L 210 100 L 190 20 L 180 0" 
                stroke={mapMode === 'satellite' ? '#10b981' : '#059669'} 
                strokeWidth="4" 
                fill="none" 
                strokeDasharray="4 2"
              />
              <text x="120" y="25" fill="#047857" fontSize="8" fontWeight="bold">
                ⬆ CORRIDOR RNIE 2 (VERS PARAKOU)
              </text>

              {/* Boulevard de la Marina / Route des Pêches (Along Coast) */}
              <path 
                d="M 0 155 Q 180 150 400 152" 
                stroke={mapMode === 'satellite' ? '#f59e0b' : '#d97706'} 
                strokeWidth="3" 
                fill="none" 
              />

              {/* Airport Runway Cardinal Bernardin Gantin */}
              <line 
                x1="60" 
                y1="130" 
                x2="150" 
                y2="135" 
                stroke={mapMode === 'satellite' ? '#94a3b8' : '#64748b'} 
                strokeWidth="5" 
                strokeDasharray="6 3"
              />
              <text x="70" y="125" fill={mapMode === 'satellite' ? '#cbd5e1' : '#475569'} fontSize="7" fontWeight="bold">
                AÉROPORT CADJEHOUN
              </text>

              {/* Key Landmark Labels */}
              <text x="140" y="150" fill={mapMode === 'satellite' ? '#f1f5f9' : '#0f172a'} fontSize="8" fontWeight="bold">
                HAIE VIVE
              </text>
              <text x="250" y="130" fill={mapMode === 'satellite' ? '#f1f5f9' : '#0f172a'} fontSize="8" fontWeight="bold">
                GANHI / PORT
              </text>
              <text x="320" y="100" fill={mapMode === 'satellite' ? '#f1f5f9' : '#0f172a'} fontSize="8" fontWeight="bold">
                AKPAKPA
              </text>
              <text x="25" y="150" fill={mapMode === 'satellite' ? '#f1f5f9' : '#0f172a'} fontSize="8" fontWeight="bold">
                FIDJROSSÈ
              </text>
            </svg>

            {/* Dynamic Target Marker (Animated Hermes Pin) */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-full pointer-events-none transition-all duration-300 z-20 flex flex-col items-center"
              style={{ left: `${pinX}%`, top: `${pinY}%` }}
            >
              {/* Pulsing ring */}
              <div className="absolute top-7 w-8 h-8 rounded-full bg-emerald-500/30 animate-ping -translate-x-1/2 -translate-y-1/2" />
              
              {/* Pin bubble */}
              <div className="bg-emerald-600 text-white p-2 rounded-2xl shadow-xl border-2 border-white flex items-center justify-center scale-110">
                <MapPin size={20} className="fill-white text-emerald-800 stroke-[1.5]" />
              </div>

              {/* Pin needle */}
              <div className="w-1 h-2 bg-emerald-700 shadow-sm" />
              <div className="w-2.5 h-1 rounded-full bg-black/40 blur-[1px]" />

              {/* Badge */}
              <div className="absolute -top-6 whitespace-nowrap bg-slate-900/90 text-white px-2 py-0.5 rounded-full text-[9px] font-bold shadow-md border border-slate-700">
                {district}
              </div>
            </div>

            {/* Top Right Live Google Maps Link */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute top-2 right-2 bg-white/90 hover:bg-white text-slate-700 px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 shadow-sm backdrop-blur-xs border border-slate-200 transition-colors cursor-pointer"
            >
              <span>Google Maps</span>
              <ExternalLink size={10} />
            </a>

            {/* Bottom Left Compass Watermark */}
            <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[9px] text-slate-500 bg-white/80 px-2 py-0.5 rounded-lg backdrop-blur-xs border border-slate-200/80">
              <Compass size={11} className="text-emerald-600" />
              <span>Zone Cotonou Littoral</span>
            </div>
          </div>
        </div>

        {/* Quick District Selector Chips */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-700">
            Quartiers populaires de Cotonou :
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
            {COTONOU_DISTRICTS.map((d) => (
              <button
                key={d.name}
                type="button"
                onClick={() => handleSelectDistrict(d)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                  district === d.name
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Coordinates & Address Inputs */}
        <div className="space-y-2 pt-1">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Adresse ou repère identifié à Cotonou
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ex: Rue 340, Immeuble beige face pharmacie"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Instructions précises pour le coursier (étage, portail, boutique)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: 1er étage, sonner au nom Cabinet Stratégie"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
        </div>

        {/* Courier Precision Notice */}
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-2.5 text-emerald-950 text-xs">
          <Crosshair size={16} className="text-emerald-700 shrink-0 mt-0.5 stroke-[2.5]" />
          <div>
            <p className="font-bold text-[11px]">Précision de collecte garantie</p>
            <p className="text-[10px] text-emerald-800 mt-0.5 leading-snug">
              Ces coordonnées GPS seront transmises en direct au coursier Hermes sur son application pour un ramassage ponctuel et sans détour.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30 active:scale-98 transition-all"
          >
            <Check size={16} className="stroke-[3]" />
            <span>Confirmer ce point de collecte</span>
          </button>
        </div>

      </div>
    </div>
  );
};

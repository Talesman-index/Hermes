import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  Lock, 
  ArrowRight, 
  Check, 
  AlertCircle,
  Clock,
  Sparkles,
  Zap
} from 'lucide-react';
import { ShipmentPayment } from '../../types';
import confetti from 'canvas-confetti';

interface PaymentModalProps {
  amount: number;
  amountFormatted: string;
  senderPhone: string;
  senderName: string;
  packageType: string;
  onPaymentSuccess: (payment: ShipmentPayment) => void;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  amount,
  amountFormatted,
  senderPhone,
  senderName,
  packageType,
  onPaymentSuccess,
  onClose,
}) => {
  const [method, setMethod] = useState<'MTN Mobile Money' | 'Moov Money' | 'Carte Bancaire'>('MTN Mobile Money');
  const [phoneNumber, setPhoneNumber] = useState(senderPhone || '+229 97 00 10 20');
  const [cardNumber, setCardNumber] = useState('4234 •••• •••• 9812');
  const [cardHolder, setCardHolder] = useState(senderName || 'Expéditeur Hermes');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  
  // Payment processing states: 'form' | 'prompt' | 'verifying' | 'success'
  const [paymentPhase, setPaymentPhase] = useState<'form' | 'prompt' | 'verifying' | 'success'>('form');
  const [countdown, setCountdown] = useState<number>(3);
  const [generatedTxId, setGeneratedTxId] = useState<string>('');

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const randomTx = Math.floor(100000 + Math.random() * 900000);
    const txPrefix = method === 'MTN Mobile Money' ? 'MTN' : method === 'Moov Money' ? 'MOOV' : 'CARD';
    const txId = `TXN-${txPrefix}-2026-${randomTx}`;
    setGeneratedTxId(txId);

    if (method === 'Carte Bancaire') {
      setPaymentPhase('verifying');
      setTimeout(() => {
        completePayment(txId);
      }, 1600);
    } else {
      // Mobile Money Push Simulation
      setPaymentPhase('prompt');
    }
  };

  const handleAuthorizePrompt = () => {
    setPaymentPhase('verifying');
    setTimeout(() => {
      completePayment(generatedTxId);
    }, 1200);
  };

  const completePayment = (txId: string) => {
    setPaymentPhase('success');

    // Confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#10b981', '#fbbf24', '#34d399']
      });
    } catch {
      // ignore
    }

    const now = new Date();
    const dateFormatted = `${now.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })} · ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const paymentResult: ShipmentPayment = {
      status: 'paid',
      method,
      amount,
      amountFormatted,
      transactionId: txId,
      paidAt: dateFormatted,
      phoneNumber: method !== 'Carte Bancaire' ? phoneNumber : undefined,
    };

    setTimeout(() => {
      onPaymentSuccess(paymentResult);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[92vh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-5">
        
        {/* Phase 1: Payment Method Form */}
        {paymentPhase === 'form' && (
          <form onSubmit={handleStartPayment} className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/30">
                  <Lock size={18} className="stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="font-black text-slate-900 text-base">Règlement des frais d'expédition</h2>
                  <p className="text-[11px] text-slate-400">Paiement sécurisé · Corridor Cotonou ➔ Parakou</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Total Fee Box */}
            <div className="bg-gradient-to-r from-[#0B1F17] to-[#123829] text-white p-4 rounded-2xl shadow-lg border border-emerald-900/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">Total à payer</span>
                <p className="text-2xl font-mono font-black text-emerald-400">{amountFormatted}</p>
                <p className="text-[10px] text-slate-300 mt-0.5">Collecte domicile + Autocar + Livraison finale</p>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Prise en charge 100%
                </span>
                <p className="text-[10px] text-slate-400 mt-1 font-mono">{packageType}</p>
              </div>
            </div>

            {/* Method Selectors */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Choisir le mode de paiement :
              </label>

              <div className="grid grid-cols-3 gap-2">
                {/* MTN Mobile Money */}
                <button
                  type="button"
                  onClick={() => setMethod('MTN Mobile Money')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    method === 'MTN Mobile Money'
                      ? 'border-amber-400 bg-amber-50/80 shadow-sm ring-2 ring-amber-400/50'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#FFCC00] text-black font-black text-[10px] flex items-center justify-center shadow-xs">
                    MoMo
                  </div>
                  <span className="font-extrabold text-[11px] text-slate-900 leading-tight">MTN Bénin</span>
                  <span className="text-[9px] text-slate-500 font-mono">*144#</span>
                </button>

                {/* Moov Money */}
                <button
                  type="button"
                  onClick={() => setMethod('Moov Money')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    method === 'Moov Money'
                      ? 'border-blue-400 bg-blue-50/80 shadow-sm ring-2 ring-blue-400/50'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#005CA9] text-white font-black text-[9px] flex items-center justify-center shadow-xs">
                    Moov
                  </div>
                  <span className="font-extrabold text-[11px] text-slate-900 leading-tight">Moov Money</span>
                  <span className="text-[9px] text-slate-500 font-mono">*155#</span>
                </button>

                {/* Carte Bancaire */}
                <button
                  type="button"
                  onClick={() => setMethod('Carte Bancaire')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    method === 'Carte Bancaire'
                      ? 'border-emerald-500 bg-emerald-50/80 shadow-sm ring-2 ring-emerald-500/50'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-[10px] flex items-center justify-center shadow-xs">
                    <CreditCard size={14} />
                  </div>
                  <span className="font-extrabold text-[11px] text-slate-900 leading-tight">Carte Bancaire</span>
                  <span className="text-[9px] text-slate-500">Visa / MC</span>
                </button>
              </div>
            </div>

            {/* Method Details Input */}
            {method !== 'Carte Bancaire' ? (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700">
                    Numéro de compte {method} *
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    Bénin (+229)
                  </span>
                </div>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+229 97 00 10 20"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-[10px] text-slate-500 leading-snug">
                  Une notification de validation sera directement envoyée sur ce téléphone. Vous n'aurez qu'à composer votre code secret.
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Numéro de carte</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-1">Titulaire</label>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-1">Expiration / CVC</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security Guarantee */}
            <div className="flex items-center gap-2 text-slate-500 text-[11px] pt-1">
              <ShieldCheck size={16} className="text-emerald-600 shrink-0 stroke-[2.5]" />
              <span>Paiement crypté 256-bit certifié par les opérateurs locaux.</span>
            </div>

            {/* Submit Action */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-emerald-600/30 active:scale-98 transition-all"
              >
                <Lock size={15} />
                <span>Payer {amountFormatted} maintenant</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </form>
        )}

        {/* Phase 2: Mobile Money USSD / Push Prompt Simulation */}
        {paymentPhase === 'prompt' && (
          <div className="space-y-5 text-center py-4 animate-in zoom-in-95 duration-200">
            {/* Phone Push Simulation Device Mockup */}
            <div className="max-w-xs mx-auto bg-slate-900 text-white rounded-3xl p-5 shadow-2xl border-2 border-slate-700 space-y-3 relative overflow-hidden">
              <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto" />
              
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>{method === 'MTN Mobile Money' ? 'MTN MoMo Bénin' : 'Moov Money'}</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Direct
                </span>
              </div>

              <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700 space-y-2 text-left">
                <span className="text-[10px] font-black uppercase text-amber-400">
                  Demande de débit instantané
                </span>
                <p className="text-xs font-bold text-white leading-snug">
                  Autoriser le paiement de <strong>{amountFormatted}</strong> pour Hermes Logistics ?
                </p>
                <div className="pt-1 text-[10px] text-slate-400 font-mono">
                  <span>Numéro débité : </span>
                  <strong className="text-slate-200">{phoneNumber}</strong>
                </div>
                <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Réf : {generatedTxId}</span>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleAuthorizePrompt}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95 transition-all"
                >
                  <CheckCircle2 size={16} className="stroke-[3]" />
                  <span>Confirmer & Saisir le code PIN</span>
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-800">
                Notification push envoyée sur votre téléphone
              </p>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                Cliquez sur le bouton ci-dessus pour simuler la validation avec votre code secret Mobile Money.
              </p>
            </div>
          </div>
        )}

        {/* Phase 3: Verifying */}
        {paymentPhase === 'verifying' && (
          <div className="space-y-4 text-center py-8 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <Zap size={30} className="animate-bounce" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">Traitement sécurisé du paiement...</h3>
              <p className="text-xs text-slate-400 mt-1">Validation avec l'opérateur {method} Bénin en cours.</p>
            </div>
          </div>
        )}

        {/* Phase 4: Success Receipt */}
        {paymentPhase === 'success' && (
          <div className="space-y-4 text-center py-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-600/30">
              <CheckCircle2 size={36} className="stroke-[2.8]" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                Paiement Validé
              </span>
              <h3 className="text-xl font-black text-slate-900">Frais d'expédition réglés !</h3>
              <p className="text-xs text-slate-500">Votre transaction a été approuvée avec succès.</p>
            </div>

            {/* Transaction Receipt Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-2 text-xs max-w-xs mx-auto">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Montant :</span>
                <span className="font-mono font-black text-slate-900 text-sm">{amountFormatted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Moyen :</span>
                <span className="font-bold text-slate-800">{method}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Référence :</span>
                <span className="font-mono font-bold text-emerald-700">{generatedTxId}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-200 text-[10px] text-slate-400">
                <span>Statut :</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <Check size={11} className="stroke-[3]" /> Quittance acquittée
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

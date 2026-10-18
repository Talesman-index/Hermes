import React from 'react';
import { MobileAppProvider, useMobileApp } from './context/MobileAppContext';
import { DemoControlBar } from './components/mobile/DemoControlBar';
import { MobileFrame } from './components/mobile/MobileFrame';
import { MobileNavBar } from './components/mobile/MobileNavBar';
import { OnboardingScreen } from './components/mobile/OnboardingScreen';
import { HomeScreen } from './components/mobile/HomeScreen';
import { CreateShipmentScreen } from './components/mobile/CreateShipmentScreen';
import { TrackingScreen } from './components/mobile/TrackingScreen';
import { DeliveredScreen } from './components/mobile/DeliveredScreen';
import { MyShipmentsScreen } from './components/mobile/MyShipmentsScreen';
import { ProfileScreen } from './components/mobile/ProfileScreen';
import { CheckCircle2 } from 'lucide-react';

const MobileMain: React.FC = () => {
  const { activeTab, toastMessage, showOnboarding, closeOnboarding } = useMobileApp();

  return (
    <div className="min-h-screen bg-[#F0F4F2] flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top Demo Bar for the Presenter */}
      <DemoControlBar />

      {/* Main Centered Smartphone Experience */}
      <MobileFrame>
        {showOnboarding ? (
          <OnboardingScreen onComplete={closeOnboarding} />
        ) : (
          <>
            {activeTab === 'home' && <HomeScreen />}
            {activeTab === 'create' && <CreateShipmentScreen />}
            {activeTab === 'track' && <TrackingScreen />}
            {activeTab === 'delivered' && <DeliveredScreen />}
            {activeTab === 'shipments' && <MyShipmentsScreen />}
            {activeTab === 'profile' && <ProfileScreen />}

            {/* Fixed Bottom Navigation (Accueil, Expédier, Mes colis, Profil) */}
            <MobileNavBar />
          </>
        )}
      </MobileFrame>

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-20 left-4 right-4 max-w-sm mx-auto z-50 animate-in slide-in-from-bottom-5 duration-200 pointer-events-none">
          <div className="bg-[#0B1F17] text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-800/60 flex items-center gap-3 text-xs">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 font-bold shadow-md">
              <CheckCircle2 size={16} className="stroke-[2.8]" />
            </div>
            <p className="font-bold text-slate-100 leading-snug">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <MobileAppProvider>
      <MobileMain />
    </MobileAppProvider>
  );
}

export default App;

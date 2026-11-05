import "../css/app.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import { useState } from 'react';
import { createRoot } from "react-dom/client";
import HotelHeader from "./components/HotelHeader";
import HotelHero from "./components/HotelHero";
import AvailabilitySearch from "./components/AvailabilitySearch";
import RoomsSection from "./components/RoomsSession";
import ExperienceSection from "./components/ExperienceSection";
import { experiences } from "./data/experiences";
import PropertyStory from "./components/PropertyStory";
import LocationInfo from "./components/LocationInfo";
import HotelFooter from "./components/HotelFooter";
import StickyBookBar from "./components/StickyBookBar";
import FaqSection from "./components/FaqSection";
import GallerySection from "./components/GallerySection";
import EnquirySection from "./components/EnquirySection";
import OffersSection from "./components/OffersSection";
import AuthPage from "./components/AuthPage";
import { hotel } from './data/hotel';
function App() {
      const [selectedRoomId, setSelectedRoomId] = useState(null);   // 2. must be inside App
  const path = window.location.pathname;
  const authMode = path === '/login' ? 'login' : path === '/register' ? 'signup' : null;
if (authMode) {
  return (
    <>
      <header className="border-b border-stone-light bg-ivory">
        <div className="mx-auto flex min-h-[72px] max-w-[1200px] items-center justify-between gap-6 px-5 md:px-12">
          <a href="/" className="font-display text-3xl tracking-wide">
            {hotel.name}
          </a>
          <a href="/" className="text-sm tracking-wider hover:text-brass">
            Back to site
          </a>
        </div>
      </header>
      <main id="top" tabIndex={-1} className="outline-none">
        <AuthPage mode={authMode} />
      </main>
      <HotelFooter />
    </>
  );
}
    return (
        <>
            <HotelHeader />
            <main id="top" tabIndex={-1} className="outline-none">
                <HotelHero />
                <AvailabilitySearch
                    selectedRoomId={selectedRoomId}
                    onClearRoom={() => setSelectedRoomId(null)}
                />
                <RoomsSection onSelectRoom={setSelectedRoomId} />
                <OffersSection onSelectRoom={setSelectedRoomId} />
                {experiences.map((e) => (
                    <ExperienceSection key={e.id} experience={e} />
                ))}
                <PropertyStory />
                <GallerySection />

                <FaqSection />
                <EnquirySection />
                <LocationInfo />
            </main>
            <HotelFooter />
            <StickyBookBar />
        </>
    );
}

createRoot(document.getElementById("app")).render(<App />);

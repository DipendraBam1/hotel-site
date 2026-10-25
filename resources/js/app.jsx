import "../css/app.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
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

function App() {
    return (
        <>
            <HotelHeader />
            <main id="top">
                <HotelHero />
                <AvailabilitySearch />
                <RoomsSection />
                {experiences.map((e) => (
                    <ExperienceSection key={e.id} experience={e} />
                ))}
                <PropertyStory />
                <GallerySection />

                <FaqSection />
                <LocationInfo />
            </main>
            <HotelFooter />
            <StickyBookBar />
        </>
    );
}

createRoot(document.getElementById("app")).render(<App />);

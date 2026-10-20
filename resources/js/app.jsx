import '../css/app.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import { createRoot } from 'react-dom/client';
import HotelHeader from './components/HotelHeader';
import HotelHero from './components/HotelHero';

function App() {
  return (
    <>
      <HotelHeader />
      <main id="top">
        <HotelHero />
      </main>
    </>
  );
}

createRoot(document.getElementById('app')).render(<App />);
import '../css/app.css';
import { createRoot } from 'react-dom/client';

function App() {
    return <h1>Hotel site is running</h1>;
}

createRoot(document.getElementById('app')).render(<App />);
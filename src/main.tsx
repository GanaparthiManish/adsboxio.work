import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeAdsense } from './lib/adsense';

// Initialize AdSense
initializeAdsense();

// Initialize debug token for App Check in development
if (import.meta.env.DEV) {
  window.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
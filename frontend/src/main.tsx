import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "react-hot-toast";
import { Auth0Provider, type AppState } from "@auth0/auth0-react";
import './index.css'
import App from './App.tsx'

const onRedirectCallback = (appState?: AppState) => {
  window.history.replaceState({}, document.title, appState?.returnTo || "/Dashboard");
  window.dispatchEvent(new PopStateEvent("popstate"));
};

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN as string | undefined;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string | undefined;

if (!auth0Domain || !auth0ClientId) {
  document.getElementById('root')!.innerHTML =
    '<p style="padding:2rem;font-family:sans-serif">Falta configurar Auth0: crea <code>frontend/.env.local</code> con <code>VITE_AUTH0_DOMAIN</code> y <code>VITE_AUTH0_CLIENT_ID</code> y reinicia <code>npm run dev</code>.</p>';
  throw new Error("Faltan VITE_AUTH0_DOMAIN o VITE_AUTH0_CLIENT_ID");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
      cacheLocation="localstorage"
      onRedirectCallback={onRedirectCallback}
    >
      <Toaster position="top-right" />
      <App />
    </Auth0Provider>
  </StrictMode>,
)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// ═══════════════════════════════════════════════════════
// CHROMATIC TAXONOMY & ETIQUETTE ORGAN TYPES
// ═══════════════════════════════════════════════════════

export interface ChromaProfile {
  id: string;
  name: string;
  palette: string[];  // Array of hex color codes
  hairBase?: string;
  hairHighlight?: string;
  skinTone?: string;
  undertone?: string;
  emotionalPhysics: string;
  spectralBehavior?: string;
  etiquetteOrgan?: string;
  forbiddenStance?: string;
  resonance?: string;
  description?: string;
}

export interface EtiquetteOrgan {
  id: string;
  title: string;
  behaviors: string[];
  resonance: string;
  ritualContext?: string;
  forbiddenStances?: string[];
  description?: string;
}

export interface ForbiddenStance {
  id: string;
  name: string;
  category: string;
  emotionalSignature: string;
  postureGeometry?: string;
  chromaAffinity?: string[];
  etiquetteOrgans?: string[];
  description?: string;
}

export interface CosmologySettings {
  mode: 'gallery_safe' | 'taboo_corridor' | 'transparent_memory';
  choir?: string;
  constant?: string;
  activeEtiquette?: string[];
  spectralIntensity?: number;
}
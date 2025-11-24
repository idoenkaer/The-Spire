
export interface AvatarConfig {
  // Identity
  race: string;
  gender: string;
  classRole: string;
  age: string;

  // Body Metrics (-50 to 50)
  bodyHeight: number;
  bodyMuscle: number;
  bodyWeight: number;
  bodyCurves: number;
  bodyLimbLength: number;
  bodyTorsoLength: number;

  // Facial Metrics (-50 to 50)
  faceJawline: number;
  faceCheekbones: number;
  faceNoseWidth: number;
  faceEyeSpacing: number;
  faceEyeSize: number;
  
  // Physical Traits
  skinTone: string;
  eyeColor: string;
  hairStyle: string;
  hairColor: string;
  facialFeature: string;
  
  // Procedural Attire System
  attireTop: string;
  attireBottom: string;
  attireFootwear: string;
  attireOuter: string;
  
  attireMaterial: string;
  attirePattern: string;
  attireColorPrimary: string;
  attireColorSecondary: string;
  attireWear: string;
  
  // Accessories
  headwear: string;
  backAccessory: string;
  heldItem: string;
  jewelry: string;
  
  // MLAOS Cosmology & Lantern-Cathedral Engine
  chromaProfile: string;        // The specific MLAOS color profile
  spectralConstant: string;     // Gold Theta, Red Phi, etc.
  cathedralOrgan: string;       // The specific architectural room
  etiquetteMode: string;        // Orthodox vs Taboo
  stance: string;               // The specific physical pose (The Canticle, etc)
  lanternBehavior: string;      // How the lanterns interact
  architectureReaction: number; // -50 (Rigid) to 50 (Fracturing/Adapting)

  // Ritual Skin Engine
  ritualSkinPreset: string;       // which pattern
  ritualSkinIntensity: number;    // 0–100: how loud it reads
  ritualSkinLocus: string;        // where it primarily manifests

  // 🔹 PLACEHOLDERS: Body / Metamorph (Future Systems)
  cathedralBody?: string;     // future: body archetype (cathedral-born, feral, etc.)
  metamorphState?: string;    // future: emotional / chroma phase
  
  // Atmosphere & Style
  artStyle: string;
  styleStrength: number;
  styleReferenceImage?: string;
  lighting: string;
  background: string; // Kept for legacy compatibility, but overlaid by Cathedral Organ
  mood: string;
  cameraAngle: string;
}

export type AvatarOptionCategory = keyof AvatarConfig;

export interface SelectOption {
  label: string;
  value: string;
  group?: string;
}

export interface GenerationResult {
  imageUrl: string;
  prompt: string;
  timestamp: number;
}

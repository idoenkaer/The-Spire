
import React, { useState, useEffect } from 'react';
import ControlPanel from './components/ControlPanel';
import ImageResult from './components/ImageResult';
import { AvatarConfig, GenerationResult } from './types';
import * as C from './constants';
import { generateAvatarImage } from './services/geminiService';

const getRandomOption = (options: { value: string; [key: string]: any }[]) => {
    return options[Math.floor(Math.random() * options.length)].value;
};

// Returns a random number between -50 and 50
const getRandomSlider = () => Math.floor(Math.random() * 101) - 50;

const DEFAULT_CONFIG: AvatarConfig = {
    race: 'Human (Cathedral Born)',
    gender: 'Female',
    classRole: 'Lantern Witch',
    age: 'ageless',
    
    // Sliders
    bodyHeight: 0,
    bodyMuscle: -10,
    bodyWeight: 0,
    bodyCurves: 20,
    bodyLimbLength: 10,
    bodyTorsoLength: 0,
    
    faceJawline: 10,
    faceCheekbones: 20,
    faceNoseWidth: -10,
    faceEyeSpacing: 0,
    faceEyeSize: 10,
    
    // Details
    skinTone: 'porcelain pale skin',
    eyeColor: 'glowing emerald green',
    hairStyle: 'very long, loose and flowing hair',
    hairColor: 'deep copper red',
    facialFeature: 'none',
    
    // Procedural Attire
    attireTop: 'Ritual Robes',
    attireBottom: 'Flowing Train',
    attireOuter: 'Glass-Silk Cape',
    attireFootwear: 'Barefoot (Ritual)',
    
    attireMaterial: 'Biomechanical Satin',
    attirePattern: 'Sacred Geometry',
    attireColorPrimary: 'Gold',
    attireColorSecondary: 'White',
    attireWear: 'Ethereal Fade',
    
    headwear: 'Halo (Mechanical)',
    backAccessory: 'nothing',
    heldItem: 'empty hands',
    jewelry: 'Body Chains',
    
    // MLAOS Cosmology - Applied FIREFALL: Ignition-Gold Defaults
    chromaProfile: 'FIREFALL: Ignition-Gold',
    spectralConstant: 'Gold Theta (Θ)',
    cathedralOrgan: 'The Melting Cathedral (Structural Failure)',
    etiquetteMode: 'Erotic Defiance (Rupture)',
    stance: 'The Celestial Arc (Firefall)',
    lanternBehavior: 'Rising Field',
    architectureReaction: 50, // Maximum fracture

    // Ritual Skin Engine
    ritualSkinPreset: C.RITUAL_SKIN_PRESETS[0],
    ritualSkinIntensity: 20,
    ritualSkinLocus: C.RITUAL_SKIN_LOCI[0],
    
    // Placeholders (Future Systems)
    cathedralBody: C.CATHEDRAL_BODY_ARCHETYPES[0], // Keep default for now
    metamorphState: C.METAMORPH_STATES[0],

    // Style
    artStyle: 'Celestial Firefall (Apocalyptic)',
    styleStrength: 50,
    styleReferenceImage: undefined,
    
    lighting: 'Celestial Firefall (Apocalyptic)',
    background: 'Cathedral Interior',
    mood: 'Commanding',
    cameraAngle: 'Low Angle',
};

export default function App() {
  const [config, setConfig] = useState<AvatarConfig>(() => {
    // Lazy initialization for localStorage
    try {
        const saved = localStorage.getItem(C.STORAGE_KEYS.AVATAR_STATE);
        if (saved) {
            return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
        }
    } catch (e) {
        console.warn("Failed to load avatar state from storage:", e);
    }
    return DEFAULT_CONFIG;
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentResult, setCurrentResult] = useState<GenerationResult | null>(null);
  const [history, setHistory] = useState<GenerationResult[]>([]);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);

  // Autosave Effect
  useEffect(() => {
    try {
        localStorage.setItem(C.STORAGE_KEYS.AVATAR_STATE, JSON.stringify(config));
    } catch (e) {
        console.warn("Failed to save avatar state to storage:", e);
    }
  }, [config]);

  const handleUpdateConfig = (key: keyof AvatarConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleRandomize = () => {
    setConfig({
        ...config, // Keep some refs like style image if uploaded
        styleReferenceImage: config.styleReferenceImage,
        styleStrength: config.styleStrength,
        
        race: getRandomOption(C.RACES),
        gender: ['Male', 'Female', 'Non-Binary'][Math.floor(Math.random() * 3)],
        classRole: getRandomOption(C.CLASSES),
        age: 'ageless',
        
        bodyHeight: getRandomSlider(),
        bodyMuscle: getRandomSlider(),
        bodyWeight: getRandomSlider(),
        bodyCurves: getRandomSlider(),
        bodyLimbLength: getRandomSlider(),
        bodyTorsoLength: getRandomSlider(),
        
        faceJawline: getRandomSlider(),
        faceCheekbones: getRandomSlider(),
        faceNoseWidth: getRandomSlider(),
        faceEyeSpacing: getRandomSlider(),
        faceEyeSize: getRandomSlider(),
        
        skinTone: getRandomOption(C.SKIN_TONES),
        eyeColor: getRandomOption(C.EYE_COLORS),
        hairStyle: getRandomOption(C.HAIR_STYLES),
        hairColor: getRandomOption(C.COLORS), 
        facialFeature: ['none', 'none', 'none', 'scarred', 'tattooed'][Math.floor(Math.random() * 5)],
        
        attireTop: getRandomOption(C.ATTIRE_TOPS),
        attireBottom: getRandomOption(C.ATTIRE_BOTTOMS),
        attireFootwear: getRandomOption(C.FOOTWEAR),
        attireOuter: Math.random() > 0.7 ? getRandomOption(C.ATTIRE_OUTER) : 'no outer layer',
        
        attireMaterial: getRandomOption(C.ATTIRE_MATERIALS),
        attirePattern: getRandomOption(C.ATTIRE_PATTERNS),
        attireColorPrimary: getRandomOption(C.COLORS),
        attireColorSecondary: getRandomOption(C.COLORS),
        attireWear: 'Pristine',
        
        headwear: Math.random() > 0.8 ? getRandomOption([
            { label: 'Halo', value: 'floating halo' },
            { label: 'Veil', value: 'sheer veil' },
            { label: 'Crown', value: 'jeweled crown' },
        ]) : 'no headwear',
        backAccessory: ['none', 'cape', 'wings'][Math.floor(Math.random() * 3)],
        heldItem: Math.random() > 0.5 ? getRandomOption([
             { label: 'Lantern', value: 'glowing lantern' },
             { label: 'Nothing', value: 'empty hands' }
        ]) : 'empty hands',
        jewelry: getRandomOption(C.JEWELRY),

        // Randomize Cosmology
        chromaProfile: Math.random() > 0.1 ? getRandomOption(C.CHROMA_PROFILES) : 'none',
        spectralConstant: getRandomOption(C.SPECTRAL_CONSTANTS),
        cathedralOrgan: getRandomOption(C.CATHEDRAL_ORGANS),
        etiquetteMode: getRandomOption(C.ETIQUETTE_MODES),
        stance: getRandomOption(C.STANCES),
        lanternBehavior: getRandomOption(C.LANTERN_BEHAVIORS),
        architectureReaction: getRandomSlider(),

        // Randomize Ritual Skin Engine
        ritualSkinPreset: Math.random() > 0.5 ? getRandomOption(C.RITUAL_SKIN_PRESETS.map(s => ({ label: s, value: s }))) : C.RITUAL_SKIN_PRESETS[0],
        ritualSkinIntensity: Math.floor(Math.random() * 101),
        ritualSkinLocus: getRandomOption(C.RITUAL_SKIN_LOCI.map(s => ({ label: s, value: s }))),

        // Placeholders
        cathedralBody: C.CATHEDRAL_BODY_ARCHETYPES[0], // Keep default for now
        metamorphState: C.METAMORPH_STATES[0],
        
        artStyle: getRandomOption(C.ART_STYLES),
        lighting: getRandomOption(C.LIGHTING),
        background: getRandomOption(C.BACKGROUNDS),
        mood: getRandomOption(C.MOODS),
        cameraAngle: ['waist up shot', 'portrait crop', 'full body'][Math.floor(Math.random() * 3)],
    });
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setApiKeyError(null);
    
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        setApiKeyError("API Key is missing from environment.");
        setIsGenerating(false);
        return;
    }

    try {
        const imageUrl = await generateAvatarImage(config, apiKey);
        const result: GenerationResult = {
            imageUrl,
            prompt: `${config.stance} in the ${config.cathedralOrgan}`,
            timestamp: Date.now()
        };
        setCurrentResult(result);
        setHistory(prev => [result, ...prev]);
    } catch (error: any) {
        console.error(error);
        setApiKeyError(error.message || "Failed to generate image.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-black text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30">
        
        {/* Mobile Header */}
        <div className="md:hidden p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
            <h1 className="font-bold text-indigo-400">Lantern Forge</h1>
        </div>

        {/* Left Panel: Controls */}
        <div className="w-full md:w-[400px] lg:w-[450px] flex-shrink-0 h-[calc(100vh-60px)] md:h-full z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
            <ControlPanel 
                config={config} 
                updateConfig={handleUpdateConfig} 
                onRandomize={handleRandomize} 
                isGenerating={isGenerating}
                onGenerate={handleGenerate}
            />
        </div>

        {/* Right Panel: Preview */}
        <div className="flex-1 h-full relative">
            {apiKeyError && (
                <div className="absolute top-4 left-4 right-4 z-50 p-4 bg-red-900/80 border border-red-500 rounded-lg text-red-100 text-sm shadow-lg backdrop-blur">
                    <strong>Error:</strong> {apiKeyError}
                </div>
            )}
            <ImageResult 
                result={currentResult} 
                history={history}
                onSelectHistory={setCurrentResult}
                isGenerating={isGenerating}
            />
        </div>
    </div>
  );
}

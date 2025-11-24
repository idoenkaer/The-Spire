
import React, { useState, useRef } from 'react';
import { AvatarConfig } from '../types';
import { SelectGroup } from './ui/SelectGroup';
import { Button } from './ui/Button';
import { Slider } from './ui/Slider';
import { IconUser, IconShirt, IconPalette, IconDice, IconSliders, IconUpload, IconSparkles, IconArch, IconBook } from './Icons';
import { Footer } from './Footer';
import { ChromaDiceRoller } from './ChromaDiceRoller';
import { ChromaCodex } from './ChromaCodex';
import * as C from '../constants';
import { generateProceduralChroma } from '../services/chromaGenerator';

interface ControlPanelProps {
  config: AvatarConfig;
  updateConfig: (key: keyof AvatarConfig, value: any) => void;
  onRandomize: () => void;
  isGenerating: boolean;
  onGenerate: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ config, updateConfig, onRandomize, isGenerating, onGenerate }) => {
  const [activeTab, setActiveTab] = useState<'basics' | 'physique' | 'attire' | 'cosmology' | 'style'>('basics');
  const [isCodexOpen, setIsCodexOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateConfig('styleReferenceImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProceduralSynthesis = () => {
      const { name, description } = generateProceduralChroma();
      // First, update the description
      updateConfig('customChromaDescription', description);
      // Then set the profile name which triggers the change
      handleChromaChange(name);
  };
  
  // Intelligent Chroma Handler - Automates Linking
  const handleChromaChange = (value: string) => {
      updateConfig('chromaProfile', value);

      // LITURGICAL AUTOMATION: Link Chroma to Spectral Constant
      if (value.includes('Gold-Theta')) updateConfig('spectralConstant', 'Gold Theta (Θ)');
      else if (value.includes('Red-Phi')) updateConfig('spectralConstant', 'Red Phi (Φ)');
      else if (value.includes('Violet-Omega')) updateConfig('spectralConstant', 'Violet Omega (Ω)');
      else if (value.includes('Emerald-Epsilon')) updateConfig('spectralConstant', 'Emerald Epsilon (Ε)');
      else if (value.includes('Azure-Lambda')) updateConfig('spectralConstant', 'Azure Lambda (Λ)');
      else if (value.includes('Silver-Sigma')) updateConfig('spectralConstant', 'Silver Sigma (Σ)');
      else if (value.includes('Obsidian-Chi')) updateConfig('spectralConstant', 'Obsidian Chi (Χ)');
      else if (value.includes('Teal-Psi')) updateConfig('spectralConstant', 'Teal Psi (Ψ) - Inquiry');

      // STANCE AUTOMATION: Link Chroma to Stance
      if (value.includes('Trespass')) updateConfig('stance', 'Stance of Quiet Trespass');
      else if (value.includes('Rupture-Bloom') || value.includes('Delta-Lock')) updateConfig('stance', 'Forbidden Δ-Gesture');
      else if (value.includes('Fracture-Arc')) updateConfig('stance', 'Shattered Courtesy');
      else if (value.includes('Aversion-Veil')) updateConfig('stance', 'Sovereign Aversion');
      else if (value.includes('Arc-Ignition')) updateConfig('stance', 'The Celestial Arc (Firefall)');
      else if (value.includes('Suspended-Stasis')) updateConfig('stance', 'The Suspended Step');

      // MODE AUTOMATION: Link Chroma to Etiquette Mode
      if (value.includes('Orthodox')) updateConfig('etiquetteMode', 'orthodox');
      else if (value.includes('Taboo')) updateConfig('etiquetteMode', 'taboo_corridor');
      else if (value.includes('Defiance')) updateConfig('etiquetteMode', 'erotic_defiance');
      else if (value.includes('Shattered')) updateConfig('etiquetteMode', 'shattered');
  };

  // Dynamic Theme Engine based on Chroma
  const getChromaTheme = () => {
      const chroma = config.chromaProfile;
      if (chroma.includes('FIREFALL')) return 'from-amber-500 to-red-600';
      if (chroma.includes('SOLAR')) return 'from-yellow-400 to-orange-500';
      if (chroma.includes('NOCTURNE')) return 'from-indigo-900 to-slate-800';
      if (chroma.includes('EARTH')) return 'from-emerald-600 to-teal-700';
      if (chroma.includes('ARCANE')) return 'from-purple-500 to-fuchsia-600';
      if (chroma.includes('SCREAM')) return 'from-white to-rose-400';
      if (chroma.includes('VOID')) return 'from-gray-800 to-black';
      if (chroma.startsWith('PROCEDURAL:')) return 'from-cyan-400 to-fuchsia-400';
      return 'from-indigo-400 to-purple-400'; // Default
  };

  const tabs = [
    { id: 'basics', label: 'Identity', icon: IconUser },
    { id: 'physique', label: 'Physique', icon: IconSliders },
    { id: 'attire', label: 'Attire', icon: IconShirt },
    { id: 'cosmology', label: 'Cosmology', icon: IconArch },
    { id: 'style', label: 'Studio', icon: IconPalette },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basics':
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-indigo-200 text-xs">
                   Define the core soul and identity of your character.
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <SelectGroup id="race" label="Race / Species" value={config.race} onChange={(v) => updateConfig('race', v)} options={C.RACES} />
                     <SelectGroup id="class" label="Class / Role" value={config.classRole} onChange={(v) => updateConfig('classRole', v)} options={C.CLASSES} />
                </div>

                <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">Gender Identity</label>
                    <div className="flex rounded-lg overflow-hidden border border-slate-700">
                        {['Male', 'Female', 'Non-Binary', 'Androgynous'].map((g) => (
                            <button
                                key={g}
                                onClick={() => updateConfig('gender', g)}
                                className={`flex-1 py-2 text-[10px] md:text-xs font-medium transition-all ${config.gender === g ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                            >
                                {g}
                            </button>
                        ))}
                    </div>
                </div>

                 <SelectGroup id="age" label="Age Group" value={config.age} onChange={(v) => updateConfig('age', v)} options={[
                    { label: 'Child', value: 'young child' },
                    { label: 'Teen', value: 'teenager' },
                    { label: 'Young Adult', value: 'young adult' },
                    { label: 'Adult', value: 'adult' },
                    { label: 'Middle Aged', value: 'middle aged' },
                    { label: 'Elderly', value: 'elderly' },
                    { label: 'Ancient', value: 'ancient' },
                ]} />

                <div className="pt-4 border-t border-slate-800">
                    <h3 className="text-sm font-semibold text-slate-200 mb-3">Distinguishing Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectGroup id="skin" label="Skin Tone" value={config.skinTone} onChange={(v) => updateConfig('skinTone', v)} options={C.SKIN_TONES} />
                        <SelectGroup id="facial" label="Face Features" value={config.facialFeature} onChange={(v) => updateConfig('facialFeature', v)} options={[
                            { label: 'None', value: 'none' },
                            { label: 'Scarred', value: 'battle scarred face' },
                            { label: 'Tattooed', value: 'complex face tattoos' },
                            { label: 'Freckles', value: 'freckles' },
                            { label: 'Bearded', value: 'full beard' },
                            { label: 'Stubble', value: 'stubble beard' },
                            { label: 'Makeup', value: 'heavy makeup' },
                            { label: 'Burn Marks', value: 'burn marks' },
                            { label: 'Cyber-Implants', value: 'visible cybernetic implants' },
                            { label: 'Veiled', value: 'face partially veiled' },
                        ]} />
                    </div>
                </div>
            </div>
        );
      case 'physique':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-200 text-xs">
                   Fine-tune geometry. Sliders range from -50 (Low/Small) to +50 (High/Large).
             </div>
             
             <div className="space-y-4">
                 <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">Body Geometry</h3>
                 <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Slider label="Height" value={config.bodyHeight} onChange={(v) => updateConfig('bodyHeight', v)} leftLabel="Short" rightLabel="Tall" />
                        <Slider label="Weight" value={config.bodyWeight} onChange={(v) => updateConfig('bodyWeight', v)} leftLabel="Thin" rightLabel="Heavy" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Slider label="Muscle" value={config.bodyMuscle} onChange={(v) => updateConfig('bodyMuscle', v)} leftLabel="Soft" rightLabel="Ripped" />
                        <Slider label="Curves" value={config.bodyCurves} onChange={(v) => updateConfig('bodyCurves', v)} leftLabel="Straight" rightLabel="Curvy" />
                    </div>
                    <Slider label="Limb Length" value={config.bodyLimbLength} onChange={(v) => updateConfig('bodyLimbLength', v)} leftLabel="Stubby" rightLabel="Lanky" />
                    <Slider label="Torso Ratio" value={config.bodyTorsoLength} onChange={(v) => updateConfig('bodyTorsoLength', v)} leftLabel="Compact" rightLabel="Elongated" />
                 </div>
             </div>

             <div className="space-y-4">
                 <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">Facial Structure</h3>
                 <div className="grid grid-cols-1 gap-4">
                    <Slider label="Jawline" value={config.faceJawline} onChange={(v) => updateConfig('faceJawline', v)} leftLabel="Soft" rightLabel="Sharp" />
                    <Slider label="Cheekbones" value={config.faceCheekbones} onChange={(v) => updateConfig('faceCheekbones', v)} leftLabel="Low" rightLabel="High" />
                    <Slider label="Nose Width" value={config.faceNoseWidth} onChange={(v) => updateConfig('faceNoseWidth', v)} leftLabel="Narrow" rightLabel="Wide" />
                    <Slider label="Eye Spacing" value={config.faceEyeSpacing} onChange={(v) => updateConfig('faceEyeSpacing', v)} leftLabel="Close" rightLabel="Wide" />
                    <Slider label="Eye Size" value={config.faceEyeSize} onChange={(v) => updateConfig('faceEyeSize', v)} leftLabel="Small" rightLabel="Large" />
                 </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                 <SelectGroup id="hairS" label="Hair Style" value={config.hairStyle} onChange={(v) => updateConfig('hairStyle', v)} options={C.HAIR_STYLES} />
                 <SelectGroup id="hairC" label="Hair Color" value={config.hairColor} onChange={(v) => updateConfig('hairColor', v)} options={C.COLORS} />
                 <SelectGroup id="eyeC" label="Eye Color" value={config.eyeColor} onChange={(v) => updateConfig('eyeColor', v)} options={C.EYE_COLORS} />
             </div>
          </div>
        );
      case 'attire':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-cyan-200 text-xs">
                   Procedural Outfit Generation. Mix and match layers and materials.
             </div>

            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">Base Layers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectGroup id="top" label="Upper Body" value={config.attireTop} onChange={(v) => updateConfig('attireTop', v)} options={C.ATTIRE_TOPS} />
                    <SelectGroup id="bottom" label="Lower Body" value={config.attireBottom} onChange={(v) => updateConfig('attireBottom', v)} options={C.ATTIRE_BOTTOMS} />
                </div>
            </div>
            
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">Outer & Shoes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectGroup id="outer" label="Outerwear" value={config.attireOuter} onChange={(v) => updateConfig('attireOuter', v)} options={C.ATTIRE_OUTER} />
                    <SelectGroup id="shoes" label="Footwear" value={config.attireFootwear} onChange={(v) => updateConfig('attireFootwear', v)} options={C.FOOTWEAR} />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">Composition</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectGroup id="mat" label="Primary Material" value={config.attireMaterial} onChange={(v) => updateConfig('attireMaterial', v)} options={C.ATTIRE_MATERIALS} />
                    <SelectGroup id="pat" label="Pattern / Texture" value={config.attirePattern} onChange={(v) => updateConfig('attirePattern', v)} options={C.ATTIRE_PATTERNS} />
                    <SelectGroup id="c1" label="Main Color" value={config.attireColorPrimary} onChange={(v) => updateConfig('attireColorPrimary', v)} options={C.COLORS} />
                    <SelectGroup id="c2" label="Secondary / Accent" value={config.attireColorSecondary} onChange={(v) => updateConfig('attireColorSecondary', v)} options={C.COLORS} />
                </div>
                 <SelectGroup id="wear" label="Condition" value={config.attireWear} onChange={(v) => updateConfig('attireWear', v)} options={C.WEAR_CONDITIONS} />
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-semibold text-slate-200">Accessories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectGroup id="headwear" label="Headwear" value={config.headwear} onChange={(v) => updateConfig('headwear', v)} options={[
                        { label: 'None', value: 'no headwear' },
                        { label: 'Helmet', value: 'helmet' },
                        { label: 'Hood', value: 'cowl hood' },
                        { label: 'Crown', value: 'jeweled crown' },
                        { label: 'Veil', value: 'funeral veil' },
                        { label: 'Mask', value: 'porcelain mask' },
                        { label: 'Horns', value: 'attached horns' },
                    ]} />
                    <SelectGroup id="jewelry" label="Neck & Face" value={config.jewelry} onChange={(v) => updateConfig('jewelry', v)} options={C.JEWELRY} />
                    <SelectGroup id="back" label="Back Accessory" value={config.backAccessory} onChange={(v) => updateConfig('backAccessory', v)} options={[
                        { label: 'None', value: 'nothing' },
                        { label: 'Cape', value: 'flowing cape' },
                        { label: 'Wings (Glass)', value: 'shattered glass wings' },
                        { label: 'Backpack', value: 'adventurer backpack' },
                        { label: 'Lantern Pole', value: 'lantern hanging on pole' },
                        { label: 'Halo (Mechanical)', value: 'mechanical halo' },
                    ]} />
                    <SelectGroup id="hand" label="Held Item" value={config.heldItem} onChange={(v) => updateConfig('heldItem', v)} options={[
                         { label: 'None', value: 'empty hands' },
                         { label: 'Lantern', value: 'glowing lantern' },
                         { label: 'Sword', value: 'glowing sword' },
                         { label: 'Staff', value: 'magic staff' },
                         { label: 'Book', value: 'spellbook' },
                         { label: 'Censer', value: 'smoking censer' },
                         { label: 'Flower', value: 'single glass flower' },
                    ]} />
                </div>
            </div>
          </div>
        );
      case 'cosmology':
        // Injecting the Procedural option into the list for display if active
        const chromaOptions = [...C.CHROMA_PROFILES];
        if (config.chromaProfile.startsWith('PROCEDURAL:')) {
            chromaOptions.unshift({ label: config.chromaProfile, value: config.chromaProfile });
        }

        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-500/20 text-purple-200 text-xs">
                    Manipulate the Metaphysical Laws of the Lantern-Cathedral Engine.
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">Chromatic Taxonomy</h3>
                    <p className="text-[10px] text-slate-500 mb-2">
                      Overwrites individual color settings with a complex MLAOS color-grammar profile.
                    </p>
                    
                    {/* Procedural & Codex Buttons */}
                    <div className="mb-3 grid grid-cols-2 gap-2">
                         <Button variant="ghost" size="sm" onClick={handleProceduralSynthesis} className="border border-dashed border-purple-500/40 text-purple-300 hover:bg-purple-900/20 text-[10px]">
                            <IconSparkles className="w-3 h-3 mr-1" />
                            Synthesize (Procedural)
                         </Button>
                         <Button variant="secondary" size="sm" onClick={() => setIsCodexOpen(true)} className="text-[10px] border-indigo-500/30 text-indigo-300">
                             <IconBook className="w-3 h-3 mr-1" />
                             Open Codex Library
                         </Button>
                    </div>

                    <SelectGroup id="chroma" label="Chroma Profile" value={config.chromaProfile} onChange={(v) => handleChromaChange(v)} options={chromaOptions} />
                    
                    {/* D100 Roller Integration */}
                    <ChromaDiceRoller onApply={(val) => handleChromaChange(val)} />
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">Emotional Physics</h3>
                    <SelectGroup id="const" label="Spectral Constant" value={config.spectralConstant} onChange={(v) => updateConfig('spectralConstant', v)} options={C.SPECTRAL_CONSTANTS} />
                </div>

                <div className="space-y-4">
                     <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">Etiquette Protocols</h3>
                     <div className="grid grid-cols-1 gap-4">
                        <SelectGroup id="etiq" label="Etiquette Mode" value={config.etiquetteMode} onChange={(v) => updateConfig('etiquetteMode', v)} options={C.ETIQUETTE_MODES} />
                        <SelectGroup id="stance" label="Stance / Liturgy" value={config.stance} onChange={(v) => updateConfig('stance', v)} options={C.STANCES} />
                     </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">Cathedral Architecture</h3>
                    <SelectGroup id="organ" label="Cathedral Organ (Environment)" value={config.cathedralOrgan} onChange={(v) => updateConfig('cathedralOrgan', v)} options={C.CATHEDRAL_ORGANS} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectGroup id="lanterns" label="Lantern Behavior" value={config.lanternBehavior} onChange={(v) => updateConfig('lanternBehavior', v)} options={C.LANTERN_BEHAVIORS} />
                        <Slider label="Arch Reaction" value={config.architectureReaction} onChange={(v) => updateConfig('architectureReaction', v)} leftLabel="Rigid" rightLabel="Fracturing" />
                    </div>
                </div>

                {/* Ritual Skin Engine Section */}
                <div className="space-y-4 border-t border-slate-800 pt-4">
                    <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">Ritual Skin Engine</h3>
                    <SelectGroup id="ritPreset" label="Skin Markings Preset" value={config.ritualSkinPreset} onChange={(v) => updateConfig('ritualSkinPreset', v)} options={C.RITUAL_SKIN_PRESETS.map(s => ({ label: s, value: s }))} />
                    <SelectGroup id="ritLocus" label="Primary Locus" value={config.ritualSkinLocus} onChange={(v) => updateConfig('ritualSkinLocus', v)} options={C.RITUAL_SKIN_LOCI.map(s => ({ label: s, value: s }))} />
                    <Slider label="Marking Intensity" value={config.ritualSkinIntensity} onChange={(v) => updateConfig('ritualSkinIntensity', v)} min={0} max={100} leftLabel="Faint" rightLabel="Dominant" />
                </div>
            </div>
        );
      case 'style':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="p-3 rounded-lg bg-fuchsia-950/40 border border-fuchsia-500/20 text-fuchsia-200 text-xs">
                   Style Transfer & Scene Composition.
             </div>

            <div className="space-y-3">
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">Style Reference (Style Transfer)</label>
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-800/30 hover:bg-slate-800/50 group h-40"
                >
                    {config.styleReferenceImage ? (
                        <div className="absolute inset-0 w-full h-full p-2">
                             <img src={config.styleReferenceImage} className="w-full h-full object-cover rounded-lg opacity-60 group-hover:opacity-40 transition-opacity" alt="Ref" />
                             <div className="absolute inset-0 flex items-center justify-center">
                                 <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">Change Image</span>
                             </div>
                        </div>
                    ) : (
                        <>
                            <IconUpload className="w-8 h-8 text-slate-500 mb-2 group-hover:text-indigo-400" />
                            <span className="text-xs text-slate-400">Click to upload style reference</span>
                            <span className="text-[10px] text-slate-600 mt-1">Image style will be applied to generation</span>
                        </>
                    )}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileUpload} 
                        accept="image/*" 
                        className="hidden" 
                    />
                </div>
                {config.styleReferenceImage && (
                     <Slider 
                        label="Reference Strength" 
                        value={config.styleStrength} 
                        onChange={(v) => updateConfig('styleStrength', v)} 
                        min={0} 
                        max={100} 
                        step={5}
                        leftLabel="Subtle"
                        rightLabel="Heavy"
                     />
                )}
            </div>

            <SelectGroup id="art" label="Art Style Preset" value={config.artStyle} onChange={(v) => updateConfig('artStyle', v)} options={C.ART_STYLES} />
            <SelectGroup id="light" label="Lighting Setup" value={config.lighting} onChange={(v) => updateConfig('lighting', v)} options={C.LIGHTING} />
            <SelectGroup id="mood" label="Mood" value={config.mood} onChange={(v) => updateConfig('mood', v)} options={C.MOODS} />
            <SelectGroup id="cam" label="Camera" value={config.cameraAngle} onChange={(v) => updateConfig('cameraAngle', v)} options={[
                { label: 'Portrait', value: 'portrait crop' },
                { label: 'Waist Up', value: 'waist up shot' },
                { label: 'Full Body', value: 'full body wide shot' },
                { label: 'Low Angle', value: 'heroic low angle' },
                { label: 'Dutch Angle', value: 'dynamic dutch angle' },
                { label: 'Overhead', value: 'high angle overhead shot' },
            ]} />
          </div>
        );
    }
  };
  
  const themeGradient = getChromaTheme();

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 relative">
        {/* Header */}
      <div className="p-5 border-b border-slate-800 bg-slate-900/50">
        <h1 className={`text-xl font-bold bg-gradient-to-r ${themeGradient} bg-clip-text text-transparent flex items-center gap-2 transition-all duration-700`}>
            <IconSparkles className="w-5 h-5 text-indigo-400" />
            Lantern Forge
        </h1>
        <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-1">MLAOS Engine v2.5</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900">
        {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
                <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex flex-col items-center justify-center py-3 text-[10px] font-medium transition-all relative ${
                    isActive ? 'text-indigo-400 bg-slate-800/50' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                }`}
                >
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                {tab.label}
                {isActive && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />}
                </button>
            )
        })}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {renderTabContent()}
        
        {/* Detailed Footer - Anchored at bottom of scrollable area but distinct */}
        <div className="mt-8 border-t border-slate-800/50 pt-4">
             <Footer />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 border-t border-slate-800 bg-slate-900 z-10 space-y-3 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <Button 
            onClick={onRandomize} 
            variant="secondary" 
            fullWidth 
            className="group text-xs"
            disabled={isGenerating}
        >
          <IconDice className="w-3.5 h-3.5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
          Randomize Parameters
        </Button>
        <Button 
            onClick={onGenerate} 
            variant="primary" 
            fullWidth 
            size="lg"
            disabled={isGenerating}
            className={isGenerating ? 'opacity-80' : 'shadow-indigo-500/20 hover:shadow-indigo-500/40'}
        >
          {isGenerating ? (
              <span className="flex items-center">
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></span>
                  Processing...
              </span>
          ) : 'CONSTRUCT AVATAR'}
        </Button>
      </div>

      {/* Codex Overlay */}
      {isCodexOpen && (
          <ChromaCodex 
            onClose={() => setIsCodexOpen(false)} 
            onSelect={(val) => handleChromaChange(val)} 
          />
      )}
    </div>
  );
};

export default ControlPanel;

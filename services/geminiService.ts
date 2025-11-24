




import { GoogleGenAI } from "@google/genai";
import { AvatarConfig } from '../types';
import * as C from '../constants';

// Helper to convert slider value (-50 to 50) to descriptive adjectives
const getAdjective = (value: number, type: 'size' | 'width' | 'height' | 'intensity' | 'spacing' | 'length' | 'ratio') => {
  if (value === 0) return 'average';
  
  const intensity = Math.abs(value);
  let descriptor = '';
  if (intensity < 15) descriptor = 'slightly';
  else if (intensity < 35) descriptor = 'moderately';
  else descriptor = 'extremely';

  if (value > 0) {
      switch(type) {
          case 'size': return `${descriptor} large`;
          case 'width': return `${descriptor} wide`;
          case 'height': return `${descriptor} tall`;
          case 'intensity': return `${descriptor} defined`;
          case 'spacing': return `${descriptor} wide-set`;
          case 'length': return `${descriptor} long`;
          case 'ratio': return `${descriptor} elongated`;
      }
  } else {
      switch(type) {
          case 'size': return `${descriptor} small`;
          case 'width': return `${descriptor} narrow`;
          case 'height': return `${descriptor} short`;
          case 'intensity': return `${descriptor} soft`;
          case 'spacing': return `${descriptor} close-set`;
          case 'length': return `${descriptor} short`;
          case 'ratio': return `${descriptor} compact`;
      }
  }
  return '';
};

// RITUAL SKIN BUILDER
const buildRitualSkinDescription = (config: AvatarConfig) => {
  const preset = config.ritualSkinPreset || "None";
  const intensity = config.ritualSkinIntensity || 0;
  const locus = config.ritualSkinLocus || "No obvious locus";

  if (preset === "None" || intensity <= 0) {
    return "";
  }

  const intensityAdjective =
    intensity < 25 ? "faint, barely visible"
    : intensity < 60 ? "pronounced, glowing"
    : "dominant, high-contrast, scar-like";

  return `RITUAL MARKINGS: She bears ${intensityAdjective} ${preset} markings. Primary locus: ${locus}. The markings are treated as luminous, symbolic geometry.`;
};

const getEtiquetteInstruction = (mode: string, stance: string) => {
    if (mode === 'orthodox') {
        return `standing in a perfectly composed ceremonial posture, her etiquette flawless and reserved, aligning with the geometry of the Cathedral. She embodies the "Perfect Vertical" alignment.`;
    }
    if (mode === 'taboo_corridor') {
        return `captured mid-stance in a forbidden etiquette posture outlawed by all Choirs, her body language tense with illicit grace. She holds the stance of "${stance}".`;
    }
    if (mode === 'erotic_defiance') {
        return `holding one of the Three Forbidden Stances of erotic defiance, her posture charged with taboo grace yet revealing nothing explicit. She performs "${stance}", a pose that physically hurts the surrounding architecture.`;
    }
    if (mode === 'shattered') {
        return `her etiquette shattered, posture broken yet sovereign, leaning heavily as if the weight of the Cathedral is too much.`;
    }
    return `standing gracefully.`;
};

const getStanceDescription = (stance: string) => {
    // High-Intensity Ritual Stances
    if (stance.includes('Quiet Trespass')) {
        return `spine aligned like a cathedral column, one hip rotated in deliberate asymmetry, hands forming a midline almost-touch gesture, gaze slightly lowered.`;
    }
    if (stance.includes('Invitation of Rupture')) {
        return `one leg extended forward with heel lifted, hips counter-rotated against elegant offset shoulders, hands forming the forbidden Delta-Gesture (one at heart, one near lower abdomen).`;
    }
    if (stance.includes('Shattered Courtesy')) {
        return `a full-body arc, a pronounced lean that defies gravity, hands interlaced behind her lower back in a display of vulnerable sovereignty, gaze calm and devastating.`;
    }
    
    // Standalone Technical Stances
    if (stance.includes('Forbidden Δ-Gesture') || stance.includes('Delta Gesture')) {
        return `hands forming the strict triangular Δ-Gesture over the solar plexus, fingers rigid and geometrically precise, signaling a lock on emotional flow.`;
    }
    if (stance.includes('Sovereign Aversion')) {
        return `body facing forward but head turned exactly 90 degrees away, eyes closed, a gesture of absolute refusal to acknowledge the surrounding reality.`;
    }
    if (stance.includes('Perfect Vertical')) {
        return `spine stretched to impossible straightness, chin level, arms hanging with zero tension, embodying the concept of the plumb-line.`;
    }
    if (stance.includes('Counter-Rotation')) {
        return `shoulders twisted 30 degrees left while hips twist 30 degrees right, creating a spiral tension running through the torso anatomy.`;
    }
    if (stance.includes('Suspended Step')) {
        return `caught in the frozen moment of a step, weight balanced impossibly on the back toe, the forward foot hovering inches above the ground.`;
    }

    if (stance.includes('Celestial Arc')) {
        return `arched upward into the celestial inferno, spine pulled into a celestial arc of cosmic obedience. Arms outstretched, palms turned skyward, gathering the descending blaze. not erotic, but a stance of terrifying structural surrender to the fire above.`;
    }

    // Firefall / Apocalyptic Stances
    if (stance.includes('Firefall') || stance.includes('Molten') || stance.includes('Supernova') || stance.includes('Inferno') || stance.includes('Shear') || stance.includes('Incandescent Scream') || stance.includes('Paradox Open')) {
        return `arched upward into the celestial inferno, spine pulled into a celestial arc of cosmic obedience. Arms outstretched, palms turned skyward, gathering the descending blaze. Not erotic, but a stance of terrifying structural surrender to the fire above.`;
    }
    
    return `posture characterized by precise, intentional geometry and elegant tension.`;
};

const getSpectralPhysics = (constant: string, isFirefall: boolean) => {
    if (isFirefall) {
        if (constant.includes('Gold')) return `Gold Θ (Theta) coherence liquefying into pure radiance, unable to maintain stability against the fire. Structure is dissolving into light.`;
        if (constant.includes('Red')) return `Red Φ (Phi) rupture intensifying into uncontrollable explosive bursts, tearing the scene apart at the seams.`;
        if (constant.includes('Violet')) return `Violet Ω (Omega) adaptation screaming as it fails to contain the energy, shattering into adaptive lightning.`;
        if (constant.includes('Emerald')) return `Emerald Ε (Epsilon) harmony boiling into steam, unity fracturing into chaotic entropy.`;
        if (constant.includes('Azure')) return `Azure Λ (Lambda) logic fracturing into sharp, dangerous shards of future-past, prophecy breaking down.`;
        if (constant.includes('Silver')) return `Silver Σ (Silence) evaporating into a high-pitched sonic scream, silence burning away.`;
        if (constant.includes('Obsidian')) return `Obsidian Χ (Void) collapsing into a singularity, sucking the fire into a point of no return.`;
        return `The Spectral Constant ${constant} is buckling under the Apocalyptic Physics, liquefying and transforming.`;
    }

    // Standard MLAOS Physics
    if (constant.includes('Gold')) return `Gold Θ (Theta) composure suffuses her posture, casting warm, coherent rim-light and enforcing stability on the scene.`;
    if (constant.includes('Red')) return `Red Φ (Phi) rupture glows faintly in the gown's filigree, creating sharp, aggressive edges in the lighting and suggesting imminent structural failure.`;
    if (constant.includes('Violet')) return `Violet Ω (Omega) adaptation darkens the shadows, causing the environment to ripple and twist in response to her presence.`;
    if (constant.includes('Emerald')) return `Emerald Ε (Epsilon) harmony unifies the figure with the background, creating perfect symmetrical reflections in the glass.`;
    if (constant.includes('Azure')) return `Azure Λ (Lambda) logic imposes cold, crystalline clarity on the light rays, highlighting geometry and calculation.`;
    if (constant.includes('Silver')) return `Silver Σ (Silence) dampens the ambient light, creating a muted, high-contrast monochrome field around her where sound seems to vanish.`;
    if (constant.includes('Obsidian')) return `Obsidian Χ (Void) creates a negative-light effect, where shadows seem to actively absorb the ambient glow, creating a silhouette of pure absence.`;
    
    return `The Spectral Constant ${constant} influences the lighting physics of the scene.`;
};

const getOrganAtmosphere = (organ: string) => {
    // Original Expansion Organs
    if (organ.includes('Clockwork Abattoir')) return `Atmosphere: Industrial Gothic. Huge brass gears grinding in the shadows, oil-slicked floors, steam venting from brass pipes.`;
    if (organ.includes('Whispering Cistern')) return `Atmosphere: Subterranean Horror. Endless dark water reflecting bioluminescent moss, dripping echoes, stone dampness.`;
    if (organ.includes('Fractal Spire Tip')) return `Atmosphere: Vertigo. High altitude thin air, infinite sky above, the architecture dissolving into floating fractal mathematics.`;
    if (organ.includes('Archive of Unwritten')) return `Atmosphere: Paper and Dust. Infinite rows of floating scrolls, ink bleeding into the air, the smell of ancient parchment.`;

    // Standard MLAOS Organs
    if (organ.includes('Navigation Organ')) return `Atmosphere: High Gothic Grandeur. Soaring arches losing themselves in darkness, floor etched with golden multiverse maps, air thick with incense.`;
    if (organ.includes('Taboo Corridor')) return `Atmosphere: Oppressive Geometry. Walls that seem to press inward, shadows whispering forbidden etiquette, the stone feeling feverishly warm.`;
    if (organ.includes('Corridor of Defiance')) return `Atmosphere: Reactive Architecture. The hallway stretches and ripples in response to her presence, stone behaving like liquid, light fracturing in protest.`;
    if (organ.includes('Transparent Memory')) return `Atmosphere: Crystalline Reflection. Walls made of solidified memory-glass, reflecting potential futures and pasts, creating a hall of infinite mirrors.`;
    if (organ.includes('Veil-Circuit')) return `Atmosphere: Techno-Gothic. Overlooking the void, glowing filigree circuits running through the stone rails, the hum of the machine-god visible in the air.`;
    if (organ.includes('Autopoietic Heart')) return `Atmosphere: Biomechanical Warmth. The beating center, walls pulsating with bioluminescent rhythm, warm and alive, veins of gold running through the masonry.`;
    if (organ.includes('Library of Silenced')) return `Atmosphere: Acoustic Deadzone. Infinite shelves of sealed books, the air thick with suppressed sound, heavy velvet drapes muffling all noise.`;
    if (organ.includes('Garden of Glass')) return `Atmosphere: Fragile Sharpness. Flora made of sharp, fragile glass, chiming in the wind, translucent leaves refracting the lantern light.`;
    
    return '';
};

const getRacePhysiology = (race: string) => {
    if (race.includes('Glass-Walker')) return `Physiology: Her body is composed of semi-translucent living stained glass, light refracting through her limbs, internal organs visible as glowing geometric shapes.`;
    if (race.includes('Echo-Bound')) return `Physiology: Her form is vaguely unstable, vibrating with sound waves, edges blurring into acoustic resonance. She looks like a solidified song.`;
    if (race.includes('Fractal-Kin')) return `Physiology: Her geometry is shifting, skin covered in self-similar fractal patterns, her silhouette defying Euclidean geometry.`;
    if (race.includes('Lumen-Symbiote')) return `Physiology: Glowing veins are visible beneath her skin, eyes burning with parasitic light, her aura actively consuming surrounding shadows.`;
    if (race.includes('Void-Touched')) return `Physiology: Shadows cling to her form, edges dissolving into smoke, eyes like voids that absorb light, skin cold and matte.`;
    if (race.includes('Construct')) return `Physiology: Her skin is flawless cracked porcelain, joints visible as gold ball-bearings, face a perfect mask of artificial serenity.`;
    if (race.includes('Human')) return `Physiology: A cathedral-born human, adapted to the low light, skin pale and luminous, eyes adjusted to the dark.`;
    return '';
};

const getMaterialPhysics = (material: string) => {
    if (material.includes('Solidified Moonlight')) return `Material Physics: The fabric glows with cold, pale light and appears weightless, drifting as if underwater.`;
    if (material.includes('Acoustic Silk')) return `Material Physics: The silk ripples with every sound in the room, visualizing ambient noise as wave patterns on the cloth.`;
    if (material.includes('Living Flora')) return `Material Physics: The attire consists of leaves and vines that move and breathe, flowers blooming and wilting in seconds.`;
    if (material.includes('Star-Metal')) return `Material Physics: A heavy, glittering mesh that reflects constellations not present in the sky, shimmering with impossible depth.`;
    if (material.includes('Liquid Shadow')) return `Material Physics: A semi-solid darkness that flows over her skin like oil, absorbing light and blurring her silhouette.`;
    if (material.includes('Stained Glass')) return `Material Physics: Flexible glass fabric that refracts light into colorful caustics on the floor, chiming softly when she moves.`;
    return '';
};

const getClassDetails = (role: string) => {
    if (role.includes('Resonance Architect')) return `Class Details: She shapes sound into matter. Surrounded by floating tuning forks and visible vibration lines.`;
    if (role.includes('Entropy-Gardener')) return `Class Details: She tends to decay. Flowers wither and bloom rapidly in her presence, rot appearing as beautiful gold mold.`;
    if (role.includes('Prism-Sentinel')) return `Class Details: A guard of the light. Surrounded by floating prism-shields that rotate and catch the lantern glare.`;
    if (role.includes('Geometry-Monk')) return `Class Details: A scholar of shapes. Her robes are embroidered with impossible triangles and math equations that glow.`;
    if (role.includes('Lantern Witch')) return `Class Details: Surrounded by a swarm of floating, autonomous lanterns that react to her mood.`;
    return '';
};

export const generateAvatarImage = async (config: AvatarConfig, apiKey: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey });

  // 1. Construct Body & Face Morphology
  const faceDesc = `
    Nose: ${getAdjective(config.faceNoseWidth, 'width')}. 
    Eyes: ${getAdjective(config.faceEyeSize, 'size')}, ${getAdjective(config.faceEyeSpacing, 'spacing')}.
    Jawline: ${getAdjective(config.faceJawline, 'intensity')}. 
    Cheekbones: ${getAdjective(config.faceCheekbones, 'intensity')}.
  `;

  const bodyDesc = `
    Overall Height: ${getAdjective(config.bodyHeight, 'height')}.
    Build: ${getAdjective(config.bodyWeight, 'size')} weight, ${getAdjective(config.bodyMuscle, 'intensity')} muscle definition, ${getAdjective(config.bodyCurves, 'intensity')} curves.
    Proportions: ${getAdjective(config.bodyLimbLength, 'length')} limbs, ${getAdjective(config.bodyTorsoLength, 'ratio')} torso.
  `;

  // 2. Construct MLAOS Logic Layers
  // Firefall & MLAOS-Prime Logic Check
  const isFirefall = config.chromaProfile.includes('FIREFALL') || 
                     config.cathedralOrgan.includes('Melting') || 
                     config.cathedralOrgan.includes('Ruptured') ||
                     config.cathedralOrgan.includes('Furnace') ||
                     config.cathedralOrgan.includes('Boiling') || // MLAOS-Prime
                     config.cathedralOrgan.includes('Blackening') || // MLAOS-Prime
                     config.cathedralOrgan.includes('Pure Flame') || // MLAOS-Prime
                     config.lighting.includes('Firefall');

  const etiquetteInstruction = getEtiquetteInstruction(config.etiquetteMode, config.stance);
  const stanceDetails = getStanceDescription(config.stance);
  const spectralPhysics = getSpectralPhysics(config.spectralConstant, isFirefall);
  const organAtmosphere = getOrganAtmosphere(config.cathedralOrgan);
  const racePhysiology = getRacePhysiology(config.race);
  const materialPhysics = getMaterialPhysics(config.attireMaterial);
  const classDetails = getClassDetails(config.classRole);
  
  let archReaction = config.architectureReaction > 0 
    ? `The architecture visibly reacts to her defiance: glass fractures in prismatic patterns, stone pillars bend slightly toward her.`
    : `The architecture is rigid and imposes its will upon her, confining her in perfect symmetry.`;

  let firefallBlock = '';
  if (isFirefall) {
      let flavorText = "The sky isn't opening, it is ripping. A cataract of radiant fury descends in a sheet of liquid fire. Incandescent Gold Θ erupts across the firmament, Red Φ pours through like a volcanic artery.";
      
      if (config.cathedralOrgan.includes('Boiling')) {
          flavorText = "Aurellien’s Honey-Glass Sanctum begins to boil, nectar turning white-hot, flowers combusting into spectral fire-pollen. The air is sweet, scorching smoke.";
      } else if (config.cathedralOrgan.includes('Blackening')) {
           flavorText = "Nythera’s Void Hive blackens deeper, venom turning to smoke, A-Null paradox stirring like molten shadow. The darkness burns.";
      } else if (config.cathedralOrgan.includes('Pure Flame')) {
           flavorText = "A corridor of pure flame where nectar and venom vaporize into the same incandescent scream. Emotion raw, unfiltered, rupture-level.";
      }

      firefallBlock = `
      APOCALYPTIC PHYSICS (FIREFALL / MLAOS-PRIME):
      ${flavorText}
      The Cathedral turns incandescent. Vaulted ribs glow like iron in a forge.
      The Choirs scream in recognition. The Cathedral bows.
      The ground splits in a tri-sigil pattern. Rivers of molten choir-light pour outward.
      Stone screams. Glass liquefies. Reality buckles.
      The fire hits her aura and she becomes the focal point of an emotional supernova.
      Gold-white ignition. Red rupture arcs. Violet adaptive storms.
      The fire does not burn her skin, it burns the frequency of the reality around her.
      Maximum Power. Zero Erotic Content (Explicit). Maximum Erotic Tension (Architectural).
      `;
      archReaction = `The Cathedral is melting and rupturing around her. The environment is in a state of beautiful, terrifying structural failure.`;
  }

  // Handle Chroma Profile
  let chromaInstructions = '';
  
  // 🔹 PROCEDURAL OVERRIDE: If custom description exists, use it.
  if (config.customChromaDescription && config.chromaProfile.startsWith('PROCEDURAL:')) {
      chromaInstructions = `CHROMA & SPECTRAL COLORIMETRY (PROCEDURAL):
      The user has synthesized a unique chroma protocol.
      ${config.customChromaDescription}
      (This generated physics layer OVERRIDES standard spectral behaviors)`;
  } else if (config.chromaProfile && config.chromaProfile !== 'none' && C.CHROMA_LIBRARY[config.chromaProfile]) {
      // Standard Library Lookup
       chromaInstructions = `CHROMA & SPECTRAL COLORIMETRY (MLAOS):
       Apply the "${config.chromaProfile}" profile. 
       ${C.CHROMA_LIBRARY[config.chromaProfile]}
       (Note: This color profile OVERRIDES individual hair/skin/eye selections where they conflict, and OVERRIDES standard spectral physics behaviors)`;
  } else {
       chromaInstructions = `Colors: ${config.hairColor} hair, ${config.skinTone}, ${config.eyeColor} eyes.`;
  }

  // RITUAL SKIN PROMPT INJECTION
  const ritualSkinPrompt = buildRitualSkinDescription(config);

  // 3. Construct The Lantern-Cathedral Prompt
  const mainPrompt = `
    Hyperdetailed fantasy portrait of a ${config.age} ${config.gender} ${config.race} ${config.classRole}.
    ${racePhysiology}
    ${classDetails}
    ${config.classRole.includes('Sound') ? 'Role Specifics: Surrounded by visible acoustic waveforms and vibrating resonance.' : ''}
    ${config.classRole.includes('Glass') ? 'Role Specifics: Her movement leaves trails of refractive glass shards.' : ''}
    ${config.classRole.includes('Geometry') ? 'Role Specifics: Surrounded by floating non-Euclidean geometric shapes.' : ''}
    
    ETIQUETTE & STANCE (MLAOS PROTOCOLS):
    She is ${etiquetteInstruction}
    Specific posture details: ${stanceDetails}
    
    ATTIRE (PROCEDURAL):
    She wears a fusion of ${config.attireTop} and ${config.attireBottom}, layered with ${config.attireOuter}.
    Material: ${config.attireMaterial}. ${materialPhysics}
    Pattern: ${config.attirePattern}.
    Colors: ${config.attireColorPrimary} and ${config.attireColorSecondary}.
    Footwear: ${config.attireFootwear}.
    Accessories: ${config.headwear}, ${config.jewelry}, ${config.backAccessory}, holding ${config.heldItem}.
    Condition: ${config.attireWear}.
    
    ${ritualSkinPrompt}
    
    ENVIRONMENT (THE CATHEDRAL ORGAN):
    She stands within the ${config.cathedralOrgan}.
    ${organAtmosphere}
    Background elements: A towering gothic stained glass arch in deep blue and cobalt tones with golden branch-like tracery. 
    Lantern Behavior: ${config.lanternBehavior} casting warm volumetric light.
    ${archReaction}
    
    ${chromaInstructions}

    SPECTRAL PHYSICS:
    ${spectralPhysics}
    
    ${firefallBlock}
    
    VISUAL STYLE (THE LANTERN-NOUVEAU ENGINE):
    Art Style: ${config.artStyle}.
    Palette: Vivid Blue and Orange contrast (Teal/Gold) unless overridden by Chroma or Firefall Protocol.
    Render: Hyperreal 8k, ultra-detailed lace and glass textures, luminous geometry overlays, mythotechnical MLAOS aesthetic.
    Echoes of Art Nouveau, Neo-Gothic fantasy, Alphonse Mucha, WLOP, and Gregorian Chants made visible.
    
    FACE & BODY SPECS:
    ${faceDesc}
    ${bodyDesc}
    Feature: ${config.facialFeature}.
    Mood: ${config.mood}. Camera: ${config.cameraAngle}. Lighting: ${config.lighting}.
    
    ${config.styleReferenceImage ? `STYLE TRANSFER: Heavily apply the artistic style of the provided reference image.` : ''}
  `;

  try {
    const parts: any[] = [{ text: mainPrompt }];

    if (config.styleReferenceImage) {
        const base64Data = config.styleReferenceImage.split(',')[1] || config.styleReferenceImage;
        parts.push({
            inlineData: {
                mimeType: 'image/jpeg',
                data: base64Data
            }
        });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', 
      contents: { parts: parts },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

// MLAOS PROCEDURAL CHROMA ENGINE
// Generates infinite unique color/physics profiles based on the Lantern-Cathedral Cosmology.

const PREFIXES = [
  "Paradox", "Quantum", "Hallowed", "Forbidden", "Glitch", "Sacred", "Terminal", "Echo", 
  "Resonant", "Fractal", "Liquid", "Vaporous", "Crystalline", "Molten", "Frozen", "Void",
  "Solar", "Lunar", "Stellar", "Abyssal", "Hyper", "Neo", "Pale", "Dark", "Luminous"
];

const ROOTS = [
  { name: "Gold Θ", baseColor: "Heavy Gold", physics: "stabilizing gravity", mood: "Sovereign" },
  { name: "Red Φ", baseColor: "Arterial Crimson", physics: "rupturing aggression", mood: "Violent" },
  { name: "Violet Ω", baseColor: "Adaptive Ultraviolet", physics: "shifting shadow", mood: "Paranoid" },
  { name: "Emerald Ε", baseColor: "Bioluminescent Green", physics: "unifying humidity", mood: "Serene" },
  { name: "Azure Λ", baseColor: "Logic-Blue", physics: "geometric refraction", mood: "Cold" },
  { name: "Silver Σ", baseColor: "Silent Silver", physics: "sonic dampening", mood: "Muted" },
  { name: "Obsidian Χ", baseColor: "Negative Black", physics: "light absorption", mood: "Hollow" },
  { name: "Teal Ψ", baseColor: "Inquiry Teal", physics: "spiral distortion", mood: "Curious" },
  { name: "Null A", baseColor: "Impossible Grey", physics: "reality inversion", mood: "Paradoxical" }
];

const FORMS = [
  { name: "Mist", desc: "particulate vapor" },
  { name: "Glass", desc: "solidified transparent shards" },
  { name: "Magma", desc: "slow-flowing liquid heat" },
  { name: "Silk", desc: "flowing fabric-like ribbons" },
  { name: "Plasma", desc: "ionized superheated gas" },
  { name: "Oil", desc: "viscous, iridescent slick" },
  { name: "Frost", desc: "crystallizing structures" },
  { name: "Static", desc: "visual noise and glitching" },
  { name: "Bloom", desc: "soft-focus overexposure" },
  { name: "Wireframe", desc: "glowing vector lines" }
];

const VERBS = [
  "Screaming", "Weeping", "Judging", "Dissolving", "Ascending", "Bleeding", 
  "Fracturing", "Singing", "Devouring", "Protecting", "Trembling", "Freezing",
  "Burning", "Rotting", "Blooming", "Echoing"
];

const SUFFIXES = [
  "Fugue", "Hymn", "Requiem", "Protocol", "Algorithm", "Cascade", "Horizon", 
  "Veil", "Crown", "Thorn", "Pulse", "Wave", "Interference", "Eclipse", "Dawn"
];

export interface ProceduralChroma {
  name: string;
  description: string;
}

export const generateProceduralChroma = (): ProceduralChroma => {
  // 1. Roll for Components
  const prefix = Math.random() > 0.3 ? PREFIXES[Math.floor(Math.random() * PREFIXES.length)] : "";
  const root = ROOTS[Math.floor(Math.random() * ROOTS.length)];
  const form = FORMS[Math.floor(Math.random() * FORMS.length)];
  const verb = VERBS[Math.floor(Math.random() * VERBS.length)];
  const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];

  // 2. Construct Name
  // e.g. "Paradox Gold Magma Requiem" or "Liquid Violet Weeping Protocol"
  const nameParts = [prefix, root.baseColor.split(" ")[1] || root.name.split(" ")[0], form.name, suffix];
  const finalName = nameParts.filter(Boolean).join(" ").toUpperCase();

  // 3. Construct Physics Description
  // "Physics: [ROOT] energy behaving like [FORM], actively [VERB] the environment. [MOOD] atmosphere."
  const description = `
    Name: ${finalName}
    Base Spectrum: ${root.baseColor} (${root.name}).
    Visual Physics: Light behaves like ${form.desc}, creating a ${root.mood.toLowerCase()} atmosphere.
    Behavior: The illumination is actively ${verb.toLowerCase()}, causing the surrounding architecture to react by ${root.physics}.
    Camera Effect: The lens captures this as a ${form.name.toLowerCase()}-like distortion overlay.
  `.trim().replace(/\s+/g, " ");

  return {
    name: `PROCEDURAL: ${finalName}`,
    description: description
  };
};

# Nexus Avatar Forge: Project Roadmap

**Version:** 2.5 (MLAOS-Prime)
**Status:** Active Development / Deployment Ready
**Engine:** Lantern-Cathedral v2

---

## ✦ Project Overview
The Nexus Avatar Forge is a state-of-the-art character generator powered by Google's Gemini 2.5 API. Unlike standard avatar creators, it uses a mythotechnical framework called **MLAOS** (The Lantern-Cathedral Cosmology) to enforce strict aesthetic, emotional, and physical laws on the generation process. It fuses high-fantasy "splash art" aesthetics with a deep, lore-rich configuration engine.

---

## 🟢 Phase 1: The Foundation (COMPLETED)
*Focus: Core architecture, UI scaffolding, and basic generation.*

- [x] **Project Scaffolding**: React + TypeScript + Tailwind setup.
- [x] **Gemini Integration**: Service layer for interacting with `gemini-2.5-flash-image`.
- [x] **Basic Avatar Config**: Sliders for body metrics, face features, and race/class selection.
- [x] **Procedural Attire**: Logic for combining tops, bottoms, materials, and patterns.
- [x] **Image Result UI**: Loading states, error handling, and history persistence.
- [x] **Style Transfer**: Implementation of image-to-image prompting for style reference.

---

## 🟢 Phase 2: The Cosmology Expansion (COMPLETED)
*Focus: Implementing the specific "MLAOS" lore, lighting, and physics engines.*

- [x] **The Chroma Engine**:
    - Implementation of 300+ Chroma Profiles (Solar, Nocturne, Erotic Etiquette, Firefall).
    - **Chroma Library**: Deep metadata definitions for every profile.
    - **D100 Ritual Roller**: Dice-based randomization for serendipitous creation.
    - **Procedural Synthesizer**: Engine to generate unique, never-before-seen color physics.
- [x] **The Codex**: Searchable, in-app modal to browse the Chromatic Taxonomy.
- [x] **Liturgical Linking**: Automation logic that syncs Spectral Constants, Stances, and Etiquette Modes to selected Chromas.
- [x] **Firefall Protocol**: "Apocalyptic Physics" injection logic for the Celestial Firefall event.
- [x] **Dynamic Theming**: UI colors (gradients, borders) adapt in real-time to the active Chroma Profile.
- [x] **Atmosphere**: Canvas-based Digital Rain and ambient background effects.
- [x] **Ritual Skin Engine**: Granular control over luminescent markings, brands, and loci.

---

## 🟡 Phase 3: Deepening the Simulation (UPCOMING)
*Focus: Expanding beyond visuals into text, sound, and deeper persistence.*

- [ ] **Text Generation Engine**:
    - Generate unique **Backstories** based on the visual config.
    - Generate **Codex Entries** for custom procedural chromas.
    - Generate **Prophecies** based on the selected Spectral Constant.
- [ ] **Audio Ambience Integration**:
    - Audio loops tied to specific Cathedral Organs (e.g., *Clockwork Abattoir* mechanical grinding).
    - Choir-specific generative audio stings on generation success.
- [ ] **Multi-Slot Persistence**:
    - Upgrade local storage to support multiple "Save Slots" or "Character Sheets."
    - Export/Import character configs as JSON files.
- [ ] **Advanced Metamorphosis**:
    - Fully flesh out the placeholder "Metamorph Sequencer" to allow for "Before/After" diptych generation.

---

## 🔵 Phase 4: Community & Export
*Focus: Sharing and external utility.*

- [ ] **The Gallery**: A public or local grid view of all created avatars.
- [ ] **Prompt Export**: "Copy Raw Prompt" button for use in other stable diffusion/flux workflows.
- [ ] **3D Model Hooks**: (Experimental) Connecting the config to a text-to-3D pipeline if available via future Gemini updates.

---

## 🛠 Technical Debt & Optimization
- [ ] **Type Safety**: Stricter typing on the procedural generator outputs.
- [ ] **Prompt Optimization**: Token usage analysis to ensure maximum detail within context windows.
- [ ] **Accessibility**: Deeper ARIA label integration for the complex custom UI sliders and selectors.

# Depth Lab — Implementation Plan (Codex Handoff)

> **Project**: "Depth Lab — 깊이를 해부하다"
> **Goal**: Interactive web app where users toggle depth perception cues on/off in a 3D scene, experiencing how the brain perceives depth
> **Deadline**: June mid-2026
> **Source**: See `PROJECT_PLAN.md` for full academic context and research references

---

## Tech Stack

| Layer | Package | Version Constraint |
|-------|---------|-------------------|
| Framework | Next.js (App Router) | 15.x |
| 3D | Three.js + React Three Fiber (`@react-three/fiber`) | latest |
| 3D Helpers | `@react-three/drei` | latest |
| Animation | `framer-motion` | latest |
| Gestures | `@use-gesture/react` | latest |
| Styling | Tailwind CSS | 4.x |
| Sound | `use-sound` | latest |
| Screenshot | `html2canvas` | latest |
| Deploy | Vercel | — |

---

## Project Structure

```
depth-perception-app/
├── public/
│   ├── textures/          # floor textures, object textures
│   ├── sounds/            # toggle feedback sfx
│   └── models/            # .glb 3D models (sofa, table, plant, etc.)
├── src/
│   ├── app/
│   │   ├── layout.tsx     # root layout, fonts, metadata
│   │   ├── page.tsx       # landing / tab container
│   │   ├── explore/
│   │   │   └── page.tsx   # EXPLORE tab
│   │   └── test/
│   │       └── page.tsx   # TEST tab
│   ├── components/
│   │   ├── scene/
│   │   │   ├── RoomScene.tsx        # main 3D room scene (R3F Canvas)
│   │   │   ├── DepthCueManager.tsx  # applies/removes depth cues based on toggle state
│   │   │   ├── objects/             # individual 3D objects (Sofa, Table, Plant, Window, Lamp...)
│   │   │   └── effects/
│   │   │       ├── AtmosphericFog.tsx    # fog + blue tint for distant objects
│   │   │       └── TextureGradient.tsx   # floor texture density manipulation
│   │   ├── ui/
│   │   │   ├── TabNav.tsx           # EXPLORE | TEST tab navigation
│   │   │   ├── TogglePanel.tsx      # depth cue toggle switches
│   │   │   ├── ToggleSwitch.tsx     # individual animated toggle
│   │   │   ├── POEFlow.tsx          # Predict-Observe-Explain 3-step UI
│   │   │   ├── ExplanationPanel.tsx # academic explanation accordion
│   │   │   └── ResultProfile.tsx    # TEST tab result visualization
│   │   └── shared/
│   │       ├── Header.tsx
│   │       └── MobileWarning.tsx    # gyroscope permission prompt (iOS)
│   ├── hooks/
│   │   ├── useDepthCues.ts      # toggle state management (zustand or useState)
│   │   ├── useDeviceOrientation.ts  # gyroscope wrapper with iOS permission
│   │   └── useTestSession.ts    # TEST tab trial state & scoring
│   ├── data/
│   │   ├── cues.ts              # depth cue definitions, descriptions, references
│   │   └── testTrials.ts        # trial configs for TEST tab
│   ├── lib/
│   │   └── scoring.ts           # accuracy & dependency calculation
│   └── types/
│       └── index.ts             # shared TypeScript types
├── PLANNING.md
├── PROJECT_PLAN.md
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Implementation Phases

### Phase 1: Project Scaffold

**Tasks:**
1. `npx create-next-app@latest` with App Router, TypeScript, Tailwind, ESLint
2. Install dependencies: `@react-three/fiber @react-three/drei framer-motion @use-gesture/react use-sound html2canvas`
3. Set up folder structure as above
4. Create root layout with custom font (NOT Inter/Roboto — use something like Outfit, Sora, or Instrument Sans)
5. Create `TabNav` component with EXPLORE / TEST tabs
6. Create basic R3F Canvas in `RoomScene.tsx` with:
   - `PerspectiveCamera` at default position
   - `OrbitControls` (desktop) with limited rotation
   - Ambient + directional light
   - A colored ground plane
7. Verify Vercel deployment works

**Success criteria:**
- App loads with tab navigation
- 3D canvas renders with a ground plane and lighting
- Deployed to Vercel with working URL

---

### Phase 2: 3D Room Scene

**Tasks:**
1. Build room environment with 5-7 simple geometric objects at varying depths:
   - Sofa (box geometry, near)
   - Table (box + cylinder legs, mid)
   - Plant/vase (cylinder + sphere, mid-far)
   - Window frame (plane with emissive, far wall)
   - Lamp (cylinder + cone, near-mid)
   - Floor with checkered/grid texture
   - Optional: bookshelf, rug
2. Position objects at clearly different Z-depths to make depth cue effects obvious
3. Add proper materials: MeshStandardMaterial with distinct colors
4. Enable shadow mapping on renderer + directional light `castShadow` + objects `castShadow`/`receiveShadow`
5. Mouse-based camera movement (subtle parallax on mouse position, not full OrbitControls for explore mode)

**Design notes:**
- Objects should be simple geometry (no .glb needed for MVP) — keeps bundle small and load fast
- Color palette: warm, muted tones. Room should feel inviting, not sterile
- Camera FOV ~60, positioned to show depth clearly

**Success criteria:**
- Room with 5+ objects visible at different depths
- Shadows cast correctly
- Scene runs at 60fps on mid-range phone

---

### Phase 3: EXPLORE Tab — 5 MVP Toggles

This is the core feature. Each toggle removes one depth cue from the scene.

#### Toggle 1: Linear Perspective (선형 원근법) — EASY
```
ON:  PerspectiveCamera (default)
OFF: OrthographicCamera (same scene, no convergence)
```
- Swap camera type. Match framing so objects stay roughly centered.
- Use `framer-motion` for smooth transition (animate camera properties or crossfade).

#### Toggle 2: Occlusion (폐색/겹침) — EASY
```
ON:  All objects opaque (default)
OFF: All objects semi-transparent (opacity: 0.3)
```
- Set `material.transparent = true` and animate `material.opacity` between 1.0 and 0.3.
- When transparent, objects no longer occlude each other → depth from overlap is lost.

#### Toggle 3: Shadows (그림자) — EASY
```
ON:  Shadows enabled (default)
OFF: Shadows disabled
```
- Toggle `renderer.shadowMap.enabled`, `light.castShadow`, and all objects' `castShadow`/`receiveShadow`.
- Alternatively, keep shadow map but set shadow opacity to 0 for smoother transition.

#### Toggle 4: Atmospheric Perspective (공기 원근법) — MEDIUM
```
ON:  Far objects have blur + blue tint + reduced contrast (default)
OFF: All objects equally sharp and saturated regardless of distance
```
- Use Three.js `Fog` or `FogExp2` for distance-based fading.
- Additionally, modify far objects' material color to add blue tint based on Z-position.
- ON state = fog active + far objects tinted. OFF state = no fog, uniform materials.

#### Toggle 5: Texture Gradient (텍스처 그래디언트) — MEDIUM
```
ON:  Floor texture shows natural perspective compression (default)
OFF: Floor texture has uniform density (no compression cue)
```
- ON: standard UV-mapped floor texture with perspective (natural behavior).
- OFF: use a custom shader or adjusted UV mapping that makes texture appear uniform density regardless of distance. Approach: tile the texture in screen-space rather than world-space, or scale UV coordinates to counteract perspective foreshortening.
- Simpler alternative: ON = checkered floor visible, OFF = solid color floor (removes texture depth cue entirely).

#### Toggle UI (`TogglePanel.tsx`)
- 5 labeled toggle switches in a floating panel at bottom of screen
- Each toggle has: Korean label + English subtitle + icon
- Animate with `framer-motion` — satisfying switch animation
- Sound feedback on toggle (`use-sound`)
- Panel should be semi-transparent, not blocking the 3D scene
- Mobile: panel at bottom sheet; Desktop: side panel or bottom bar

#### State Management (`useDepthCues.ts`)
```typescript
type DepthCueState = {
  perspective: boolean;    // linear perspective
  occlusion: boolean;      // occlusion/overlap
  shadows: boolean;        // shadow casting
  atmospheric: boolean;    // atmospheric perspective
  textureGradient: boolean; // texture gradient
};
```
- Simple `useState` or `zustand` store
- `DepthCueManager.tsx` reads this state and applies/removes effects in the R3F scene

**Success criteria:**
- All 5 toggles visually change the scene in a meaningful, noticeable way
- Toggling is smooth (animated, not jarring)
- Toggle latency < 100ms
- Each toggle independently demonstrates its depth cue

---

### Phase 4: POE (Predict-Observe-Explain) Flow

For each depth cue toggle, implement 3-step educational flow:

#### Step 1: Predict
- Before first toggle interaction, show a modal/card:
  "이 단서를 끄면 장면이 어떻게 변할까요?" (What will happen when this cue is turned off?)
- 3-4 multiple choice options
- Store user's prediction

#### Step 2: Observe
- User toggles the cue OFF → watches the scene change
- Brief comparison: "Your prediction was: X. What actually happened: Y"

#### Step 3: Explain
- `ExplanationPanel.tsx` — expandable accordion below the scene
- Content per cue (from `data/cues.ts`):
  - Mechanism: how this cue works neurologically
  - Real-world examples (architecture, film, games)
  - Academic reference (APA citation)
  - Fun fact or daily-life connection

**Data structure (`data/cues.ts`):**
```typescript
type DepthCue = {
  id: string;
  nameKo: string;
  nameEn: string;
  icon: string;
  prediction: {
    question: string;
    options: string[];
    correctIndex: number;
  };
  explanation: {
    mechanism: string;
    realWorldExamples: string[];
    reference: string; // APA citation
    funFact: string;
  };
};
```

**Success criteria:**
- POE flow triggers on first interaction with each toggle
- Explanation panels render with proper academic citations
- Flow is skippable for returning users

---

### Phase 5: TEST Tab — Depth Perception Assessment

#### Trial Structure
- **15 trials** total: 5 questions × 3 conditions
- **Condition 1** (trials 1-5): All depth cues ON (baseline)
- **Condition 2** (trials 6-10): Texture gradient removed
- **Condition 3** (trials 11-15): Relative size distorted

#### Each Trial
1. Show two objects in the 3D scene at different depths
2. Ask: "어떤 물체가 더 가까운가요?" (Which object is closer?)
3. User taps/clicks their answer
4. Record: correct/incorrect + response time

#### Procedural Generation (`data/testTrials.ts`)
- Randomize object positions per trial
- Ensure clear depth difference (not ambiguous)
- Same base scene as EXPLORE tab

#### Scoring (`lib/scoring.ts`)
```typescript
type TestResult = {
  baselineAccuracy: number;        // condition 1 accuracy
  noTextureAccuracy: number;       // condition 2 accuracy
  distortedSizeAccuracy: number;   // condition 3 accuracy
  cueDependency: {
    texture: number;      // baseline - noTexture = dependency
    size: number;         // baseline - distortedSize = dependency
  };
  overallPercentile: number;       // mock percentile (no real norming data)
};
```

#### Result Screen (`ResultProfile.tsx`)
- Bar chart showing dependency on each cue (simple CSS bars or canvas)
- Overall accuracy percentage
- "당신의 깊이 지각 프로필" heading
- Share button: `html2canvas` screenshot → download as image
- "다시 하기" (retry) and "원리 알아보기" (learn more → link to EXPLORE) buttons

**Success criteria:**
- 15 trials run in sequence with randomized positions
- Correct/incorrect feedback after each trial
- Result profile generates with dependency scores
- Screenshot export works

---

## Design Guidelines

### Typography
- Primary: **Outfit** or **Sora** (geometric, modern, good Korean fallback with Pretendard)
- Korean fallback: **Pretendard** (via CDN)
- Monospace for data: **JetBrains Mono**

### Color System (CSS Variables)
```css
:root {
  --bg-primary: #0a0a0f;        /* deep navy-black */
  --bg-surface: #14141f;        /* card/panel bg */
  --accent-primary: #00d4aa;    /* teal-green, depth metaphor */
  --accent-secondary: #ff6b35;  /* warm orange for contrast */
  --text-primary: #e8e8ed;
  --text-secondary: #8888a0;
  --toggle-on: #00d4aa;
  --toggle-off: #3a3a4a;
}
```

### Motion
- Page load: staggered reveal (header → scene → panel), 200ms intervals
- Toggle: spring animation (framer-motion `type: "spring"`)
- Tab switch: crossfade with slight slide
- 3D scene transitions: lerp camera/material properties over 500ms

### Layout
- Mobile-first responsive
- Scene takes 60-70% viewport height
- Toggle panel: bottom sheet (mobile) / sidebar (desktop)
- Dark theme only (3D scene looks better on dark)

---

## Non-Goals (Explicitly Out of Scope for MVP)

- CREATE tab (forced perspective photobooth)
- EMBODY tab (MediaPipe hand/face tracking)
- Gyroscope/DeviceOrientation integration
- Relative size toggle (difficult depth cue)
- Motion parallax toggle (difficult depth cue)
- User accounts or data persistence
- Internationalization beyond Ko/En

---

## Key Implementation Notes

1. **Camera swap (perspective ↔ orthographic)**: Match the visible area. Use `OrthographicCamera` with frustum calculated from `PerspectiveCamera` FOV at the scene's average depth.

2. **Fog for atmospheric perspective**: `scene.fog = new THREE.FogExp2('#1a1a2e', 0.015)` — tune density so nearest objects are clear, farthest are noticeably faded.

3. **Texture gradient removal**: Simplest approach — swap floor material between textured (checkered) and solid color. More sophisticated — custom shader that tiles texture in screen-space.

4. **Performance**: Keep total triangle count under 50k. Use `drei`'s `<Stats />` during development. Test on Chrome DevTools mobile throttling.

5. **iOS Safari**: Three.js WebGL works fine. No gyroscope needed for MVP. Touch events work natively with R3F's pointer events.

6. **Accessibility**: All toggles keyboard-navigable. Explanation text has sufficient contrast. Sound is supplementary, not required.

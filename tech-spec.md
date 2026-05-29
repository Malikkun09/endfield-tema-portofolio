# Tech Spec - Portfolio Website

## Dependencies

| Package | Purpose |
|---------|---------|
| `gsap` | Core animation engine, timelines, ScrollTrigger |
| `@studio-freight/lenis` | Smooth scroll with momentum |
| `lucide-react` | Sidebar navigation icons |

## Component Inventory

### Layout

| Component | Source | Reuse |
|-----------|--------|-------|
| `Preloader` | Custom | Once |
| `SidebarNav` | Custom | Once (left sidebar, sticky) |
| `ScanLinesOverlay` | Custom | Once (global overlay) |
| `CustomCursor` | Custom | Once |
| `HexGridCanvas` | Custom | Once (global background) |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| `HeroSection` | Custom | Asymmetric split, vertical typography lockup |
| `SkillsTerminal` | Custom | Hex-cluster chart with hover scramble |
| `ProjectHolograms` | Custom | 3D tilt cards, horizontal scroll |
| `ContactUplink` | Custom | Terminal-style footer |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| `ScrambleText` | Custom | Preloader, Hero, Skills, Nav links |
| `HolographicCard` | Custom | ProjectHolograms |
| `GlitchProgressBar` | Custom | Preloader |

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Text Scramble/Decode | GSAP + Custom JS | `setInterval` cycling random chars, freezing resolved indices | Medium |
| Scan Lines Overlay | CSS | `::after` pseudo-element with `repeating-linear-gradient` | Low |
| Chromatic Aberration | SVG Filter + JS | `feOffset` on R/B channels, intensity mapped to mouse velocity | Medium |
| Preloader Reveal | GSAP Timeline | Progress bar fill → overlay clip-path split → hero scramble | High |
| Hex-Grid Interaction | Canvas API | Custom canvas draw loop with radial glow on mouse proximity | High |
| Holographic Card Tilt | CSS + JS | `mousemove` sets `--rx`/`--ry` CSS variables, radial gradient tracks cursor | Medium |
| Magnetic Buttons | GSAP | Mouse offset calculated, `gsap.to` for smooth attraction | Low |
| Smooth Scroll | Lenis | Global smooth scroll wrapper | Low |
| Skill Hover Scramble | Custom JS | Alternates between category name and tech stack on hover | Medium |
| Card Expansion Modal | GSAP | Lock tilt state, scale card to 80% viewport | Medium |

## State & Logic

- **Preloader State Machine**: 3 states — `loading` (0-99%), `completing` (100%, 500ms delay), `done` (overlay removed, triggers hero animations)
- **HexGrid Canvas**: Only renders when mouse is moving (performance). Falls back to static grid on mobile.
- **Text Scramble Utility**: A reusable hook/function that takes a target string and returns an object with current display value and a trigger function.
- **Cursor Tracking**: Global mouse position stored in a ref (not state) for 60fps updates without React re-renders.

## Other Key Decisions

- **No shadcn/ui components**: This is a fully custom brutalist design; no standard UI primitives are needed.
- **GSAP over Framer Motion**: The animation complexity (timelines, sequenced reveals, scroll-driven effects) is better handled by GSAP.
- **Canvas over WebGL**: The hex-grid effect is simple enough for 2D Canvas API; avoids WebGL bundle overhead.
- **Vite + React 19**: Standard stack from the skill template.

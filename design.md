# Design System: Obsidian Luminescence & Precision Glass
*Inspired by [Huly.io](https://huly.io/) — Tailored for the [JobGen.AI](https://candidates.jobgen.ai/) Redesign*

---

## 1. Design Philosophy & Aesthetic Manifesto

Modern digital products have shifted away from flat pastel SaaS layouts (circa 2020-2022) toward **ultra-high fidelity, atmospheric dark-mode environments** pioneered by visionary platforms like **Huly**, Linear, and Raycast.

This design system translates Huly’s world-class visual language—characterized by **deep obsidian void backgrounds, dual-layer gradient hairline borders, luminous warm copper/amber edge glows, soft multi-spectral ambient light orbs, and asymmetric bento grids**—into an authoritative, trustworthy, and futuristic experience for **JobGen.AI**.

### Core Tenets
1. **Atmospheric Depth over Flat Surfaces:** Contrast deep obsidian canvases (`#090A0C`) with ethereal blurred radial lighting orbs (warm blush `#F8E6DD` blended with icy cobalt `#CBD3EB`).
2. **Precision Hairline Borders (The Huly "Dual-Box" Technique):** Borders are never flat single colors; they use CSS multi-layer clipping (`padding-box` + `border-box`) with directional linear gradients to simulate physical studio lighting falling across beveled edges.
3. **High-Contrast, Asymmetric Bento Grids:** Content is grouped into balanced yet asymmetrical modular cards (e.g. 35% / 65% staggered split), each pairing a bold micro-statement with an interactive visual layer.
4. **Luminous Glowing Accents (Warm Ember & Electric Cyan):** While the base environment is dark and focused, key interactive hooks emit soft specular glow rings (`blur(7px)` to `blur(15px)`) that draw immediate attention without feeling garish.

---

## 2. Complete Design Tokens & Palette

### 2.1 Surfaces & Backgrounds
| Token Name | Hex Code | RGB | Role / Usage |
| :--- | :--- | :--- | :--- |
| `--surface-canvas` | `#090A0C` | `rgb(9, 10, 12)` | The root void background. Pitch obsidian with subtle warmth. |
| `--surface-card` | `#0C0C0D` | `rgb(12, 12, 13)` | Primary card container background (`bg-grey-2`). |
| `--surface-card-hover` | `#111214` | `rgb(17, 18, 20)` | Hovered card state or elevated surface (`bg-grey-5`). |
| `--surface-elevated` | `#18191B` | `rgb(24, 25, 27)` | Dropdown menus, tooltips, floating popovers (`bg-grey-10`). |
| `--surface-inset` | `#050607` | `rgb(5, 6, 7)` | Inset code blocks, terminal boxes, and input fields. |
| `--surface-light-contrast` | `#F6F6F6` | `rgb(246, 246, 246)` | Used for contrasting high-impact breakout sections (e.g. Huly's productivity section). |

### 2.2 Text & Typography Colors
| Token Name | Hex Code | RGB | Role / Usage |
| :--- | :--- | :--- | :--- |
| `--text-primary` | `#FFFFFF` | `rgb(255, 255, 255)` | Section titles, key headlines, active labels. |
| `--text-secondary` | `#E5E5E7` | `rgb(229, 229, 231)` | Body copy, value propositions (`text-grey-90`). |
| `--text-muted` | `#C9CBCF` | `rgb(201, 203, 207)` | Secondary metadata, checklist items (`text-grey-80`). |
| `--text-subtle` | `#797D86` | `rgb(121, 125, 134)` | Helper text, disabled states, timestamps (`text-grey-50`). |
| `--text-gradient-hero` | `linear-gradient(135deg, #FFFFFF 30%, #D5D8F6 80%, #FDF7FE 100%)` | — | High-impact hero headline gradient with cool lavender tint. |

### 2.3 Borders, Rims & Translucency
| Token Name | Formula / Value | Role / Usage |
| :--- | :--- | :--- |
| `--border-hairline` | `rgba(255, 255, 255, 0.08)` | Baseline container divider. |
| `--border-subtle` | `rgba(255, 255, 255, 0.15)` | Interactive card perimeter. |
| `--border-dual-grey` | `linear-gradient(#090a0c, #090a0c) padding-box, linear-gradient(180deg, hsla(0,0%,100%,.3), hsla(0,0%,100%,.15)) border-box` | Signature Huly button/card border. |
| `--border-dual-hover` | `linear-gradient(#17171a, #17171a) padding-box, linear-gradient(180deg, hsla(0,0%,100%,.5), hsla(0,0%,100%,.25)) border-box` | Elevated hover state border. |
| `--outer-ring-card` | `ring-[6px] ring-white/40` or `outline-4 outline-white/60` | Heavy external glass ring for standalone bento cards. |

### 2.4 Glowing Accent Emitters (Atmospheric Lighting)
```css
/* Warm Ember Glow (Primary Conversion CTA) */
--glow-ember-core: #FFAA81;
--glow-ember-bright: #FFDA9F;
--glow-ember-hot: #FF7950;
--glow-ember-deep: #CD3100;

/* Electric Cyan / Cobalt Glow (Tech & ATS Matching) */
--glow-cobalt-light: #478BEB;
--glow-cobalt-core: #3D7EFF;
--glow-cyan-electric: #00F0FF;

/* AI Agent Glow (Emma / MetaBrain Violet) */
--glow-violet-soft: #D5D8F6;
--glow-violet-core: #725EFF;
--glow-violet-aura: rgba(139, 92, 246, 0.35);
```

---

## 3. Typography Hierarchy & Spacing

Huly uses ultra-tight tracking on large display headings paired with clean, geometric sans-serif for reading comfort.

| Element | Font Family | Size (Desktop / Mobile) | Weight | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Inter Display / Cabinet Grotesk | `84px` / `32px` | 600 (Semibold) | `0.9` (Tight) | `-0.04em` |
| **Section H2** | Inter Display / Cabinet Grotesk | `80px` / `36px` | 600 (Semibold) | `0.8` – `0.9` | `-0.05em` |
| **Card Heading** | Inter / DM Sans | `18px` – `20px` | 500 (Medium) | `1.2` | `-0.02em` |
| **Lead Subtitle**| Inter / DM Sans | `18px` / `15px` | 400 (Regular) | `1.35` | `-0.015em` |
| **Body / Copy**  | Inter / DM Sans | `14px` – `15px` | 300 – 400 | `1.5` | `-0.01em` |
| **Badge / Button**| Inter / JetBrains Mono | `11px` – `12px` | 700 (Bold) | `1.0` | `+0.02em` (Uppercase) |
| **Code / Metrics**| Geist Mono / JetBrains Mono | `13px` | 500 (Medium) | `1.4` | `0` |

---

## 4. Card Anatomy & Bento Grid Architecture

The standout element of Huly’s design is its **Bento Grid Cards**. They do not use generic shadows; instead, they combine:
1. **Translucent Outer Rings:** An external `ring-[6px] ring-white/40` or double-layer gradient hairline border.
2. **Deep Obsidian Core:** `background-color: #0C0C0D` with clipped padding.
3. **Asymmetric Grid Dimensions:** Alternating wide and narrow cards across rows to create a dynamic rhythm.
4. **Bottom Text Scrim:** An absolute positioned gradient scrim (`linear-gradient(180deg, rgba(9,10,12,0) 0%, #090A0C 40%)`) that ensures high legibility over rich background visuals.
5. **Integrated Visual Canvas:** The upper 75% of the card is reserved for interactive animations, laser-scanners, or live UI previews.

### 4.1 Visual Blueprint of a Huly Bento Card

```
┌─────────────────────────────────────────────────────────────────┐  ◄── 6px Translucent Outer Ring
│  [bg-grey-2 / #0C0C0D]                                          │
│                                                                 │
│                 INTERACTIVE VISUAL STAGE                        │
│         (e.g., Live ATS Laser Scan, Chrome AutoFill Demo,        │
│          Interactive STAR Question Response Simulator)          │
│                                                                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  ▲ Gradient Scrim Overlay: rgba(9,10,12,0) -> #090A0C           │
│                                                                 │
│  Feature Name. Concise explanation of the user benefit with     │  ◄── Typography: Bold title
│  actionable value.                                              │      inline with regular text
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 The 2x2 Asymmetrical Bento Layout
```
Row 1: [ Card 1: 35% Width (Compact) ]  +  [ Card 2: 65% Width (Hero Feature) ]
Row 2: [ Card 3: 65% Width (Hero Feature) ]  +  [ Card 4: 35% Width (Compact) ]
Total Container: 1196px – 1280px max-width, 20px gap.
```

---

## 5. Signature Micro-Components & Lighting Effects

### 5.1 The Luminous Glowing Pill Button (Primary CTA)
Huly’s iconic primary button features a floating halo glow and metallic gradient:
```html
<div class="relative inline-flex items-center z-10 group">
  <!-- Diffused outer blur layer -->
  <div class="absolute left-1/2 top-1/2 h-[calc(100%+14px)] w-[calc(100%+14px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[12px] opacity-75 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_center,#FFAA81_0%,#FF7950_50%,transparent_80%)]"></div>
  
  <!-- Sharp specular glow ring -->
  <div class="absolute left-1/2 top-1/2 h-[calc(100%+4px)] w-[calc(100%+4px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/60 blur-[3px]"></div>
  
  <!-- Button core with metallic fill -->
  <button class="relative z-10 flex h-11 items-center justify-center gap-2 rounded-full border border-white/60 bg-[#E5E5E7] px-8 text-[12px] font-bold uppercase tracking-wider text-[#3D1807] transition-transform duration-200 active:scale-95 hover:bg-white shadow-[0_0_20px_rgba(255,170,129,0.4)]">
    <span>Get Free ATS Score</span>
    <svg class="h-3 w-3" fill="none" viewBox="0 0 17 9"><path fill="currentColor" fill-rule="evenodd" d="m12.495 0 4.495 4.495-4.495 4.495-.99-.99 2.805-2.805H0v-1.4h14.31L11.505.99z" clip-rule="evenodd"/></svg>
  </button>
</div>
```

### 5.2 The Huly Dual-Box Hairline Button (Secondary CTA)
```css
.huly-secondary-btn {
  position: relative;
  height: 36px;
  padding: 0 18px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #FFFFFF;
  border-radius: 9999px;
  border: 1px solid transparent;
  background: 
    linear-gradient(#090A0C, #090A0C) padding-box,
    linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%) border-box;
  transition: all 0.25s ease;
}

.huly-secondary-btn:hover {
  background: 
    linear-gradient(#17171A, #17171A) padding-box,
    linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.25) 100%) border-box;
  transform: translateY(-1px);
}
```

### 5.3 Atmospheric Lighting (Multi-Stop Background Glows)
Placed beneath the hero and section dividers to generate cinematic ambient backlighting:
```css
.huly-ambient-stage {
  position: absolute;
  pointer-events: none;
  z-index: 0;
  width: 1400px;
  height: 900px;
  left: 50%;
  transform: translateX(-50%);
  filter: blur(80px);
}

.huly-ambient-stage .orb-warm {
  position: absolute;
  bottom: 10%;
  left: 15%;
  width: 450px;
  height: 350px;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(248, 230, 221, 0.45) 0%, rgba(248, 230, 221, 0) 100%);
  opacity: 0.6;
}

.huly-ambient-stage .orb-cool {
  position: absolute;
  top: 15%;
  right: 15%;
  width: 500px;
  height: 400px;
  border-radius: 50%;
  background: linear-gradient(-30deg, rgba(219, 226, 240, 0.35) 0%, rgba(203, 211, 235, 0.5) 100%);
  opacity: 0.5;
}
```

---

## 6. Application: Redesigning JobGen.AI with Huly Design

Applying this design language directly transforms each section of **JobGen Candidates**:

### 1. Sticky Header
- **Current:** Light blurred bar with standard text buttons.
- **Huly Redesign:** Obsidian floating capsule (`rgba(9, 10, 12, 0.75)` with `backdrop-filter: blur(16px)`), dual-box hairline borders, glowing dot indicator for user counts, and pill-shaped action buttons.

### 2. Hero Section
- **Current:** 2021 soft pastel blue vertical gradient with conventional layout.
- **Huly Redesign:** 
  - Deep obsidian void background with warm ember & cool cobalt atmospheric ambient lighting orbs.
  - Large display typography with lavender gradient clip: *"Tired of applying blind? Apply smarter."*
  - Huly-style luminous amber glowing button: *"Get Free ATS Score"*.
  - Layered interactive application perspective showcase with beveled glass rims and live activity tickers.

### 3. Feature Showcase -> The Huly Bento Grid
- **Current:** Static tab list with an embedded YouTube player.
- **Huly Redesign:** An asymmetric 2x2 Bento Grid with outer glass rings (`ring-[6px] ring-white/40`) and obsidian cards (`#0C0C0D`):
  - **Card 1 (35% - ATS Scanner):** Interactive dropzone with animated neon-cyan laser sweep and live percentage circle.
  - **Card 2 (65% - AI Resume Builder):** Split-view interactive diff highlighting resume bullets tailored in real-time.
  - **Card 3 (65% - Chrome Auto-Fill & Pipeline):** 1-click extension simulator filling LinkedIn/Seek application fields.
  - **Card 4 (35% - STAR Interview Coach):** Interactive audio wave & STAR feedback pill simulator.

### 4. Emma AI Persona -> The Huly MetaBrain Core
- **Current:** Isolated dark blue rectangle interrupting the light page.
- **Huly Redesign:** Integrated seamlessly as a floating glass holographic terminal. Emma’s avatar features an iridescent border beam, connected via subtle SVG fiber-optic light traces to the candidate’s resume and target jobs.

### 5. Social Proof & Hiring Trust Bar
- **Current:** Static grayscale logos in a plain row.
- **Huly Redesign:** Smooth infinite hardware-accelerated marquee with glowing glass partner badges (`Atlassian`, `Canva`, `Deloitte`, `Microsoft`, `Amazon`, `Visa`), accented with live candidate milestone toasts.

### 6. Pricing Matrix
- **Current:** Standard white table cards.
- **Huly Redesign:** Deep obsidian cards with beveled dual-box hairline borders. The **JobGen.AI Premium** card is crowned by an animated ember/cobalt perimeter light beam, interactive currency selector pills, and radiant CTA.

---

## 7. Ready-to-Use CSS Library for Implementation

```css
/* ==========================================================================
   HULY-INSPIRED DESIGN SYSTEM TOKENS & UTILITIES FOR JOBGEN.AI
   ========================================================================== */

:root {
  --huly-canvas: #090A0C;
  --huly-card: #0C0C0D;
  --huly-card-hover: #141518;
  --huly-elevated: #18191B;
  --huly-border-dim: rgba(255, 255, 255, 0.08);
  --huly-border-bright: rgba(255, 255, 255, 0.25);
  
  --huly-text-100: #FFFFFF;
  --huly-text-90: #E5E5E7;
  --huly-text-70: #C9CBCF;
  --huly-text-50: #797D86;
  
  --huly-ember: #FFAA81;
  --huly-ember-hot: #FF7950;
  --huly-cobalt: #3D7EFF;
}

/* Base Body Environment */
body.huly-theme {
  background-color: var(--huly-canvas);
  color: var(--huly-text-90);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
}

/* Huly Display Titles */
.huly-display-title {
  font-size: clamp(2.5rem, 5.5vw, 5.25rem);
  font-weight: 600;
  line-height: 0.92;
  letter-spacing: -0.045em;
  background: linear-gradient(135deg, #FFFFFF 30%, #D5D8F6 80%, #FDF7FE 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Huly Asymmetrical Bento Card */
.huly-bento-card {
  position: relative;
  background-color: var(--huly-card);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 0 0 1px var(--huly-border-dim), 0 20px 40px -15px rgba(0, 0, 0, 0.7);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.huly-bento-card:hover {
  box-shadow: 0 0 0 1px var(--huly-border-bright), 0 25px 50px -12px rgba(0, 0, 0, 0.85);
  transform: translateY(-2px);
}

/* Card Bottom Text Scrim */
.huly-card-scrim {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  background: linear-gradient(180deg, rgba(9, 10, 12, 0) 0%, rgba(9, 10, 12, 0.85) 45%, #090A0C 100%);
  backdrop-filter: blur(8px);
  z-index: 10;
}

/* Dual-Box Hairline Border */
.huly-dual-border {
  border: 1px solid transparent;
  background: 
    linear-gradient(var(--huly-card), var(--huly-card)) padding-box,
    linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 100%) border-box;
}

/* Primary Glowing Ember Button */
.huly-btn-ember {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 28px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #381504;
  background-color: #E2E2E4;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 25px rgba(255, 170, 129, 0.45);
  cursor: pointer;
  transition: all 0.2s ease;
}

.huly-btn-ember:hover {
  background-color: #FFFFFF;
  box-shadow: 0 0 35px rgba(255, 170, 129, 0.7);
  transform: scale(1.02);
}
```

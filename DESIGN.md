---
name: Midnight Chef
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#ffffff'
  on-tertiary: '#303030'
  tertiary-container: '#e4e2e1'
  on-tertiary-container: '#656464'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: auto
---

## Brand & Style
The design system embodies a "Midnight Chef" aesthetic—tailored for the focused, late-night culinary creator. It prioritizes a high-end, utility-first atmosphere that feels as sharp and precise as a chef's knife. 

The visual style is a fusion of **Corporate Modern** and **Glassmorphism**. It utilizes deep, desaturated charcoal surfaces to reduce eye strain, punctuated by high-vibrancy lime accents that guide the user toward successful outcomes (like finding a recipe). The interface should feel appetizing through high-quality imagery, yet remain strictly functional and organized to assist in the high-cognitive task of cooking.

## Colors
The palette is rooted in the "Midnight" concept, using a multi-tiered dark gray scale to create depth without relying on pure black.

- **Primary (Lime Green):** Used exclusively for calls to action, active ingredient tags, and success states. It provides a sharp contrast against the dark background.
- **Surface Tiers:** The background uses the darkest neutral (`#0F0F0F`). Container surfaces use `#1A1A1A`, and elevated elements like cards or inputs use `#262626`.
- **Glassmorphism:** For overlays and floating headers, use a semi-transparent white tint with a heavy background blur (20px+) to maintain legibility while suggesting material depth.

## Typography
This design system utilizes **Inter** exclusively to achieve a clean, systematic look. 

- **Hierarchy:** Headlines use tighter letter spacing and bold weights to feel impactful and grounded. 
- **Readability:** Body text uses a slightly increased line height (1.5x) to ensure recipes are easy to read while cooking.
- **Functional Labels:** Captions and labels for ingredient weights or timestamps use a medium weight to maintain visibility against dark backgrounds.

## Layout & Spacing
The system is built on a strict **8px grid**. All margins, paddings, and component heights must be multiples of 8.

- **Grid Model:** Use a 12-column fluid grid for desktop and a 4-column grid for mobile.
- **Max Width:** Content should be constrained to a 1200px container on desktop to ensure line lengths for recipes remain optimal.
- **Vertical Rhythm:** Use larger gaps (`48px` or `lg`) between major sections like "Your Fridge" and "Suggested Recipes" to maintain a clean, breathable interface.

## Elevation & Depth
In this dark-mode system, depth is communicated through **Tonal Layering** and **Subtle Shadows**.

- **Level 0 (Background):** `#0F0F0F`. The base of the application.
- **Level 1 (Cards/Sections):** `#1A1A1A` with a 1px border of `rgba(255, 255, 255, 0.05)`.
- **Level 2 (Popovers/Active Elements):** `#262626`. Use a very soft, large-radius shadow: `0 20px 40px rgba(0, 0, 0, 0.4)`.
- **Glassmorphism:** Use for persistent navigation bars and modals. Apply a `backdrop-filter: blur(12px)` and a thin top-border to simulate light catching the edge of the glass.

## Shapes
The shape language is "Rounded," balancing professional precision with an approachable feel.

- **Standard Radius:** 8px (0.5rem) for buttons and input fields.
- **Large Radius:** 16px (1rem) for recipe cards and container sections.
- **Pill Shapes:** Used strictly for category tags (e.g., "Vegan," "15 mins") and status indicators to differentiate them from actionable buttons.

## Components
- **Buttons:** Primary buttons use the Lime Green (`#CCFF00`) background with black text for maximum contrast. Secondary buttons use a ghost style with a subtle white border.
- **Input Fields:** Deep charcoal backgrounds (`#262626`) with a 1px border. On focus, the border transitions to Lime Green.
- **Ingredient Chips:** Small, pill-shaped elements. When "in-stock," they use a subtle green tint; when missing, they use a dashed border.
- **Recipe Cards:** Feature high-resolution food photography at the top, with a 16px radius. The text content area uses the Glassmorphism style for a premium feel.
- **Checkboxes:** When checked, the box fills with Lime Green and displays a black checkmark icon.
- **Progress Bars:** For AI "Cooking" or "Searching" states, use a thin Lime Green line with a subtle outer glow to simulate energy.
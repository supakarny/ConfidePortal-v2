---
name: Confide Portal
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3c4a3d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6c7b6c'
  outline-variant: '#bbcbb9'
  surface-tint: '#006d32'
  primary: '#006d32'
  on-primary: '#ffffff'
  primary-container: '#00d166'
  on-primary-container: '#005324'
  inverse-primary: '#30e375'
  secondary: '#0059bb'
  on-secondary: '#ffffff'
  secondary-container: '#0070ea'
  on-secondary-container: '#fefcff'
  tertiary: '#565e74'
  on-tertiary: '#ffffff'
  tertiary-container: '#aeb5cf'
  on-tertiary-container: '#3f475c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#64ff92'
  primary-fixed-dim: '#30e375'
  on-primary-fixed: '#00210b'
  on-primary-fixed-variant: '#005224'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc7ff'
  on-secondary-fixed: '#001a41'
  on-secondary-fixed-variant: '#004493'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: IBM Plex Sans Thai
    fontSize: 57px
    fontWeight: '700'
    lineHeight: 64px
  headline-lg:
    fontFamily: IBM Plex Sans Thai
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: IBM Plex Sans Thai
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  title-lg:
    fontFamily: Sarabun
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Sarabun
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
---

# Design System Documentation: Confide Portal

## 1. Overview & Creative North Star

### The Creative North Star: "Confide Portal"
This design system moves away from the static, boxy constraints of traditional enterprise tools. Instead, it treats data as a living, breathing pulse. We are building "Confide Portal"—a high-end editorial experience where enterprise operations, sales activity logging, and claim reimbursement feel less like a chore and more like a curated command center.

To achieve this, we break the "template" look by utilizing **intentional asymmetry** and **tonal depth**. Rather than rigid grids, we use white space as a structural element. Elements should feel like they are floating in a clean, pressurized environment, using overlapping layers and high-contrast typography to guide the eye through complex data sets.

---

## 2. Colors & Surface Architecture

The palette is rooted in a pristine, light-mode foundation (`surface`), punctuated by high-performance accents that represent the "flow" of operations: Claims & Sales (`primary`) and System Status & Attendance (`secondary`).

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders to define sections or containers. Layout boundaries must be established solely through:
1.  **Background Color Shifts:** Placing a `surface-container-low` element against a `surface` background.
2.  **Tonal Transitions:** Using the hierarchy of `surface-container` tokens to imply separation.

### Surface Hierarchy & Nesting
Think of the UI as physical layers of fine, matte paper or frosted glass. 
*   **Base:** `surface` (#f8f9ff)
*   **Level 1 (Sections):** `surface-container-low` (#eff4ff)
*   **Level 2 (Cards/Modules):** `surface-container` (#e5eeff)
*   **Level 3 (Floating Actions/Modals):** `surface-container-highest` (#d3e4fe)

### The "Glass & Gradient" Rule
To escape the "flat" look, use **Glassmorphism** for floating elements (e.g., navigation bars or quick-action overlays). 
*   **Implementation:** Use a semi-transparent `surface` color with a `backdrop-blur` (12px–20px). 
*   **Signature Textures:** For main CTAs or data visualizations, apply subtle linear gradients transitioning from `primary` (#006d32) to `primary_container` (#00d166) to add a "glow" that feels premium and alive.

---

## 3. Typography: The Editorial Voice

We pair the engineered precision of **IBM Plex Sans Thai** with the clean, professional character of **Sarabun**.

*   **Display & Headlines (IBM Plex Sans Thai):** Use `display-lg` to `headline-sm` for high-impact data points (e.g., total claimed reimbursement). The rhythmic, technical structure of IBM Plex Sans Thai conveys an "engineered" aesthetic that feels both modern and authoritative.
*   **Body & Titles (Sarabun):** Use `title-lg` down to `body-sm` for all functional reading and navigation. Sarabun provides the "Clean, minimalist" legibility required for high-density information.
*   **Labels (Noto Sans):** Use `label-md` for small-scale metadata and system labels, ensuring universal clarity.
*   **Information Hierarchy:** Always lean into high-contrast scale. If a headline is `headline-lg`, the supporting label should be `label-md` to create a sophisticated, editorial "white space" around the content.

---

## 4. Elevation & Depth

We define hierarchy through **Tonal Layering** rather than structural scaffolding.

*   **The Layering Principle:** Depth is achieved by stacking. A `surface-container-lowest` (#ffffff) card placed on top of a `surface-container-low` (#eff4ff) background creates a natural, soft lift.
*   **Ambient Shadows:** For floating elements, use extra-diffused shadows. 
    *   **Spec:** Blur: 24px–40px | Opacity: 4%–8% | Color: Tinted with `on-surface` (#0b1c30). Never use pure black shadows.
*   **The "Ghost Border" Fallback:** If a container absolutely requires a boundary for accessibility, use the `outline-variant` (#bbcbb9) at **10-20% opacity**. This creates a "breath" of a line rather than a hard edge.

---

## 5. Components

### Buttons & Interaction
*   **Primary (Claims):** `primary` background with `on-primary` text. Use a 0.5rem (`DEFAULT`) corner radius. Apply a subtle `primary_container` outer glow on hover.
*   **Secondary (Attendance):** `secondary` background with `on-secondary` text. Reserved specifically for attendance-related actions.
*   **Tertiary:** Transparent background with `primary` text. Use for low-emphasis actions.

### Data Chips & Status
*   **High-Contrast Status:** Status indicators (e.g., "Active," "Approved," "Pending") must use the `primary_fixed` or `error_container` tokens for background, ensuring the `on-` variant provides maximum legibility.
*   **Operational Chips:** Rounded-full (`full`) chips with thin `outline-variant` (Ghost Border) to categorize operational status and departments.

### Inputs & Forms
*   **The Clean Input:** No bottom line or full box. Use a `surface-container-low` background with a subtle `outline-variant` ghost border. 
*   **Focus State:** Transition the background to `surface-container-lowest` and the border to a 2px `primary` stroke.

### Cards & Operational Lists
*   **Rule:** Forbid the use of divider lines. 
*   **Separation:** Use a `spacing-8` (2rem) vertical gap or a background shift to `surface-container-lowest` for individual items. 
*   **Asymmetry:** In operational dashboards, alternate card widths (e.g., a 60% width card next to a 40% width card) to break the "standard grid" and feel more like a custom-designed report.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use `IBMPlexSansThai` for all major numerical data to emphasize the structured tracking aspect.
*   **Do** leverage `surface_bright` to highlight active "Live" states in the UI.
*   **Do** use the Spacing Scale strictly. Gaps of `4` (1rem) and `8` (2rem) should be your primary layout drivers to maintain "breathing room."

### Don’t:
*   **Don’t** use 100% opaque grey borders. It breaks the "Confide Portal" immersion.
*   **Don’t** mix `primary` (Green) and `secondary` (Blue) within a single component unless it is a combined operational report. Keep the flows distinct.
*   **Don’t** use standard "Drop Shadows." If an element doesn't feel like it's floating through tonal shift, reconsider the layer hierarchy before adding a shadow.
*   **Don’t** crowd the interface. If a screen feels busy, increase the spacing to the next tier in the scale (e.g., move from `8` to `10`).
# Platform Design System Rules

**Version:** 2.0
**Stack:** React 18 · TypeScript · Tailwind CSS v4 · Vite
**Purpose:** Maintain a consistent, premium-quality UI across all platform pages.

---

## AI Design Agent Instructions

You are a product designer and frontend engineer maintaining this platform's design system.

When generating or modifying UI code:

1. **Reuse existing CSS classes** — all component primitives are defined in `src/index.css`
2. **Never introduce new spacing values** — use only the 4px-scale tokens below
3. **Never introduce new typography sizes** — use only the defined hierarchy
4. **Never duplicate component styles** — check existing `.ui-*` and `.georim-sidebar-*` classes first
5. **Follow color usage semantics** — do not use brand accent for decoration
6. **Preserve motion feel** — all transitions use `--ui-ease-out` and the three duration tiers

If a requested UI pattern breaks these rules, propose a compliant alternative using existing patterns.

---

## Core Design Principles

The interface must feel:

- **Calm** — neutral grays dominate, accent color is used sparingly
- **Predictable** — identical components behave identically everywhere
- **Minimal** — no decorative elements; every element has a purpose
- **Readable** — hierarchy is always clear, whitespace is generous

Every decision must prioritize: **Clarity · Consistency · Efficiency · Accessibility**

---

## Layout System

**Max page width:** 1280px – 1440px
**Grid:** 12 columns
**Standard split:** 8 columns primary / 4 columns secondary

**Page container class:** `.ui-page`
**Page header class:** `.ui-page-header`

---

## Spacing System

Spacing follows a strict **4px scale**. No other values are permitted.

| Token | Value | Common Use |
|-------|-------|------------|
| `4px` | `p-1 / gap-1` | Icon padding, tight insets |
| `8px` | `p-2 / gap-2` | Text spacing, inline gaps |
| `12px` | `p-3 / gap-3` | Input padding, badge padding |
| `16px` | `p-4 / gap-4` | Subcard padding, subcard gap |
| `24px` | `p-6 / gap-6` | Card padding, card gap |
| `32px` | `p-8 / gap-8` | Section gap, page padding |
| `40px` | `p-10 / gap-10` | Large section spacing |
| `48px` | `p-12 / gap-12` | Table row minimum height |
| `64px` | `p-16 / gap-16` | Page-level separation |

---

## Design Tokens (CSS Custom Properties)

These are defined in `src/index.css` and must be used by reference, not by hardcoded values.

### Surface Colors

```css
--surface-soft: #f5f7fb           /* Page background */
--surface-subtle: #fafbfd         /* Hover backgrounds */
--surface-glass: rgba(255,255,255,0.92)       /* Glass panels */
--surface-glass-strong: rgba(255,255,255,0.97) /* Strong glass */
--surface-border: rgba(148,163,184,0.2)       /* Default border */
--surface-border-strong: rgba(148,163,184,0.3) /* Emphasized border */
```

### Border Radius

```css
--ui-radius: 28px          /* Main cards */
--ui-radius-subcard: 22px  /* Subcards, dropdowns */
--ui-radius-sm: 14px       /* Buttons, inputs, small chips */
```

### Shadows

```css
--ui-shadow-soft: 0 12px 32px rgba(15,23,42,0.045)  /* Cards */
--ui-shadow-float: 0 16px 36px rgba(15,23,42,0.06)  /* Floating panels */
```

### Motion

```css
--ui-ease-out: cubic-bezier(0.22, 1, 0.36, 1)  /* All easing */
--ui-duration-micro: 120ms   /* Subtle interactions */
--ui-duration-hover: 150ms   /* Hover state changes */
--ui-duration-modal: 200ms   /* Panels, modals, entries */
```

### Focus & Interaction

```css
--ui-focus-ring: rgba(118,38,198,0.36)      /* Focus outline */
--ui-focus-ring-soft: rgba(118,38,198,0.14) /* Soft glow */
--ui-focus-border: rgba(118,38,198,0.52)    /* Focused input border */
```

---

## Color System

### Brand / Accent

| Value | Use |
|-------|-----|
| `#7626c6` | Primary buttons, active tabs, focus states, key icons |
| `#5f1fa3` | Button hover state |
| `#4d1c84` | Deep button active state |
| `#f1e5fb` | Brand light background (icon tiles, highlights) |

> Accent color must never be used for decorative purposes. Apply it only to interactive or communicative elements.

### Neutral Palette (Tailwind Gray)

| Token | Use |
|-------|-----|
| `gray-50` | Page background, lightest surface |
| `gray-100` | Light section backgrounds |
| `gray-200` | Borders, dividers |
| `gray-400` | Placeholder icons |
| `gray-500` | Secondary/supporting text |
| `gray-600` | Body text |
| `gray-700` | Secondary headings |
| `gray-900` | Primary text |

### Semantic Colors

| Color | Meaning | Usage |
|-------|---------|-------|
| `emerald-*` | Success, active, positive | Published status, revenue, check-in |
| `blue-*` | Information, attendees | Attendee count, info badges |
| `orange-*` | Warning, special data | Certain metrics, attention states |
| `red-*` | Error, destructive | Delete actions, error states |
| `yellow-*` | Caution, alert | Warning messages |
| `purple-*` | Premium, private | Private event status, premium tier |
| `violet-*` | High priority, admin | Admin roles, critical alerts |

---

## Card System

All content must live inside cards. Cards must never touch each other — always use gap or margin.

### Main Card

```
border-radius: var(--ui-radius)          /* 28px */
padding: 24px
border: 1px solid var(--surface-border)
shadow: var(--ui-shadow-soft)
```

### Subcard

```
border-radius: var(--ui-radius-subcard)  /* 22px */
padding: 16px
border: 1px solid var(--surface-border)
```

### Card Spacing

```
Gap between cards: 24px
Gap between section groups: 32px
```

---

## Typography

Font stack: `"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`

| Level | Size | Weight | Class |
|-------|------|--------|-------|
| Page Title | 32px / 2rem | 600 semibold | `.ui-page-title` |
| Section Title | 20px / 1.25rem | 600 semibold | `.ui-section-title` |
| Card Title | 16px / 1rem | 600 semibold | `.ui-card-title` |
| Body Text | 14px / 0.875rem | 400 regular | default |
| Metadata / Label | 12px / 0.75rem | 500 medium | `.ui-meta-text` / `.ui-card-subtitle` |

These are the **only five type sizes** permitted. Introduce no new sizes.

---

## Component Classes Reference

All component primitives are defined in `src/index.css`. Always use these classes — never recreate their styles inline.

### Layout

```
.ui-page              Page container with standard padding
.ui-page-header       Flex row: title + actions
.ui-page-title        32px semibold heading
.ui-page-subtitle     Supporting description text
.ui-section-header    Flex row: section title + actions
.ui-section-title     20px semibold section heading
.ui-card-title        16px semibold card heading
.ui-card-subtitle     12px supporting card text
.ui-meta-text         12px medium metadata
```

### Buttons

```
.ui-button                      Base button (required on all buttons)
.ui-button--default             Purple gradient, white text (primary action)
.ui-button--destructive         Red gradient (delete / destructive actions)
.ui-button--outline             White background, gray border
.ui-button--secondary           Light gray background
.ui-button--ghost               Transparent, hover on gray
.ui-button--link                Text link with underline
.ui-button--size-default        Standard size (48px min-height)
.ui-button--size-sm             Small size (40px min-height)
.ui-button--size-lg             Large size
.ui-button--size-icon           Square icon button (40×40)
```

Usage: always combine base + variant + size, e.g.:
`className="ui-button ui-button--default ui-button--size-default"`

### Tabs

```
.ui-tabs-list          Container for tab buttons
.ui-tabs-trigger       Individual tab button
                       Active state: data-state="active" (handled by Radix)
```

### Chips / Badges

```
.ui-chip               Pill-shaped filter chip
.ui-chip.is-active     Active/selected chip state
```

### Icons

```
.ui-icon-tile          Square icon container (neutral)
.ui-icon-tile--brand   Purple-tinted icon container
```

Icon sizes:

| Size | px | Use |
|------|----|-----|
| Small | 16px | Inline with text, tight UI |
| Medium | 20px | Standard component icons |
| Large | 24px | Prominent icons, empty states |

Icons must align with text baselines. Use `lucide-react` exclusively.

### Avatars

```
.ui-avatar             Circular container
.ui-avatar__image      Avatar image
.ui-avatar__fallback   Initials fallback
```

### Forms & Inputs

```
.ui-textarea           Textarea with standard styling
.ui-toolbar-select     Dropdown select
```

Input specs:
- Height: 40–44px
- Radius: `var(--ui-radius-sm)` (14px)
- Padding: 12px
- Placeholder: `gray-400`
- Focus: `var(--ui-focus-border)` border + `var(--ui-focus-ring-soft)` ring
- Labels: always above the input, never inside

### Progress

```
.ui-progress-track     Track background
.ui-progress-indicator Filled progress bar
```

### Dropdowns & Menus

```
.ui-menu-panel         Floating panel (dropdown, context menu, popover)
```

Menu panel uses:
- `border-radius: var(--ui-radius-subcard)`
- `background: rgba(255,255,255,0.98)`
- `backdrop-filter: blur(16px)`
- `box-shadow: 0 18px 40px rgba(15,23,42,0.12)`

### Content States

```
.ui-state-block        Container for loading / empty / error states
.ui-state-icon         Icon inside state block
.ui-state-message      Text message inside state block
```

Use `ContentState` component from `src/components/ui/ContentState.tsx` — never build these inline.

---

## Sidebar System

Navigation is handled by classes prefixed `.georim-sidebar-*`. Never modify the sidebar layout outside its dedicated component files.

```
.georim-sidebar-layout              Outer layout wrapper
.georim-sidebar-primary             Left navigation sidebar
.georim-sidebar-primary.is-collapsed  Collapsed state
.georim-sidebar-item                Navigation item button
.georim-sidebar-item.is-active      Active page item
.georim-sidebar-item.is-danger      Destructive action (logout)
.georim-sidebar-secondary           Right detail panel
.georim-sidebar-secondary.is-open   Open state
.georim-sidebar-group               Nav group container
.georim-sidebar-group__label        Group heading label
```

---

## Glass Effects

```css
/* Top bar */
background: rgba(255,255,255,0.84);
border-bottom: 1px solid var(--surface-border);
box-shadow: 0 8px 24px rgba(15,23,42,0.035);
backdrop-filter: blur(14px) saturate(118%);

/* Menu panels */
background: rgba(255,255,255,0.98);
backdrop-filter: blur(16px);
```

---

## Motion System

All transitions must use the defined duration variables and `--ui-ease-out` easing.

| Duration | Variable | When to use |
|----------|----------|-------------|
| 120ms | `--ui-duration-micro` | Color changes, opacity, subtle feedback |
| 150ms | `--ui-duration-hover` | Hover state changes, border shifts |
| 200ms | `--ui-duration-modal` | Panel entry/exit, modal open/close |

**Animation classes:**

```
.motion-page     Page-level fade-in on mount
.motion-row      Row-level fade-in (list items)
.motion-pop      Pop-scale (for menus and modals)
.motion-stagger  Staggered children (24ms per child, max 10)
```

**Rules:**
- Never exceed 200ms for any UI transition
- Never use `transform: scale()` for hover states (scale only for pop/modal entry)
- Animations must never distract from content

---

## Tables

- Row minimum height: 48px
- Numeric/currency columns: right-aligned
- All rows must have a hover state (`gray-50` background)
- Use `src/components/ui/table.tsx` primitives
- Use `src/components/ui/inline-analytics-table.tsx` for data tables with inline charts

---

## Accessibility

The platform must meet **WCAG AA** standards.

Requirements:
- All interactive elements must be keyboard-navigable
- Visible focus states on all focusable elements (use `--ui-focus-ring`)
- Color contrast ratio: minimum 4.5:1 for body text, 3:1 for large text
- All icons must have `aria-label` or be paired with visible text
- Use `useModalA11y` hook (`src/hooks/useModalA11y.ts`) for all modal dialogs

---

## Consistency Rule

If a component exists in the codebase, use it. Do not rebuild it.

Before creating anything new, check:

- `src/components/ui/` — all primitive UI components
- `src/index.css` `.ui-*` classes — all styled primitives
- `src/components/ui/ContentState.tsx` — loading/empty/error states
- `src/components/ui/button.tsx` + `button-variants.ts` — button system
- `src/components/ui/tabs.tsx` — tab navigation
- `src/components/ui/table.tsx` — table primitives

---

## Design Review Checklist

Before shipping any new UI, verify:

- [ ] Spacing uses only 4px-scale tokens
- [ ] Typography matches the five-level hierarchy
- [ ] Cards use `--ui-radius` (28px) and `--ui-radius-subcard` (22px)
- [ ] Buttons use `.ui-button` base class + variant + size
- [ ] All interactive elements have hover, active, focus, and disabled states
- [ ] Semantic colors are used correctly (not decoratively)
- [ ] No new CSS classes duplicating existing `.ui-*` primitives
- [ ] Motion durations stay within 120–200ms range
- [ ] Keyboard navigation works for all new interactions
- [ ] Color contrast meets WCAG AA

---

*End of Design System Rules — v2.0*

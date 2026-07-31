# 07. Design System & Design Tokens

This document outlines the complete ROFOOF Design System specification, establishing systematic design tokens for color, typography, spacing, shadows, radii, breakpoints, and animation timings.

---

## 1. Color System Architecture

### 1.1 Brand & Palette Tokens
```typescript
// theme/colors.ts
export const brandColors = {
  brand: {
    50: '#F0F3FA',
    100: '#DDE4F2',
    200: '#BDCBE6',
    300: '#94ABDA',
    400: '#6483C7',
    500: '#384E85', // Main Brand Primary
    600: '#2F4172',
    700: '#26345C',
    800: '#2A3A65', // Brand Dark Secondary
    900: '#19223D',
    950: '#0F1629',
  },
  accent: {
    green: '#10B981', // Success / Delivered / Completed
    amber: '#F59E0B', // Warning / Active Deliveries / Low Stock
    red: '#EF4444',   // Danger / Out of Stock / Cancelled
    blue: '#3B82F6',  // Info / Revenue / Wholesale
    purple: '#8B5CF6',// Marketing / Offers / B2B Tiers
    cyan: '#06B6D4',  // Metric Accent
    pink: '#EC4899',  // Customer Growth Accent
    orange: '#F97316',// Inventory Value Accent
  }
};
```

### 1.2 Semantic UI Colors (Light & Dark Mode Ready)
```typescript
export const semanticColors = {
  light: {
    bg: {
      canvas: '#FAFAFA',
      surface: '#FFFFFF',
      subtle: '#F4F5F8',
      muted: '#EBF0F7',
    },
    text: {
      primary: '#0F1629',
      secondary: '#7A8299',
      muted: '#9CA3AF',
      inverse: '#FFFFFF',
      brand: '#384E85',
    },
    border: {
      default: 'rgba(56, 78, 133, 0.08)',
      strong: 'rgba(56, 78, 133, 0.16)',
      focus: '#384E85',
    }
  },
  dark: {
    bg: {
      canvas: '#0B0F19',
      surface: '#151C2C',
      subtle: '#1E293B',
      muted: '#334155',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
      muted: '#64748B',
      inverse: '#0F1629',
      brand: '#6483C7',
    },
    border: {
      default: 'rgba(255, 255, 255, 0.08)',
      strong: 'rgba(255, 255, 255, 0.16)',
      focus: '#6483C7',
    }
  }
};
```

---

## 2. Typography System

### Font Family: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`

| Token Name | Font Size (rem / px) | Line Height | Font Weight | Usage Context |
|---|---|---|---|---|
| `display-1` | 2.25rem (36px) | 1.2 | 700 (Bold) | Dashboard main landing title |
| `h1` | 1.75rem (28px) | 1.25 | 700 (Bold) | Page section primary heading |
| `h2` | 1.375rem (22px) | 1.3 | 600 (SemiBold) | Card titles, modal headers |
| `h3` | 1.125rem (18px) | 1.4 | 600 (SemiBold) | Table group titles, drawer labels |
| `body-large` | 1rem (16px) | 1.5 | 500 (Medium) | Primary body text, main buttons |
| `body-base` | 0.875rem (14px) | 1.5 | 400 (Regular) | Default table text, input labels |
| `body-small` | 0.8125rem (13px) | 1.4 | 500 (Medium) | Subtitles, input placeholders |
| `caption` | 0.75rem (12px) | 1.4 | 500 (Medium) | Badge text, chart labels, metadata |
| `tiny` | 0.6875rem (11px) | 1.3 | 600 (SemiBold) | Sub-badge labels, mini counters |

---

## 3. Spacing System (8pt Architectural Grid)

```typescript
// theme/spacing.ts
export const spacing = {
  0: '0px',
  0.5: '0.125rem', // 2px
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
};
```

---

## 4. Radius, Shadows & Elevation Tokens

### Border Radius Tokens:
- `radius-xs`: `4px` (Badge pills, small tags)
- `radius-sm`: `8px` (Buttons, input boxes)
- `radius-md`: `11px` (Form fields, dropdown cards)
- `radius-lg`: `16px` (Stat cards, standard modals)
- `radius-xl`: `20px` (Main modal containers, login cards)
- `radius-full`: `9999px` (Avatars, status indicator dots)

### Elevation & Shadow Tokens:
```typescript
export const shadows = {
  xs: '0px 1px 2px rgba(0, 0, 0, 0.04)',
  sm: '0px 2px 8px rgba(0, 0, 0, 0.05)',
  md: '0px 4px 14px rgba(56, 78, 133, 0.08)',
  lg: '0px 8px 30px rgba(0, 0, 0, 0.06)',
  xl: '0px 20px 40px rgba(0, 0, 0, 0.12)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};
```

---

## 5. Viewport Breakpoints & Container Layout

```typescript
// theme/breakpoints.ts
export const breakpoints = {
  xs: '320px',   // Small mobile
  sm: '480px',   // Mobile large
  md: '768px',   // Tablet portrait
  lg: '1024px',  // Tablet landscape / Laptop small
  xl: '1280px',  // Desktop standard
  '2xl': '1536px',// Desktop wide
  '3xl': '1920px',// Ultra-wide display
};
```

### Layout Grid & Container Widths:
- **Sidebar Width**: `260px` (Expanded) / `72px` (Collapsed)
- **Header Height**: `70px` (Fixed)
- **Max Content Container Width**: `1600px` centered with fluid paddings.

---

## 6. Animation & Transition Tokens

```typescript
// theme/animations.ts
export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};
```
- Framer Motion transition presets configured for drawer slide-ins, modal popups, tab underline movements, and stat card hover elevations.

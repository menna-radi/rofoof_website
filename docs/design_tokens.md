# Design System Tokens Specification

This document consolidates all extracted design tokens for colors, typography, spacing, shadows, radii, breakpoints, and component sizing across the ROFOOF platform.

---

## 1. Color Palette Tokens

```typescript
export const colorTokens = {
  brand: {
    primary: '#384E85',      // Main Primary Blue
    dark: '#2A3A65',         // Dark Brand Secondary
    gradient: 'linear-gradient(135deg, #384E85 0%, #2A3A65 100%)',
    lightGradient: 'linear-gradient(135deg, #384E85 0%, #5B7BC8 100%)',
  },
  neutral: {
    bg: '#FAFAFA',            // Main Light Canvas Background
    surface: '#FFFFFF',       // Card & Container White Surface
    subtle: '#F4F5F8',        // Form Input & Gray Background
    border: 'rgba(56, 78, 133, 0.08)',
    borderStrong: 'rgba(56, 78, 133, 0.15)',
    textPrimary: '#0F1629',   // Dark Charcoal Text
    textSecondary: '#7A8299', // Muted Gray Text
    textMuted: '#9CA3AF',     // Sub-caption Text
  },
  accent: {
    green: '#10B981',
    greenBg: '#ECFDF5',
    amber: '#F59E0B',
    amberBg: '#FFFBEB',
    red: '#EF4444',
    redBg: '#FEF2F2',
    purple: '#7C3AED',
    purpleBg: '#F5F3FF',
    blue: '#EEF1F8',
    cyan: '#0891B2',
    cyanBg: '#ECFEFF',
    pink: '#DB2777',
    pinkBg: '#FDF2F8',
    orange: '#F97316',
    orangeBg: '#FFF7ED',
    priceSlate: '#5D6B82',   // Price Box Container Dark Slate
  }
};
```

---

## 2. Typography Scale Tokens

- **Font Families**: `'Inter'`, `'Cairo'`, `-apple-system`, `sans-serif`

| Token Name | Font Size | Line Height | Weight | Context |
|---|---|---|---|---|
| `font-title-lg` | 28px (1.75rem) | 1.2 | 700 (Bold) | Login welcome, main landing titles |
| `font-title-md` | 22px (1.375rem) | 1.25 | 700 (Bold) | Page header titles, section headings |
| `font-title-sm` | 17px (1.0625rem) | 1.3 | 700 (Bold) | Header title, card section titles |
| `font-[#0F1629]` | 26px (1.625rem) | 29px | 800 (ExtraBold) | Stat card KPI numbers |
| `font-body-md` | 14px (0.875rem) | 1.5 | 400 / 600 | Standard body text, form inputs |
| `font-body-sm` | 13px (0.8125rem) | 1.4 | 500 / 600 | Nav items, table rows, button labels |
| `font-caption` | 11px / 12px | 1.3 | 500 / 700 | Badges, sparkline details, sub-labels |

---

## 3. Border Radius & Shadow Tokens

### Radius Scale:
- `radius-sm`: `6px` / `8px` (Badges, sub-nav items)
- `radius-md`: `11px` / `12px` (Inputs, search bar, buttons)
- `radius-lg`: `14px` / `16px` (Summary cards, drawers)
- `radius-xl`: `20px` / `24px` (Stat cards, modals)
- `radius-full`: `9999px` (Avatars, live status dots)

### Elevation Shadow Scale:
- `shadow-xs`: `0px 1px 2px rgba(0, 0, 0, 0.04)`
- `shadow-card`: `0px 8px 30px rgba(0, 0, 0, 0.06)`
- `shadow-quick`: `0px 4px 14px rgba(56, 78, 133, 0.3)`
- `shadow-[#384E85]`: `0px 8px 24px rgba(0, 0, 0, 0.07)`
- `shadow-modal`: `0px 20px 40px rgba(0, 0, 0, 0.12)`

---

## 4. Component Size Standards

| Component | Standard Height | Horizontal Padding | Radius | Default Font Size |
|---|---|---|---|---|
| **Button (sm)** | 32px | 12px | 10px | 12px (Bold) |
| **Button (md)** | 38px / 40px | 16px | 12px | 13px (Bold) |
| **Button (lg)** | 46px | 20px | 12px | 15px (Bold) |
| **Form Input** | 41.5px / 44px | 14px | 12px | 13px / 14px |
| **Search Input** | 37px | 14px (left 38px) | 12px | 13px |
| **Sidebar Width**| 252px | 14px | N/A | 13px |
| **Header Height** | 64px | 32px | N/A | 17px |

# Component Consistency Audit

This document verifies structural, dimension, typography, and interactive state consistency across all shared React UI components.

---

## 1. UI Element Standard Dimensions & Tokens

| Component Name | Height Spec | Padding Spec | Border Radius | Default Font | Hover / Focus State |
|---|---|---|---|---|---|
| **Button (Primary)** | `38px` / `40px` | `padding: 9px 16px;` | `12px` | `13px` (Bold) | `shadow-[0_4px_14px_rgba(56,78,133,0.3)] hover:-translate-y-0.5` |
| **Button (Secondary)**| `38px` | `padding: 9px 16px;` | `12px` | `13px` (SemiBold) | `bg-[#EEF1F8] text-[#384E85]` |
| **Button (Ghost)** | `32px` / `38px` | `padding: 6px 14px;` | `10px` | `12.5px` (Medium) | `bg-black/5 text-[#0F1629]` |
| **Header Search Input**| `37px` | `padding: 0 14px 0 38px;` | `12px` | `13px` | `bg-[#F4F5F8] focus:border-[#384E85]` |
| **Form Input** | `41.5px` / `44px` | `padding: 10px 14px;` | `12px` | `13.5px` / `14px` | `bg-[#F4F5F8] focus:bg-white focus:shadow-[0_0_0_2px_#384E85]` |
| **Badge Pill** | `22px` | `padding: 2px 8px;` | `9999px` / `10px` | `11px` (SemiBold) | Custom color variants (`green`, `amber`, `red`, `blue`) |
| **Card Shell** | Dynamic | `padding: 20px;` | `20px` | Inherit | `bg-white border-[#384E85]/7 shadow-[0_8px_30px_rgba(0,0,0,0.06)]` |
| **Modal Overlay** | Max `90vh` | `padding: 28px;` | `24px` | Inherit | `bg-black/50 backdrop-blur-xs` |

---

## 2. Interactive State Matrix

- **Focus States**: High-contrast focus outline ring (`focus:border-[#384E85] focus:bg-white`).
- **Disabled States**: `opacity-50 cursor-not-allowed pointer-events-none`.
- **Transitions**: Governed by `transition-all duration-150 ease-in-out`.

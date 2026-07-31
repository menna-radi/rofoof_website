# 09. Localization Analysis (i18n & RTL)

This document provides a full localization audit of the ROFOOF application, preparing the platform for bilingual operations in **English (LTR)** and **Arabic (RTL)** using `i18next`.

---

## 1. Hardcoded Text & String Extraction Audit

Every user-facing label in the codebase is currently hardcoded in English across HTML tags and JavaScript string concatenations.

### String Distribution Breakdown:
1. **Navigation Labels** (`js/layout.js`): Hardcoded strings like `'Dashboard'`, `'Orders'`, `'Products'`, `'Inventory'`, `'Customers'`, `'Drivers'`, `'Dispatch'`, `'Analytics'`, `'Settings'`.
2. **Dashboard Stat Labels** (`js/app.js`): Hardcoded KPI titles (`'Total Revenue'`, `'Active Deliveries'`, `'Wholesale Revenue'`, `'Inventory Value'`).
3. **Form Labels & Placeholders** (`login.html`, `js/modals.js`): Hardcoded inputs like `'Sign In'`, `'Product Name'`, `'Organic Whole Milk 2L'`, `'Add Driver'`.
4. **Status Pill Texts**: Hardcoded badges (`'Delivered'`, `'Pending'`, `'Cancelled'`, `'Low Stock'`).

---

## 2. RTL (Arabic) Layout Architecture

```mermaid
graph TD
    A[Locale Switch: EN <-> AR] --> B[Set document.dir = rtl | ltr]
    B --> C[Set document.lang = ar | en]
    C --> D[Tailwind CSS RTL Modifiers: rtl:flex-row-reverse, rtl:space-x-reverse]
    C --> E[Icon Mirroring: Chevron, Arrow, Navigation Icons]
    C --> F[Font Family Switch: Inter -> Cairo / IBM Plex Sans Arabic]
```

### 2.1 CSS & Layout Mirroring Strategy:
- **Flexbox Direction**: `flex-row` automatically flips in RTL when using standard logical flex alignment (`justify-between`, `items-center`).
- **Margins & Paddings**: Convert legacy `margin-left: 12px;` to CSS Logical Properties:
  - `margin-inline-start: 12px;` (Adapts automatically to LTR/RTL).
  - `padding-inline-end: 16px;`
- **Icon Mirroring**: Back arrows, chevrons (`>`), and directional progress arrows must be mirrored using CSS transform `scaleX(-1)` or Lucide RTL icon props.

---

## 3. Formatting Standards: Dates, Currencies & Numbers

| Data Type | English (en-US) | Arabic (ar-SA) | Formatting Implementation |
|---|---|---|---|
| **Currency** | `$2,840.50` | `2,840.50 ر.س` | `Intl.NumberFormat(locale, { style: 'currency', currency: 'SAR' })` |
| **Dates** | `Oct 24, 2026` | `٢٤ أكتوبر ٢٠٢٦` | `Intl.DateTimeFormat(locale, { dateStyle: 'medium' })` |
| **Numbers** | `12,450` | `١٢,٤٥٠` | `Intl.NumberFormat(locale)` |
| **Pluralization** | `1 Order` / `5 Orders` | `طلب واحد` / `طلبين` / `٥ طلبات` / `١٥ طلباً` | `i18next` pluralization rules for Arabic (6 forms). |

---

## 4. i18next Locale File Structure

### Proposed Directory Layout:
```
src/localization/
├── i18n.ts
└── locales/
    ├── en/
    │   ├── common.json
    │   ├── auth.json
    │   ├── orders.json
    │   ├── products.json
    │   └── navigation.json
    └── ar/
        ├── common.json
        ├── auth.json
        ├── orders.json
        ├── products.json
        └── navigation.json
```

### 4.1 Sample JSON Locale Files:

#### `locales/en/orders.json`
```json
{
  "title": "Orders Management",
  "tabs": {
    "all": "All Orders",
    "active": "Active Orders",
    "pending": "Pending",
    "delivered": "Delivered",
    "cancelled": "Cancelled"
  },
  "table": {
    "orderId": "Order ID",
    "customer": "Customer",
    "amount": "Total Amount",
    "status": "Status"
  }
}
```

#### `locales/ar/orders.json`
```json
{
  "title": "إدارة الطلبات",
  "tabs": {
    "all": "جميع الطلبات",
    "active": "الطلبات النشطة",
    "pending": "قيد الانتظار",
    "delivered": "تم التوصيل",
    "cancelled": "ملغاة"
  },
  "table": {
    "orderId": "رقم الطلب",
    "customer": "العميل",
    "amount": "الإجمالي",
    "status": "الحالة"
  }
}
```

---

## 5. Arabic Typography Selection
- **Arabic Primary Font**: `Cairo` or `IBM Plex Sans Arabic` loaded via `@fontsource/cairo`.
- **CSS Rule**:
  ```css
  [dir="rtl"] {
    font-family: 'Cairo', 'Inter', -apple-system, sans-serif;
  }
  ```

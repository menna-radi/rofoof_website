# 06. Component Candidates Catalog

This document categorizes every repeated UI element in the ROFOOF application into reusable, modular atomic React components.

---

## 1. Atomic UI Component Hierarchy (Radix UI / Shadcn Pattern)

```mermaid
graph TD
    subgraph Shared UI Layer
        C1[Button Component]
        C2[Input / Textarea / Select]
        C3[Modal / Drawer Overlay]
        C4[Badge / Pill Component]
        C5[Card & Container Wrapper]
        C6[Data Table & Pagination]
        C7[Tabs & Segmented Control]
        C8[Toast & Feedback Alert]
    end
    
    subgraph Feature Modules
        M1[OrderTable & OrderDrawer]
        M2[ProductGrid & MultiStepWizard]
        M3[DispatchQueue & DriverCard]
        M4[CategoryTreeCard]
    end
    
    Shared UI Layer --> Feature Modules
```

---

## 2. Complete Reusable Components Catalog

### 2.1 Primitive / Base UI Components (`src/shared/components/ui/`)

| Component Name | Description & Variants | Core Props | Target File Path |
|---|---|---|---|
| `<Button />` | Primary, Secondary, Ghost, Danger, Outline buttons with loading spinner state | `variant`, `size`, `isLoading`, `leftIcon`, `rightIcon`, `disabled`, `onClick` | `src/shared/components/ui/button.tsx` |
| `<Input />` | Text, Email, Password, Number inputs with error message, helper text, clear button | `type`, `label`, `error`, `icon`, `placeholder`, `isRequired`, `register` | `src/shared/components/ui/input.tsx` |
| `<Textarea />` | Multi-line text field with character counter and auto-resize | `label`, `rows`, `error`, `maxLength`, `placeholder` | `src/shared/components/ui/textarea.tsx` |
| `<Select />` | Custom dropdown select with search, clearable selection, multiselect chips | `options`, `value`, `onChange`, `placeholder`, `isMulti`, `error` | `src/shared/components/ui/select.tsx` |
| `<Checkbox />` | Accessible checkbox component with custom indicator and sub-label | `label`, `description`, `checked`, `onChange`, `disabled` | `src/shared/components/ui/checkbox.tsx` |
| `<Switch />` | Toggle switch for visibility, active status, notification settings | `label`, `checked`, `onChange`, `size`, `disabled` | `src/shared/components/ui/switch.tsx` |
| `<Badge />` | Status indicator pills (Green, Amber, Red, Blue, Neutral) with optional dot indicator | `variant`, `color`, `hasDot`, `size`, `children` | `src/shared/components/ui/badge.tsx` |
| `<Card />` | Base card shell with customizable header, content body, footer, and hover effects | `variant`, `hasShadow`, `isHoverable`, `padding`, `children` | `src/shared/components/ui/card.tsx` |
| `<Modal />` | Accessible dialog popup overlay with backdrop blur, keyboard ESC close, focus trap | `isOpen`, `onClose`, `title`, `size`, `footer`, `children` | `src/shared/components/ui/modal.tsx` |
| `<Drawer />` | Slide-out side drawer for order details, notifications, filter panels | `isOpen`, `onClose`, `position`, `title`, `children` | `src/shared/components/ui/drawer.tsx` |
| `<Tabs />` | Tabbed navigation container with smooth animated underline indicator | `tabs`, `activeTab`, `onTabChange`, `variant` | `src/shared/components/ui/tabs.tsx` |
| `<Avatar />` | User / Driver avatar icon with online/busy status dot indicator | `src`, `name`, `size`, `statusColor`, `fallbackText` | `src/shared/components/ui/avatar.tsx` |

---

### 2.2 Data Display & Feedback Components (`src/shared/components/feedback/` & `data-display/`)

| Component Name | Description & Variants | Core Props | Target File Path |
|---|---|---|---|
| `<DataTable />` | Reusable data table with sortable columns, checkboxes, pagination, dynamic actions | `columns`, `data`, `isLoading`, `onSort`, `pagination`, `onRowClick` | `src/shared/components/data-display/data-table.tsx` |
| `<Pagination />` | Page selector with page number buttons, item count status, items-per-page selector | `currentPage`, `totalPages`, `onPageChange`, `totalItems`, `pageSize` | `src/shared/components/data-display/pagination.tsx` |
| `<Skeleton />` | Animated loading placeholder skeleton for tables, cards, and stat blocks | `variant`, `width`, `height`, `count`, `className` | `src/shared/components/feedback/skeleton.tsx` |
| `<Toast />` | Global notification message toast (Success, Error, Info, Warning) with auto-dismiss | `type`, `message`, `description`, `duration`, `onClose` | `src/shared/components/feedback/toast.tsx` |
| `<EmptyState />` | Fallback component when zero search results, empty cart, or empty table | `icon`, `title`, `description`, `actionButton` | `src/shared/components/feedback/empty-state.tsx` |
| `<StatCard />` | Metric card with sparkline SVG graph, percentage trend badge, icon, and background gradient | `title`, `value`, `change`, `isUp`, `sparklineData`, `icon`, `color` | `src/modules/dashboard/components/stat-card.tsx` |

---

### 2.3 Navigation & Layout Components (`src/shared/components/navigation/` & `layout/`)

| Component Name | Description & Variants | Core Props | Target File Path |
|---|---|---|---|
| `<Sidebar />` | Global collapsible navigation menu with nested sub-menus, quick action button, and profile footer | `activeNav`, `activeSub`, `isCollapsed`, `onToggleCollapse` | `src/shared/components/navigation/sidebar.tsx` |
| `<Header />` | Global top bar with search bar, quick notification dropdown bell, language switcher, user menu | `title`, `onSearch`, `unreadNotificationsCount` | `src/shared/components/navigation/header.tsx` |
| `<Breadcrumb />` | Page hierarchy breadcrumb trails | `items` (`label`, `href`, `icon`) | `src/shared/components/navigation/breadcrumb.tsx` |
| `<LanguageSwitcher />` | Toggle button/dropdown for switching application locale (English LTR / Arabic RTL) | `currentLocale`, `onLanguageChange` | `src/shared/components/navigation/language-switcher.tsx` |
| `<ThemeSwitcher />` | Dark/Light mode theme toggle button | `theme`, `onThemeToggle` | `src/shared/components/navigation/theme-switcher.tsx` |

---

### 2.4 Domain Feature Components (`src/modules/`)

| Component Name | Domain Module | Description & Responsibility | Target File Path |
|---|---|---|---|
| `<MultiStepProductWizard />` | `products` | 5-step modal wizard for creating and editing products | `src/modules/products/components/product-wizard.tsx` |
| `<OrderDetailsDrawer />` | `orders` | Slide-out detail drawer for order items, address, status updates | `src/modules/orders/components/order-details-drawer.tsx` |
| `<CreateOfferModal />` | `marketing` | Modal for creating promotional deals and discount vouchers | `src/modules/marketing/components/create-offer-modal.tsx` |
| `<AddDriverModal />` | `drivers` | Modal for adding new fleet driver with vehicle details | `src/modules/drivers/components/add-driver-modal.tsx` |
| `<LiveMapTracker />` | `drivers` | Real-time map viewport with driver marker icons and delivery routes | `src/modules/drivers/components/live-map-tracker.tsx` |
| `<DispatchQueueBoard />` | `dispatch` | Queue board for matching unassigned orders with available drivers | `src/modules/dispatch/components/dispatch-queue-board.tsx` |

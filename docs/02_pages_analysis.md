# 02. Pages Analysis

This document provides a deep structural and functional analysis of all 13 HTML pages in the ROFOOF dashboard repository.

---

## 1. `login.html` (Authentication Page)
- **Purpose**: Authenticates administrative and operational users before granting access to dashboard features.
- **Sections**:
  - Left Container: Logo branding, heading title, sign-in form box, demo account credentials note.
  - Right Banner: Dark blue gradient hero card with feature stats (12K+ Orders, 500+ Products, 50+ Drivers).
- **Layout**: CSS Flexbox 2-column layout (`.login-page`). Hides right column on viewports `<= 768px`.
- **Forms & Inputs**:
  - `loginForm`: `#loginEmail` (type `email`), `#loginPassword` (type `password`), remember me checkbox (`input[type="checkbox"]`).
- **Buttons**: Submit button `.login-btn` with inline SVG lock icon.
- **Popups / Feedback**: Error alert banner `#loginError` displayed via `style.display = 'block'`.
- **JavaScript Used**: Inline script `handleLogin(e)` validating against static strings (`admin@rofoof.com` / `admin123`) and setting `sessionStorage.setItem('rofoof_logged_in', 'true')`.
- **Dependencies**: Google Font `Inter`, local CSS in `<style>` tag, `img/logo.png`.
- **Future Reusable Component Candidate**: `<LoginForm />`, `<AuthLayout />`, `<StatBadgeGroup />`.

---

## 2. `pages/index.html` (Main Operations Dashboard)
- **Purpose**: High-level overview of daily metrics, revenue stats, active deliveries, recent orders, and stock alerts.
- **Sections**:
  - Header & Sidebar Placeholders: Injected by `js/layout.js`.
  - Stats Grid: 8 main KPI cards with inline SVG sparkline charts.
  - Operational Mini Grid: 6 mini status cards (Online drivers, Available drivers, Awaiting assign, etc.).
  - Main Dashboard Content Grid: Recent Orders table, Driver Status list, Stock Summary widget.
- **Layout**: Responsive CSS Grid (`.stats-grid`, `.dash-grid`).
- **Tables**: Recent Orders table showing Order ID, Customer, Items, Total, Payment status, Order status, Action button.
- **Cards**: `.stat-card`, `.mini-card`, `.dash-card`.
- **Popups / Modals**: Integrates global quick action modals injected by `js/modals.js`.
- **JavaScript Used**: `js/layout.js`, `js/app.js` (`renderStats()`, `renderMiniStats()`, `makeSparkline()`, `renderOrdersTable()`), `js/modals.js`, `js/notifications.js`.
- **Dependencies**: `css/index.css`, `js/layout.js`, `js/app.js`, `js/modals.js`.
- **Future Reusable Component Candidate**: `<StatCard />`, `<SparklineChart />`, `<RecentOrdersTable />`, `<DriverStatusList />`, `<StockSummaryWidget />`.

---

## 3. `pages/orders.html` (Order Management)
- **Purpose**: Operational management of retail and wholesale customer orders across all lifecycle states.
- **Sections**:
  - Page Title Bar: Title, filter buttons, search input, Create Order button.
  - Tab Bar: Filter tabs (All Orders, Active Orders, Pending, Delivered, Cancelled).
  - Main Order Table: Order ID, Customer name/address, Date, Items, Amount, Status badge, Quick Actions.
- **Layout**: Full-width container with sticky filter header and data grid.
- **Forms & Inputs**: Search bar, status dropdown filter, date picker range input.
- **Tables**: `.orders-table` with multi-select check boxes, status pills (`.badge-status`), action menus.
- **Popups / Drawers**: Order details drawer/slide-out overlay, Create Order modal.
- **JavaScript Used**: `js/layout.js`, `js/orders.js`, `js/modals.js`.
- **Dependencies**: `css/index.css`, `css/orders.css`, `js/orders.js`.
- **Future Reusable Component Candidate**: `<OrderTable />`, `<OrderFilterTabs />`, `<OrderStatusBadge />`, `<OrderDetailsDrawer />`, `<CreateOrderModal />`.

---

## 4. `pages/products.html` (Product Catalog)
- **Purpose**: Inventory catalog management for products, pricing, categories, stock availability, and visibility.
- **Sections**:
  - Action Header: Page title, search bar, Category select filter, Status filter, Add Product button.
  - Product List / Grid: Product image, Product SKU, Category badge, Unit price, B2B wholesale price, Stock count, Status toggle switch.
- **Layout**: CSS Grid / Flexbox list view with responsive table fallback.
- **Forms & Inputs**: Text search, category dropdown, stock status toggle switch (`.switch`).
- **Cards**: `.product-card` / `.product-table-row`.
- **Popups / Modals**: 5-Step Stepper Modal (`#addProductModal`) for adding and editing product information.
- **JavaScript Used**: `js/layout.js`, `js/products.js`, `js/modals.js`.
- **Dependencies**: `css/index.css`, `css/products.css`, `js/products.js`.
- **Future Reusable Component Candidate**: `<ProductCatalogGrid />`, `<ProductFilterBar />`, `<MultiStepProductWizard />`, `<StockStatusToggle />`.

---

## 5. `pages/categories.html` (Category Hierarchy Management)
- **Purpose**: Structure and organize product categories and sub-categories with visual cards and item counts.
- **Sections**:
  - Category Stats Row: Total categories, active categories, top performing category.
  - Category Grid: Parent category cards (Dairy, Produce, Bakery, etc.) showing total items, sub-category chips, edit/delete actions.
  - Sub-category Management Panel: Tree view structure for creating sub-categories.
- **Layout**: Responsive 3-column CSS Grid.
- **Forms & Inputs**: Category name input, parent selector dropdown, icon selector, image file upload.
- **Cards**: `.category-card` with image preview, icon badge, subcategory list.
- **JavaScript Used**: `js/layout.js`, `js/categories.js`, `js/modals.js`.
- **Dependencies**: `css/index.css`, `css/categories.css`, `js/categories.js`.
- **Future Reusable Component Candidate**: `<CategoryCard />`, `<CategoryTree />`, `<CategoryModal />`, `<SubcategoryChip />`.

---

## 6. `pages/stock-overview.html` (Inventory Control)
- **Purpose**: Warehouse inventory monitoring, low-stock alerts, out-of-stock tracking, and batch reorder triggers.
- **Sections**:
  - Stock KPI Bar: Total Inventory Value ($14.2M), Low Stock items (12), Out of Stock (3), Incoming Shipments.
  - Inventory Table: SKU, Product Name, Warehouse location, Available stock, Reserved stock, Reorder point, Status.
- **Layout**: Metric summary header + responsive inventory table.
- **Buttons**: Batch Reorder button, Export Inventory report button.
- **JavaScript Used**: `js/layout.js`, `js/modals.js`.
- **Dependencies**: `css/index.css`, `css/stock-overview.css`.
- **Future Reusable Component Candidate**: `<InventoryKpiBar />`, `<InventoryTable />`, `<StockAlertBadge />`, `<ReorderModal />`.

---

## 7. `pages/customers-accounts.html` (CRM & Accounts)
- **Purpose**: Manage B2B wholesale buyers and B2C retail customer profiles, credit limits, and order histories.
- **Sections**:
  - Customer Segment Tabs: All Customers, B2B Wholesale Accounts, B2C Retail Customers, VIP / Credit Tier.
  - Customer Data Table: Name, Account Type (Wholesale/Retail), Total Orders, Lifetime Value, Credit Limit / Balance, Status.
- **Forms & Inputs**: Account type filter, customer search bar.
- **JavaScript Used**: `js/layout.js`, `js/modals.js`.
- **Dependencies**: `css/index.css`, `css/customers-accounts.css`.
- **Future Reusable Component Candidate**: `<CustomerTable />`, `<CustomerSegmentFilter />`, `<CreditLimitBadge />`, `<CustomerProfileDrawer />`.

---

## 8. `pages/drivers.html` (Fleet Management)
- **Purpose**: Roster management for delivery drivers, status monitoring (Online/Busy/Offline), vehicle info, and delivery stats.
- **Sections**:
  - Fleet Summary Banner: Active drivers, Available drivers, On-route drivers, Average delivery time.
  - Driver Grid / Table: Driver photo avatar, Name, Phone, Vehicle type (Van/Motorcycle), Assigned zone, Completed orders, Rating, Status badge.
- **Popups**: Add Driver Modal (`openAddDriverModal()`).
- **JavaScript Used**: `js/layout.js`, `js/modals.js`.
- **Dependencies**: `css/index.css`, `css/drivers.css`.
- **Future Reusable Component Candidate**: `<DriverRosterGrid />`, `<DriverCard />`, `<FleetSummaryHeader />`, `<AddDriverModal />`.

---

## 9. `pages/live-tracking.html` (Real-Time GPS Map)
- **Purpose**: Interactive map workspace for monitoring live driver locations, delivery routes, and real-time ETAs.
- **Sections**:
  - Live Map Container: Simulated map grid with active driver markers and route lines.
  - Side Route Panel: List of active driver deliveries, destination addresses, remaining time, call driver action.
- **JavaScript Used**: `js/layout.js`, custom map rendering logic.
- **Dependencies**: `css/index.css`, `css/live-tracking.css`.
- **Future Reusable Component Candidate**: `<LiveMapTracker />`, `<ActiveRoutePanel />`, `<DriverLocationMarker />`, `<EtaStatusBadge />`.

---

## 10. `pages/dispatch-board.html` (Dispatch Control Center)
- **Purpose**: Dispatch management hub for matching unassigned orders to optimal delivery drivers.
- **Sections**:
  - Assignment Queue: Unassigned orders awaiting driver assignment with urgency timers.
  - Available Driver Column: List of online drivers ready for dispatch with capacity indicators.
  - Dispatch Actions: One-click auto-assign or manual assignment drag-and-drop interface.
- **JavaScript Used**: `js/layout.js`, `js/dispatch-board.js`, `js/modals.js`.
- **Dependencies**: `css/index.css`, `css/dispatch-board.css`, `js/dispatch-board.js`.
- **Future Reusable Component Candidate**: `<DispatchQueue />`, `<DriverAssignCard />`, `<AutoDispatchControl />`.

---

## 11. `pages/analytics.html` (Business Intelligence)
- **Purpose**: Executive dashboard with graphical reports on financial performance, order trends, and logistics KPIs.
- **Sections**:
  - Date Range & Filter Bar: Custom date picker, store branch filter, export report button.
  - Chart Canvas Grid: Revenue vs Profit chart, Category sales distribution pie chart, Peak ordering hours heatmap.
- **JavaScript Used**: `js/layout.js`, canvas/SVG chart renderers.
- **Dependencies**: `css/index.css`, `css/analytics.css`.
- **Future Reusable Component Candidate**: `<AnalyticsChartCard />`, `<DateRangePicker />`, `<MetricSummaryCard />`.

---

## 12. `pages/settings.html` (System Configuration)
- **Purpose**: Application settings, store branch details, delivery radius, tax configurations, and staff permission profiles.
- **Sections**:
  - Navigation Sidebar / Tabs: General Info, Store Location & Hours, Delivery Zones & Fees, Tax & Billing, Team Permissions, Notifications.
  - Configuration Form Panels: Inputs for store name, address, tax ID, delivery radius (km), fee rules, email/SMS notification toggles.
- **JavaScript Used**: `js/layout.js`, `js/settings.js`.
- **Dependencies**: `css/index.css`, `css/settings.css`, `js/settings.js`.
- **Future Reusable Component Candidate**: `<SettingsTabContainer />`, `<SettingFormSection />`, `<DeliveryZoneEditor />`, `<PermissionToggleGrid />`.

---

## 13. `pages/modals.html` (Modal & Drawer Showcase)
- **Purpose**: Showcase and test ground for all application quick action modals and dialog components.
- **Sections**:
  - Trigger Buttons: Test buttons for triggering each application modal.
  - Rendered Dialog Container: Injected modal structures from `js/modals.js`.
- **JavaScript Used**: `js/layout.js`, `js/modals.js`.
- **Dependencies**: `css/index.css`, `js/modals.js`.
- **Future Reusable Component Candidate**: Test catalog / Storybook story documentation.

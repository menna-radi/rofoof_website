import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '@/app/layouts/admin-layout';
import { LoginPage } from '@/modules/auth/pages/login-page';
import { DashboardPage } from '@/modules/dashboard/pages/dashboard-page';
import { OrdersPage } from '@/modules/orders/pages/orders-page';
import { ProductsPage } from '@/modules/products/pages/products-page';
import { CategoriesPage } from '@/modules/products/pages/categories-page';
import { StockOverviewPage } from '@/modules/inventory/pages/stock-overview-page';
import { CustomersPage } from '@/modules/customers/pages/customers-page';
import { DriversPage } from '@/modules/drivers/pages/drivers-page';
import { LiveTrackingPage } from '@/modules/drivers/pages/live-tracking-page';
import { DispatchBoardPage } from '@/modules/dispatch/pages/dispatch-board-page';
import { AnalyticsPage } from '@/modules/analytics/pages/analytics-page';
import { SettingsPage } from '@/modules/settings/pages/settings-page';
import { OffersDealsPage } from '@/modules/marketing/pages/offers-deals-page';
import { PushNotificationsPage } from '@/modules/marketing/pages/push-notifications-page';
import { tokenStorage } from '@/core/services/TokenStorageService';
import { ROUTE_PATHS } from '@/app/routes/routePaths';

// Protected Route Guard — reads auth state from TokenStorageService only
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = tokenStorage.isAuthenticated();
  return isAuthenticated ? <>{children}</> : <Navigate to={ROUTE_PATHS.LOGIN} replace />;
};


export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard Admin Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="stock-overview" element={<StockOverviewPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="drivers" element={<DriversPage />} />
          <Route path="live-tracking" element={<LiveTrackingPage />} />
          <Route path="dispatch-board" element={<DispatchBoardPage />} />
          <Route path="marketing" element={<Navigate to="/marketing/offers" replace />} />
          <Route path="marketing/offers" element={<OffersDealsPage />} />
          <Route path="marketing/notifications" element={<PushNotificationsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

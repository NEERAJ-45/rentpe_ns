import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
  // Navigate,
} from 'react-router-dom';

import AuthGuard from '@/components/AuthGuard';

import LoadingSpinner from '@/components/LoadingSpinner';
import NotFound from '@/components/NotFound';
import ProductsManagement from '@/pages/vendor/ProductsManagement';
import OrderManagement from '@/pages/vendor/OrderManagement';
import CustomersManagement from '@/pages/vendor/CustomersManagement';
import PaymentsManagement from '@/pages/vendor/PaymentsManagement';
import Marketing from '@/pages/vendor/Marketing';
import VendorSettings from '@/pages/vendor/VendorSettings';
import VendorProfile from '@/pages/vendor/Profile/VendorProfile';
import Account from '@/pages/vendor/Profile/Account';
import AccountManager from '@/pages/vendor/Profile/AccountManager';
import BankDetails from '@/pages/vendor/Profile/BankDetails';
import BusinessDetails from '@/pages/vendor/Profile/BusinessDetails';
import { Calendar, Settings } from 'lucide-react';
import ManagePartners from '@/pages/vendor/Profile/ManagePartners';
import ManageSessions from '@/pages/vendor/Profile/ManageSessions';
import DeveloperAccess from '@/pages/vendor/Profile/DeveloperAccess';

const MainLayout = lazy(() => import('@/layouts/MainLayout'));
const HomePage = lazy(() => import('@/pages/Main/HomePage'));
const AuthPage = lazy(() => import('@/pages/Auth/AuthPage'));
const VendorLayout = lazy(() => import('@/layouts/VendorLandingLayout'));
const VendorHome = lazy(() => import('@/pages/vendor/VendorHome'));
const VendorGuide = lazy(() => import('@/pages/vendor/VendorGuide'));
const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout'));
const VendorDashboardLayout = lazy(() => import('@/layouts/VendorDashboardLayout'));
const AdminDashboardLayout = lazy(() => import('@/layouts/AdminDashboardLayout'));
const VendorDashboard = lazy(() => import('@/pages/dashboard/VendorDashboard'));
const AdminDashboard = lazy(() => import('@/pages/dashboard/AdminDashboard'));

// Layout wrappers
const MainLayoutWrapper = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

const VendorLayoutWrapper = () => (
  <VendorLayout>
    <Outlet />
  </VendorLayout>
);

const DashboardLayoutWrapper = () => (
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
);

// Router configuration
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public main routes */}
      <Route path="/" element={<MainLayoutWrapper />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
      </Route>

      {/* Public vendor routes */}
      <Route path="/vendor" element={<VendorLayoutWrapper />}>
        <Route index element={<VendorHome />} />
        <Route path="home" element={<VendorHome />} />
        <Route path="guide" element={<VendorGuide />} />
      </Route>

      {/* Protected dashboard routes */}
      <Route path="/dashboard" element={<DashboardLayoutWrapper />}>
        {/* vendor routing  */}
        <Route element={<AuthGuard roles={['vendor']} />}>

          {/* Profile routes */}
          <Route path="vendor-profile" element={<VendorProfile />} />
          <Route path="vendor-account" element={<Account />} />
          <Route path="vendor-account-manager" element={<AccountManager />} />
          <Route path="vendor-bank-details" element={<BankDetails />} />
          <Route path="vendor-business-details" element={<BusinessDetails />} />
          <Route path="vendor-settings" element={<Settings />} />
          <Route path="vendor-calendar" element={<Calendar />} />
          <Route path="vendor-manage-partners" element={<ManagePartners />} />
          <Route path="vendor-manage-sessions" element={<ManageSessions />} />
          <Route path="vendor-developer-access" element={<DeveloperAccess />} />


          {/* dashboard routes */}
          <Route path="vendor" element={<VendorDashboardLayout />}>
            <Route index element={<VendorDashboard />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="customers" element={<CustomersManagement />} />
            <Route path="payments" element={<PaymentsManagement />} />
            <Route path="marketing" element={<Marketing />} />
            <Route path="settings" element={<VendorSettings />} />
          </Route>
        </Route>

        {/* admin dashbaord routing */}
        {/* <Route element={<AuthGuard roles={['admin']} />}> */}
        <Route path="admin" element={<AdminDashboardLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
        {/* </Route> */}

      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<NotFound />} />
    </>
  )
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRoutes;

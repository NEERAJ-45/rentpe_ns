import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VendorLayout from '@/pages/vendor/VendorLayout';
import VendorHome from '@/pages/vendor/VendorHome';
import MainPage from '@/pages/Main/MainLayout';
import AuthPage from '@/pages/Auth/AuthPage';
import HomePage from '@/pages/Main/HomePage';
import SellOnFliplart from '@/pages/vendor/VendorRegister';
import UserLayout from '@/pages/User/UserLayout';
import AccountDashboard from '@/pages/User/ProfileDashboard';
import { ProfileManagement } from '@/pages/User/ProfileManagement';
import { AccountManager } from '@/pages/User/AccountManager';
import { BankDetails } from '@/pages/User/BankDetails';
// import { Settings } from '@/pages/User/Settings';
import  CalendarPage  from '@/pages/User/Calendar';
import  Partners  from '@/pages/User/Partner';
import Sessions  from '@/pages/User/Sessions';
import DeveloperAccessPage  from '@/pages/User/DeveloperAccess';
import Settingss from "@/pages/User/Settings"
import BuisnessDetails from "@/pages/User/BuisnessDetails"

const AppRoutes: React.FC = () => {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    {/* main pages / home pages  */}
                    <Route path="/" element={<MainPage />}>
                        <Route index element={<HomePage />} />
                        <Route path="home" element={<HomePage />} />
                        {/* auth routes / layout */}
                        <Route path="auth" element={<AuthPage />}>
                            {/* <Route path="login" element={<h1>Login</h1>} />
            <Route path="register" element={<h1>Register</h1>} /> */}
                        </Route>
                    </Route>

                    {/* vendor specific routes */}
                    <Route path="/vendor" element={<VendorLayout />}>
                        <Route index element={<VendorHome />} />
                        <Route path="home" element={<VendorHome />} />
                        <Route path="register" element={<SellOnFliplart />} />
                    </Route>
                    <Route path="/user" element={<UserLayout />}>
                        <Route path="profile">
                            <Route index element={<AccountDashboard />} />
                            <Route path="manage-profile" element={<ProfileManagement />} />
                            <Route path="account-manager" element={<AccountManager />} />
                            <Route path="bank-details" element={<BankDetails />} />
                            <Route path="business-details" element={<BuisnessDetails />} />
                            <Route path="settings" element={<Settingss />} />
                            <Route path="calendar" element={<CalendarPage />} />
                            <Route path="partners" element={<Partners />} />
                            <Route path="sessions" element={<Sessions />} />
                            <Route path="developer-access" element={<DeveloperAccessPage />} />
                        </Route>
                    </Route>
                    {/* User Specific Routes */}

                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
};
export default AppRoutes;

import VendorNav from '@/components/ui/VendorNav';
import React from 'react';
import { Outlet } from 'react-router-dom';
import UserNav from '../../components/ui/UserNav';
import { Toaster } from 'sonner';
import { ToastProvider } from "@/components/ui/toast"

function User() {
    return (
        <React.Fragment>
            <ToastProvider>
                <div className="min-h-screen bg-[#F5F4F9]">
                    <Toaster
                        position="bottom-right"
                        theme="light"
                        toastOptions={{
                            className:
                                'border border-blue-400 bg-white text-blue-700 shadow-xl rounded-lg',
                            style: {
                                padding: '12px 16px',
                                backdropFilter: 'blur(6px)',
                                animation: 'fadeInUp 0.3s ease-in-out',
                            },
                        }}
                    />
                    <UserNav />
                    <Outlet />
                </div>
            </ToastProvider>
        </React.Fragment>
    );
}

export default User;

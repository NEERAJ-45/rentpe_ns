import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import React, { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <div className="min-h-screen bg-[#F5F4F9]">
        <Navbar />
        {children} {/* Render children here */}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default MainLayout;

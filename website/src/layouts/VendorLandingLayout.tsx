import Footer from '@/components/ui/Footer'
import VendorNav from '@/components/ui/VendorNav'
import React from 'react'

interface VendorLayoutProps {
  children: React.ReactNode;
}

const VendorLayout: React.FC<VendorLayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <div className="min-h-screen bg-[#F5F4F9]">
        <VendorNav />
        {children} {/* Render children here */}
        <Footer />
      </div>
    </React.Fragment>
  )
}

export default VendorLayout
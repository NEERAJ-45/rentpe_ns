import VendorNav from '@/components/ui/VendorNav'
import React from 'react'
import { Outlet } from 'react-router-dom'

function Vendor() {
  return (
    <React.Fragment>
      <div className="min-h-screen bg-[#F5F4F9]">
        <VendorNav />
        <Outlet />
      </div>
    </React.Fragment>
  )
}

export default Vendor
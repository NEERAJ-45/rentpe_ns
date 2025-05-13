import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainPage: React.FC = () => {
  return (
    <React.Fragment>
      <div className="min-h-screen bg-[#F5F4F9]">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </React.Fragment>
  )
}

export default MainPage
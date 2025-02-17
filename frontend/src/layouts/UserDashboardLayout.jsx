import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardFooter from '../components/footer/DashboardFooter'
import UserDashboardHeader from '../components/header/UserDashboardHeader'
import { Toaster } from '@/components/ui/toaster'
const UserDashboardLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <header>
        <UserDashboardHeader />
      </header>
      <main className='flex-grow p-4 flex '>
        <Toaster />
        <Outlet />
      </main>
      <footer>
        <DashboardFooter className='' />
      </footer>
    </div>
  )
}

export default UserDashboardLayout
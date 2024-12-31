import React from 'react'

import DashboardFooter from '../components/footer/DashboardFooter'
import { Outlet } from 'react-router-dom'
import AdminDashboardHeader from '../components/header/AdminDashboardHeader'
const AdminDashboardLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <header>
        <AdminDashboardHeader />
      </header>
      <main className='flex-grow p-4'>
      <Outlet/>
      </main>
      <footer>
        <DashboardFooter className='' />
      </footer>
    </div>

  )
}

export default AdminDashboardLayout

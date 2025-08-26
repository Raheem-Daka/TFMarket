import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminSideBar from './AdminSideBar';
import AdminHeader from './AdminHeader';

 function AdminLayout() {
  return (
    <div className='flexl min-h-screen w-full'>
      <div className='flex-col flex-1  flex-col w-full'>
        <main className='flex-1 flex bg-muted/40 '>
        <AdminHeader />
        <AdminSideBar />
          <Outlet />
        </main>
      </div>
    </div>
  )
}
export default AdminLayout;
import { Outlet } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";
import AdminHeader from "./AdminHeader";
import { useState } from "react";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-muted/40 relative">
      {/* Sidebar - Fixed on large screens */}
      <div className="hidden lg:block fixed top-0 left-0 h-full w-64 z-20 bg-blue-50 border-r">
        <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
      </div>

      {/* Header - Fixed always */}
      <div className="fixed top-0 left-0 right-0 h-16 z-30 bg-white border-b lg:ml-64">
        <AdminHeader setOpen={setOpenSidebar} />
      </div>

      {/* Main Content */}
      <main className="pt-16 px-4 md:px-6 lg:ml-64">
        {/* pt-16: to make room for header (h-16) */}
        {/* lg:ml-64: to make room for sidebar on large screens */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

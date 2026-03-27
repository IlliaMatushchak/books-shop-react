import { Outlet } from "react-router-dom";

import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

function AdminLayout() {
  return (
    <>
      <AdminSidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AdminLayout;

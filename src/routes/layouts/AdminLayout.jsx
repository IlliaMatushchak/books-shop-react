import { Outlet } from "react-router-dom";

import Header from "../../components/Header/Header";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

function AdminLayout() {
  return (
    <>
      <Header />
      <AdminSidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AdminLayout;

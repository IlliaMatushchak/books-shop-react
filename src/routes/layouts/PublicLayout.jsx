import { Outlet } from "react-router-dom";

import Footer from "../../components/Footer/Footer";

function PublicLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;

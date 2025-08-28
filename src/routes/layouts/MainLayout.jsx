import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import GoBackButton from "../../components/GoBackButton/GoBackButton";

function Layout() {
  console.log("Layout render");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
      {pathname !== "/" && <GoBackButton />}
    </>
  );
}

export default Layout;

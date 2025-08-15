import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import GoBackButton from "../../components/GoBackButton/GoBackButton";

function Layout({ userNameState, isLoggedInState }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isLoggedInState.isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedInState.isLoggedIn, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header {...userNameState} {...isLoggedInState} />
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

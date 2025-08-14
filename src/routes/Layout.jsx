import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

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
    </>
  );
}

export default Layout;

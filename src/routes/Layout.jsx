import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout({ userNameState, isLoggedInState }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedInState.isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedInState.isLoggedIn, navigate]);

  return (
    <>
      <Header {...userNameState} {...isLoggedInState} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;

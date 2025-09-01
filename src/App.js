import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useState } from "react";

import "./App.css";
import "./assets/styles/button.css";

import Layout from "./routes/layouts/MainLayout";
import BackgroundImg from "./components/BackgroundImg/BackgroundImg";
import CartProvider from "./containers/CartProvider/CartProvider";
import AuthProvider from "./containers/AuthProvider/AuthProvider";
import Loader from "./components/Loader/Loader";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ErrorBoundary from "./containers/ErrorBoundary/ErrorBoundary";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback";

const SignIn = lazy(() => import("./routes/pages/SignIn/SignIn"));
const Shop = lazy(() => import("./routes/pages/Shop/Shop"));
const SpecificBook = lazy(() =>
  import("./routes/pages/SpecificBook/SpecificBook")
);
const Cart = lazy(() => import("./routes/pages/Cart/Cart"));
const NotFound = lazy(() => import("./routes/pages/NotFound/NotFound"));

function App() {
  console.log("App render");
  // const [value, setvalue] = useState(false);

  return (
    <>
      {/* <input
        type="checkbox"
        value={value}
        onChange={() => {
          setvalue((prev) => !prev);
        }}
      /> */}
      <BackgroundImg />
      <CartProvider>
          <AuthProvider>
            <ErrorBoundary fallback={<ErrorFallback />}>
              <Router>
                <Suspense fallback={<Loader />}>
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route index element={<SignIn />} />
                      <Route
                        path="shop"
                        element={
                          <ErrorBoundary fallback={<ErrorFallback />}>
                            <PrivateRoute>
                              <Shop />
                            </PrivateRoute>
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="specific-book/:bookID"
                        element={
                          <ErrorBoundary fallback={<ErrorFallback />}>
                            <PrivateRoute>
                              <SpecificBook />
                            </PrivateRoute>
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="cart"
                        element={
                          <ErrorBoundary fallback={<ErrorFallback />}>
                            <PrivateRoute>
                              <Cart />
                            </PrivateRoute>
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="*"
                        element={
                          <PrivateRoute>
                            <NotFound />
                          </PrivateRoute>
                        }
                      />
                    </Route>
                  </Routes>
                </Suspense>
              </Router>
            </ErrorBoundary>
          </AuthProvider>
      </CartProvider>
    </>
  );
}

export default App;

// function delayForLazy(promise) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, 3000);
//   }).then(() => promise);
// }

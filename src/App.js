import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import "./assets/styles/global.css";
import "./assets/styles/button.css";

import Layout from "./routes/layouts/MainLayout";
import BackgroundImg from "./components/BackgroundImg/BackgroundImg";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AvatarProvider } from "./contexts/AvatarContext";
import Loader from "./components/Loader/Loader";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import ErrorBoundary from "./containers/ErrorBoundary/ErrorBoundary";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback";

const Registration = lazy(() =>
  import("./routes/pages/Registration/Registration")
);
const Login = lazy(() => import("./routes/pages/Login/Login"));
const Profile = lazy(() => import("./routes/pages/Profile/Profile"));
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
      <AuthProvider>
        <CartProvider>
          <AvatarProvider>
            <ErrorBoundary fallback={<ErrorFallback />}>
              <Router>
                <Suspense fallback={<Loader type="global" />}>
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route
                        index
                        element={
                          <PublicRoute>
                            <Login />
                          </PublicRoute>
                        }
                      />
                      <Route
                        path="register"
                        element={
                          <ErrorBoundary fallback={<ErrorFallback />}>
                            <PublicRoute>
                              <Registration />
                            </PublicRoute>
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="shop"
                        element={
                          <ErrorBoundary fallback={<ErrorFallback />}>
                            <Shop />
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="specific-book/:bookID"
                        element={
                          <ErrorBoundary fallback={<ErrorFallback />}>
                            <SpecificBook />
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="cart"
                        element={
                          <ErrorBoundary fallback={<ErrorFallback />}>
                            <Cart />
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="profile"
                        element={
                          <ErrorBoundary fallback={<ErrorFallback />}>
                            <PrivateRoute allowedRoles={["user", "admin"]}>
                              <Profile />
                            </PrivateRoute>
                          </ErrorBoundary>
                        }
                      />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                </Suspense>
              </Router>
            </ErrorBoundary>
          </AvatarProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;

// function delayForLazy(promise) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, 3000);
//   }).then(() => promise);
// }

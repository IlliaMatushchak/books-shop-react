import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import "./assets/styles/variables.css";
import "./assets/styles/base.css";
import "./assets/styles/components/button.css";
import "./assets/styles/components/input.css";
import "./assets/styles/utilities.css";

import { ROLES } from "./constants/roles";
import { ROUTE_NAMES } from "./constants/routes";

import MainLayout from "./routes/layouts/MainLayout";
import PublicLayout from "./routes/layouts/PublicLayout";
import AdminLayout from "./routes/layouts/AdminLayout";
import BackgroundImg from "./components/BackgroundImg/BackgroundImg";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AvatarProvider } from "./contexts/AvatarContext";
import Loader from "./components/Loader/Loader";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import ErrorBoundary from "./containers/ErrorBoundary/ErrorBoundary";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback";
import HomePage from "./routes/adminPages/HomePage/HomePage";

const Registration = lazy(() => import("./routes/pages/Registration/Registration"));
const Login = lazy(() => import("./routes/pages/Login/Login"));
const Profile = lazy(() => import("./routes/pages/Profile/Profile"));
const Shop = lazy(() => import("./routes/pages/Shop/Shop"));
const SpecificBook = lazy(() => import("./routes/pages/SpecificBook/SpecificBook"));
const Cart = lazy(() => import("./routes/pages/Cart/Cart"));
const NotFound = lazy(() => import("./routes/pages/NotFound/NotFound"));

function App() {
  return (
    <>
      <BackgroundImg />
      <AuthProvider>
        <CartProvider>
          <AvatarProvider>
            <ErrorBoundary fallback={<ErrorFallback />}>
              <Router>
                <Suspense fallback={<Loader type="global" />}>
                  <Routes>
                    <Route element={<MainLayout />}>
                      <Route element={<PublicLayout />}>
                        <Route
                          index
                          element={
                            <PublicRoute>
                              <Login />
                            </PublicRoute>
                          }
                        />
                        <Route
                          path={ROUTE_NAMES.REGISTER}
                          element={
                            <ErrorBoundary fallback={<ErrorFallback />}>
                              <PublicRoute>
                                <Registration />
                              </PublicRoute>
                            </ErrorBoundary>
                          }
                        />
                        <Route
                          path={ROUTE_NAMES.SHOP}
                          element={
                            <ErrorBoundary fallback={<ErrorFallback />}>
                              <Shop />
                            </ErrorBoundary>
                          }
                        />
                        <Route
                          path={ROUTE_NAMES.PRODUCT + "/:bookID"}
                          element={
                            <ErrorBoundary fallback={<ErrorFallback />}>
                              <SpecificBook />
                            </ErrorBoundary>
                          }
                        />
                        <Route
                          path={ROUTE_NAMES.CART}
                          element={
                            <ErrorBoundary fallback={<ErrorFallback />}>
                              <Cart />
                            </ErrorBoundary>
                          }
                        />
                        <Route
                          path={ROUTE_NAMES.PROFILE}
                          element={
                            <ErrorBoundary fallback={<ErrorFallback />}>
                              <PrivateRoute allowedRoles={[ROLES.USER, ROLES.ADMIN]}>
                                <Profile />
                              </PrivateRoute>
                            </ErrorBoundary>
                          }
                        />
                      </Route>

                      <Route
                        path={ROUTE_NAMES.ADMIN}
                        element={
                          <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
                            <AdminLayout />
                          </PrivateRoute>
                        }
                      >
                        <Route index element={<HomePage />} />
                        <Route path={ROUTE_NAMES.ADMIN_BOOKS}>
                          <Route index element={<h2>books</h2>} />
                          <Route
                            path={ROUTE_NAMES.ADMIN_BOOK_CREATE}
                            element={<h2>books/create</h2>}
                          />
                        </Route>
                        <Route path={ROUTE_NAMES.ADMIN_USERS} element={<h2>users</h2>} />
                        <Route path={ROUTE_NAMES.ADMIN_ORDERS} element={<h2>orders</h2>} />
                      </Route>
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

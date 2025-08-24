import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import fetchBooks from "./services/fetchBooks";
import { BooksProvider } from "./hooks/useBooks";

import "./App.css";
import "./assets/styles/button.css";

import Layout from "./routes/layouts/MainLayout";
import BackgroundImg from "./components/BackgroundImg/BackgroundImg";
import CartProvider from "./containers/CartProvider/CartProvider";
import AuthProvider from "./containers/AuthProvider/AuthProvider";
import Loader from "./components/Loader/Loader";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const SignIn = lazy(() => import("./routes/pages/SignIn/SignIn"));
const Shop = lazy(() => import("./routes/pages/Shop/Shop"));
const SpecificBook = lazy(() =>
  import("./routes/pages/SpecificBook/SpecificBook")
);
const Cart = lazy(() => import("./routes/pages/Cart/Cart"));
const NotFound = lazy(() => import("./routes/pages/NotFound/NotFound"));

function App() {
  console.log("App render");

  const books = fetchBooks();

  return (
    <>
      <BackgroundImg />
      <CartProvider>
        <BooksProvider value={books}>
          <AuthProvider>
            <Router>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<SignIn />} />
                    <Route
                      path="shop"
                      element={
                        <PrivateRoute>
                          <Shop />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="specific-book/:bookID"
                      element={
                        <PrivateRoute>
                          <SpecificBook />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="cart"
                      element={
                        <PrivateRoute>
                          <Cart />
                        </PrivateRoute>
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
          </AuthProvider>
        </BooksProvider>
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

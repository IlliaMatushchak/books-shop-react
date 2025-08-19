import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState, Suspense, lazy } from "react";
import fetchBooks from "./services/fetchBooks";
import { BooksProvider } from "./hooks/useBooks";

import "./App.css";

import Layout from "./routes/layouts/MainLayout";
import BackgroundImg from "./components/BackgroundImg/BackgroundImg";
import CartProvider from "./containers/CartProvider/CartProvider";

const SignIn = lazy(() => import("./routes/pages/SignIn/SignIn"));
const Shop = lazy(() => import("./routes/pages/Shop/Shop"));
const SpecificBook = lazy(() =>
  import("./routes/pages/SpecificBook/SpecificBook")
);
const Cart = lazy(() => import("./routes/pages/Cart/Cart"));
const NotFound = lazy(() => import("./routes/pages/NotFound/NotFound"));

function App() {
  console.log("App render");

  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const books = fetchBooks();

  return (
    <>
      <BackgroundImg />
      <CartProvider>
        <BooksProvider value={books}>
          <Router>
            <Suspense fallback={<h2>Loading...</h2>}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Layout
                      userNameState={{ userName, setUserName }}
                      isLoggedInState={{ isLoggedIn, setIsLoggedIn }}
                    />
                  }
                >
                  <Route
                    index
                    element={
                      <SignIn
                        userNameState={{ userName, setUserName }}
                        isLoggedInState={{ setIsLoggedIn }}
                      />
                    }
                  />
                  <Route path="shop" element={<Shop />} />
                  <Route
                    path="specific-book/:bookID"
                    element={<SpecificBook />}
                  />
                  <Route path="cart" element={<Cart />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </Router>
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

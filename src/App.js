import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import fetchBooks from "./services/fetchBooks";
import { BooksProvider } from "./hooks/useBooks";
import { CartProvider } from "./hooks/useCart";

import "./App.css";

import Layout from "./routes/Layout";
import SignIn from "./routes/pages/SignIn";
import Shop from "./routes/pages/Shop";
import SpecificBook from "./routes/pages/SpecificBook";
import Cart from "./routes/pages/Cart";
import NotFound from "./routes/pages/NotFound";

function App() {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  const books = fetchBooks();

  return (
    <>
      <CartProvider value={{ cart, setCart }}>
        <BooksProvider value={books}>
          <Router>
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
                      isLoggedInState={{ isLoggedIn, setIsLoggedIn }}
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
          </Router>
        </BooksProvider>
      </CartProvider>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./routes/Layout";
import SignIn from "./routes/pages/SignIn";
import Shop from "./routes/pages/Shop";
import SpecificBook from "./routes/pages/SpecificBook";
import Cart from "./routes/pages/Cart";
import NotFound from "./routes/pages/NotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SignIn />} />
            <Route path="shop" element={<Shop />} />
            <Route path="specific-book/:bookID" element={<SpecificBook />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

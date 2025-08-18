import { CartContext } from "../../hooks/useCart";
import { useState, useMemo } from "react";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (bookID, totalCount, price, title) => {
    setCart((prev) => {
      const index = prev.findIndex((el) => el.id === bookID);

      if (index === -1) {
        return [
          ...prev,
          { id: bookID, orderedCount: totalCount, price, title },
        ];
      } else {
        const updated = [...prev];
        updated[index] = { id: bookID, orderedCount: totalCount, price, title };
        return updated;
      }
    });
  };

  const removeFromCart = (bookID) => {
    setCart((prev) => prev.filter((item) => item.id !== bookID));
  };

  const clearCart = () => setCart([]);

  const value = useMemo(() => ({ cart, addToCart, removeFromCart, clearCart }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;

import { CartContext } from "../../hooks/useCart";
import { useState, useMemo, useCallback } from "react";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((bookID, totalCount, price, title) => {
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
  }, []);

  const removeFromCart = useCallback((bookID) => {
    setCart((prev) => prev.filter((item) => item.id !== bookID));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo(
    () => ({ cart, addToCart, removeFromCart, clearCart }),
    [cart, addToCart, removeFromCart, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { LocalStorageService, LS_KEYS } from "../services/localStorage";

const CartContext = createContext(null);

function CartProvider({ children }) {
  const [cart, setCart] = useState(LocalStorageService.get(LS_KEYS.CART) || []);

  useEffect(() => {
    LocalStorageService.set(LS_KEYS.CART, cart);
  }, [cart]);

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
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export { CartProvider, useCart };

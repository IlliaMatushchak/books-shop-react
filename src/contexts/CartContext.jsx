import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";
import { CartService } from "../services/cartService";
import { LocalStorageService, LS_KEYS } from "../services/localStorage";

const CartContext = createContext(null);

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { totalCount, totalPrice } = useMemo(() => {
    return cart.reduce(
      (acc, item) => ({
        totalCount: acc.totalCount + item.quantity,
        totalPrice: acc.totalPrice + item.quantity * item.book.price,
      }),
      { totalCount: 0, totalPrice: 0 }
    );
  }, [cart]);

  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      const data = await CartService.get();
      setCart(data);
    } catch (err) {
      setError(err);
      console.error("Cart error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadCart();
    } else {
      setCart([]);
    }
  }, [isLoggedIn, loadCart]);

  const addToCart = useCallback(async (productId, quantity) => {
    try {
      const data = await CartService.add(productId, quantity);
      setCart(data);
    } catch (err) {
      setError(err);
      console.error("Cart error:", err);
    }
  }, []);

  const changeQuantity = useCallback(async (productId, quantity) => {
    try {
      const data = await CartService.update(productId, quantity);
      setCart(data);
    } catch (err) {
      setError(err);
      console.error("Cart error:", err);
    }
  }, []);

  const removeFromCart = useCallback(async (productId) => {
    try {
      const data = await CartService.remove(productId);
      setCart(data);
    } catch (err) {
      setError(err);
      console.error("Cart error:", err);
    }
  }, []);

  const clearCart = useCallback(async () => {
    try {
      const data = await CartService.clear();
      setCart(data);
    } catch (err) {
      setError(err);
      console.error("Cart error:", err);
    }
  }, []);

  const value = useMemo(
    () => ({
      cart,
      totalCount,
      totalPrice,
      loading,
      error,
      loadCart,
      addToCart,
      changeQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      cart,
      totalCount,
      totalPrice,
      loading,
      error,
      loadCart,
      addToCart,
      changeQuantity,
      removeFromCart,
      clearCart,
    ]
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

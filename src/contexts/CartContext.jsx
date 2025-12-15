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
  const [cart, setCart] = useState(LocalStorageService.get(LS_KEYS.CART) || []);
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

  const fetchCart = useCallback(
    async (requestFunc, args = [], onSuccessFunc) => {
      if (!requestFunc) return;
      if (args === undefined || args === null) args = [];
      if (!Array.isArray(args)) throw new Error("args must be an array!");

      try {
        setError(null);
        setLoading(true);
        const data = await requestFunc(...args);
        setCart(data);
        onSuccessFunc && onSuccessFunc(data);
      } catch (err) {
        setError(err);
        console.error("Cart error:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loadCart = useCallback(() => {
    fetchCart(CartService.get);
  }, [fetchCart]);

  const mergeWithRemoteCart = useCallback(
    (localCart) => {
      fetchCart(CartService.merge, [localCart], () => {
        LocalStorageService.remove(LS_KEYS.CART);
      });
    },
    [fetchCart]
  );

  useEffect(() => {
    if (isLoggedIn) {
      const localCart = LocalStorageService.get(LS_KEYS.CART);

      if (localCart?.length > 0) {
        mergeWithRemoteCart(localCart);
      } else {
        loadCart();
      }
    }
  }, [isLoggedIn, loadCart, mergeWithRemoteCart]);

  useEffect(() => {
    if (!isLoggedIn) {
      LocalStorageService.set(LS_KEYS.CART, cart);
    }
  }, [cart, isLoggedIn]);

  const addToCart = useCallback(
    (productId, quantity, book) => {
      if (isLoggedIn) {
        fetchCart(CartService.add, [productId, quantity]);
      } else {
        setCart((prevCart) => {
          const updated = [...prevCart];
          const index = updated.findIndex(
            (item) => item.productId === productId
          );
          if (index === -1) {
            updated.push({ productId, quantity, book });
          } else {
            updated[index] = {
              productId,
              quantity: updated[index].quantity + quantity,
              book,
            };
          }
          return updated;
        });
      }
    },
    [isLoggedIn, fetchCart]
  );

  const changeQuantity = useCallback(
    (productId, quantity) => {
      if (isLoggedIn) {
        fetchCart(CartService.update, [productId, quantity]);
      } else {
        setCart((prevCart) => {
          const updated = prevCart.map((item) => {
            return item.productId === productId ? { ...item, quantity } : item;
          });
          return updated;
        });
      }
    },
    [isLoggedIn, fetchCart]
  );

  const removeFromCart = useCallback(
    (productId) => {
      if (isLoggedIn) {
        fetchCart(CartService.remove, [productId]);
      } else {
        setCart((prevCart) =>
          prevCart.filter((item) => item.productId !== productId)
        );
      }
    },
    [isLoggedIn, fetchCart]
  );

  const clearCart = useCallback(() => {
    if (isLoggedIn) {
      fetchCart(CartService.clear);
    } else {
      setCart([]);
    }
  }, [isLoggedIn, fetchCart]);

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

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

  const loadCart = useCallback(async () => {
    try {
      setError(null);
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

  const mergeWithRemoteCart = useCallback(async (localCart) => {
    try {
      setError(null);
      setLoading(true);
      const data = await CartService.merge(localCart);
      setCart(data);
      LocalStorageService.remove(LS_KEYS.CART);
    } catch (err) {
      setError(err);
      console.error("Cart error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

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
    async (productId, quantity, book) => {
      if (isLoggedIn) {
        try {
          setError(null);
          setLoading(true);
          const data = await CartService.add(productId, quantity);
          setCart(data);
        } catch (err) {
          setError(err);
          console.error("Cart error:", err);
        } finally {
          setLoading(false);
        }
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
    [isLoggedIn]
  );

  const changeQuantity = useCallback(
    async (productId, quantity) => {
      if (isLoggedIn) {
        try {
          setError(null);
          setLoading(true);
          const data = await CartService.update(productId, quantity);
          setCart(data);
        } catch (err) {
          setError(err);
          console.error("Cart error:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setCart((prevCart) => {
          const updated = prevCart.map((item) => {
            return item.productId === productId ? { ...item, quantity } : item;
          });
          return updated;
        });
      }
    },
    [isLoggedIn]
  );

  const removeFromCart = useCallback(
    async (productId) => {
      if (isLoggedIn) {
        try {
          setError(null);
          setLoading(true);
          const data = await CartService.remove(productId);
          setCart(data);
        } catch (err) {
          setError(err);
          console.error("Cart error:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setCart((prevCart) =>
          prevCart.filter((item) => item.productId !== productId)
        );
      }
    },
    [isLoggedIn]
  );

  const clearCart = useCallback(async () => {
    if (isLoggedIn) {
      try {
        setError(null);
        setLoading(true);
        const data = await CartService.clear();
        setCart(data);
      } catch (err) {
        setError(err);
        console.error("Cart error:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setCart([]);
    }
  }, [isLoggedIn]);

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

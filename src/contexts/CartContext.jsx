import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";
import useControlledFetch from "../hooks/useControlledFetch";
import { CartService } from "../services/cartService";
import { LocalStorageService, LS_KEYS } from "../utils/storage/localStorage";

const CartContext = createContext(null);

function CartProvider({ children }) {
  const {
    data: cart,
    setData: setCart,
    loading,
    error,
    fetch: fetchCart,
  } = useControlledFetch({
    initialData: LocalStorageService.get(LS_KEYS.CART) || [],
  });
  const { isLoggedIn } = useAuth();
  const { totalCount, totalPrice } = useMemo(() => {
    return cart.reduce(
      (acc, item) => ({
        totalCount: acc.totalCount + item.quantity,
        totalPrice: acc.totalPrice + item.quantity * item.book.price,
      }),
      { totalCount: 0, totalPrice: 0 }
    );
  }, [cart]);

  const loadCart = useCallback(() => {
    fetchCart({ requestFn: CartService.get });
  }, [fetchCart]);

  const mergeWithRemoteCart = useCallback(
    (localCart) => {
      fetchCart({
        requestFn: CartService.merge,
        args: [localCart],
        onSuccess: () => {
          LocalStorageService.remove(LS_KEYS.CART);
        },
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
        fetchCart({ requestFn: CartService.add, args: [productId, quantity] });
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
    [isLoggedIn, fetchCart, setCart]
  );

  const changeQuantity = useCallback(
    (productId, quantity) => {
      if (isLoggedIn) {
        fetchCart({
          requestFn: CartService.update,
          args: [productId, quantity],
        });
      } else {
        setCart((prevCart) => {
          const updated = prevCart.map((item) => {
            return item.productId === productId ? { ...item, quantity } : item;
          });
          return updated;
        });
      }
    },
    [isLoggedIn, fetchCart, setCart]
  );

  const removeFromCart = useCallback(
    (productId) => {
      if (isLoggedIn) {
        fetchCart({ requestFn: CartService.remove, args: [productId] });
      } else {
        setCart((prevCart) =>
          prevCart.filter((item) => item.productId !== productId)
        );
      }
    },
    [isLoggedIn, fetchCart, setCart]
  );

  const clearCart = useCallback(() => {
    if (isLoggedIn) {
      fetchCart({ requestFn: CartService.clear });
    } else {
      setCart([]);
    }
  }, [isLoggedIn, fetchCart, setCart]);

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

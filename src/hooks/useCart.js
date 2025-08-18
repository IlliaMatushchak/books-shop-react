import { createContext, useContext } from "react";

const CartContext = createContext(null);

// const CartProvider = CartContext.Provider;

const useCart = () => useContext(CartContext);

export {CartContext, useCart};
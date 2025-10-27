import React, { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer } from "../reducers/cartReducer";

const initialState = {
  cartItems: [],
  total: 0,
  itemCount: 0,
};

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const storedCart = JSON.parse(localStorage.getItem("cartState"));
  const [state, dispatch] = useReducer(cartReducer, storedCart || initialState);

  useEffect(() => {
    localStorage.setItem("cartState", JSON.stringify(state));
  }, [state]);

  const addToCart = (product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });
  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const increaseQuantity = (id) =>
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  const decreaseQuantity = (id) =>
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        total: state.total,
        itemCount: state.itemCount,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const getCartSummary = (cartItems) => {
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );
  return { total, itemCount };
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      const updatedCart = existingItem
        ? state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cartItems, { ...action.payload, quantity: 1 }];

      return {
        ...state,
        cartItems: updatedCart,
        ...getCartSummary(updatedCart),
      };
    }

    case "REMOVE_FROM_CART": {
      const updatedCart = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      return {
        ...state,
        cartItems: updatedCart,
        ...getCartSummary(updatedCart),
      };
    }

    case "INCREASE_QUANTITY": {
      const updatedCart = state.cartItems.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return {
        ...state,
        cartItems: updatedCart,
        ...getCartSummary(updatedCart),
      };
    }

    case "DECREASE_QUANTITY": {
      const updatedCart = state.cartItems
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      return {
        ...state,
        cartItems: updatedCart,
        ...getCartSummary(updatedCart),
      };
    }

    case "CLEAR_CART":
      return { cartItems: [], total: 0, itemCount: 0 };

    default:
      return state;
  }
};

import { createSelector } from 'reselect';

// first extract slice of state
const selectCartReducer = (state) => state.cart;

// create memoized selector for cartItems
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

// create memoized selector for isCartOpen
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

// create memoized selector for do-logic selectors
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);

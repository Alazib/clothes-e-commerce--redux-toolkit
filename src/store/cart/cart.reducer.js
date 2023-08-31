import { createSlice } from "@reduxjs/toolkit"

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
}
/// These are helper functions
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}
const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  )

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  }

  // return back cart items with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)

///

export const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload
    },
    addItemToCart(state, action) {
      const newArrayOfItems = addCartItem(state.cartItems, action.payload)
      state.cartItems = newArrayOfItems
    },
    removeItemFromCart(state, action) {
      const newArrayOfItems = removeCartItem(state.cartItems, action.payload)
      state.cartItems = newArrayOfItems
    },
    clearItemFromCart(state, action) {
      const newArrayOfItems = clearCartItem(state.cartItems, action.payload)
      state.cartItems = newArrayOfItems
    },
  },
})

export const cartReducer = cartSlice.reducer
export const {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} = cartSlice.actions

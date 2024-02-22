import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    removeFromCart: (state, action) => {
      const { productId, instanceId } = action.payload;
      
      const indexToRemove = state.products.findIndex(
        (product) => product._id === productId && product.instanceId === instanceId
      );

      if (indexToRemove !== -1) {
        // Retrieve the removed product before removing it
        const removedProduct = state.products[indexToRemove];

        // Remove only the identified product instance
        state.products.splice(indexToRemove, 1);

        // Update quantity and total
        state.quantity -= removedProduct.quantity;
        state.total -= removedProduct.price * removedProduct.quantity;
      }
    },
  },
});


export const { addProduct, reset, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
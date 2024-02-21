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
        (product) => product._id === productId && product.variationId === variationId
      );

      if (indexToRemove !== -1) {
        // Remove only the identified product instance
        state.products.splice(indexToRemove, 1);

        state.quantity -= 1;
        // state.total -= state.products[indexToRemove].price;
        state.total -= action.payload.price * action.payload.quantity;
      } 
      
  
      // state.products = state.products.filter((product) => product._id !== productId);
      // ... (update total and other properties if needed)
      
      // let sum = 0;
      // for (let i=0; i < state.products.length; i++) {
      //   sum += state.products[i].quantity;
      //   }
      // state.quantity = sum;
      // state.total = sum * state.products[0].price;
      
    
  },
  },
});

export const { addProduct, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
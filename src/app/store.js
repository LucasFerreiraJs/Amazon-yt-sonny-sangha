import { configureStore } from "@reduxjs/toolkit";
import basketReducer from '../slices/basketSlice'
import productInitialReducer from '../slices/InitialProducts'


export const store = configureStore({
  reducer: {
    basket: basketReducer,
    productInitial: productInitialReducer
  }
})




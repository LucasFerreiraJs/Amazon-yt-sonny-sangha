import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  items: []
}

export const productInitialSlice = createSlice({
  name:'productInitial',
  initialState,
  reducers: {
    addToProductInitial: (state, action) =>{
      state.items = [...state.items, action.payload]
    }
  }
})

export const {addToProductInitial} = productInitialSlice.actions

// get product items
export const selectProductInitialItems = (state)=> state.productInitial.items;

export default productInitialSlice.reducer;

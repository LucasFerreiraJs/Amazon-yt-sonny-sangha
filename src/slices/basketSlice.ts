import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ItemType = {};

type StateType = {
  basket: {
    items: [ItemType[]];
  };
};

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state: any, action: any): void => {},
    removeFromBasket: (state: any, action: PayloadAction<any>) => {},
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectItems = (state: StateType) => state.basket.items;

export default basketSlice.reducer;

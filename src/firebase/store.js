import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/itemsSlice";
import otherCostsReducer from "../features/otherCostsSlice";
export const store = configureStore({
  reducer: {
    items: itemsReducer,
    otherCosts: otherCostsReducer,
  },
});

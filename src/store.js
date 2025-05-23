import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./redux/itemsSlice";
import otherCostsReducer from "./redux/otherCostsSlice";
export const store = configureStore({
  reducer: {
    items: itemsReducer,
    otherCosts: otherCostsReducer,
  },
});

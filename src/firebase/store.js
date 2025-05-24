// import { configureStore } from "@reduxjs/toolkit";
// import itemsReducer from "../features/itemsSlice";
// import otherCostsReducer from "../features/otherCostsSlice";
// export const store = configureStore({
//   reducer: {
//     items: itemsReducer,
//     otherCosts: otherCostsReducer,
//   },
// });
// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import itemsReducer from "../features/itemsSlice";
import otherCostsReducer from "../features/otherCostsSlice";

// Combine your reducers
const rootReducer = combineReducers({
  items: itemsReducer,
  otherCosts: otherCostsReducer,
});

// Configure persist settings
const persistConfig = {
  key: "root",
  storage,
  // Optionally, you can blacklist or whitelist reducers
  // blacklist: ['otherCosts'], // if you don't want to persist otherCosts
  // whitelist: ['items'], // if you only want to persist items
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor
export const persistor = persistStore(store);

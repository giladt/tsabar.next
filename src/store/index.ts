import { configureStore } from "@reduxjs/toolkit";
import apartmentsReducer from "./apartmentSlice";
import dialogReducer from "./dialogSlice";

export const store = configureStore({
  reducer: {
    apartments: apartmentsReducer,
    dialog: dialogReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { ReactNode } from "react";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

export interface IDialogState {
  isOpen: boolean;
  startupDialogContent: string;
}

const initialState: IDialogState = {
  isOpen: false,
  startupDialogContent: "",
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setStartupDialogContent: (state, action: PayloadAction<string>) => {
      state.startupDialogContent = action.payload;
    },
  },
});

export const { setIsOpen, setStartupDialogContent } = dialogSlice.actions;
export default dialogSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { IApartmentData } from "@/utils/types.d";

export interface IApartmentState {
  search: string;
  startupApartments: IApartmentData[];
}

const initialState: IApartmentState = {
  search: "",
  startupApartments: [],
};

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setStartupApartments: (state, action: PayloadAction<IApartmentData[]>) => {
      state.startupApartments = action.payload;
    },
  },
});

export const { setSearch, setStartupApartments } = apartmentsSlice.actions;
export default apartmentsSlice.reducer;

// features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    productData: null,
    trlData: null,
    configurationData: null,
  },
  reducers: {
    setProductData: (state, action) => {
      state.productData = action.payload;
    },
    setTrlData: (state, action) => {
      state.trlData = action.payload;
    },
    setConfigurationData: (state, action) => {
      state.configurationData = action.payload;
    },
  },
});

// Export actions
export const { setProductData, setTrlData, setConfigurationData } =
  counterSlice.actions;

export const counterStates = (state) => state.counter;

// Export reducer
export default counterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
  name: "owner",
  initialState: {
    myShopData: null,
    loading: true,
  },
  reducers: {
    setmyShopData: (state, action) => {
      state.myShopData = action.payload;
      state.loading = false; 
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setmyShopData,setLoading } = ownerSlice.actions;
export default ownerSlice.reducer;
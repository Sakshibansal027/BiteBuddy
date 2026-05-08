import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";
import ownerSlice from "./owner.slice";
import mapSlice from "./map.Slice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    owner: ownerSlice,
    map: mapSlice,
  },
});

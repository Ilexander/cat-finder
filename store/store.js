import { configureStore } from "@reduxjs/toolkit";
import popupInfo from "./popupSlice.reducer";

 const store = configureStore({
  reducer: {
    popupInfo,
  },
});

export default store

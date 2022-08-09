import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  popupStatus: null,
  info: {
    cat_name: "Cute",
    lost_location: "My Heart",
    cat_photo:
      "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
    owner_number: "+380969546133",
    owner_name: "Богдан",
    cat_description: "So cute",
    cat_signs: [
      {
        Ушки: "Пятнистые",
        Носик: "Белый носик с чёрным пятном",
      },
    ],
  },

  loadingInfo: "pending",
};

export const fetchInfo = createAsyncThunk("popup/fetchInfo", async (id) => {
  const resp = await fetch(`http://localhost:3001/cats/${id}`);

  const data = await resp.json();
  return data;
});

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    getPopup(state) {
      state.popupStatus = "open";
    },
    stylePopup(state) {
      state.popupStatus = "use";
    },
    removePopup(state) {
      state.popupStatus = null;
    },
  },
  extraReducers: {
    [fetchInfo.pending]: (state) => {
      state.loadingInfo = "pending";
    },
    [fetchInfo.fulfilled]: (state, action) => {
      state.info = { ...action.payload };
      state.loadingInfo = "fulfilled";
    },
    [fetchInfo.rejected]: (state) => {
      state.loadingInfo = "rejected";
    },
  },
});

export const { getPopup, stylePopup, removePopup } = popupSlice.actions;

export default popupSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopupSupportType {
  popupForm: boolean;
  overlay: boolean;
  successForm: boolean
 }

const initialState: PopupSupportType = {
  popupForm: false,
  overlay: false,
  successForm: false
};

const popupSupportState  = createSlice({
  name: "popupSupport",
  initialState,
  reducers: {
    setPopupSupport: (state, action: PayloadAction<boolean>) => {
      state.popupForm = action.payload;
    },
    setOverlaySupport: (state, action: PayloadAction<boolean>) => {
      state.overlay = action.payload;
    },
    setSuccessForm: (state, action: PayloadAction<boolean>) => {
      state.successForm = action.payload;
    },
    },
});
export const { setPopupSupport, setOverlaySupport, setSuccessForm } = popupSupportState.actions;
export default popupSupportState.reducer;

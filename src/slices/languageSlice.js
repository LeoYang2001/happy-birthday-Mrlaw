// src/redux/languageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    ifChinese: true,
  },
  reducers: {
    toggleLanguage: (state) => {
      state.ifChinese = !state.ifChinese;
    },
    setLanguage: (state, action) => {
      state.ifChinese = action.payload;
    },
  },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

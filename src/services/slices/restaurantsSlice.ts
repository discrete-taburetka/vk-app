import { createSlice } from '@reduxjs/toolkit';

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;

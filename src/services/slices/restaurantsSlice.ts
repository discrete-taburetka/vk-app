import { createSlice } from '@reduxjs/toolkit';

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setData } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;

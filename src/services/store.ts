import { configureStore } from '@reduxjs/toolkit';
import restaurantsSlice from './slices/restaurantsSlice';

const store = configureStore({
  reducer: {
    restaurants: restaurantsSlice,
  },
});

export default store;

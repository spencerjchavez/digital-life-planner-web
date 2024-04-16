
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import desiresSlice from './desiresSlice';
import goalsSlice from './goalsSlice';
import todosSlice from './todosSlice';
import eventsSlice from './eventsSlice';

const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
      desires: desiresSlice.reducer,
      goals: goalsSlice.reducer,
      todos: todosSlice.reducer,
      events: eventsSlice.reducer,
    }
});
export default store;

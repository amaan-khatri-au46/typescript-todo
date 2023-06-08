import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import todoReducer from "../store/todoSlice";



const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;


export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type AppDispatch = typeof store.dispatch;

export default store;

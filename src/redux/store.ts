import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import userReducer from "../actions/userSlice"
import postReducer from "../actions/postSlice"
import postApiReducer, { postApi } from "../actions/postAPI"

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    postApi: postApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

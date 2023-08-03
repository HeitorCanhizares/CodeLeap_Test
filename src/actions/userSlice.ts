import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../redux/store"

const userLocal = localStorage.getItem("user")

export interface UserState {
  user: string | null
}

const initialState: UserState = {
  user: userLocal ? userLocal : null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      localStorage.setItem("user", action.payload)
      state.user = action.payload
    },
    logout: (state) => {
      localStorage.removeItem("user")
      state.user = null
    },
  },
})

export const { login, logout } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer

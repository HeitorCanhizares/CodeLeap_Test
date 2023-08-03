import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../redux/store"
import { UserState } from "../types"

const userLocal = localStorage.getItem("user")

const initialState: UserState = {
  user: userLocal ? userLocal : null,
  view: "your",
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
    view: (state) => {
      if (state.view === "all") {
        state.view = "your"
      } else {
        state.view = "all"
      }
    },
  },
})

export const { login, logout, view } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../redux/store"
import { postInterface } from "./postAPI"

export interface postModal {
  post: postInterface | null
  type: "edit" | "delete" | null
}

const initialState: postModal = { post: null, type: null }

export const postSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<postInterface>) => {
      state.post = action.payload
    },
    setType: (state, action: PayloadAction<"edit" | "delete">) => {
      localStorage.removeItem("user")
      state.type = action.payload
    },
    clear: (state) => {
      state.post = null
      state.type = null
    },
  },
})

export const { setPost, setType, clear } = postSlice.actions

export const selectPost = (state: RootState) => state.post

export default postSlice.reducer

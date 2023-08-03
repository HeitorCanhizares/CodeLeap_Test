import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../redux/store"
import { postInterface, PostState } from "../types"

const initialState: PostState = { post: null, type: null, page: 0 }

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<postInterface>) => {
      state.post = action.payload
    },
    setType: (state, action: PayloadAction<"edit" | "delete">) => {
      state.type = action.payload
    },
    clearPost: (state) => {
      state.post = null
      state.type = null
    },
    pageIncrement: (state) => {
      state.page = state.page + 1
    },
    pageReset: (state) => {
      if (state.page - 1 > -1) state.page -= 1
    },
  },
})

export const { setPost, setType, clearPost, pageReset, pageIncrement } =
  postSlice.actions

export const selectPost = (state: RootState) => state.post

export default postSlice.reducer

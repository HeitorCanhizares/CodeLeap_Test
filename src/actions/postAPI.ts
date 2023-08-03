import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { addPost, deletePost, patchPost, postApiResInterface } from "../types"

export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://dev.codeleap.co.uk/careers/" }),

  endpoints: (builder) => ({
    getAllPosts: builder.query<postApiResInterface, number>({
      query: (page) => `?limit=10&offset=${page * 10}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(
                ({ id }) => ({ type: "Posts", id } as const),
              ),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    getPostsByName: builder.query<
      postApiResInterface,
      { user: string; page: number }
    >({
      query: ({ user, page }) =>
        `?limit=10&offset=${page * 10}&username=${user}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(
                ({ id }) => ({ type: "Posts", id } as const),
              ),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    addPost: builder.mutation<addPost, addPost>({
      query: (body) => ({
        url: "",
        body,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    updatePost: builder.mutation<patchPost, Partial<patchPost>>({
      query: ({ id, content, title }) => ({
        url: `${id}/`,
        body: { content, title },
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    deletePost: builder.mutation<deletePost, deletePost>({
      query: ({ id }) => ({
        url: `${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
})

export const {
  useGetAllPostsQuery,
  useGetPostsByNameQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi

export default postApi.reducer

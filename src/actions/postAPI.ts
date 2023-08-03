import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface postInterface {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

export interface postApiResInterface {
  count: number
  next: string
  previous: string | null
  results: postInterface[]
}
export interface postApiPostInterface {
  count: number
  next: string
  previous: string | null
  results: postInterface[]
}
export interface addPost {
  username: string
  title: string
  content: string
}

export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://dev.codeleap.co.uk/" }),

  endpoints: (builder) => ({
    getAllPosts: builder.query<postApiResInterface, void>({
      query: () => "careers/",
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
    getPostsByName: builder.query<postApiResInterface, string>({
      query: (name) => `/careers/?username=${name}`,
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
    addPost: builder.mutation<addPost, Partial<addPost>>({
      query: (post) => ({
        url: "careers/",
        body: post,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
})

export const {
  useGetAllPostsQuery,
  useGetPostsByNameQuery,
  useAddPostMutation,
} = postApi

export default postApi.reducer

import { useEffect, useState } from "react"
import {
  postInterface,
  useAddPostMutation,
  useGetPostsByNameQuery,
} from "../actions/postAPI"
import { selectUser } from "../actions/userSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { timeAgo } from "../helpers"
import { setPost, setType } from "../actions/postSlice"

function PostList() {
  const user = useAppSelector(selectUser)
  const add = useAddPostMutation()
  const { data, error, isLoading, refetch } = useGetPostsByNameQuery(
    user.user ? user.user : "",
  )
  const [postData, setPostData] = useState<postInterface[]>([])
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (error) refetch()
    if (data) setPostData(data.results)
  }, [data])

  return (
    <>
      {add[1].isLoading && (
        <span className="loading loading-dots loading-lg "></span>
      )}
      {isLoading && <span className="loading loading-dots loading-lg "></span>}
      {postData.map((post) => (
        <div
          className="flex flex-col rounded-xl bg-white m-4 border border-black shadow-xl w-full"
          key={post.id}
        >
          <div className="bg-blue-800 text-white font-bold text-2xl rounded-t-xl p-4 w-full flex justify-between">
            My Post
            <div>
              <button
                className="mr-4 w-10"
                onClick={() => {
                  dispatch(setPost(post))
                  dispatch(setType("edit"))
                  window.post_modal.showModal()
                }}
              >
                <img src="/edit.svg" alt="edit" />
              </button>
              <button
                className="w-10"
                onClick={() => {
                  dispatch(setPost(post))
                  dispatch(setType("delete"))
                  window.post_modal.showModal()
                }}
              >
                <img src="/delete.svg" alt="edit" />
              </button>
            </div>
          </div>
          <div className="flex justify-between p-4">
            <label>@{post.username}</label>
            <label>{timeAgo(post.created_datetime)}</label>
          </div>
          <div className="p-4">{post.content}</div>
        </div>
      ))}
    </>
  )
}

export default PostList

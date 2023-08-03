import { useEffect, useState } from "react"
import { useGetAllPostsQuery, useGetPostsByNameQuery } from "../actions/postAPI"
import { selectUser } from "../actions/userSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { timeAgo } from "../helpers"
import {
  pageIncrement,
  selectPost,
  setPost,
  setType,
} from "../actions/postSlice"
import { postInterface } from "../types"

function PostList() {
  const post = useAppSelector(selectPost)
  const [maxPage, setMaxPage] = useState(0)
  const user = useAppSelector(selectUser)
  const allPost = useGetAllPostsQuery(post.page)
  const yourPost = useGetPostsByNameQuery({
    user: user.user as string,
    page: post.page,
  })

  const [postData, setPostData] = useState<postInterface[]>([])
  const dispatch = useAppDispatch()
  useEffect(() => {
    switch (user.view) {
      case "all":
        if (allPost.data) {
          setPostData(allPost.data.results)
          setMaxPage(allPost.data.count)
        }
        break
      case "your":
        if (yourPost.data) {
          setPostData(yourPost.data.results)
          setMaxPage(yourPost.data.count)
        }
        break
    }
  }, [allPost.data, yourPost.data, user.view])

  return (
    <div className="flex flex-col items-center p-4">
      {postData.map((post) => (
        <div
          className="flex flex-col rounded-xl bg-white m-4 border border-black shadow-xl w-full"
          key={post.id}
        >
          <div className="bg-blue-800 text-white font-bold text-2xl rounded-t-xl p-4 w-full flex justify-between">
            Posted by {post.username === user.user ? "me" : post.username}
            <div className={post.username !== user.user ? "hidden" : ""}>
              <button
                className="mr-4 w-6"
                onClick={() => {
                  dispatch(setPost(post))
                  dispatch(setType("edit"))
                  window.post_modal.showModal()
                }}
              >
                <img src="/edit.svg" alt="edit" />
              </button>
              <button
                className="w-6"
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
          <div className="p-4 break-words">{post.content}</div>
        </div>
      ))}
      <button
        className="btn"
        onClick={() => dispatch(pageIncrement())}
        disabled={post.page * 10 > maxPage}
      >
        Show more
      </button>
    </div>
  )
}

export default PostList

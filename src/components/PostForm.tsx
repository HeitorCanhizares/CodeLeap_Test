import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { selectUser } from "../actions/userSlice"
import { useEffect, useState } from "react"
import {
  postApi,
  useAddPostMutation,
  useUpdatePostMutation,
} from "../actions/postAPI"
import { clearPost, selectPost } from "../actions/postSlice"

const schema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
})

type FormData = yup.InferType<typeof schema>

interface postFormProps {
  customBTN?: any
}

function PostForm(props: postFormProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const user = useAppSelector(selectUser)
  const post = useAppSelector(selectPost)
  const [addPost] = useAddPostMutation()
  const [updatePost] = useUpdatePostMutation()
  const dispatch = useAppDispatch()

  const { register, handleSubmit, reset, setValue } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  const OnSubmit = (data: FormData) => {
    if (post.type === "edit") {
      updatePost({ id: post.post?.id, ...data }).finally(() => {
        dispatch(clearPost())
        window.post_modal.close()
        dispatch(postApi.util.resetApiState())
      })
    } else {
      addPost({ ...data, username: user.user as string }).finally(() => {
        reset()
        dispatch(postApi.util.resetApiState())
      })
    }
  }
  useEffect(() => {
    if (post.post) {
      setValue("title", post.post.title)
      setValue("content", post.post.content)
    } else {
      reset()
    }
  }, [post])

  return (
    <form
      className="form-control rounded-xl bg-white p-4 m-4 border border-black shadow-xl"
      onSubmit={handleSubmit(OnSubmit)}
    >
      <label className="font-black text-black text-xl">
        What’s on your mind?
      </label>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-semibold text-black">Title</span>
        </label>
        <input
          {...register("title")}
          type="text"
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Title here"
          className="input input-primary input-bordered w-full"
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-semibold text-black">Content</span>
        </label>
        <textarea
          {...register("content")}
          onChange={(ev) => setContent(ev.target.value)}
          className="textarea textarea-bordered border-primary resize-none"
          placeholder="Content here"
        ></textarea>
      </div>
      {props.customBTN ? (
        props.customBTN
      ) : (
        <button
          className="btn btn-primary w-fit self-end mt-4"
          disabled={title === "" || content === ""}
          type="submit"
        >
          create
        </button>
      )}
    </form>
  )
}

export default PostForm

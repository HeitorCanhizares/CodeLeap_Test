import { postApi, useDeletePostMutation } from "../actions/postAPI"
import { clearPost, selectPost } from "../actions/postSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import PostForm from "./PostForm"

function PostModal() {
  const post = useAppSelector(selectPost)
  const [deletePost] = useDeletePostMutation()
  const dispatch = useAppDispatch()

  const handleCancel = () => {
    dispatch(clearPost())
    window.post_modal.close()
  }
  const handleOkay = () => {
    deletePost({ id: post.post?.id as number }).finally(() => {
      dispatch(clearPost())
      window.post_modal.close()
      dispatch(postApi.util.resetApiState())
    })
  }

  return (
    <dialog
      id="post_modal"
      className="modal"
      onClose={() => {
        dispatch(clearPost())
      }}
    >
      <div className="w-full lg:w-1/2">
        {post.type === "edit" && (
          <PostForm
            customBTN={
              <div className="self-end mt-4">
                <button
                  onClick={handleCancel}
                  className="btn btn-info mr-4"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className={`btn ${
                    post.type === "edit" ? "btn-success" : "btn-error"
                  }`}
                  type="submit"
                >
                  {post.type === "edit" ? "save" : "delete"}
                </button>
              </div>
            }
          />
        )}
        {post.type === "delete" && (
          <div className="flex flex-col bg-white p-4 rounded-xl justify-between items-baseline">
            <label className="font-bold text-xl">
              Are you sure you want to delete this item?
            </label>
            <div className="flex w-full justify-end mt-4">
              <button
                onClick={handleCancel}
                className="btn btn-info mr-4"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleOkay}
                className="btn btn-error"
                type="submit"
              >
                delete
              </button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  )
}

export default PostModal

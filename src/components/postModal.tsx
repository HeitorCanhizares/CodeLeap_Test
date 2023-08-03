import { clear, selectPost } from "../actions/postSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import PostForm from "./PostForm"

declare global {
  interface Window {
    post_modal: HTMLDialogElement
  }
}

function PostModal() {
  const post = useAppSelector(selectPost)
  const dispatch = useAppDispatch()
  return (
    <dialog
      id="post_modal"
      className="modal"
      onClose={() => {
        dispatch(clear())
      }}
    >
      <form method="dialog" className="w-1/2">
        {post.type === "edit" && (
          <PostForm
            customBTN={
              <>
                <button className="btn">Cancel</button>
                <button
                  className={`btn ${
                    post.type === "edit" ? "btn-success" : "btn-error"
                  }`}
                >
                  {post.type === "edit" ? "save" : "delete"}
                </button>
              </>
            }
          />
        )}
        <div className="modal-action"></div>
      </form>
    </dialog>
  )
}

export default PostModal

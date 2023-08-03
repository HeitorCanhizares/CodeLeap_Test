import { postApi } from "../actions/postAPI"
import { logout, selectUser, view } from "../actions/userSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { pageReset } from "../actions/postSlice"

function Navbar() {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  return (
    <div className="flex bg-blue-800 items-baseline justify-between p-2 shadow-2xl border-b border-black">
      <div className="text-white font-bold text-sm text-center">
        <button
          className="btn btn-ghost font-black text-xl p-0 underline underline-offset-2"
          onClick={() => dispatch(view())}
        >
          {user.view} posts
        </button>{" "}
        <div className="text-white font-bold text-sm">CodeLeap Network</div>
      </div>
      <div className="flex gap-4 h-full mt-auto mb-auto">
        <a
          href="#top"
          className="btn btn-ghost w-6 p-0 hover:rotate-180"
          onClick={() => {
            dispatch(postApi.util.resetApiState())
            dispatch(pageReset())
          }}
        >
          <img src="/refresh.svg" alt="refresh" />
        </a>
        <button
          className="btn btn-ghost w-6 p-0"
          onClick={() => {
            dispatch(postApi.util.resetApiState())
            dispatch(logout())
          }}
        >
          <img src="/logout.svg" alt="logout" />
        </button>
      </div>
    </div>
  )
}

export default Navbar

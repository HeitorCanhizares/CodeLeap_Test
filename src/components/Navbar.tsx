import { logout, selectUser } from "../actions/userSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

function Navbar() {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  return (
    <div className="flex bg-blue-800 justify-between items-baseline p-2">
      <div className="text-white font-bold">CodeLeap Network</div>
      <div className="text-white font-bold">Welcome {user.user}!</div>
      <button className="btn btn-ghost w-14" onClick={() => dispatch(logout())}>
        <img src="/logout.svg" alt="logout" />
      </button>
    </div>
  )
}

export default Navbar

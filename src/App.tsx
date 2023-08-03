import { useEffect, useState } from "react"
import MainScreen from "./pages/mainScreen"
import SignUp from "./pages/signUp"
import { useAppSelector } from "./redux/hooks"
import { selectUser } from "./actions/userSlice"

function App() {
  const user = useAppSelector(selectUser)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <div
      className="flex min-w-full min-h-screen bg-neutral-300 overflow-hidden"
      data-theme="light"
    >
      <div
        className="flex flex-col self-center items-center w-full "
        id="intro"
      >
        <img src="/codeleap_logo_black.svg" alt="codeleap logo" />
      </div>
      {!loading && <>{user.user === null ? <SignUp /> : <MainScreen />}</>}
    </div>
  )
}

export default App

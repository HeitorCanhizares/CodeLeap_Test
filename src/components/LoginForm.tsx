import { useAppDispatch } from "../redux/hooks"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { login } from "../actions/userSlice"
import { useState } from "react"

const schema = yup.object({
  user: yup.string().required("Most have an Username"),
})

type FormData = yup.InferType<typeof schema>

function LoginForm() {
  const [user, setUser] = useState("")
  const dispatch = useAppDispatch()

  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data: FormData) => {
    dispatch(login(data.user))
  }

  return (
    <form
      className="form-control p-6 rounded-xl shadow-2xl bg-white w-full  md:w-1/2 lg:w-1/3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="font-black text-black text-xl">
        Welcome to CodeLeap network!
      </label>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-semibold text-black">
            Please enter your username
          </span>
        </label>
        <input
          {...register("user")}
          type="text"
          onChange={(ev) => setUser(ev.target.value)}
          placeholder="Username here"
          className="input input-primary input-bordered w-full"
        />
      </div>
      <button
        className="btn btn-primary w-fit self-end mt-4"
        disabled={user === ""}
        type="submit"
      >
        enter
      </button>
    </form>
  )
}

export default LoginForm

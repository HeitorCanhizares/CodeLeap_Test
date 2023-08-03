declare global {
  interface Window {
    post_modal: HTMLDialogElement
  }
}

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
export interface patchPost {
  id: number
  title: string
  content: string
}
export interface deletePost {
  id: number
}

export interface PostState {
  post: postInterface | null
  type: "edit" | "delete" | null
  page: number
}

export interface UserState {
  user: string | null
  view: "your" | "all"
}

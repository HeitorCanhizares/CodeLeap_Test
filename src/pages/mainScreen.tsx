import Navbar from "../components/Navbar"
import PostForm from "../components/PostForm"
import PostList from "../components/PostList"
import PostModal from "../components/postModal"

function MainScreen() {
  return (
    <div className="flex flex-col w-full">
      <nav>
        <Navbar />
      </nav>
      <section>
        <PostForm />
      </section>
      <section className="flex flex-col items-center p-4">
        <PostList />
      </section>
      <PostModal />
    </div>
  )
}

export default MainScreen

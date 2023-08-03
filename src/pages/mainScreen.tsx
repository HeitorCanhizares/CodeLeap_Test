import Navbar from "../components/Navbar"
import PostForm from "../components/PostForm"
import PostList from "../components/PostList"
import PostModal from "../components/postModal"

function MainScreen() {
  return (
    <div className="flex flex-col w-full overflow-scroll">
      <div id="top"></div>
      <nav className="fixed w-full">
        <Navbar />
      </nav>
      <section className="mt-20">
        <PostForm />
      </section>
      <section>
        <PostList />
      </section>
      <PostModal />
    </div>
  )
}

export default MainScreen

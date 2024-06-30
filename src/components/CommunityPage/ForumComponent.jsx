import supabaseClient from "../../supabaseClient"
import { useEffect, useState } from "react"
import { Input } from "../DesignSystem"
import { useForm } from "../../hooks"
import { CaretDown, CaretUp, MessageCircle, Send } from "../Icons"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import toast from "react-hot-toast"
import { dateHelpers } from "../../helpers"

const initialForm = {
  comment: ''
}

export const ForumComponent = () => {
  const { comment, onInputChange, onResetForm } = useForm(initialForm)
  const [posts, setPosts] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    try {
      const { data, error } = await supabaseClient.from('forum_post').select('*, users(*), forum_comment(count)').order('created_at', { ascending: false })

      if (error) {
        return console.log(error)
      }

      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreatePost = async () => {
    try {
      const { error, data } = await supabaseClient.from('forum_post').insert([
        { user_id: user.id, message: comment }
      ]).select('*, users(*), forum_comment(count)').single()

      if (error) {
        toast.error('Ocurrió un error inesperado')
        return
      }

      onResetForm()
      setPosts((prev) => ([data, ...prev]))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="flex flex-col gap-4 flex-1 overflow-hidden">
      <main className="flex-1 flex flex-col gap-2 overflow-auto">
        {posts?.map(post => <ForumPost key={post.id} {...post} />)}
      </main>

      <footer className="flex-0 flex flex-col gap-1">
        <div className="flex gap-2">
          <Input onChange={onInputChange} value={comment} name="comment" placeholder="Haz tu pregunta en el foro!" className="flex-1" />
          <button onClick={handleCreatePost} type="submit" className="flex items-center px-3 border rounded-md justify-center hover:bg-green-100 transition-colors bg-white">
            <Send width={20} />
          </button>
        </div>
      </footer>
    </section>
  )
}

const initialFormForumPost = {
  commentPost: ''
}

const ForumPost = (post) => {
  const { user } = useContext(AuthContext)

  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const { commentPost, onInputChange, onResetForm } = useForm(initialFormForumPost)

  const handleOpenComments = async () => {
    if (!isCommentSectionOpen) {
      setIsCommentSectionOpen(true)

      try {
        setLoading(true)
        const { error, data } = await supabaseClient.from('forum_comment').select('*, users(*)').eq('forum_post_id', post.id).order('created_at', { ascending: false })

        if (error) {
          return console.log(errorWhenFetchingReviews)
        }

        setComments(data)
        setIsCommentSectionOpen(true)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }

      return
    }

    setIsCommentSectionOpen(false)
  }

  const handleComment = async () => {
    try {
      if (commentPost.length == 0 || commentPost == '') {
        return
      }

      const { error, data } = await supabaseClient.from('forum_comment').insert([
        { user_id: user.id, forum_post_id: post.id, comment: commentPost }
      ]).select('*, users(*)').single()

      if (error) {
        return console.log(error)
      }

      setComments((comments) => [data, ...comments])
      onResetForm()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="border rounded-md flex flex-col gap-1 bg-gradient-to-t from-green-50 to-transparent max-h-96">
      <main className={`hover:bg-green-100 transition-colors cursor-pointer p-2 flex items-center gap-2 ${isCommentSectionOpen ? 'bg-green-100' : ''}`} onClick={handleOpenComments}>
        <div className="flex flex-col gap-1 flex-1">
          <header className="flex justify-between items-center">
            <h2 className="text-sm font-semibold">{post.users.name}</h2>
            <p className="text-xs">{dateHelpers.getTimeAgo(new Date(post.created_at))}</p>
          </header>

          <div className="flex">
            <p className="text-sm flex-1">{post.message}</p>
            <div className="flex gap-1 justify-end text-sm items-center flex-0">
              <span>{post.forum_comment[0].count}</span>
              <MessageCircle width={14} />
            </div>
          </div>
        </div>
        {isCommentSectionOpen ? <CaretUp strokeWidth={1} /> : <CaretDown strokeWidth={1} />}

      </main>
      {isCommentSectionOpen && !loading
        ? (
          <div className="px-2 pb-2 flex flex-col gap-1 h-full overflow-hidden">
            <h3 className="text-sm font-medium">Respuestas</h3>

            <main className="overflow-auto h-full pr-2">
              {comments.length === 0
                ? <p className="text-xs">No tiene respuestas este post</p>
                : (
                  comments.map(comment => {
                    return (
                      <div key={comment.id} className="flex flex-col gap-1 border-b py-2">
                        <header className="flex justify-between items-center">
                          <h2 className="font-semibold text-xs">{comment.users.name}</h2>
                          <p className="text-xs">{dateHelpers.getTimeAgo(new Date(comment.created_at))}</p>
                        </header>
                        <p className="text-xs">{comment.comment}</p>
                      </div>
                    )
                  })
                )
              }
            </main>

            <footer className="mt-2 flex gap-2">
              <Input onChange={onInputChange} value={commentPost} name="commentPost" placeholder="Escriba su respuesta" className="flex-1 text-xs" />
              <button onClick={handleComment} type="submit" className="flex items-center px-2 border rounded-md justify-center hover:bg-green-100 transition-colors bg-white">
                <Send width={14} />
              </button>
            </footer>
          </div>
        )
        : null
      }
      {loading ? <p>Cargando...</p> : null}
    </div>
  )
}
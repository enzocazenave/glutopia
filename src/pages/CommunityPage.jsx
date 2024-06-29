import { useState, useContext } from "react"
import { Input } from "../components"
import { HighlightedMessages, IncomingMessage, OutgoingMessage } from "../components/CommunityPage/"
import { Star, Forum, MessageCircle, Send } from "../components/Icons/"
import { useForm } from "../hooks"
import supabase from "../supabaseClient"
import { AuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"
import { ChatContext } from "../context/ChatContext"

const initialForm = {
  message: ''
}

const views = ['chat', 'highlighted', 'forum']

const CommunityPage = () => {
  const { messages, unviewedMessagesCount, scrollRef } = useContext(ChatContext)
  const { message, onInputChange, onResetForm } = useForm(initialForm)
  const { user } = useContext(AuthContext)
  const [isSending, setIsSending] = useState(false)
  const [view, setView] = useState('chat')

  const handleSend = async (e) => {
    e.preventDefault()
    if (message.length === 0) return
    onResetForm()
    setIsSending(true)

    try {
      const { error } = await supabase.from('chat_messages').insert([
        { message, user_id: user.id }
      ])

      if (error) {
        toast.error('Ocurrió un error inesperado')
        return
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSending(false)
    }
  }
  
  const handleChangeView = (viewToHandle) => {
    if (views.includes(viewToHandle)) {
      setView(viewToHandle)
    }
  }

  return (
    <section className="flex flex-col gap-4 fade-in overflow-hidden">
      <header className="flex gap-4">
        <button
          className={`flex items-center gap-2 p-2 border rounded-md justify-center transition-colors hover:bg-green-100 flex-1 ${view === 'chat' ? 'bg-green-100' : 'bg-white'}`}
          onClick={() => handleChangeView('chat')}
        >
          <MessageCircle width={16} />
          Chat
        </button>
        <button
          className={`flex items-center gap-2 p-2 border rounded-md justify-center transition-colors hover:bg-green-100 flex-2 ${view === 'highlighted' ? 'bg-green-100' : 'bg-white'}`}
          onClick={() => handleChangeView('highlighted')}
        >
          <Star width={16} />
          Mensajes destacados
        </button>
        <button
          className={`flex items-center gap-2 p-2 border rounded-md justify-center transition-colors hover:bg-green-100 flex-1 ${view === 'forum' ? 'bg-green-100' : 'bg-white'}`}
          onClick={() => handleChangeView('forum')}
        >
          <Forum width={16} />
          Foro
        </button>
      </header>

      <main ref={scrollRef} className="flex-1 gap-4 border rounded-md p-4 flex flex-col overflow-auto h-full fade-in-more relative">
        {(view === 'chat')
          ? (
            messages?.map(chatMessage => {
              if (chatMessage.user_id === user.id) {
                return <OutgoingMessage key={chatMessage.id} message={chatMessage.message} sent_at={chatMessage.created_at} />
              }

              return <IncomingMessage key={chatMessage.id} id={chatMessage.id} name={chatMessage.users.name} imgSrc="/user.png" message={chatMessage.message} sent_at={chatMessage.created_at} />
            })
          )
          : null
        }

        { view === 'highlighted' ? <HighlightedMessages /> : null }
      </main>

      {view === 'chat'
        ? (
          <footer>
            <form onSubmit={handleSend} className="flex gap-3">
              <Input onChange={onInputChange} value={message} name="message" placeholder="Escriba su mensaje" className="flex-1" />
              <button type="submit" disabled={isSending} className="flex items-center px-3 border rounded-md justify-center hover:bg-green-100 transition-colors bg-white">
                <Send width={20} />
              </button>
            </form>
          </footer>
        )
        : null
      }
    </section>
  )
}

export default CommunityPage
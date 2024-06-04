import { useState } from "react"
import { Input } from "../components"
import { IncomingMessage, OutgoingMessage } from "../components/CommunityPage/"
import { FilledStar, Photo, Send } from "../components/Icons/"
import { useForm } from "../hooks"
import supabase from "../supabaseClient"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"
import { ChatContext } from "../context/ChatContext"

const initialForm = {
  message: ''
}

const CommunityPage = () => {
  const { messages, unviewedMessagesCount, scrollRef } = useContext(ChatContext)
  const { message, onInputChange, onResetForm } = useForm(initialForm)
  const { user } = useContext(AuthContext)
  const [isSending, setIsSending] = useState(false)

  const handleSend = async (e) => {
    e.preventDefault()
    if(message.length === 0) return
    onResetForm()
    setIsSending(true)

    try { 
      const { error } = await supabase.from('chat_messages').insert([
        { message, user_name: user.nombre, user_id: user.idUsuario }
      ])

      if (error) {
        toast.error('Ocurrió un error inesperado')
        return
      }
    } catch(error) {
      console.log(error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="flex flex-col gap-4 fade-in overflow-hidden">
      <header className="flex justify-between">
        <button className="flex items-center gap-2 p-2 border rounded-md justify-center transition-colors bg-white hover:bg-green-100">
          <FilledStar width={16} />
          Mensajes destacados
        </button>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-green-400 w-3 h-3"></div>
          <span>50 usuarios en línea</span>
        </div>
      </header>

      <main ref={scrollRef} className="flex-1 gap-4 border rounded-md p-4 flex flex-col overflow-auto h-full fade-in-more relative">
        { messages.map(chatMessage => {
          if (chatMessage.user_id === user.idUsuario) {
            return <OutgoingMessage key={chatMessage.id} message={chatMessage.message} sent_at={chatMessage.created_at} />
          }

          return <IncomingMessage key={chatMessage.id} name={chatMessage.user_name} imgSrc="/user.png" message={chatMessage.message} sent_at={chatMessage.created_at} />
        })}
      </main>

      <footer>
        <form onSubmit={handleSend} className="flex gap-3">
          <Input onChange={onInputChange} value={message} name="message" placeholder="Escriba su mensaje" className="flex-1" />
          <button className="flex items-center px-3 border rounded-md justify-center hover:bg-green-100 transition-colors bg-white">
            <Photo width={16} />
          </button>
          <button type="submit" disabled={isSending} className="flex items-center px-3 border rounded-md justify-center hover:bg-green-100 transition-colors bg-white">
            <Send width={20} />
          </button>
        </form>
      </footer>
    </section>
  )
}

export default CommunityPage
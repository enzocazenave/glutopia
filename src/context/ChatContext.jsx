import { useState, createContext, useEffect, useContext, useRef } from "react"
import supabase from "../supabaseClient"
import toast from "react-hot-toast"
import { AuthContext } from "./AuthContext"

export const ChatContext = createContext({})

export const ChatProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const [chatChannel, setChatChannel] = useState()
  const [messages, setMessages] = useState([])
  const [unviewedMessagesCount, setUnviewedMessagesCount] = useState(0)
  const scrollRef = useRef()

  useEffect(() => {
    joinChat()

    return () => {
      if (chatChannel) {
        supabase.removeChannel(chatChannel)
      }
    }
  }, [])

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current.scroll({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }, 50)
  }

  const getInitialConversations = async () => {
    if (messages.length) return
    
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('id, created_at, user_id, message, users(name)')
        //.range(0, 49)
        .order('id', { ascending: false })

      if (error) {
        return toast.error('Ocurrió un error inesperado')
      }

      setMessages(data.reverse())
      scrollToBottom()
    } catch(error) {
      console.log(error)
    }
  }

  const joinChat = async() => {
    try {
      await getInitialConversations()
      setChatChannel(
        supabase.channel('realtime-chat')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_messages' }, (payload) => {
            supabase.from('users').select('name').eq('id', payload.new.user_id).single().then(({ data: users }) => {
              handleNewMessage({ ...payload.new, users })
            })
          })
          .subscribe()
      )
    } catch(error) {
      console.log(error)
    }
  }

  const handleNewMessage = (payload) => {
    if ((scrollRef.current.scrollTop + scrollRef.current.clientHeight === scrollRef.current.scrollHeight) || payload.new.user_id === user.idUsuario) {
      setMessages(prevMessages => [...prevMessages, payload])
      scrollToBottom()
    } else {
      setMessages(prevMessages => [...prevMessages, payload])
      scrollToBottom()
      //setUnviewedMessagesCount(prev => prev + 1)
    }
  }

  return (
    <ChatContext.Provider value={{ messages, scrollRef, unviewedMessagesCount }}>
      {children}
    </ChatContext.Provider>
  )
}
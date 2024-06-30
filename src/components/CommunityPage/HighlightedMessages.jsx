import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import { IncomingMessage } from "./IncomingMessage"
import { useEffect } from "react"

export const HighlightedMessages = () => {
  const { highlightedMessages, getHighlightedMessages } = useContext(ChatContext)

  const highlightedMessagesToRender = Object.values(highlightedMessages)

  useEffect(() => {
    getHighlightedMessages()
  }, [])

  if (highlightedMessagesToRender.length === 0) return (
    <p className="text-black text-center">No hay mensajes destacados</p>
  )

  return highlightedMessagesToRender?.map(highlightedMessage => (
    <IncomingMessage 
      key={highlightedMessage.id} 
      id={highlightedMessage.chat_messages.id} 
      message={highlightedMessage.chat_messages.message}
      name={highlightedMessage.chat_messages.users.name} 
      imgSrc="/user.png" 
      sent_at={highlightedMessage.chat_messages.created_at}
      isHighlightedView={true}
    />
  ))
}
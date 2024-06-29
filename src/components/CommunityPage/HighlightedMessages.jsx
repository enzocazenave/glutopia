import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import { IncomingMessage } from "./IncomingMessage"
import { useEffect } from "react"

export const HighlightedMessages = () => {
  const { highlightedMessages, getHighlightedMessages } = useContext(ChatContext)

  useEffect(() => {
    getHighlightedMessages()
  }, [])

  return Object.values(highlightedMessages)?.map(highlightedMessage => (
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
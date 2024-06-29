import { useState } from "react"
import { dateHelpers } from "../../helpers"
import { FilledStar, Star } from "../Icons"
import supabaseClient from "../../supabaseClient"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext"
import { useLocation } from "react-router-dom"

export const IncomingMessage = ({ id, name = '', sent_at = new Date(), message = '', imgSrc = '', isHighlightedView = false }) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false)
  const { highlightedMessages, getHighlightedMessages } = useContext(ChatContext)
  const [isSaved, setIsSaved] = useState(!!highlightedMessages[id] ?? false)
  const { user } = useContext(AuthContext)
  const location = useLocation()

  const handleClick = async () => {
    if (!isSaved) {
      try {
        setIsSaved(true)
  
        const { error } = await supabaseClient.from('highlighted_chat_messages').insert([
          { user_id: user.id, chat_message_id: id }
        ])
  
        if (error) {
          toast.error('Ocurrió un error inesperado')
          setIsSaved(false)
          return
        }
      } catch(error) {
        console.log(error)
      }

      return
    }

    try {
      setIsSaved(false)
  
      const { error } = await supabaseClient
        .from('highlighted_chat_messages')
        .delete()
        .eq('user_id', user.id)
        .eq('chat_message_id', id)

      if (error) {
        toast.error('Ocurrió un error inesperado')
        setIsSaved(true)
        return
      }

      if (isHighlightedView) {
        await getHighlightedMessages()   
      }
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="flex gap-4 max-w-96 min-w-44">
      <img src={imgSrc} className="size-7" />
      <div onClick={() => setIsActionsOpen(prev => !prev)} className="bg-white p-2 rounded-md border hover:bg-green-100 cursor-pointer transition-colors">
        <header className="flex justify-between items-center gap-4">
          <span className="font-semibold">{name}</span>
          <span className="text-sm text-black text-opacity-60 flex items-center gap-1">{isSaved ? <Star width={12} /> : null} {dateHelpers.getTimeAgo(new Date(sent_at))}</span>
        </header>
        <p className="text-sm">{message}</p>
      </div>
      {
        isActionsOpen 
        ? (
          <button onClick={handleClick}>
            {isSaved
              ? <FilledStar width={14} /> 
              : <Star width={14} />
            }
          </button>
        )
        : null
      }
    </div>
  )
}
import { useContext } from 'react'
import { Star } from '../'
import { dateHelpers } from '../../helpers'
import { AuthContext } from '../../context/AuthContext'

export const Comment = ({ comment }) => {
  const { user } = useContext(AuthContext)

  const renderStars = (numStars) => {
    const stars = []

    for (let i = 0; i < numStars; i++) {
      stars.push(
        <Star color="#999" key={i} width={14} />
      )
    }

    return stars
  }
  
  return (
    <div className="flex rounded-md p-3 gap-3 border bg-gradient-to-t from-green-50 to-transparent">
      <img src="/user.png" className="w-6 h-6" />

      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <div>
            <h4>{comment.user_id === user.id ? 'Tú' : comment.users.name}</h4>
            <div className="flex gap-1">
              {renderStars(comment.stars)}
            </div>
          </div>
          <span className="text-[0.75em]">{ dateHelpers.getTimeAgo(new Date(comment.created_at)) }</span>
        </div>

        <p className="text-xs">{comment.comment}</p>
      </div>
    </div>
  )
}
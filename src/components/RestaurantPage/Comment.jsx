import { Star } from '../'
import { dateHelpers } from '../../helpers'

export const Comment = ({ comment }) => {
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
    <div className="flex rounded-md border p-3 gap-3">
      <img src="/user.png" className="w-6 h-6" />

      <div className="flex flex-col">
        <div className="flex justify-between">
          <div>
            <h4>{comment.name}</h4>
            <div className="flex gap-1">
              {renderStars(comment.stars)}
            </div>
          </div>
          <span className="text-[0.75em]">{ dateHelpers.getTimeAgo(comment.created_at) }</span>
        </div>

        <p className="text-xs">{comment.text}</p>
      </div>
    </div>
  )
}
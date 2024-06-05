import { Comment } from "./"

export const Comments = ({ comments }) => {
  return (
    <div className="flex flex-col gap-2 overflow-auto">
      { comments.map(comment => <Comment key={comment.idResenia} comment={comment} />) }
    </div>
  )
}
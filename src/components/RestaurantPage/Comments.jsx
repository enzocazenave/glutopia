import { Comment } from "./"

export const Comments = ({ comments }) => {
  return (
    <div className="mt-2 flex flex-col gap-2">
      { comments.map(comment => <Comment key={comment.idResenia} comment={comment} />) }
    </div>
  )
}
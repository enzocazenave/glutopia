import { Comment } from "./"

const comments = [
  { id: 1, name: 'Enzo Cazenave', stars: 5, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio in ipsum voluptatibus sit sunt suscipit eveniet doloribus, velit eaque tempore laborum quibusdam, odio aperiam exercitationem minima! Optio cupiditate distinctio eaque!', created_at: new Date() },
  { id: 2, name: 'Franco Di Leva', stars: 3, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio in ipsum voluptatibus sit sunt suscipit distinctio eaque!', created_at: new Date('2024-05-20') },
  { id: 3, name: 'Agustin Masso', stars: 4, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio in ipsum voluptatibusOptio cupiditate distinctio eaque!', created_at: new Date('2024-03-30') }
]

export const Comments = () => {
  return (
    <div className="mt-2 flex flex-col gap-2">
      { comments.map(comment => <Comment key={comment.id} comment={comment} />) }
    </div>
  )
}
import { Button, Textarea } from "../"
import { Send } from "../Icons/"

export const CommentModal = ({ currentRestaurant }) => {
  return (
    <div className="flex flex-col">
      <h2 className="font-semibold">{ currentRestaurant.name }</h2>
      <p>Dejá un comentario para que otros miembros del sitio tengan más información a la hora de dedicidir donde ir a comer.</p>
      <Textarea className="h-32 resize-none mt-4" placeholder="Escribe tu comentario" />
      <Button className="w-fit mt-4" icon={ <Send width={16} /> }>
        Comentar
      </Button>
    </div>
  )
}
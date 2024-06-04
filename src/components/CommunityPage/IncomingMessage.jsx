import { dateHelpers } from "../../helpers"

export const IncomingMessage = ({ name = '', sent_at = new Date(), message = '', imgSrc = '' }) => {
  return (
     <div className="flex gap-4 max-w-96 min-w-44">
     <img src={imgSrc} className="size-7" />
     <div className="bg-white p-2 rounded-md border">
       <header className="flex justify-between items-center gap-4">
         <span className="font-semibold">{name}</span>
         <span className="text-sm text-black text-opacity-60">{dateHelpers.getTimeAgo(new Date(sent_at))}</span>
       </header>
       <p className="text-sm">{ message }</p>
     </div>
   </div>
  )
}
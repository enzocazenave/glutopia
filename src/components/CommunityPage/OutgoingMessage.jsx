import { dateHelpers } from "../../helpers"

export const OutgoingMessage = ({ sent_at = new Date(), message = '' }) => {
  return (
    <div className="flex gap-4 max-w-[400px self-end">
      <div className="bg-white p-2 rounded-md border">
        <p className="text-sm text-black text-opacity-60 text-end max-sm:text-xs">{dateHelpers.getTimeAgo(new Date(sent_at))}</p>
        <p className="text-sm max-sm:text-xs">{message}</p>
      </div>
    </div>
  )
}
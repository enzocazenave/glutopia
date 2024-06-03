import { dateHelpers } from "../../helpers"

export const OutgoingMessage = ({ sent_at = new Date(), message = '' }) => {
  return (
    <div className="flex gap-4 max-w-96 self-end">
      <div className="bg-white p-2 rounded-md border">
        <p className="text-sm text-black text-opacity-60 text-end">{dateHelpers.getTimeAgo(sent_at)}</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  )
}
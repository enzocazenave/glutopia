export const dateHelpers = {
  getTimeAgo: (date) => {
    const now = new Date()
    const secondsPast = Math.floor((now - date) / 1000)

    const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })

    if (secondsPast < 60) {
      return rtf.format(-secondsPast, 'second')
    }

    if (secondsPast < 3600) {
      const minutes = Math.floor(secondsPast / 60)
      return rtf.format(-minutes, 'minute')
    }
    
    if (secondsPast < 86400) {
      const hours = Math.floor(secondsPast / 3600)
      return rtf.format(-hours, 'hour')
    }

    const days = Math.floor(secondsPast / 86400)
    return rtf.format(-days, 'day')
  }
}
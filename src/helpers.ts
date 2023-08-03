export function timeAgo(publishedDate: string): string {
  const date = new Date(publishedDate)
  const now = Date.now()

  const diffInSeconds = (now - date.getTime()) / 1000

  if (diffInSeconds < 60) {
    return "just now"
  }

  const diffInMinutes = diffInSeconds / 60
  if (diffInMinutes < 60) {
    return `${Math.round(diffInMinutes)} minute(s) ago`
  }

  const diffInHours = diffInMinutes / 60
  if (diffInHours < 24) {
    return `${Math.round(diffInHours)} hour(s) ago`
  }

  const diffInDays = diffInHours / 24
  if (diffInDays < 30) {
    return `${Math.round(diffInDays)} day(s) ago`
  }

  const diffInMonths = diffInDays / 30
  if (diffInMonths < 12) {
    return `${Math.round(diffInMonths)} month(s) ago`
  }

  const diffInYears = diffInMonths / 12
  return `${Math.round(diffInYears)} year(s) ago`
}

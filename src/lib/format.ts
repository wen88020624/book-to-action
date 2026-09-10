export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" })
}

export function daysSince(date: Date | string) {
  const diff = Date.now() - new Date(date).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "今天"
  if (days === 1) return "1 天前"
  return `${days} 天前`
}

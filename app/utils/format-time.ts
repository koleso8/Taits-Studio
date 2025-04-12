export function formatTime(date: Date): string {
  return date.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

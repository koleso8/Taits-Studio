export function formatTime(date: Date | string): string {
  // Если date - строка, преобразуем её в Date
  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Проверяем, является ли dateObj валидным объектом Date
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return "Невідомий час"; // Запасной вариант, если дата некорректна
  }

  return dateObj.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
export function formatDateToISOString(dateInput: string, withTime?: boolean) {
  const date = new Date(dateInput);

  const year = String(date.getFullYear()).padStart(4, "0").slice(-4);

  // Pad month, date, hours, minutes with leading zeros if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (withTime) {
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  return `${year}-${month}-${day}`;
}

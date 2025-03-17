export function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}-${month}-${year}`;
}

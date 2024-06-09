export function extractTime(dateStr) {
  const time = new Date(dateStr);
  return time.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
}
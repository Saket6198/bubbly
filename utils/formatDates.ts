export const formatMessageDate = (dateString: string): string => {
  if (!dateString) return "";

  const messageDate = new Date(dateString);
  const now = new Date();

  // Get start of today and yesterday
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if message is from today
  if (messageDate >= today) {
    // Format time in 12-hour format
    const hours = messageDate.getHours();
    const minutes = messageDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    const displayMinutes = minutes.toString().padStart(2, "0");

    return `${displayHours}:${displayMinutes} ${ampm}`;
  }

  // Check if message is from yesterday
  const messageDay = new Date(
    messageDate.getFullYear(),
    messageDate.getMonth(),
    messageDate.getDate()
  );
  if (messageDay.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }

  // For older messages, format as dd/mm/yy
  const day = messageDate.getDate().toString().padStart(2, "0");
  const month = (messageDate.getMonth() + 1).toString().padStart(2, "0");
  const year = messageDate.getFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`;
};

/**
 * Alternative function that uses timestamp field if available
 * Handles both 'timestamp' and 'createdAt' fields
 */
export const formatLastMessageTime = (message: any): string => {
  if (!message) return "";

  // Try different timestamp field names
  const timestamp = message.timestamp || message.createdAt;
  if (!timestamp) return "";

  return formatMessageDate(timestamp);
};

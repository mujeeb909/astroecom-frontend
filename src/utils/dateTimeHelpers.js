/**
 * Date and Time Formatting Utilities for Chat Messages
 * WhatsApp-style date separators and time formatting
 */

/**
 * Format time from timestamp - shows only time (e.g., "10:30 AM")
 * @param {string|Date} timestamp - ISO timestamp or Date object
 * @returns {string} Formatted time
 */
export const formatMessageTime = (timestamp) => {
  if (!timestamp) return '';

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return '';

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Get date label for separator (Today, Yesterday, or date)
 * @param {string|Date} timestamp - ISO timestamp or Date object
 * @returns {string} Date label
 */
export const getDateLabel = (timestamp) => {
  if (!timestamp) return '';

  const messageDate = new Date(timestamp);
  if (isNaN(messageDate.getTime())) return '';

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Reset time to compare only dates
  const resetTime = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const msgDate = resetTime(messageDate);
  const todayDate = resetTime(today);
  const yesterdayDate = resetTime(yesterday);

  if (msgDate.getTime() === todayDate.getTime()) {
    return 'Today';
  } else if (msgDate.getTime() === yesterdayDate.getTime()) {
    return 'Yesterday';
  } else {
    // Format as "Dec 25, 2024" or "25/12/2024" based on preference
    return messageDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
};

/**
 * Check if two timestamps are on different days
 * @param {string|Date} timestamp1 
 * @param {string|Date} timestamp2 
 * @returns {boolean}
 */
export const isDifferentDay = (timestamp1, timestamp2) => {
  if (!timestamp1 || !timestamp2) return true;

  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);

  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) return true;

  return (
    date1.getFullYear() !== date2.getFullYear() ||
    date1.getMonth() !== date2.getMonth() ||
    date1.getDate() !== date2.getDate()
  );
};

/**
 * Group messages by date for rendering date separators
 * @param {Array} messages - Array of message objects
 * @returns {Array} Messages with date separator flags
 */
export const addDateSeparators = (messages) => {
  if (!messages || messages.length === 0) return [];

  return messages.map((message, index) => {
    const showDateSeparator = index === 0 ||
      isDifferentDay(
        message.timestamp || message.created_at,
        messages[index - 1]?.timestamp || messages[index - 1]?.created_at
      );

    return {
      ...message,
      showDateSeparator,
      dateLabel: showDateSeparator ? getDateLabel(message.timestamp || message.created_at) : null
    };
  });
};

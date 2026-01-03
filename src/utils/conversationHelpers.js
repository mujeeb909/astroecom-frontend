/**
 * Conversation and Message Data Transformation Helpers
 * Normalizes API responses to match UI component expectations
 */

/**
 * Normalize a conversation object from API to UI format
 * @param {Object} apiConversation - Raw conversation from API
 * @returns {Object} Normalized conversation object
 */
export const normalizeConversation = (apiConversation) => {
  if (!apiConversation) return null;

  return {
    id: apiConversation.id,
    name: apiConversation.customer_name ||
      apiConversation.user_name ||
      apiConversation.customer_user_id ||
      apiConversation.platform_user_id ||
      'Unknown User',
    avatar: null, // Can be added later if needed
    preview: apiConversation.last_message || 'No messages yet',
    timestamp: apiConversation.last_message_timestamp,
    platform: apiConversation.platform,
    unread: apiConversation.unread_count || 0,
    status: apiConversation.status,
    automationEnabled: apiConversation.automation_enabled,
    customerId: apiConversation.customer_id,
    platformUserId: apiConversation.platform_user_id,
    userId: apiConversation.user_id,
    createdAt: apiConversation.created_at,
    updatedAt: apiConversation.updated_at,
  };
};

/**
 * Normalize a message object from API to UI format
 * @param {Object} apiMessage - Raw message from API
 * @returns {Object} Normalized message object
 */
export const normalizeMessage = (apiMessage) => {
  if (!apiMessage) return null;

  return {
    id: apiMessage.id,
    text: apiMessage.text || apiMessage.message,
    sender: apiMessage.sender, // 'customer', 'agent', 'automation'
    direction: apiMessage.direction, // 'incoming', 'outgoing'
    timestamp: apiMessage.timestamp || apiMessage.created_at,
    messageType: apiMessage.message_type, // 'text', 'image', 'audio', 'document'
    mediaUrl: apiMessage.media_url,
    platform: apiMessage.platform,
    isAutomated: apiMessage.is_automated,
    platformMessageId: apiMessage.platform_message_id,
  };
};

/**
 * Get display name for a conversation
 * @param {Object} conversation - Conversation object
 * @returns {string} Display name
 */
export const getConversationDisplayName = (conversation) => {
  return conversation?.customer_name ||
    conversation?.user_name ||
    conversation?.customer_user_id ||
    conversation?.platform_user_id ||
    conversation?.name ||
    'Unknown User';
};

/**
 * Format timestamp to relative time (e.g., "2 hours ago")
 * @param {string|Date} timestamp - Timestamp to format
 * @returns {string} Formatted relative time
 */
export const formatRelativeTime = (timestamp) => {
  if (!timestamp) return '';

  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString();
};

/**
 * Sort conversations by last message timestamp (newest first)
 * @param {Array} conversations - Array of conversations
 * @returns {Array} Sorted conversations
 */
export const sortConversationsByTimestamp = (conversations) => {
  if (!Array.isArray(conversations)) return [];

  return [...conversations].sort((a, b) => {
    const timeA = new Date(a.last_message_timestamp || a.updated_at || 0);
    const timeB = new Date(b.last_message_timestamp || b.updated_at || 0);
    return timeB - timeA; // Newest first
  });
};

/**
 * Filter conversations by platform
 * @param {Array} conversations - Array of conversations
 * @param {string} platform - Platform to filter by ('all', 'whatsapp', 'facebook', 'instagram')
 * @returns {Array} Filtered conversations
 */
export const filterConversationsByPlatform = (conversations, platform) => {
  if (!Array.isArray(conversations)) return [];
  if (!platform || platform === 'all') return conversations;

  return conversations.filter(conv =>
    conv.platform?.toLowerCase() === platform.toLowerCase()
  );
};

/**
 * Get total unread count across all conversations
 * @param {Array} conversations - Array of conversations
 * @returns {number} Total unread count
 */
export const getTotalUnreadCount = (conversations) => {
  if (!Array.isArray(conversations)) return 0;

  return conversations.reduce((total, conv) => {
    return total + (conv.unread_count || 0);
  }, 0);
};

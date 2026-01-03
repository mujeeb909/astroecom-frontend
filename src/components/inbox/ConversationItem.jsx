import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';
import instagramIcon from '../../assets/instagram_icon.svg'
import whatsappIcon from '../../assets/whatsapp_Icon.svg'
import facebookIcon from '../../assets/facebook_icon.svg'

const platformIcons = {
  whatsapp: whatsappIcon,
  instagram: instagramIcon,
  facebook: facebookIcon,
  messenger: '💬',
};

const getInitials = (name) => {
  if (!name) return '??';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getAvatarColor = (name) => {
  const colors = [
    '#4F46E5', // indigo
    '#7C3AED', // violet
    '#DB2777', // pink
    '#DC2626', // red
    '#EA580C', // orange
    '#16A34A', // green
    '#0891B2', // cyan
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

// Format timestamp for conversation list (WhatsApp style)
const formatConversationTime = (timestamp) => {
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
    // Today - show time only
    return messageDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } else if (msgDate.getTime() === yesterdayDate.getTime()) {
    // Yesterday
    return 'Yesterday';
  } else {
    // Older - show date
    return messageDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }
};

export const ConversationItem = ({
  conversation,
  isActive,
  onClick
}) => {
  // Map API fields to component props with fallbacks
  const name = conversation.name || conversation.user_name || conversation.customer_name || 'Unknown';
  const preview = conversation.preview || conversation.last_message || '';
  const rawTimestamp = conversation.timestamp || conversation.last_message_timestamp || '';
  const timestamp = formatConversationTime(rawTimestamp);
  const platform = conversation.platform;
  const unread = conversation.unread || conversation.unread_count || 0;
  const avatar = conversation.avatar;

  const initials = getInitials(name);
  const avatarBg = getAvatarColor(name);

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-start gap-3 p-4 cursor-pointer transition-all border-b border-[#2a2d3a]",
        "hover:bg-[#2a2d3a]/50",
        isActive && "bg-[#2a2d3a]"
      )}
    >
      <div className="relative flex-shrink-0">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-11 h-11 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: avatarBg }}
          >
            {initials}
          </div>
        )}
        {platform && (
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center p-0.5">
            {platformIcons[platform] ? (
              <img
                src={platformIcons[platform]}
                alt={platform}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-[10px]">💬</span>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-[15px] text-white truncate">
            {name}
          </h4>
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            <span className="text-[11px] text-gray-500">
              {timestamp}
            </span>
            {unread > 0 && (
              <div className="w-5 h-5 bg-error rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{unread}</span>
              </div>
            )}
          </div>
        </div>

        <p className="text-[13px] text-gray-400 truncate leading-tight">
          {preview}
        </p>
      </div>
    </div>
  );
};

ConversationItem.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    preview: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    platform: PropTypes.string,
    unread: PropTypes.number,
  }).isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ConversationItem;

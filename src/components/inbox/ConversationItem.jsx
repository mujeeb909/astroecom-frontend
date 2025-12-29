import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const platformIcons = {
  whatsapp: '💬',
  instagram: '📷',
  facebook: '👤',
  messenger: '💬',
};

const getInitials = (name) => {
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

export const ConversationItem = ({
  conversation,
  isActive,
  onClick
}) => {
  const { name, avatar, preview, timestamp, platform, unread } = conversation;
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
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#1a1d29] rounded-full flex items-center justify-center text-[10px]">
            {platformIcons[platform] || '💬'}
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

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, SlidersHorizontal } from 'lucide-react';
import ConversationItem from './ConversationItem';

export const ConversationList = ({
  conversations,
  selectedId,
  onSelectConversation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All Chats');

  const filterOptions = [
    'All Chats',
    'Urgent',
    'Facebook',
    'WhatsApp',
    'Instagram',
  ];

  const filteredConversations = conversations.filter(conv => {
    // Search filter
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.preview.toLowerCase().includes(searchQuery.toLowerCase());

    // Platform filter
    let matchesFilter = true;
    if (selectedFilter !== 'All Chats') {
      if (selectedFilter === 'Urgent') {
        matchesFilter = conv.unread > 0;
      } else {
        matchesFilter = conv.platform?.toLowerCase() === selectedFilter.toLowerCase();
      }
    }

    return matchesSearch && matchesFilter;
  });

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setShowFilterMenu(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#1a1d29] rounded-3xl">
      {/* Header */}
      <div className="p-4 pb-3">
        <h2 className="text-xl font-bold text-white mb-4">
          Messages
        </h2>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search message"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 text-sm text-gray-300 placeholder-gray-500 bg-[#2a2d3a] border-none rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              style={{ marginTop: '-22px' }}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Filter Dropdown */}
            {showFilterMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowFilterMenu(false)}
                />
                <div
                  className="absolute right-0 top-full mt-2 bg-[#2a2d3a] rounded-xl shadow-xl p-2 min-w-[160px] z-20 border border-gray-700"
                >
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFilterSelect(option)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors text-sm ${selectedFilter === option
                        ? 'bg-primary text-white font-medium'
                        : 'text-gray-300 hover:bg-white/5'
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={conversation.id === selectedId}
              onClick={() => onSelectConversation(conversation.id)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p className="text-sm">No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
};

ConversationList.propTypes = {
  conversations: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelectConversation: PropTypes.func.isRequired,
};

export default ConversationList;

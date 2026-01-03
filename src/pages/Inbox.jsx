import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DashboardLayout from '../components/layout/DashboardLayout';
import ConversationList from '../components/inbox/ConversationList';
import ChatView from '../components/inbox/ChatView';
import PlatformWidget from '../components/inbox/PlatformWidget';
import { ArrowLeft } from 'lucide-react';
import { useGetConversationsQuery, useGetMessagesQuery, conversationsApi } from '../services/conversationsApi';
import { useSSE } from '../hooks/useSSE';
import { sortConversationsByTimestamp, filterConversationsByPlatform } from '../utils/conversationHelpers';

export const Inbox = () => {
  const dispatch = useDispatch();
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [platformFilter, setPlatformFilter] = useState('all');
  const [typingConversations, setTypingConversations] = useState(new Set());

  // Fetch conversations from API
  const {
    data: conversationsData,
    isLoading: conversationsLoading,
    error: conversationsError
  } = useGetConversationsQuery();

  // Fetch messages for selected conversation
  const {
    data: messagesData,
    isLoading: messagesLoading,
    error: messagesError
  } = useGetMessagesQuery(
    { conversationId: selectedConversationId },
    { skip: !selectedConversationId }
  );

  // Setup SSE for real-time updates
  useSSE(
    (data) => {
      // Handle new message event - invalidate RTK Query cache
      console.log('New message received:', data);

      // Invalidate conversations list
      dispatch(conversationsApi.util.invalidateTags(['Conversations']));

      // Invalidate messages for this conversation
      if (data.conversationId) {
        dispatch(conversationsApi.util.invalidateTags([
          { type: 'Messages', id: data.conversationId }
        ]));
      }
    },
    (data) => {
      // Handle bot typing event
      setTypingConversations(prev => {
        const newSet = new Set(prev);
        if (data.typing) {
          newSet.add(data.conversationId);
        } else {
          newSet.delete(data.conversationId);
        }
        return newSet;
      });
    },
    dispatch
  );

  // Process conversations data
  const allConversations = conversationsData?.conversations || [];
  const sortedConversations = sortConversationsByTimestamp(allConversations);
  const filteredConversations = filterConversationsByPlatform(sortedConversations, platformFilter);

  // Get selected conversation
  const selectedConversation = filteredConversations.find(
    (c) => c.id === selectedConversationId
  );

  // Get messages for selected conversation
  const currentMessages = messagesData?.messages || [];

  // Check if bot is typing for selected conversation
  const isBotTyping = typingConversations.has(selectedConversationId);

  const handleSelectConversation = (id) => {
    setSelectedConversationId(id);
    setShowMobileChat(true);
  };

  const handleFilterChange = (platform) => {
    setPlatformFilter(platform);
  };

  const handleBackToList = () => {
    setShowMobileChat(false);
  };

  // Show error state if API call fails
  if (conversationsError) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-red-500 mb-2">Failed to load conversations</p>
            <p className="text-sm text-gray-500">
              {conversationsError?.data?.message || conversationsError?.error || 'Unknown error'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="h-full flex overflow-hidden">
        {/* Conversations List - Hidden on mobile when chat is open - FIXED HEIGHT */}
        <div className={`
          w-full md:w-80 lg:w-96 flex-shrink-0 h-full
          ${showMobileChat ? 'hidden md:block' : 'block'}
        `}>
          <ConversationList
            conversations={filteredConversations}
            selectedId={selectedConversationId}
            onSelectConversation={handleSelectConversation}
            loading={conversationsLoading}
          />
        </div>

        {/* Chat View - Full width on mobile, flex-1 on desktop - FIXED HEIGHT */}
        <div className={`
          flex-1 flex h-full
          ${!showMobileChat ? 'hidden md:flex' : 'flex'}
        `}>
          {/* Mobile back button */}
          <div className="md:hidden absolute top-4 left-4 z-10">
            <button
              onClick={handleBackToList}
              className="bg-white dark:bg-surface-dark p-2 rounded-full shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 h-full">
            <ChatView
              conversation={selectedConversation}
              messages={currentMessages}
              onBack={handleBackToList}
              botTyping={isBotTyping}
              loading={messagesLoading}
            />
          </div>

          {/* Platform Widget - Hidden on mobile and tablet */}
          <div className="hidden xl:block h-full overflow-y-auto">
            <PlatformWidget contact={selectedConversation} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inbox;

import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ConversationList from '../components/inbox/ConversationList';
import ChatView from '../components/inbox/ChatView';
import PlatformWidget from '../components/inbox/PlatformWidget';
import { ArrowLeft } from 'lucide-react';

// Mock data
const mockConversations = [
  {
    id: 1,
    name: 'Sophia Clark',
    avatar: null,
    preview: 'Hi there! I\'m interested in your new collection of winter materials used?',
    timestamp: '2m',
    platform: 'whatsapp',
    unread: 2,
  },
  {
    id: 2,
    name: 'James Wilson',
    avatar: null,
    preview: 'I received my order today, but one of the items is missing. Can you help?',
    timestamp: '5m',
    platform: 'instagram',
    unread: 1,
  },
  {
    id: 3,
    name: 'Olivia Bennett',
    avatar: null,
    preview: 'Do you have trouble with the checkout process...',
    timestamp: '1h',
    platform: 'whatsapp',
    unread: 0,
  },
  {
    id: 4,
    name: 'Liam Harper',
    avatar: null,
    preview: 'Do you have any discounts for first-time customers?',
    timestamp: '2h',
    platform: 'messenger',
    unread: 0,
  },
  {
    id: 5,
    name: 'Ava Foster',
    avatar: null,
    preview: 'I love your products! When will you be restocking the Summer Breeze dress?',
    timestamp: '3h',
    platform: 'instagram',
    unread: 0,
  },
  {
    id: 6,
    name: 'Noah Reed',
    avatar: null,
    preview: 'I need to return this size. Can you help me with the process?',
    timestamp: '4h',
    platform: 'whatsapp',
    unread: 0,
  },
  {
    id: 7,
    name: 'Ethan Carter',
    avatar: null,
    preview: 'I received my order today, but one of the items is missing. Can you help?',
    timestamp: '5h',
    platform: 'whatsapp',
    unread: 2,
  },
];

const mockMessages = {
  1: [
    {
      id: 1,
      text: 'Hello! How can I assist you today?',
      timestamp: 'AI Bot',
      isSent: false,
      isBot: true,
    },
    {
      id: 2,
      text: 'Hi there! I\'m interested in your new collection. What materials are used?',
      timestamp: '14:51 (4h ago)',
      isSent: true,
    },
  ],
  7: [
    {
      id: 1,
      text: 'Hello! How can I assist you today?',
      timestamp: 'AI Bot',
      isSent: false,
      isBot: true,
    },
    {
      id: 2,
      text: 'Hi, I received my order today, but one of the items is missing. Can you help?',
      timestamp: '14:51 (4h ago)',
      isSent: true,
    },
    {
      id: 3,
      text: 'I\'m sorry to hear that. Could you please provide your order number?',
      timestamp: 'AI Bot',
      isSent: false,
      isBot: true,
    },
    {
      id: 4,
      text: '#102738',
      timestamp: 'AI Bot',
      isSent: true,
    },
    {
      id: 5,
      text: 'I will shortly connect you to an agent, thank you so much for your patience',
      timestamp: 'AI Bot',
      isSent: false,
      isBot: true,
    },
    {
      id: 6,
      text: 'AI bot is currently handling this chat',
      timestamp: '',
      isSent: false,
      isBot: true,
    },
  ],
};

export const Inbox = () => {
  const [selectedConversationId, setSelectedConversationId] = useState(7);
  const [messages, setMessages] = useState(mockMessages);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const selectedConversation = mockConversations.find(
    (c) => c.id === selectedConversationId
  );

  const currentMessages = messages[selectedConversationId] || [];

  const handleSelectConversation = (id) => {
    setSelectedConversationId(id);
    setShowMobileChat(true);
  };

  const handleSendMessage = (messageData) => {
    let newMessage;

    if (typeof messageData === 'string') {
      // Text message
      newMessage = {
        id: Date.now(),
        text: messageData,
        timestamp: 'Just now',
        isSent: true,
      };
    } else {
      // Audio or other message types
      newMessage = {
        id: Date.now(),
        ...messageData,
        isSent: true,
      };
    }

    setMessages((prev) => ({
      ...prev,
      [selectedConversationId]: [...(prev[selectedConversationId] || []), newMessage],
    }));
  };

  const handleBackToList = () => {
    setShowMobileChat(false);
  };

  return (
    <DashboardLayout>
      <div className="h-full flex overflow-hidden">
        {/* Conversations List - Hidden on mobile when chat is open */}
        <div className={`
          w-full md:w-80 lg:w-96 flex-shrink-0
          ${showMobileChat ? 'hidden md:block' : 'block'}
        `}>
          <ConversationList
            conversations={mockConversations}
            selectedId={selectedConversationId}
            onSelectConversation={handleSelectConversation}
          />
        </div>

        {/* Chat View - Full width on mobile, flex-1 on desktop */}
        <div className={`
          flex-1 flex
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

          <div className="flex-1">
            <ChatView
              conversation={selectedConversation}
              messages={currentMessages}
              onSendMessage={handleSendMessage}
              onBack={handleBackToList}
            />
          </div>

          {/* Platform Widget - Hidden on mobile and tablet */}
          <div className="hidden xl:block">
            <PlatformWidget contact={selectedConversation} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inbox;

import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Send, Paperclip, Mic, X, ArrowLeft, Image, Video, Bot } from 'lucide-react';
import MessageBubble from './MessageBubble';
import DateSeparator from './DateSeparator';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import {
  useSendMessageMutation,
  useSendMessageWithFileMutation,
  useToggleAutomationMutation
} from '../../services/conversationsApi';
import { validateFile } from '../../utils/fileUpload';
import { formatMessageTime, addDateSeparators, formatConversationTime } from '../../utils/dateTimeHelpers';

export const ChatView = ({ conversation, messages, onBack, botTyping, loading }) => {
  const [messageText, setMessageText] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const fileInputRef = useRef(null);

  // RTK Query mutations
  const [sendMessage, { isLoading: sendingMessage }] = useSendMessageMutation();
  const [sendMessageWithFile, { isLoading: sendingFile }] = useSendMessageWithFileMutation();
  const [toggleAutomation, { isLoading: togglingAutomation }] = useToggleAutomationMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      setRecordingTime(0);
    }

    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecording]);

  const handleSend = async () => {
    if (!conversation?.id) return;

    try {
      if (selectedFile) {
        // Send message with file
        await sendMessageWithFile({
          conversationId: conversation.id,
          text: messageText.trim() || '',
          file: selectedFile
        }).unwrap();

        // Clear file
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else if (messageText.trim()) {
        // Send text message
        await sendMessage({
          conversationId: conversation.id,
          text: messageText.trim(),
          messageType: 'text'
        }).unwrap();
      }

      // Clear input
      setMessageText('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      validateFile(file);
      setSelectedFile(file);
      setShowAttachmentMenu(false);
    } catch (error) {
      console.error('File validation error:', error);
      alert(error.message);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleToggleAutomation = async () => {
    if (!conversation?.id) return;

    try {
      await toggleAutomation({
        conversationId: conversation.id
      }).unwrap();
    } catch (error) {
      console.error('Failed to toggle automation:', error);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setMessageText('');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Send audio message with metadata
    onSendMessage({
      type: 'audio',
      duration: recordingTime,
      timestamp: 'Just now'
    });
  };

  const handleCancelRecording = () => {
    setIsRecording(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full bg-white dark:bg-surface-dark">
        <p className="text-text-secondary-light dark:text-text-secondary-dark">
          Select a conversation to start messaging
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-surface-dark relative">
      {/* Automation Banner - FIXED */}
      {conversation.automation_enabled && (
        <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-purple-700 dark:text-purple-300">
                AI Assistant is handling this conversation
              </span>
            </div>
            <button
              onClick={handleToggleAutomation}
              disabled={togglingAutomation}
              className="text-xs px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              {togglingAutomation ? 'Loading...' : 'Take Control'}
            </button>
          </div>
        </div>
      )}

      {/* Original Header - Platform and Take Over Button */}
      <div className="flex items-center justify-between px-4 pt-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Mobile Back Button */}
          {onBack && (
            <button
              onClick={onBack}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
            {conversation.platform || 'WhatsApp'}
          </p>
        </div>

        <Button
          size="sm"
          className="bg-primary hover:bg-primary-600 text-white rounded-xl px-4"
        >
          Take Over
        </Button>
      </div>

      {/* Info Row - Avatar, Name, and Timestamp */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Avatar */}
          <img
            src={conversation.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.name || conversation.user_name)}&background=4142FE&color=fff`}
            alt={conversation.name || conversation.user_name}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />

          {/* Name */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark truncate">
              {conversation.name || conversation.user_name}
            </h3>
          </div>
        </div>

        {/* Last Message Time */}
        <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark flex-shrink-0 ml-2">
          {formatConversationTime(conversation.last_message_timestamp || conversation.updated_at)}
        </div>
      </div>

      {/* Messages - SCROLLABLE AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-gray-500">Loading messages...</p>
            </div>
          </div>
        ) : messages.length > 0 ? (
          <>
            {addDateSeparators(messages).map((message) => {
              // Map API fields to component props
              const isSent = message.direction === 'outgoing';
              const isBot = message.sender === 'automation';
              const messageText = message.text || message.message || '';
              const messageTime = formatMessageTime(message.timestamp || message.created_at);

              // Determine sender label
              let senderLabel = null;
              if (isSent) {
                senderLabel = isBot ? 'AI Bot' : 'You';
              }

              return (
                <div key={message.id}>
                  {/* Date Separator */}
                  {message.showDateSeparator && message.dateLabel && (
                    <DateSeparator label={message.dateLabel} />
                  )}

                  {/* Message Bubble */}
                  <MessageBubble
                    messageId={message.id}
                    text={messageText}
                    timestamp={messageTime}
                    isSent={isSent}
                    avatar={isSent ? null : conversation.avatar}
                    isBot={isBot}
                    isAudio={message.message_type === 'audio'}
                    audioDuration={message.duration}
                    senderLabel={senderLabel}
                  />
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-500">No messages yet</p>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-white/10">
        {isRecording ? (
          /* Recording UI */
          <div className="flex items-center gap-3 bg-error/10 rounded-xl p-4">
            <div className="flex-1 flex items-center gap-3">
              <div className="w-3 h-3 bg-error rounded-full animate-pulse" />
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-error rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 20 + 10}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-error">{formatTime(recordingTime)}</p>
              </div>
            </div>

            <button
              onClick={handleCancelRecording}
              className="p-2 hover:bg-error/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-error" />
            </button>

            <Button
              onClick={handleStopRecording}
              className="bg-primary hover:bg-primary-600 text-white rounded-xl px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          /* Normal Input UI */
          <div className="flex items-center gap-2">
            {/* Attachment Button */}
            <div className="relative">
              <button
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                className="p-3 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              {/* Attachment Dropdown */}
              {showAttachmentMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowAttachmentMenu(false)}
                  />
                  <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-xl shadow-xl p-2 min-w-[160px] z-20">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors text-left">
                      <Image className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">Photos</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors text-left">
                      <Video className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">Videos</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Text Input */}
            <div className="flex-1 relative">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                rows={1}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-surface-dark-alt border border-gray-200 dark:border-white/10 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>

            {/* Send or Mic Button */}
            {messageText.trim() ? (
              <Button
                onClick={handleSend}
                className="bg-primary hover:bg-primary-600 text-white rounded-xl px-6 h-11"
              >
                <Send className="w-4 h-4" />
              </Button>
            ) : (
              <button
                onClick={handleStartRecording}
                className="p-3 bg-primary hover:bg-primary-600 text-white rounded-xl transition-colors"
              >
                <Mic className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ChatView.propTypes = {
  conversation: PropTypes.object,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBack: PropTypes.func,
  botTyping: PropTypes.bool,
  loading: PropTypes.bool,
};

export default ChatView;

import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Send, Paperclip, Mic, X, ArrowLeft, Image, Video } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export const ChatView = ({ conversation, messages, onSendMessage, onBack }) => {
  const [messageText, setMessageText] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const messagesEndRef = useRef(null);
  const recordingIntervalRef = useRef(null);

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

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10">
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

          <img
            src={conversation.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.name)}&background=4142FE&color=fff`}
            alt={conversation.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
              {conversation.name}
            </h3>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              {conversation.platform || 'WhatsApp'}
            </p>
          </div>
        </div>

        <Button
          size="sm"
          className="bg-primary hover:bg-primary-600 text-white rounded-xl px-4"
        >
          Take Over
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            messageId={message.id}
            text={message.text}
            timestamp={message.timestamp}
            isSent={message.isSent}
            avatar={message.isSent ? null : conversation.avatar}
            isBot={message.isBot}
            isAudio={message.type === 'audio'}
            audioDuration={message.duration}
          />
        ))}
        <div ref={messagesEndRef} />
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
  onSendMessage: PropTypes.func.isRequired,
  onBack: PropTypes.func,
};

export default ChatView;

import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Bot } from 'lucide-react';
import { cn } from '../../utils/cn';

// Global state to track currently playing audio
let currentlyPlayingId = null;
const playbackListeners = new Set();

const notifyPlaybackChange = (id) => {
  currentlyPlayingId = id;
  playbackListeners.forEach(listener => listener(id));
};

const AudioPlayer = ({ duration, messageId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Listen for other audio players starting
    const handlePlaybackChange = (playingId) => {
      if (playingId !== messageId && isPlaying) {
        setIsPlaying(false);
      }
    };

    playbackListeners.add(handlePlaybackChange);

    return () => {
      playbackListeners.delete(handlePlaybackChange);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [messageId, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (!isPlaying) {
      // Notify other players to stop
      notifyPlaybackChange(messageId);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    setCurrentTime(newTime);
  };

  return (
    <div className="flex items-center gap-3 bg-white dark:bg-surface-dark-alt rounded-2xl p-3 min-w-[250px]">
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-primary hover:bg-primary-600 flex items-center justify-center text-white transition-colors flex-shrink-0"
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
      </button>

      <div className="flex-1">
        <div
          className="flex items-center gap-1 mb-1 cursor-pointer"
          onClick={handleSeek}
        >
          {[...Array(30)].map((_, i) => {
            const barTime = (i / 30) * duration;
            const isPassed = barTime <= currentTime;

            return (
              <div
                key={i}
                className={cn(
                  "w-1 rounded-full transition-colors",
                  isPassed ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                )}
                style={{
                  height: `${Math.random() * 16 + 8}px`,
                }}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between text-xs text-text-secondary-light dark:text-text-secondary-dark">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

AudioPlayer.propTypes = {
  duration: PropTypes.number.isRequired,
  messageId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export const MessageBubble = ({ text, timestamp, isSent, avatar, isBot, isAudio, audioDuration, messageId, senderLabel }) => {
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isSent ? "justify-end" : "justify-start"
    )}>
      {!isSent && avatar && (
        <img
          src={avatar}
          alt="Avatar"
          className="w-8 h-8 rounded-full flex-shrink-0"
        />
      )}

      <div className={cn(
        "max-w-[70%] space-y-1",
        isSent && "flex flex-col items-end"
      )}>
        {/* Sender Label for outgoing messages */}
        {isSent && senderLabel && (
          <div className="flex items-center gap-1 px-1">
            {isBot && (
              <Bot className="w-3 h-3 text-purple-500" />
            )}
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {senderLabel}
            </span>
          </div>
        )}

        {isAudio ? (
          <div className={cn(
            "rounded-2xl",
            isSent
              ? "bg-primary/10 rounded-br-sm"
              : "bg-gray-100 dark:bg-surface-dark rounded-bl-sm"
          )}>
            <AudioPlayer duration={audioDuration || 0} messageId={messageId} />
          </div>
        ) : (
          <div className={cn(
            "px-4 py-2.5 rounded-2xl text-sm",
            isSent
              ? "bg-primary text-white rounded-br-sm"
              : "bg-gray-100 dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark rounded-bl-sm"
          )}>
            {text}
          </div>
        )}

        {timestamp && (
          <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark px-1">
            {timestamp}
          </span>
        )}
      </div>

      {isSent && avatar && (
        <img
          src={avatar}
          alt="Avatar"
          className="w-8 h-8 rounded-full flex-shrink-0"
        />
      )}
    </div>
  );
};

MessageBubble.propTypes = {
  text: PropTypes.string,
  timestamp: PropTypes.string,
  isSent: PropTypes.bool,
  avatar: PropTypes.string,
  isBot: PropTypes.bool,
  isAudio: PropTypes.bool,
  audioDuration: PropTypes.number,
  messageId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  senderLabel: PropTypes.string,
};

export default MessageBubble;

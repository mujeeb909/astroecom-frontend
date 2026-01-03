/**
 * useSSE Hook - Server-Sent Events for Real-time Updates
 * Handles real-time message updates and bot typing indicators
 */

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { conversationsApi } from '../services/conversationsApi';

/**
 * Custom hook for SSE connection to receive real-time updates
 * @param {Function} onMessage - Callback when new message received
 * @param {Function} onBotTyping - Callback when bot typing status changes
 * @param {Function} dispatch - Redux dispatch function
 * @returns {Object} EventSource ref
 */
export const useSSE = (onMessage, onBotTyping, dispatch) => {
  const eventSourceRef = useRef(null);
  const token = useSelector((state) => state.user.token);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://omni-channel-platform-backend.vercel.app';

  useEffect(() => {
    // Don't connect if no token
    if (!token) {
      console.log('SSE: No token available, skipping connection');
      return;
    }

    console.log('SSE: Establishing connection...');

    // Create SSE connection with token as query parameter
    const eventSource = new EventSource(
      `${apiBaseUrl}/conversations/events?token=${token}`,
      { withCredentials: false }
    );

    eventSourceRef.current = eventSource;

    // Handle connection open
    eventSource.onopen = () => {
      console.log('SSE: Connection established successfully');
    };

    // Handle new message event
    eventSource.addEventListener('message:new', (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('SSE: New message received:', data);

        // Invalidate RTK Query cache to trigger refetch
        if (dispatch) {
          // Invalidate conversations list
          dispatch(conversationsApi.util.invalidateTags(['Conversations']));

          // Invalidate messages for this conversation
          if (data.conversationId) {
            dispatch(conversationsApi.util.invalidateTags([
              { type: 'Messages', id: data.conversationId }
            ]));
          }
        }

        // Call custom callback if provided
        if (onMessage) {
          onMessage(data);
        }
      } catch (error) {
        console.error('SSE: Error parsing message:new event:', error);
      }
    });

    // Handle bot typing event
    eventSource.addEventListener('bot:typing', (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('SSE: Bot typing event:', data);

        // Call custom callback if provided
        if (onBotTyping) {
          onBotTyping(data);
        }
      } catch (error) {
        console.error('SSE: Error parsing bot:typing event:', error);
      }
    });

    // Handle generic message events (fallback)
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('SSE: Generic message received:', data);
      } catch (error) {
        console.error('SSE: Error parsing generic message:', error);
      }
    };

    // Handle connection errors
    eventSource.onerror = (error) => {
      console.error('SSE: Connection error:', error);

      // Close the connection
      eventSource.close();

      // Attempt reconnection after 5 seconds
      console.log('SSE: Will attempt reconnection in 5 seconds...');
      setTimeout(() => {
        if (token && !eventSourceRef.current) {
          console.log('SSE: Attempting to reconnect...');
          // The useEffect will handle reconnection when dependencies change
        }
      }, 5000);
    };

    // Cleanup function - close connection on unmount
    return () => {
      console.log('SSE: Closing connection...');
      if (eventSource) {
        eventSource.close();
        eventSourceRef.current = null;
      }
    };
  }, [token, apiBaseUrl, dispatch, onMessage, onBotTyping]);

  return eventSourceRef;
};

export default useSSE;

import { create } from 'zustand';
import { chatAPI } from '../services/api';
import { generateSessionId } from '../utils/helpers';
import { WELCOME_MESSAGE, ERROR_MESSAGES } from '../utils/constants';

export const useChatStore = create((set, get) => ({
  messages: [WELCOME_MESSAGE],
  isLoading: false,
  error: null,
  sessionId: generateSessionId(),
  isCrisisMode: false,

  sendMessage: async (messageText) => {
    if (!messageText.trim()) {
      set({ error: ERROR_MESSAGES.EMPTY_MESSAGE });
      return;
    }

    const userMessage = {
      text: messageText,
      timestamp: new Date().toISOString(),
      isBot: false
    };

    set({ 
      messages: [...get().messages, userMessage],
      isLoading: true,
      error: null 
    });

    try {
      const response = await chatAPI.sendMessage(messageText, get().sessionId);

      if (response.is_crisis) {
        set({ isCrisisMode: true });
      }

      const botMessage = {
        text: response.message,
        timestamp: response.timestamp || new Date().toISOString(),
        isBot: true,
        sources: response.sources || [],
        isCrisis: response.is_crisis || false
      };

      set({ messages: [...get().messages, botMessage] });
    } catch (err) {
      console.error('Error sending message:', err);

      let errorMessage = ERROR_MESSAGES.SERVER_ERROR;
      if (err.code === 'ECONNABORTED' || err.message.includes('Network')) {
        errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
      } else if (err.response?.status === 429) {
        errorMessage = ERROR_MESSAGES.RATE_LIMIT;
      }

      set({ 
        error: errorMessage,
        messages: [...get().messages, {
          text: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
          timestamp: new Date().toISOString(),
          isBot: true,
          isError: true
        }]
      });
    } finally {
      set({ isLoading: false });
    }
  },

  clearChat: async () => {
    try {
      await chatAPI.clearHistory(get().sessionId);
      set({ 
        messages: [WELCOME_MESSAGE],
        isCrisisMode: false,
        error: null 
      });
    } catch (err) {
      console.error('Error clearing chat:', err);
      set({ error: 'Failed to clear chat history' });
    }
  },

  dismissError: () => set({ error: null }),

  closeCrisisMode: () => set({ isCrisisMode: false }),
}));
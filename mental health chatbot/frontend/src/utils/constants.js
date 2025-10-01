export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  CHAT: '/api/chat',
  CLEAR_HISTORY: '/api/clear-history',
  RESOURCES: '/api/resources',
  HEALTH: '/api/health',
  SEARCH: '/api/search',
  FEEDBACK: '/api/feedback'
};

export const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'end my life', 'want to die',
  'self harm', 'hurt myself', 'no reason to live'
];

export const WELCOME_MESSAGE = {
  text: "Hello! I'm here to provide mental health support and information. How can I help you today?",
  timestamp: new Date().toISOString(),
  isBot: true
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Unable to connect to the server. Please check your connection.",
  SERVER_ERROR: "Something went wrong. Please try again.",
  EMPTY_MESSAGE: "Please enter a message.",
  RATE_LIMIT: "Too many requests. Please wait a moment."
};

export const SAMPLE_PROMPTS = [
  "What is anxiety?",
  "How can I manage stress?",
  "Tell me about depression",
  "What are coping strategies?",
  "How to improve sleep?"
];
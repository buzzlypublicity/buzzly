'use client';

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from 'react';
import { playNotificationSound } from '@/lib/play-notification';

type Message = { role: 'user' | 'assistant'; content: string };

interface ChatContextType {
  messages: Message[];
  input: string;
  setInput: (val: string) => void;
  isLoading: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  handleSend: (e?: React.FormEvent) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Track if we've already played the sound for this response
  const soundPlayedRef = useRef(false);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const handleSend = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!input.trim() || isLoading) return;

      const userMsg: Message = { role: 'user', content: input.trim() };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsLoading(true);

      // Reset sound flag for this new response
      soundPlayedRef.current = false;

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [...messages, userMsg] }),
        });

        if (!response.ok || !response.body) throw new Error('Failed');

        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: '' },
        ]);
        setIsLoading(false);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantMessage = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          assistantMessage += chunk;

          // 🔔 Play sound when first character arrives (once per response)
          if (
            !soundPlayedRef.current &&
            assistantMessage.length > 0 &&
            !isMuted
          ) {
            playNotificationSound();
            soundPlayedRef.current = true;
          }

          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              role: 'assistant',
              content: assistantMessage,
            };
            return newMessages;
          });
        }
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Error connecting to AI.' },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages, isMuted]
  );

  const clearChat = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        setInput,
        isLoading,
        isMuted,
        toggleMute,
        handleSend,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
};
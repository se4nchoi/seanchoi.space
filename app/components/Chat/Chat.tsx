'use client';

import { useState, useRef, useEffect } from 'react';
import { FaComment, FaTimes, FaPaperPlane, FaSpinner } from 'react-icons/fa';

type Message = {
  text: string;
  sender: 'user' | 'ai';
};

const ThinkingMessage: Message = { text: '...', sender: 'ai' };

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    setIsLoading(true);
    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage, ThinkingMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const aiMessage: Message = { text: data.reply, sender: 'ai' };

      setMessages((prev) => [...prev.slice(0, -1), aiMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorMessage: Message = { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'ai' };
      setMessages((prev) => [...prev.slice(0, -1), errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Bubble Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-neutral-800 text-white dark:bg-neutral-200 dark:text-black w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        aria-label="Toggle chat"
      >
        {isOpen ? <FaTimes size={24} /> : <FaComment size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[28rem] bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-neutral-300 dark:border-neutral-700">
            <h3 className="font-medium text-lg">Chat with Sean's AI</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="flex">
                <div
                  className={`mb-3 p-2 rounded-lg max-w-[85%] ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white ml-auto'
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200'
                  }`}
                >
                  {msg === ThinkingMessage ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-neutral-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-neutral-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-neutral-500 rounded-full animate-pulse"></div>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-neutral-300 dark:border-neutral-700">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
                placeholder="Ask me anything..."
                className="flex-1 p-2 border border-neutral-400 dark:border-neutral-600 rounded-l-md bg-transparent focus:outline-none focus:ring-0 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 flex items-center justify-center h-[42px] w-[42px] cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
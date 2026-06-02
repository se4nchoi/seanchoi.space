'use client';

import { useState, useEffect } from 'react';

export function ChatGreeting() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already seen or dismissed the greeting
    const hasSeenGreeting = localStorage.getItem('hasSeenChatGreeting');
    
    if (!hasSeenGreeting) {
      // Add a slight delay so it pops up a moment after the page loads
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissGreeting = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenChatGreeting', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-26 right-8 z-50 w-64 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          Talk with my AI about me! 👋
        </h3>
        <button onClick={dismissGreeting} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <p className="text-xs text-neutral-600 dark:text-neutral-400">
        You can now chat with my AI assistant to learn more about me or my work.
      </p>
      {/* A small triangle pointing down towards the chat button */}
      <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white dark:bg-neutral-900 border-b border-r border-neutral-200 dark:border-neutral-800 transform rotate-45"></div>
    </div>
  );
}
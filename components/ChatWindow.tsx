import React, { useState, useRef, useEffect } from 'react';
import { askChatBot } from '../services/geminiService';
import { Chat as GeminiChat } from '@google/genai';
import { BotIcon } from './icons/BotIcon';
import { ChatMessage } from '../types';
import { PaperPlaneIcon } from './icons/PaperPlaneIcon';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  systemInstruction: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose, title, systemInstruction }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<GeminiChat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ sender: 'bot', text: `Hello! I'm the ${title}. How can I help you?` }]);
    }
  }, [isOpen, title]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { chat, response } = await askChatBot(chatRef.current, input, systemInstruction);
      chatRef.current = chat; // Update chat session reference
      const botMessage: ChatMessage = { sender: 'bot', text: response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Gemini chat error:', error);
      const errorMessage: ChatMessage = { sender: 'bot', text: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-white rounded-xl shadow-2xl flex flex-col animate-fade-in-up">
      <header className="bg-brand-green-800 text-white p-4 flex justify-between items-center rounded-t-xl flex-shrink-0">
        <h2 className="text-lg font-semibold truncate pr-2">{title}</h2>
        <button onClick={onClose} className="text-2xl leading-none font-bold text-white opacity-70 hover:opacity-100">&times;</button>
      </header>
      <div className="flex-grow p-4 overflow-y-auto bg-brand-green-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 mb-4 animate-fade-in ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && <div className="w-8 h-8 flex-shrink-0"><BotIcon className="w-8 h-8 text-white bg-brand-green-600 rounded-full p-1 self-start"/></div>}
            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-brand-green-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-end gap-2 mb-4 justify-start">
                <div className="w-8 h-8 flex-shrink-0"><BotIcon className="w-8 h-8 text-white bg-brand-green-600 rounded-full p-1"/></div>
                <div className="max-w-xs p-3 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none">
                    <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-brand-green-500 rounded-full animate-pulse"></span>
                        <span className="w-2 h-2 bg-brand-green-500 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                        <span className="w-2 h-2 bg-brand-green-500 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 border-t bg-white rounded-b-xl flex-shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-grow p-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-green-500 focus:outline-none"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-brand-green-600 text-white p-3 rounded-full hover:bg-brand-green-700 disabled:bg-gray-400 transition-colors">
             <PaperPlaneIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
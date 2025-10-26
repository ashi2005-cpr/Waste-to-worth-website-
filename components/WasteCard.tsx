import React, { useState } from 'react';
import { WasteItem } from '../types';
import ChatWindow from './ChatWindow';

interface WasteCardProps {
  item: WasteItem;
}

const WasteCard: React.FC<WasteCardProps> = ({ item }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="overflow-hidden">
            <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <span className="inline-block bg-brand-green-100 text-brand-green-800 text-sm font-semibold px-3 py-1 rounded-full mb-3 self-start">{item.type}</span>
          <h3 className="text-xl font-bold text-brand-green-900 mb-2">{item.title}</h3>
          <p className="text-brand-brown-800 mb-4 flex-grow text-sm leading-relaxed">{item.description}</p>
          <div className="border-t pt-4 mt-auto space-y-2 text-sm text-brand-brown-900">
             <p><strong>Quantity:</strong> {item.quantity}</p>
             <p><strong>Location:</strong> {item.location}</p>
             <p><strong>Provider:</strong> {item.user.name} ({item.user.role})</p>
          </div>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-full mt-6 bg-brand-green-600 text-white font-bold py-3 px-4 rounded-full hover:bg-brand-green-700 transition duration-300 transform group-hover:scale-105"
          >
            Connect & Collaborate
          </button>
        </div>
      </div>
      {isChatOpen && (
         <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in"
            onClick={() => setIsChatOpen(false)}
        >
            <div 
                className="relative w-full max-w-lg h-3/4 max-h-[700px] p-4"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the chat window
            >
                <ChatWindow
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                    title={`Chat with ${item.user.name}`}
                    systemInstruction={`You are a helpful assistant facilitating a connection between a user and ${item.user.name} regarding their listing for '${item.title}'. Be polite and help them draft an opening message.`}
                />
            </div>
         </div>
      )}
    </>
  );
};

export default WasteCard;
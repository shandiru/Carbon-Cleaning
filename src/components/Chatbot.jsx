// Chatbot.jsx
import { useState, useRef, useEffect } from 'react';
import { FAQ_DATA, QUICK_REPLIES, BRAND_COLORS } from './ChatData';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', content: 'Hi! How can I help with your engine cleaning today?' }]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    
    // Logic to find answer
    const match = FAQ_DATA.find(f => f.keywords.some(k => text.toLowerCase().includes(k)));
    const botResponse = match ? match.response : "I'm not sure. Please call 07752 549740 for help!";

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    }, 600);
    setInput('');
  };

  return (
    <div className="font-sans ">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 text-white rounded-full p-4 shadow-lg z-50 transition-transform hover:scale-110"
          style={{ backgroundColor: BRAND_COLORS.primary }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[550px] bg-white dark:bg-black rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="p-4 text-white flex justify-between items-center" style={{ backgroundColor: BRAND_COLORS.primary }}>
            <span className="font-bold flex items-center gap-2">🚗 <span className="text-sm">Carbon Clean Support</span></span>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition-colors">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-black">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm whitespace-pre-line ${msg.role === 'user' ? 'text-white' : 'bg-gray-100 text-gray-800'}`}
                  style={msg.role === 'user' ? { backgroundColor: BRAND_COLORS.primary } : {}}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer & Input */}
          <div className="p-3 bg-gray-50 dark:bg-zinc-900 border-t">
            {messages.length < 3 && (
              <div className="flex gap-2 overflow-x-auto pb-2 mb-2 no-scrollbar">
                {QUICK_REPLIES.map(q => (
                  <button key={q} onClick={() => handleSend(q)} className={`whitespace-nowrap px-3 py-1 rounded-full border border-red-200 text-xs bg-white ${BRAND_COLORS.textRed}`}>
                    {q}
                  </button>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask us anything..."
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-1"
                style={{ borderColor: BRAND_COLORS.primary }}
              />
              <button onClick={() => handleSend()} className="p-2 rounded-full text-white" style={{ backgroundColor: BRAND_COLORS.primary }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
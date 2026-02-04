// Chatbot.jsx
import { useState, useRef, useEffect } from 'react';
import { FAQ_DATA, QUICK_REPLIES, BRAND_COLORS } from './ChatData';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hi! How can I help with your engine cleaning today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsTyping(true);

    const match = FAQ_DATA.find(f =>
      f.keywords.some(k => text.toLowerCase().includes(k))
    );

    const botResponse = match
      ? match.response
      : "I'm not sure. Please call 📞 07752 549740 for help!";

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    }, 700);
  };

  return (
    <div className="font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 text-white rounded-full p-4 shadow-xl z-50 transition-transform hover:scale-110"
          style={{ backgroundColor: BRAND_COLORS.primary }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 w-80 md:w-96 h-[550px]
          bg-white  rounded-2xl shadow-2xl
          flex flex-col z-50 overflow-hidden border border-gray-200
          animate-[fadeIn_0.25s_ease-out]"
        >
          {/* Header */}
          <div
            className="p-4 text-white flex justify-between items-center shadow-md"
            style={{ backgroundColor: BRAND_COLORS.primary }}
          >
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                🚗
              </div>
              <div>
                <p className="text-sm font-semibold">Carbon Clean Support</p>
                <p className="text-xs opacity-80">Online • Replies fast</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-70">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 ">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                    🚗
                  </div>
                )}

                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed
                  ${
                    msg.role === 'user'
                      ? 'text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                  }`}
                  style={
                    msg.role === 'user'
                      ? { backgroundColor: BRAND_COLORS.primary }
                      : {}
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                  🚗
                </div>
                Carbon Clean is typing…
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="p-3 bg-white  border-t">
            { (
              <div className="flex gap-2 overflow-x-auto pb-2 mb-2 no-scrollbar">
                {QUICK_REPLIES.map(q => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs
                    bg-gray-100 hover:bg-gray-200 transition shadow-sm"
                  >
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
                className="flex-1 px-4 py-2 rounded-full border border-gray-300
                text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: BRAND_COLORS.primary }}
              />
              <button
                onClick={() => handleSend()}
                className="p-2 rounded-full text-white"
                style={{ backgroundColor: BRAND_COLORS.primary }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default Chatbot;

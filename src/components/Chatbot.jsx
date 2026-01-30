import { useState, useRef, useEffect } from 'react';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Your FAQ database
  const faqData = [
    {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
      response: 'Hello! How can I assist you today? 😊'
    },
    {
      keywords: ['hours', 'open', 'timing', 'schedule', 'time'],
      response: 'We are open Monday to Friday, 9 AM to 6 PM, and Saturday 10 AM to 4 PM.'
    },
    {
      keywords: ['price', 'cost', 'pricing', 'how much', 'payment'],
      response: 'Our pricing starts at $99/month for basic plan. Premium plan is $199/month. Would you like more details?'
    },
    {
      keywords: ['contact', 'email', 'phone', 'reach', 'call'],
      response: 'You can reach us at contact@example.com or call +1-234-567-890. We typically respond within 24 hours.'
    },
    {
      keywords: ['location', 'address', 'where', 'office'],
      response: 'We are located at 123 Main Street, New York, NY 10001. Feel free to visit us during business hours!'
    },
    {
      keywords: ['refund', 'return', 'money back', 'guarantee'],
      response: 'We offer a 30-day money-back guarantee on all purchases. No questions asked!'
    },
    {
      keywords: ['shipping', 'delivery', 'ship', 'deliver'],
      response: 'We offer free shipping on orders over $50. Standard delivery takes 3-5 business days, express is 1-2 days.'
    },
    {
      keywords: ['help', 'support', 'assistance', 'what can you do'],
      response: 'I can help you with:\n• Business hours\n• Pricing information\n• Contact details\n• Location\n• Refund policy\n• Shipping info\n\nWhat would you like to know?'
    },
    {
      keywords: ['thank', 'thanks', 'appreciate'],
      response: 'You\'re welcome! Is there anything else I can help you with? 😊'
    },
    {
      keywords: ['bye', 'goodbye', 'see you', 'later'],
      response: 'Goodbye! Feel free to come back if you have more questions. Have a great day! 👋'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    const match = faqData.find(faq =>
      faq.keywords.some(keyword => lowerInput.includes(keyword))
    );

    return match 
      ? match.response 
      : "I'm sorry, I don't have an answer for that. Please try asking about:\n• Hours\n• Pricing\n• Contact info\n• Location\n• Refunds\n• Shipping";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);

    const botResponse = findAnswer(input);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    }, 600);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickReplies = ['Business Hours', 'Pricing', 'Contact Us', 'Shipping Info'];

  const handleQuickReply = (reply) => {
    setInput(reply);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50 mb-20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
                AI
              </div>
              <div>
                <h3 className="font-semibold">Customer Support</h3>
                <p className="text-xs text-blue-100">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-800 rounded-full p-1 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-sm' 
                    : 'bg-white text-gray-800 shadow-sm rounded-bl-sm'
                }`}>
                  <p className="text-sm whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 bg-gray-50 flex gap-2 flex-wrap">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickReply(reply)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full px-5 py-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default Chatbot;
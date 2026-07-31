'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { submitLead } from '@/app/actions/leads';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello. I am the K Raheja Vistas AI Assistant. Are you interested in floor plans, pricing, or scheduling a site visit?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // CRM Lead Capture State
  const [captureStep, setCaptureStep] = useState<'idle' | 'name' | 'phone' | 'email' | 'submitted'>('idle');
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '', configuration: 'Undecided' });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userInput = input.trim();
    const userMessage = { id: Date.now().toString(), role: 'user' as const, content: userInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate Network/AI Delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let aiResponse = "";

    // CRM Lead Capture Flow
    if (captureStep === 'name') {
      setLeadData(prev => ({ ...prev, name: userInput }));
      aiResponse = `Thanks, ${userInput}. What is the best phone number to reach you at?`;
      setCaptureStep('phone');
    } 
    else if (captureStep === 'phone') {
      setLeadData(prev => ({ ...prev, phone: userInput }));
      aiResponse = "Perfect. And finally, your email address so I can send you the brochure?";
      setCaptureStep('email');
    } 
    else if (captureStep === 'email') {
      const finalData = { ...leadData, email: userInput };
      setLeadData(finalData);
      aiResponse = "Excellent. I am registering your interest directly with our Executive Sales Team...";
      setCaptureStep('submitted');
      
      // FIRE SERVER ACTION
      const result = await submitLead(finalData);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (result.success) {
        aiResponse = `Registration successful! An executive will contact you shortly. Reference ID: ${result.leadId?.substring(0,6).toUpperCase()}`;
      } else {
        aiResponse = "Apologies, there was an error submitting your details. Please try again or call us directly.";
        setCaptureStep('idle');
      }
    } 
    // General Conversational Flow & Intent Detection
    else {
      const lowerInput = userInput.toLowerCase();
      
      if (lowerInput.includes('visit') || lowerInput.includes('book') || lowerInput.includes('price')) {
        aiResponse = "I can certainly help you with that! To ensure you get the best executive assistance, could you please share your full name?";
        setCaptureStep('name');
        if (lowerInput.includes('3 bhk') || lowerInput.includes('3bhk')) {
          setLeadData(prev => ({ ...prev, configuration: '3 BHK' }));
        } else if (lowerInput.includes('2 bhk') || lowerInput.includes('2bhk')) {
          setLeadData(prev => ({ ...prev, configuration: '2 BHK' }));
        }
      } else if (lowerInput.includes('location')) {
        aiResponse = "We are located at Baner Annex, Mahalunge, just 4.5km from Hinjewadi IT Park. Would you like to schedule a site visit?";
      } else if (lowerInput.includes('amenities')) {
        aiResponse = "The property features 75% open landscaped spaces, twin clubhouses, and a temperature-controlled pool. Should I arrange a callback for more details?";
      } else {
        aiResponse = "Our ultra-premium deck residences offer an unparalleled lifestyle. Would you like to check availability or schedule a VIP site visit?";
      }
    }

    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: aiResponse }]);
    setIsTyping(false);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] shadow-2xl ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
          >
            {/* Header */}
            <div className="bg-[var(--color-luxury-charcoal)] p-4 flex justify-between items-center text-white shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--color-luxury-gold)] rounded-full text-[var(--color-luxury-charcoal)]">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-[var(--color-luxury-pearl)] font-medium tracking-wide">Vistas Concierge AI</h3>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-luxury-gold)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-[#fafafa] flex flex-col gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[var(--color-luxury-charcoal)] text-[var(--color-luxury-pearl)] rounded-br-sm shadow-md' 
                      : 'bg-white border border-gray-100 text-gray-700 shadow-sm rounded-bl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-sm shadow-sm flex gap-1.5">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1.5 pl-5 border border-gray-200 focus-within:border-[var(--color-luxury-gold)] focus-within:ring-1 focus-within:ring-[var(--color-luxury-gold)] transition-all">
                <input 
                  type={captureStep === 'phone' ? 'tel' : captureStep === 'email' ? 'email' : 'text'} 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={
                    captureStep === 'name' ? 'Enter your name...' :
                    captureStep === 'phone' ? 'Enter your phone number...' :
                    captureStep === 'email' ? 'Enter your email...' :
                    'Ask about pricing or visit...'
                  }
                  className="flex-1 bg-transparent text-sm focus:outline-none text-[var(--color-luxury-charcoal)] placeholder-gray-400"
                  disabled={captureStep === 'submitted'}
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || captureStep === 'submitted'}
                  className="p-2.5 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] rounded-full disabled:opacity-50 hover:bg-[var(--color-luxury-charcoal)] hover:text-[var(--color-luxury-gold)] transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

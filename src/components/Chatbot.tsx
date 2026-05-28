import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Sparkles, Loader2, User, Bot, Minimize2, ArrowRight, ArrowDown } from 'lucide-react';
import { getPortfolioContext } from '@/lib/chatbot-context';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [showPointer, setShowPointer] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! I'm Alishba's AI assistant. Want to know about her projects, skills, or how she can help your team?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [context, setContext] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Show pointer after 1.5 seconds if chatbot is not already open
    useEffect(() => {
        const dismissed = sessionStorage.getItem('chatbot_pointer_dismissed');
        if (!dismissed && !isOpen) {
            const timer = setTimeout(() => {
                setShowPointer(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleOpenChatbot = () => {
        setIsOpen(true);
        setShowPointer(false);
        sessionStorage.setItem('chatbot_pointer_dismissed', 'true');
    };

    const handleDismissPointer = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowPointer(false);
        sessionStorage.setItem('chatbot_pointer_dismissed', 'true');
    };

    // Fetch portfolio context once on mount
    useEffect(() => {
        const fetchContext = async () => {
            const data = await getPortfolioContext();
            setContext(data);
        };
        fetchContext();
    }, []);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            
            if (!apiKey) {
                setTimeout(() => {
                    setMessages(prev => [...prev, { 
                        role: 'assistant', 
                        content: "I'm ready to chat, but my API key is missing! Please add VITE_GEMINI_API_KEY to your .env file to enable my brain. 🧠" 
                    }]);
                    setIsLoading(false);
                }, 1000);
                return;
            }

            // Prepare history for better conversation
            const history = messages.slice(-5).map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }]
            }));

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-goog-api-key': apiKey 
                },
                body: JSON.stringify({
                    contents: [
                        { 
                            role: 'user', 
                            parts: [{ text: `SYSTEM: You are Alishba's expert AI assistant. Professional, senior-engineer level, extremely concise. 
                            Current Date: May 2026.
                            Context: ${context}
                            Rules: 
                            1. BE CONCISE. Give "to the point" answers.
                            2. EMPLOYMENT STATUS: If asked if she is working, check the end dates. If a role ended (e.g., "March 2026"), she is NOT currently working there. She is currently "available for new opportunities".
                            3. Format with Markdown. Use bold for key names.` }] 
                        },
                        {
                            role: 'model',
                            parts: [{ text: "Understood. I will provide concise, professional, and properly formatted information about Alishba Iqbal." }]
                        },
                        ...history,
                        { role: 'user', parts: [{ text: userMessage }] }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1000,
                    }
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message || 'API Error');
            }

            const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (!botResponse) {
                throw new Error('No response from AI');
            }

            setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
        } catch (error: any) {
            console.error('Chatbot error:', error);
            const errorMsg = error.message?.includes('API key') 
                ? "It looks like there's an issue with the API key. Please double check your .env file."
                : "I'm having a small brain-freeze. Could you try asking that again?";
            setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-sans">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
                        className="mb-4 w-[350px] md:w-[400px] h-[500px] flex flex-col overflow-hidden bg-background/80 backdrop-blur-2xl border border-primary/20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/10"
                    >
                        {/* Header */}
                        <div className="p-4 bg-primary/10 border-b border-primary/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-foreground">Alishba AI</h3>
                                    <div className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-primary/10 rounded-full transition-colors text-muted-foreground hover:text-foreground"
                            >
                                <Minimize2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                        msg.role === 'user' 
                                            ? 'bg-primary text-primary-foreground rounded-tr-none' 
                                            : 'bg-muted/50 border border-primary/10 text-foreground rounded-tl-none backdrop-blur-sm'
                                    }`}>
                                        <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                                            <ReactMarkdown 
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    p: ({ children }: any) => <p className="mb-2 last:mb-0">{children}</p>,
                                                    ul: ({ children }: any) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                                                    ol: ({ children }: any) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                                                    li: ({ children }: any) => <li className="mb-1">{children}</li>,
                                                    strong: ({ children }: any) => <span className="font-bold text-primary">{children}</span>,
                                                    code: ({ children }: any) => <code className="bg-primary/10 px-1 rounded text-xs font-mono">{children}</code>
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-muted/50 border border-primary/10 p-3 rounded-2xl rounded-tl-none">
                                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-primary/10 bg-muted/20">
                            <div className="relative flex items-center gap-2">
                                <input 
                                    type="text" 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask me anything..."
                                    className="w-full bg-background/50 border border-primary/20 rounded-full py-2.5 px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                                />
                                <button 
                                    onClick={handleSendMessage}
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-1.5 p-2 bg-primary text-primary-foreground rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <p className="text-[9px] text-center mt-3 text-muted-foreground uppercase tracking-widest opacity-50">
                                Powered by Gemini 1.5 Flash
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <div className="relative flex items-center justify-end">
                        {/* Elegant Tooltip Pointer */}
                        <AnimatePresence>
                            {showPointer && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15, scale: 0.9, filter: 'blur(5px)' }}
                                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: 15, scale: 0.9, filter: 'blur(5px)' }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className="absolute bottom-16 right-0 mb-3 w-[280px] sm:w-72 md:bottom-0 md:right-16 md:mb-0 md:mr-3 bg-background/90 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex flex-col gap-2 z-50 text-foreground select-none pointer-events-auto"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">AI Portfolio Guide</span>
                                        </div>
                                        <button 
                                            onClick={handleDismissPointer}
                                            className="p-1 hover:bg-primary/10 rounded-full transition-colors text-muted-foreground hover:text-foreground"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    
                                    <p className="text-xs leading-relaxed text-muted-foreground">
                                        Hi! Feel free to ask me anything about Alishba's experience, technologies, or education in one go!
                                    </p>
                                    
                                    <div className="flex items-center justify-end gap-1.5 mt-1 text-[11px] font-bold text-primary">
                                        <span>Ask AI Guide</span>
                                        {/* Desktop animated arrow pointing right */}
                                        <motion.div
                                            animate={{ x: [0, 6, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                                            className="hidden md:block"
                                        >
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </motion.div>
                                        {/* Mobile animated arrow pointing down */}
                                        <motion.div
                                            animate={{ y: [0, 6, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                                            className="md:hidden"
                                        >
                                            <ArrowDown className="w-3.5 h-3.5" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Chatbot Button */}
                        <motion.button
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleOpenChatbot}
                            className="w-14 h-14 rounded-full bg-primary shadow-[0_10px_30px_rgba(var(--primary-rgb),0.5)] flex items-center justify-center text-primary-foreground relative group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <MessageSquare className="w-6 h-6" />
                            <motion.div 
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background" 
                            />
                        </motion.button>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

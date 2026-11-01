import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Globe, 
  Bot, 
  User, 
  Lightbulb,
  Mic,
  MicOff
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/api';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AICareerCoach: React.FC = () => {
  const { profile, showToast } = useApp();
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Hello ${profile.name.split(' ')[0]}. I've reviewed your candidate profile and ${profile.careerReadiness} Career Readiness index. How can I assist your career progression today?`,
      time: 'Just now'
    }
  ]);

  const languages = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada'];

  const suggestedQuestions = [
    "What jobs match my profile best?",
    "Why is my readiness score 86?",
    "What skill should I learn next?",
    "How can I improve my resume bullet points?",
    "Simulate a technical interview question."
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isThinking) return;

    const userMsg: Message = { sender: 'user', text, time: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const history = messages.slice(-4).map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));
      const reply = await apiService.chatWithCoach(text, selectedLanguage, profile, history);
      setMessages(prev => [...prev, { sender: 'ai', text: reply, time: 'Just now' }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: `I recommend continuing to optimize your technical profile in ${selectedLanguage} with verified cloud credentials.`, 
        time: 'Just now' 
      }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            AI Career Coach & Interview Assistant
          </h1>
          <p className="text-xs text-slate-500">Context-aware LLM assistant trained on technical interview rubrics and executive resume benchmarks.</p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs">
          <Globe className="w-4 h-4 text-slate-500" />
          <select
            value={selectedLanguage}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              showToast(`Language set to ${e.target.value}`);
            }}
            className="bg-transparent text-xs font-semibold text-slate-800 border-none outline-none cursor-pointer"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Chat Container */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col h-[580px] overflow-hidden">
        
        {/* Banner */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-bold text-slate-900 font-mono uppercase">Amazon Bedrock LLM Session</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Candidate: Alex Morgan</span>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-3.5 rounded-xl leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-50 border border-slate-200 text-slate-800'
              }`}>
                <p>{msg.text}</p>
                <span className={`text-[10px] mt-1 block font-mono ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[11px] font-mono">Amazon Bedrock is thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Prompt Suggestions */}
        <div className="p-3 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase font-mono flex-shrink-0">Suggested:</span>
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all flex-shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Ask a career question in ${selectedLanguage}...`}
            className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>

      </div>
    </div>
  );
};

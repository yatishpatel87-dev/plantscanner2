import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, Bot, User, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types/plant';
import { apiService } from '../services/apiService';

interface ChatAssistantProps {
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  initialPrompt,
  onClearInitialPrompt
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `નમસ્તે ખેડૂત મિત્ર! 🌱\nહું આપનો **સ્માર્ટ કૃષિ સહાયક** (AI Plant Assistant) છું.\n\nઆપ પાકના રોગ, જીવાત નિયંત્રણ, ખાતરનું આયોજન, સિંચાઈ પદ્ધતિ કે હવામાન અંગે કંઈ પણ ગુજરાતીમાં પૂછી શકો છો.\n\n🎤 આપ નીચે આપેલા માઇક બટનથી **બોલીને પણ પૂછી શકો છો**!`,
      timestamp: new Date().toLocaleTimeString('gu-IN', { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'મારા કપાસના પાન પીળા થઈ ગયા છે, શું કરું?',
        'મગફળીમાં ટિક્કા રોગ અને સફેદ ફૂગનો ઉપાય',
        'ટપક પદ્ધતિમાં ખાતર આપવાની યોગ્ય રીત',
        'ડુંગળીમાં થ્રીપ્સનું જૈવિક નિયંત્રણ'
      ]
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize SpeechRecognition if supported
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'gu-IN'; // Default to Gujarati, fallback to hi-IN handled gracefully

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(prev => (prev ? `${prev} ${transcript}` : transcript));
        }
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setSpeechError('માઇક્રોફોનની પરવાનગી નથી મળી. કૃપા કરીને બ્રાઉઝર સેટિંગ્સમાં માઇક ચાલુ કરો.');
        } else if (event.error === 'no-speech') {
          setSpeechError('કોઈ અવાજ સંભળાયો નથી. ફરીથી બોલો.');
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Handle incoming initial prompt from report card
  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) {
        onClearInitialPrompt();
      }
    }
  }, [initialPrompt]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const toggleSpeechRecognition = () => {
    setSpeechError(null);
    if (!recognitionRef.current) {
      setSpeechError('આપના બ્રાઉઝરમાં વોઇસ ઇનપુટ સપોર્ટેડ નથી. કૃપા કરીને ટાઇપ કરીને પૂછો.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString('gu-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map(m => ({
        role: m.role,
        content: m.text
      }));

      const response = await apiService.sendChatMessage(trimmed, historyPayload);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString('gu-IN', { hour: '2-digit', minute: '2-digit' }),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        text: 'માફ કરશો, જવાબ તૈયાર કરવામાં વિલંબ થયો છે. કૃપા કરીને પ્રશ્ન ફરીથી પૂછો.',
        timestamp: new Date().toLocaleTimeString('gu-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 sm:py-6 h-[calc(100vh-140px)] flex flex-col">
      {/* Chat Header */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-emerald-100 flex items-center justify-between mb-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-800 text-emerald-200 flex items-center justify-center shadow-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-emerald-950 flex items-center gap-1.5">
              <span>કૃષિ મિત્ર – AI સહાયક</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>
            <p className="text-xs text-slate-500">ગુજરાતી ખેતી, રોગ અને ખાતર માર્ગદર્શન</p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="text-xs text-slate-500 hover:text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200"
          title="નવી વાતચીત શરૂ કરો"
        >
          નવી ચેટ
        </button>
      </div>

      {/* Speech Listening Banner */}
      {isListening && (
        <div className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-between mb-2 animate-pulse shrink-0">
          <span className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-amber-300" />
            <span>સાંભળી રહ્યો છું... કૃપા કરીને ગુજરાતીમાં બોલો</span>
          </span>
          <button
            onClick={toggleSpeechRecognition}
            className="text-[11px] underline hover:text-emerald-100"
          >
            બંધ કરો
          </button>
        </div>
      )}

      {/* Speech Error Banner */}
      {speechError && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-3 py-2 rounded-xl text-xs flex items-center gap-2 mb-2 shrink-0">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{speechError}</span>
        </div>
      )}

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-slate-800 text-white'
                  : 'bg-emerald-700 text-white'
              }`}
            >
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-emerald-800 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-emerald-100 rounded-tl-none'
              }`}
            >
              {/* Formatted Text Content */}
              <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

              {/* Timestamp */}
              <div
                className={`text-[10px] mt-1.5 text-right ${
                  msg.role === 'user' ? 'text-emerald-200' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </div>

              {/* Contextual Suggestions Chips */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-500 mb-1.5">
                    સૂચવેલા પ્રશ્નો:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSendMessage(sug)}
                        className="text-left text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-lg px-2.5 py-1 transition-colors"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-emerald-100 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-2 text-xs text-slate-600">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
              <span>AI કૃષિ મિત્ર જવાબ વિચારી રહ્યો છે...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Controls Bar */}
      <div className="bg-white rounded-2xl p-2.5 shadow-md border border-emerald-100 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Input Mic Button */}
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 shadow-sm ${
              isListening
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}
            title="બોલીને પૂછો (Voice Input)"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="અહીં ગુજરાતીમાં લખો અથવા માઇક પર ક્લિક કરો..."
            disabled={isLoading}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-sm"
            title="મોકલો"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

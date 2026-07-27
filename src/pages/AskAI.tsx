import { useEffect, useRef, useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Trash2,
  AlertTriangle,
  User,
  Ear,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { generateChatReply, isGeminiConfigured, type ChatMessage } from '@/lib/gemini';

const SUGGESTED_QUESTIONS = [
  'Can stress cause tinnitus?',
  'What are signs of hearing loss?',
  'When should I visit an ENT?',
  'What causes ringing in the ears?',
  'How can I protect my hearing?',
  'What is an audiologist?',
  'Can loud music damage hearing?',
];

const WELCOME: ChatMessage = {
  role: 'model',
  text: "Hi, I'm HearGuide AI. I can help you understand hearing symptoms, tests, and protection in plain language. Ask me anything, or tap one of the suggested questions below.\n\nThis information is for educational purposes only and is not a medical diagnosis. Please consult a qualified healthcare professional.",
};

export default function AskAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setError(null);
    setInput('');
    const next: ChatMessage[] = [...messages, { role: 'user', text: trimmed }];
    setMessages(next);
    setLoading(true);
    try {
      const reply = await generateChatReply(messages, trimmed);
      setMessages((m) => [...m, { role: 'model', text: reply }]);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again in a moment.',
      );
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const clearChat = () => {
    setMessages([WELCOME]);
    setError(null);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero band */}
      <section className="relative pt-32 pb-10 sm:pt-36 sm:pb-12 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="absolute top-20 -right-32 w-[26rem] h-[26rem] bg-blue-200/30 rounded-full blur-3xl -z-10" />
        <div className="absolute top-32 -left-32 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader
            eyebrow="Ask HearGuide AI"
            title="Ask HearGuide AI"
            subtitle="Chat with an educational hearing health assistant. Ask about symptoms, tests, protection, and more."
            disclaimer="Educational use only, not a medical diagnosis."
          />
        </div>
      </section>

      {/* Chat */}
      <section className="pb-20 sm:pb-28 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[70vh] min-h-[520px]">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 text-white">
                  <Bot className="w-6 h-6" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-slate-900">HearGuide AI Assistant</h2>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {isGeminiConfigured() ? 'Online' : 'Demo mode — API key not set'}
                  </p>
                </div>
              </div>
              <button
                onClick={clearChat}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear chat</span>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4 bg-white">
              {messages.map((m, i) => (
                <MessageBubble key={i} message={m} />
              ))}
              {loading && <TypingBubble />}
              {error && (
                <div className="flex items-start gap-3 rounded-xl bg-rose-50 border border-rose-200 p-4">
                  <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-rose-700">{error}</p>
                </div>
              )}
            </div>

            {/* Suggested chips (only before first user message) */}
            {messages.length <= 1 && (
              <div className="px-4 sm:px-6 pb-3 flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-100 hover:border-blue-200 transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-4 border-t border-slate-100 bg-white">
              <div className="flex items-end gap-2.5">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  placeholder="Ask about hearing health..."
                  className="flex-1 resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 shadow-sm transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none hover:border-slate-300 max-h-32"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 hover:shadow-blue-600/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
              <p className="mt-2 text-center text-xs text-slate-400">
                Press Enter to send · Shift+Enter for a new line
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <span
        className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl ${
          isUser ? 'bg-slate-100 text-slate-600' : 'bg-gradient-to-br from-blue-600 to-teal-500 text-white'
        }`}
      >
        {isUser ? <User className="w-5 h-5" /> : <Ear className="w-5 h-5" />}
      </span>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-blue-600 text-white rounded-tr-sm'
            : 'bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-sm'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex gap-3">
      <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 text-white">
        <Ear className="w-5 h-5" />
      </span>
      <div className="rounded-2xl rounded-tl-sm bg-slate-50 border border-slate-100 px-4 py-3.5 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  Trash2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useChat } from '@/context/chat-context';

export function ChatUI({ variant = 'page' }: { variant?: 'drawer' | 'page' }) {
  const t = useTranslations('Chat');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const {
    messages,
    input,
    setInput,
    isLoading,
    isMuted,
    toggleMute,
    handleSend,
    clearChat,
  } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isPage = variant === 'page';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      {/* Messages Area (same as before, koi change nahi) */}
      <div
        className={`flex-1 overflow-y-auto p-4 custom-scrollbar ${
          isPage ? 'md:p-8' : ''
        }`}
      >
        {/* Empty State */}
        {isPage && messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="font-display text-2xl font-black text-foreground md:text-3xl">
              {t('emptyTitle')}
            </h2>
            <p className="mt-2 max-w-md text-[14px] text-muted">
              {t('emptySubtitle')}
            </p>
          </div>
        )}

        {/* Welcome (Drawer only) */}
        {!isPage && messages.length === 0 && (
          <div className="mb-6 flex gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-500">
              <Bot className="h-4 w-4" />
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-foreground/5 px-4 py-3 text-[13px] leading-relaxed text-foreground">
              {t('welcomeMessage')}
            </div>
          </div>
        )}

        {/* Messages */}
        <div
          className={`mx-auto w-full ${
            isPage ? 'max-w-3xl space-y-6' : 'space-y-4'
          }`}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${
                msg.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  msg.role === 'user'
                    ? 'bg-accent-500 text-white'
                    : 'bg-brand-500 text-white'
                }`}
              >
                {msg.role === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'rounded-tr-sm bg-brand-500 text-white'
                    : 'rounded-tl-sm bg-foreground/5 text-foreground'
                }`}
              >
                {msg.content === '' && isLoading ? (
                  <span className="flex h-5 items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-current"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-current"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-current"
                      style={{ animationDelay: '300ms' }}
                    />
                  </span>
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p className="mb-2 last:mb-0" {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="font-bold" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="mb-2 list-disc space-y-1 pl-4" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          className="mb-2 list-decimal space-y-1 pl-4"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => <li {...props} />,
                      a: ({ node, ...props }) => (
                        <a
                          className="underline font-bold hover:opacity-80 transition-opacity"
                          target={
                            props.href?.startsWith('http')
                              ? '_blank'
                              : '_self'
                          }
                          {...props}
                        />
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div
        className={`shrink-0 bg-background p-4 ${
          isPage ? 'border-t border-border/50 pb-6' : ''
        }`}
      >
        <div className={`mx-auto w-full ${isPage ? 'max-w-3xl' : ''}`}>
          <form
            onSubmit={handleSend}
            className="relative flex items-end gap-2 rounded-2xl border border-border/60 bg-card p-2 shadow-sm transition-all focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/15"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={t('placeholder')}
              className={`max-h-32 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2 text-[14px] outline-none placeholder:text-muted/60 ${
                isPage ? 'md:text-[15px]' : ''
              }`}
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white transition-all hover:bg-brand-600 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send
                  className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`}
                />
              )}
            </button>
          </form>

          {isPage && (
            <div className="mt-3 flex items-center justify-between px-2">
              <p className="text-[11px] text-muted">{t('footerNote')}</p>
              <div className="flex items-center gap-3">
                {/* 🔇 Mute Toggle */}
                <button
                  onClick={toggleMute}
                  className="flex items-center gap-1 text-[11px] font-semibold text-muted transition-colors hover:text-brand-500"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  title={isMuted ? t('unmuteSound') : t('muteSound')}
                >
                  {isMuted ? (
                    <VolumeX className="h-3 w-3" />
                  ) : (
                    <Volume2 className="h-3 w-3" />
                  )}
                </button>
                {/* Clear Chat */}
                <button
                  onClick={clearChat}
                  className="flex items-center gap-1 text-[11px] font-semibold text-muted transition-colors hover:text-red-500"
                >
                  <Trash2 className="h-3 w-3" /> {t('clearChat')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
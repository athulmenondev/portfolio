import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send } from 'lucide-react';

const AiTerminal = () => {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: "system v1.0 // Connection established.\nAsk me anything about Athul's technical stack, open-source work, or background."
    }
  ]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://portfolio-bot-backend-813017623672.us-central1.run.app/api/chat',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessage, history }),
        }
      );

      if (!response.ok) throw new Error('API down');
      const data = await response.json();

      if (data && data.response) {
        setMessages((prev) => [...prev, { role: 'model', text: data.response }]);
        setHistory(data.history);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'error',
          text: 'Error: Executable failed. Connection refused by remote host.'
        }
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setInput('');
    }
  };

  return (
    <section id="ai-agent">
      <div className="ai-section-inner">
        {/* Section heading */}
        <h2 className="ai-heading reveal">Know More About Me</h2>

        {/* Terminal frame */}
        <div
          className="ai-terminal-frame reveal d2"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title bar */}
          <div className="ai-term-bar">
            <div className="ai-term-dots">
              <span className="d d-r" />
              <span className="d d-a" />
              <span className="d d-g" />
            </div>
            <div className="ai-term-title">
              <span className="ai-stat">
                <span className="pulse-dot" />
                connected
              </span>
            </div>
            <span className="ai-term-info">gemini:1.5</span>
          </div>

          {/* Messages */}
          <div className="ai-term-body" ref={bodyRef}>
            {messages.map((msg, idx) => {
              const roleClass =
                msg.role === 'user'
                  ? 'is-user'
                  : msg.role === 'error'
                    ? 'is-error'
                    : 'is-model';

              const promptLabel =
                msg.role === 'user' ? 'You:' : msg.role === 'error' ? 'error>' : 'Ai_Assistant: ';

              return (
                <div
                  key={idx}
                  className={`ai-msg ${roleClass}`}
                  style={{ animationDelay: `${idx * 0.04}s` }}
                >
                  <span className={`ai-msg-prompt ${roleClass}`}>{promptLabel}</span>
                  <span className="ai-msg-text">{msg.text}</span>
                </div>
              );
            })}

            {isLoading && (
              <div className="ai-loading">
                <span className="ai-loading-label">
                  Executing
                  <span className="ai-loading-dots">
                    <span /><span /><span />
                  </span>
                </span>
              </div>
            )}

          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="ai-term-input-wrap">
            <span className="ai-inp-prompt">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ask --topic stack"
              disabled={isLoading}
              className="ai-inp-field"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`ai-inp-btn ${input.trim() && !isLoading ? 'inp-active' : ''}`}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AiTerminal;

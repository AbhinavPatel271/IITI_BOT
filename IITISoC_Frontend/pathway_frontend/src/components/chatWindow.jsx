import { useEffect, useRef, useState } from "react";

function ChatWindow({ messages, thinking, listening }) {
  const [expandedSnippets, setExpandedSnippets] = useState({});
  const endOfMessagesRef = useRef(null); // anchor for auto-scroll

  const toggleSnippet = (messageId) => {
    setExpandedSnippets((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  };

  const speakText = (text) => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking, listening]);

  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`chat-bubble ${msg.msgId === "user" ? "user" : "bot"}`}
          style={{ position: "relative" }}
        >
          <div className="message-text">{msg.text}</div>

          {/* 👇 Speaker button only for bot messages */}
    {msg.msgId === "bot" && (
      <button
        className="speak-button"
        onClick={() => speakText(msg.text)}
        title="Listen"
      >
        🔊
      </button>
    )}

          {msg.msgId === "bot" && msg.snippet && (
            <div className="snippet-section">
              <button
                className="snippet-toggle"
                onClick={() => toggleSnippet(msg.id)}
              >
                <span className="snippet-icon">📄</span>
                {expandedSnippets[msg.id] ? "Hide Source" : "Show Source"}
              </button>

              {expandedSnippets[msg.id] && (
                <div className="snippet-content">
                  <div className="snippet-header">
                    <span className="snippet-label">Source:</span>
                  </div>
                  <div className="snippet-text">{msg.snippetText}</div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {thinking && (
        <div className="chat-bubble bot thinking">
          <div className="thinking-indicator">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      )}

      {listening && (
        <div className="chat-bubble bot listening">
          <div className="message-text">🎙️ Listening</div>
          <div className="thinking-indicator listening-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      )}

      {/* 👇 Anchor element to scroll to bottom */}
      <div ref={endOfMessagesRef} />
    </div>
  );
}

export default ChatWindow;

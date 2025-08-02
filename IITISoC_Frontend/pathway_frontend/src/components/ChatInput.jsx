import { useState } from "react";
import axios from "axios";

function ChatInput({ updateChat, handleThinking, thinking, handleListening }) {
  const [input, setInput] = useState("");

  const handleTextSend = async () => {
    if (thinking) {
      alert("⏳ Please wait while I process the current message.");
      return;
    }

    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      msgId: "user",
      text: input.trim(),
    };

    updateChat((prev) => [...prev, userMessage]);
    setInput("");
    handleThinking();

    try {
      const backendURL = import.meta.env.VITE_BACKEND_URL || "http://0.0.0.0:3000/v1/chat";
      const res = await axios.post( backendURL, {
        query: input.trim(),
      });
      const data = res.data;
      console.log(data)

      if (data.status === 'success') {
        const fullText = data?.text || "I'm sorry, I couldn't understand that.";

        const botId = Date.now() + 1;

        // 1. Add placeholder bot message
        updateChat((prev) => [
          ...prev,
          {
            id: botId,
            msgId: "bot",
            text: "",
            snippet: !!data?.snippetText,
            snippetText: data?.snippetText || "",
          },
        ]);

        handleThinking();

        // 2. Simulate streaming only on this message
        let index = 0;
        const speed = 35;
        const streamText = () => {
          index++;
          const partialText = fullText.slice(0, index);

          updateChat((prev) => {
            const updated = [...prev];
            const targetIndex = updated.findIndex((msg) => msg.id === botId);
            if (targetIndex !== -1) {
              updated[targetIndex] = {
                ...updated[targetIndex],
                text: partialText,
              };
            }
            return updated;
          });

          if (index < fullText.length) {
            setTimeout(streamText, speed);
          }
        };

        streamText();
      } else {
        handleThinking();
        updateChat((prev) => [
          ...prev,
          {
            id: Date.now() + 2,
            msgId: "bot",
            text: "⚠️ Something went wrong. Please try again later.",
            snippet: false,
          },
        ]);
      }

  
    } catch (err) {
      handleThinking();
      console.log(err.message);
      updateChat((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          msgId: "bot",
          text: "⚠️ Something went wrong. Please try again later.",
          snippet: false,
        },
      ]);
    }

  };

  const handleVoiceSend = () => {
    if (thinking) {
      alert("⏳ Please wait while I process the current message.");
      return;
    }

    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Sound files
    const startSound = new Audio("/listen-start.m4a");
    const endSound = new Audio("/listen-end.m4a");

    recognition.start();

    recognition.onstart = () => {
      console.log("🎙️ Listening...");
      handleListening(true);
      startSound.play();
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      handleListening(false);
      endSound.play();

      updateChat((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          msgId: "bot",
          text: "⚠️ Couldn't capture your voice. Please try again.",
          snippet: false,
        },
      ]);
    };

    recognition.onresult = (event) => {
      handleListening(false);
      endSound.play();

      const voiceText = event.results[0][0].transcript;
      console.log("Voice Input:", voiceText);

      setInput(voiceText); // 👈 fills input with voice text
    };
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        className="chat-input"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleTextSend()}
      />
      <button className="chat-button send" onClick={handleTextSend}>
        ➤
      </button>
      <button className="chat-button mic" onClick={handleVoiceSend}>
        🎤
      </button>
    </div>
  );
}

export default ChatInput;

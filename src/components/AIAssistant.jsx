import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import listings from "../data/listings.json";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001";

function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! What are you looking for today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!question.trim() || isLoading) {
      return;
    }

    const userMessage = question.trim();

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setQuestion("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage,
        }),
      });

      const data = await response.json();
      console.log("AI response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: data.answer,
          recommendations: data.recommendations || [],
        },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: "Sorry, I couldn't connect to the AI right now.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="ai-assistant">
      {isOpen && (
        <div className="ai-panel">
          <div className="ai-header">
            <div>
              <strong>SecondDesk AI</strong>
              <span>Find, compare & ask about listings</span>
            </div>

            <button
              className="ai-close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="ai-messages">
            {messages.map((message, index) => (
              <div
                  key={index}
                  className={
                    message.role === "user"
                      ? "ai-message ai-user-message"
                      : "ai-message"
                  }
              >
                {message.text}

                {message.recommendations?.length > 0 && (
                  <div className="ai-recommendations">
                    {message.recommendations.map((id) => {
                      const listing = listings.find(
                        (item) => item.id === Number(id)
                      );

                      if (!listing) {
                        return null;
                      }

                      return (
                        <Link
                          key={listing.id}
                          to={`/listing/${listing.id}`}
                          className="ai-recommendation"
                        >
                          <strong>{listing.title}</strong>
                          <span>${listing.price}</span>
                          <small>View listing →</small>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {messages.length === 1 && (
              <div className="ai-suggestions">
                <button
                  onClick={() => {
                    setQuestion("Laptop for programming under $600");
                  }}
                >
                  Laptop for programming under $600
                </button>

                <button
                  onClick={() => {
                    setQuestion("Compare the ASUS Vivobook 15 and Surface Laptop 4");
                  }}
                >
                  Compare the ASUS and Surface laptops
                </button>

                <button
                  onClick={() => {
                    setQuestion("What is the best tablet for note-taking?");
                  }}
                >
                  Best tablet for note-taking
                </button>
              </div>
            )}

            {isLoading && (
              <div className="ai-message">
                Thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="ai-input-area">
            <input
              type="text"
              placeholder="Ask about a listing..."
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      )}

      <button
        className="ai-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open SecondDesk AI assistant"
      >
       ✦
      </button>
    </div>
  );
}

export default AIAssistant;
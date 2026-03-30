import { useState, useRef, useEffect } from "react";
import ChatMessage from "./components/ChatMessage";
import GroceryPanel from "./components/GroceryPanel";
import "./App.css";

export type GroceryItem = {
  item: string;
  quantity: string;
  estimated_price: number;
  category: string;
};

export type Message = {
  role: "user" | "assistant";
  content: string;
  grocery_list?: GroceryItem[];
  total_estimated_cost?: number;
  tips?: string;
};

const SUGGESTIONS = [
  "Make tacos for 4 people 🌮",
  "Healthy meal prep for the week 🥗",
  "Quick pasta dinner for 2 🍝",
  "Breakfast essentials for a week ☕",
];

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeList, setActiveList] = useState<Message | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const history = updatedMessages.slice(0, -1).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.message,
        grocery_list: data.grocery_list,
        total_estimated_cost: data.total_estimated_cost,
        tips: data.tips,
      };

      setMessages([...updatedMessages, assistantMsg]);
      if (data.grocery_list?.length > 0) setActiveList(assistantMsg);
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Sorry, I couldn't connect to the server. Make sure the backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="logo">
          <span className="logo-icon">🛒</span>
          <div>
            <div className="logo-title">CartMind</div>
            <div className="logo-sub">AI Grocery Agent</div>
          </div>
        </div>

        <div className="sidebar-label">QUICK REQUESTS</div>
        {SUGGESTIONS.map((s) => (
          <button key={s} className="suggestion-chip" onClick={() => sendMessage(s)}>
            {s}
          </button>
        ))}

        {activeList && (
          <div className="sidebar-panel">
            <GroceryPanel message={activeList} />
          </div>
        )}
      </div>

      <div className="main">
        <div className="chat-area">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🥦</div>
              <h2>What are you shopping for?</h2>
              <p>Tell me your meal plan, dietary needs, or just what's for dinner — I'll build your grocery list.</p>
            </div>
          ) : (
            messages.map((m, i) => (
              <ChatMessage
                key={i}
                message={m}
                onViewList={() => setActiveList(m)}
              />
            ))
          )}

          {loading && (
            <div className="loading-row">
              <div className="loading-bubble">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="input-area">
          <input
            className="chat-input"
            placeholder="e.g. I want to make sushi for 6 people..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            disabled={loading}
          />
          <button
            className="send-btn"
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

import { Message } from "../App";

type Props = {
  message: Message;
  onViewList: () => void;
};

const categoryEmoji: Record<string, string> = {
  Produce: "🥬",
  Dairy: "🧀",
  Meat: "🥩",
  Pantry: "🫙",
  Bakery: "🍞",
  Frozen: "🧊",
  Beverages: "🥤",
  Other: "📦",
};

export default function ChatMessage({ message, onViewList }: Props) {
  const isUser = message.role === "user";
  return (
    <div className={`message-row ${isUser ? "user" : "assistant"}`}>
      {!isUser && <div className="avatar">🤖</div>}
      <div className="bubble-wrap">
        <div className={`bubble ${isUser ? "bubble-user" : "bubble-bot"}`}>
          {message.content}
        </div>
        {!isUser && message.grocery_list && message.grocery_list.length > 0 && (
          <div className="list-preview">
            <div className="list-preview-items">
              {message.grocery_list.slice(0, 3).map((item, i) => (
                <span key={i} className="preview-tag">
                  {categoryEmoji[item.category] || "📦"} {item.item}
                </span>
              ))}
              {message.grocery_list.length > 3 && (
                <span className="preview-tag muted">+{message.grocery_list.length - 3} more</span>
              )}
            </div>
            <button className="view-list-btn" onClick={onViewList}>View Full List →</button>
          </div>
        )}
        {!isUser && message.tips && (
          <div className="tip-row">💡 {message.tips}</div>
        )}
      </div>
    </div>
  );
}

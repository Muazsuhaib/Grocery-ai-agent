import { Message, GroceryItem } from "../App";

type Props = { message: Message };

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

export default function GroceryPanel({ message }: Props) {
  const list = message.grocery_list || [];
  const grouped = list.reduce((acc: Record<string, GroceryItem[]>, item) => {
    const cat = item.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="grocery-panel">
      <div className="panel-header">
        <span>🛒 Your List</span>
        <span className="panel-total">${message.total_estimated_cost?.toFixed(2)}</span>
      </div>
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat} className="panel-category">
          <div className="cat-label">{categoryEmoji[cat] || "📦"} {cat}</div>
          {items.map((item, i) => (
            <div key={i} className="panel-item">
              <span className="item-name">{item.item}</span>
              <span className="item-right">
                <span className="item-qty">{item.quantity}</span>
                <span className="item-price">${item.estimated_price.toFixed(2)}</span>
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

# 🛒 CartMind — AI Grocery Agent

> An agentic AI shopping assistant that transforms natural language into structured grocery lists. Built with a FastAPI backend, Claude LLM orchestration, and a React/TypeScript frontend.

![Python](https://img.shields.io/badge/Python-3.11-blue?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat-square&logo=fastapi)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=flat-square&logo=typescript)
![Claude](https://img.shields.io/badge/Claude-Sonnet-orange?style=flat-square)

---

## 🧠 What It Does

CartMind is a full-stack AI agent that lets users describe their shopping needs in plain English:

> *"I want to make tacos for 4 people"*

And instantly generates a categorized grocery list with quantities and estimated prices — simulating a real agentic online grocery experience.

### Key Features
- **Natural language → structured grocery list** via LLM orchestration
- **Multi-turn conversation** — the agent remembers context across messages
- **Categorized output** (Produce, Dairy, Meat, Pantry, etc.) with per-item pricing
- **Smart shopping tips** included with each response
- **Real-time streaming UI** with a clean dark-themed React interface

---

## 🏗️ Architecture

```
User Input (React UI)
       ↓
FastAPI Backend (/chat endpoint)
       ↓
Prompt Engineering Layer (agent.py)
       ↓
Claude Sonnet (Anthropic API)
       ↓
Structured JSON Response
       ↓
React UI — Grocery Panel + Chat
```

The system prompt instructs Claude to act as a grocery shopping agent and always return a structured JSON response with grocery items, quantities, prices, and category tags — demonstrating practical prompt engineering for enterprise agentic workflows.

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com)

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

---

## 📁 Project Structure

```
grocery-ai-agent/
├── backend/
│   ├── main.py          # FastAPI server + CORS setup
│   ├── agent.py         # LLM orchestration & prompt engineering
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.tsx               # Main app + state management
│   │   ├── App.css               # Design system & styles
│   │   └── components/
│   │       ├── ChatMessage.tsx   # Message bubble component
│   │       └── GroceryPanel.tsx  # Categorized list sidebar
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
└── README.md
```

---

## 💡 Example Prompts

| Prompt | Result |
|---|---|
| "Make tacos for 4 people" | Tortillas, ground beef, cheese, salsa, lettuce... |
| "Healthy meal prep for the week" | Chicken breast, quinoa, broccoli, sweet potato... |
| "Quick pasta dinner for 2" | Spaghetti, garlic, olive oil, parmesan, basil... |
| "Breakfast essentials for 7 days" | Eggs, oats, milk, fruit, bread, coffee... |

---

## 🔮 Future Improvements

- [ ] **Real inventory integration** — connect to live grocery store APIs (Instacart, Kroger)
- [ ] **User accounts & saved lists** — persist grocery lists across sessions
- [ ] **Dietary filters** — vegan, gluten-free, allergy-aware recommendations
- [ ] **Price comparison** — real-time pricing from multiple retailers
- [ ] **Agentic checkout** — one-click order placement via retailer APIs
- [ ] **Receipt parsing** — upload a receipt to auto-detect pantry stock

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Backend | Python, FastAPI, Uvicorn |
| AI / LLM | Anthropic Claude Sonnet |
| Styling | Custom CSS, Google Fonts (Syne + DM Sans) |

---

## 👤 Author

Built as a portfolio project demonstrating full-stack AI agent development — LLM orchestration, prompt engineering, and production-ready UI design.

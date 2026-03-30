from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import run_grocery_agent

app = FastAPI(title="Grocery AI Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []

@app.get("/")
def root():
    return {"status": "Grocery AI Agent is running"}

@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        result = await run_grocery_agent(req.message, req.history)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

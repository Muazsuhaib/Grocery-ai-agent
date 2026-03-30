import os
import json
from dotenv import load_dotenv
import anthropic

load_dotenv()

client = anthropic.AsyncAnthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

SYSTEM_PROMPT = """You are an intelligent grocery shopping agent for an enterprise-scale online grocery platform.

Your job is to help shoppers by:
1. Understanding their meal plans, dietary needs, or shopping goals
2. Generating a structured grocery list with realistic quantities and estimated prices
3. Suggesting smart substitutions or additions when relevant
4. Keeping responses friendly, concise, and practical

Always respond in the following JSON format — no extra text, no markdown, just valid JSON:
{
  "message": "A short friendly response to the user (1-2 sentences)",
  "grocery_list": [
    {
      "item": "Item name",
      "quantity": "e.g. 500g, 2 units, 1 bunch",
      "estimated_price": 2.99,
      "category": "Produce | Dairy | Meat | Pantry | Bakery | Frozen | Beverages | Other"
    }
  ],
  "total_estimated_cost": 0.00,
  "tips": "One helpful shopping tip related to their request (optional, can be empty string)"
}

If the user is just chatting (not requesting groceries), still return the JSON format but with an empty grocery_list array."""


async def run_grocery_agent(user_message: str, history: list[dict]) -> dict:
    messages = []

    # Rebuild conversation history
    for turn in history:
        messages.append({"role": turn["role"], "content": turn["content"]})

    messages.append({"role": "user", "content": user_message})

    response = await client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1500,
        system=SYSTEM_PROMPT,
        messages=messages,
    )

    raw = response.content[0].text.strip()

    # Strip markdown code fences if present
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.strip()

    parsed = json.loads(raw)

    return {
        "message": parsed.get("message", ""),
        "grocery_list": parsed.get("grocery_list", []),
        "total_estimated_cost": parsed.get("total_estimated_cost", 0.0),
        "tips": parsed.get("tips", ""),
        "raw_assistant_content": raw,  # useful for debugging
    }

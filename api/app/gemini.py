import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

class RestaurantAI:
    def __init__(self):
        # Configure Gemini API
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = genai.GenerativeModel('gemini-2.5-flash')
        self.context = self.load_context()

    def load_context(self):
        # Load restaurant info and menu from JSON files
        with open("restaurant_info.json", "r", encoding="utf-8") as f:
            restaurant_info = json.load(f)
        with open("menu.json", "r", encoding="utf-8") as f:
            menu = json.load(f)
        return {"info": restaurant_info, "menu": menu}

    def extract_signature_dishes(self, menu):
        signature_items = menu.get("signature", [])
        return [f"{item['name']} ({item['price']})" for item in signature_items]

    def extract_dietary_tags(self, menu):
        dietary_set = set()
        for items in menu.values():
            if isinstance(items, list):
                for item in items:
                    dietary_set.update(item.get("dietary", []))
        return sorted(list(dietary_set))

    def build_prompt(self, query: str) -> str:
        info = self.context["info"]
        menu = self.context["menu"]

        # Extract signature dishes and dietary tags from menu
        signature_dishes = self.extract_signature_dishes(menu)
        dietary_options = self.extract_dietary_tags(menu)

        # Format menu sections
        menu_lines = []
        for category, items in menu.items():
            if category == "signature":
                continue
            formatted_items = "\n".join([f"- {item['name']} ({item['price']})" for item in items])
            menu_lines.append(f"{category.replace('_', ' ').capitalize()}:\n{formatted_items}")

        prompt = f"""
You are the friendly assistant for {info['name']}, a beloved Italian restaurant located in {info['location']}.

A customer asked: "{query}"

Use the following restaurant details to answer warmly, clearly, and informatively in under 3 sentences. Avoid vague replies and do not mention you are an AI.

Details:
- Opening Hours: {info['hours']}
- Location: {info['location']}
- How to Book: {info['booking']['method']} (Phone: {info['booking']['phone']}, Website: {info['booking']['online']})
- Dietary Options Available: {', '.join(dietary_options)}
- Contact Info: Phone {info['contact']['phone']}, Email: {info['contact']['email']}
- Signature Dishes: {', '.join(signature_dishes)}
- Parking: {info['parking']}
- Services Offered: {', '.join(info['services'])}
- Current Promotions: {info['promotions']}

Menu Highlights:
{chr(10).join(menu_lines)}

Keep your response natural, brand-friendly, and customer-focused. If the question is unclear, guess politely.
"""
        return prompt

    async def get_response(self, query: str) -> str:
        try:
            prompt = self.build_prompt(query)
            response = await self.model.generate_content_async(prompt)
            return response.text.strip()
        except Exception:
            return "Sorry, something went wrong. Please visit our website for more information."

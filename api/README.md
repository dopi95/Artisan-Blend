🍝 Artisan Blend – Restaurant Chatbot API

Welcome to **Artisan Blend**, an Italian restaurant based in Bole, Addis Ababa.  
This repository contains the backend for our AI-powered chatbot, which answers customer questions about our menu, bookings, dietary options, and more.

---

🔗 Live Demo

**Chatbot API**: [https://artisan-blend.onrender.com](https://artisan-blend.onrender.com)  
**Try it online**: [Swagger UI – `/chat`](https://artisan-blend.onrender.com/docs)

You can ask things like:

- “What are your opening hours?”
- “What’s your signature dish?”
- “Do you have vegan or gluten-free options?”
- “How can I reserve a table?”

---

🛠️ Setup & Installation (for Developers)

```bash
cd api
docker build -t chatbot-api .
docker run -d -p 8000:8000 --env-file .env chatbot-api


or
after we clone
cd api

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload


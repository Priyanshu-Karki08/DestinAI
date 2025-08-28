# 🌍 DestinAI – AI Powered Travel Planner  

DestinAI is an intelligent travel planning web app that helps users discover destinations, explore hotels, plan trips, and get personalized recommendations using AI. It integrates AI-powered suggestions with real-time data like images, budgets, and travel preferences.  

## ✨ Features  
- 🔎 **AI-Powered Destination Search** – Get smart suggestions based on budget, location, and preferences.  
- 🏨 **Hotel Recommendations** – View hotels with price, location, and images.  
- 🖼 **Image Fetching** – Fetches real images of destinations and hotels from APIs.  
- 💡 **Personalized Itinerary** – Suggests activities and places to visit.  
- 🔐 **Google Login** – Easy authentication using Google OAuth.  
- 📱 **Modern UI/UX** – Built with React + Tailwind CSS for a smooth, responsive experience.  

## 🛠 Tech Stack  
- **Frontend**: React, Tailwind CSS, Shadcn/UI  
- **AI**: Google Generative AI (Gemini API)  
- **APIs**: Pixabay / Unsplash (for images), Maps API (future scope)  
- **Auth**: Google OAuth  
- **Other Tools**: Vite, Toast notifications, React Icons  

## 🚀 Getting Started  

### Prerequisites  
- Node.js (>= 18)  
- NPM or Yarn  

### Installation  
```bash
# Clone repo
git clone https://github.com/yourusername/destinai.git
cd destinai

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run development server
npm run dev

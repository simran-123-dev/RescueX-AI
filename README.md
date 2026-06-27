# RescueX AI

RescueX AI is a premium emergency response web platform designed to reduce response time by connecting users instantly with ambulances, hospitals, blood donors, volunteers, and AI-powered first aid assistance.

## Features
- Modern landing page with animated glassmorphism UI
- JWT authentication with email/password and Google login
- Emergency SOS system with live map tracking
- AI first aid assistant powered by Google Gemini
- Blood donor and volunteer matching
- Real-time Socket.IO chat and notifications
- Admin-ready data models and analytics-ready API
- Responsive experience for mobile and desktop

## Project Structure
- `frontend/` — React, Vite, Tailwind CSS, Framer Motion, Leaflet
- `backend/` — Node.js, Express, MongoDB, Mongoose, JWT, Socket.IO

## Getting Started
1. Copy `.env.example` to `.env` in both `frontend` and `backend`
2. Configure MongoDB Atlas, JWT secrets, Gemini API key, and frontend API URL
3. Install dependencies:
   ```bash
   npm install
   npm install --prefix frontend
   npm install --prefix backend
   ```
4. Run in development:
   ```bash
   npm run dev
   ```

## Deployment
- Frontend deployable to Vercel
- Backend deployable to Render

## Sample Data
Use `backend/seed/seed.js` to populate sample hospitals, volunteers, donors, and emergency events.

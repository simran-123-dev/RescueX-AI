# RescueX AI — Quick Setup

1. Install dependencies

```bash
npm install
npm install --prefix frontend
npm install --prefix backend
```

2. Create `.env` files from `.env.example` in `backend` and `frontend` and set values (MongoDB, JWT, Gemini key).

3. Run dev servers

```bash
npm run dev
```

4. Seed sample data (optional)

```bash
npm --prefix backend run seed
```

Frontend: http://localhost:5174
Backend: http://localhost:5000

Enjoy testing RescueX AI.

Optional: Map support

To enable the interactive map, install the Leaflet dependencies in the frontend:

```bash
npm install --prefix frontend leaflet react-leaflet
```

The app dynamically loads the map if these packages are present. Add any required CSS imports if your bundler needs them.

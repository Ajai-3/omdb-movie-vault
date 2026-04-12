# 🎬 MovieVault — MERN Movie Explorer

MovieVault is a premium movie search and discovery platform built with the MERN stack (MongoDB (simulated with JSON), Express, React, Node.js). It features a sleek dark UI, real-time search with OMDB API, and persistent favorites management.

## ✨ Features

- **🔍 Smart Search**: Debounced search powered by OMDB API.
- **❤️ Vault Storage**: Persist your favorite movies in a local JSON "vault".
- **💎 Premium UI**: Built with Tailwind CSS, Glassmorphism, and Framer-like micro-animations.
- **🏗️ MVC Architecture**: Clean code structure on the backend.
- **⚓ Custom Hooks**: Optimized React logic with custom hooks for search and state management.
- **🐳 Docker Ready**: Full containerization for both frontend and backend.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- Docker & Docker Compose (optional)
- OMDB API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ajai-3/omdb-movie-vault.git
   cd omdb-movie-vault
   ```

2. Set up environment variables:
   - Create `backend/.env`:
     ```env
     PORT=5000
     OMDB_API_KEY=your_key_here
     OMDB_BASE_URL=https://www.omdbapi.com
     ```
   - Create `frontend/.env`:
     ```env
     VITE_BASE_URL=http://localhost:5000/api/movies
     ```

### Running with Docker (Recommended)

```bash
docker-compose up --build
```

### Manual Development

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 📡 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/movies/search?q=...` | Search for movies |
| `GET` | `/api/movies/favorites` | Get all favorite movies |
| `POST` | `/api/movies/favorites` | Toggle movie in favorites |

## 🛠️ Project Structure

```plaintext
├── backend/
│   ├── src/
│   │   ├── controllers/   # Request handling
│   │   ├── services/      # Business logic (OMDB & Filesysten)
│   │   ├── interface/     # TypeScript interfaces
│   │   └── server.ts      # Entry point
│   └── data/              # Persistent JSON storage
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom movie logic (useMovies)
│   │   ├── pages/         # Home & Favorites pages
│   │   └── api/           # Axios client & endpoints
└── docker-compose.yml
```

## 📝 License

ISC

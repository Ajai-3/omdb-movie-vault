# Movie Vault

Movie Vault is a professional movie exploration and collection management platform. It allows users to search for movies via the OMDb API and manage a personal "vault" of favorites with persistent storage.

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## Features

- Search Functionality: Real-time movie search utilizing the OMDb API with debouncing.
- Favorites Management: Toggle movies in and out of a personal vault.
- Persistent Storage: Backend storage implementation using a structured JSON system.
- Responsive Design: Fully optimized for various screen sizes using a modern aesthetic.
- Global State: Centralized state management using Redux Toolkit.
- Error Handling: Comprehensive catch-all error handling and user notifications via React Toastify.
- Containerization: Backend support for Docker-based deployment and execution.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- Docker and Docker Compose (optional)
- OMDb API Key (available at https://www.omdbapi.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ajai-3/omdb-movie-vault.git
   cd omdb-movie-vault
   ```

2. Configure Environment Variables:

   The project includes `.env.example` files in both the frontend and backend directories. Copy these to `.env` files and populate them with your specific keys.

   **Backend:**
   Copy `backend/.env.example` to `backend/.env` and update the `OMDB_API_KEY`:
   ```env
   PORT=5000
   OMDB_API_KEY=your_api_key_here
   OMDB_BASE_URL=https://www.omdbapi.com
   FRONTEND_URL=http://localhost:5173
   ```

   **Frontend:** Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

## Running the Application

### Method 1: Docker (Recommended)
You can run the backend environment using Docker Compose:
```bash
cd backend
docker-compose up --build
```

### Method 2: Manual Execution

#### Running the Backend
```bash
cd backend
npm install
npm run start
```

#### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```

## Implementation Choices

- Redux Toolkit: Chosen for global state management to ensure consistent UI synchronization (e.g., heart icons reflecting favorite status) across different pages.
- ESM Architecture: The project utilizes ECMAScript Modules for modern development standards.
- Custom Hooks: Decoupled logic from UI components using specialized hooks (`useSearchMovies`, `useToggleFavorite`) for better maintainability.
- JSON File Persistence: Implemented a robust file-based storage system on the backend to simulate a database with high reliability and zero external dependencies.
- Bundler Strategy: Utilizes `tsx` and `Vite` for high-performance development and execution without the overhead of complex build steps.

## Project Structure

```plaintext
├── backend/
│   ├── src/
│   │   ├── controllers/   # Request orchestration
│   │   ├── services/      # Business logic (OMDb & Storage)
│   │   ├── routes/        # API route definitions
│   │   └── server.ts      # Server entry point
│   └── data/              # JSON vault storage
├── frontend/
│   ├── src/
│   │   ├── store/         # Redux configuration and slices
│   │   ├── hooks/         # Specialized business logic hooks
│   │   ├── components/    # Reusable UI elements
│   │   └── pages/         # Application views
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /api/movies/search | Search OMDb movie database |
| GET | /api/movies/favorites | Retrieve all movies from the vault |
| POST | /api/movies/favorites | Toggle a movie in/out of favorites |

## Notes

- Ensure your OMDb API key is valid; otherwise, search results will not load.
- The favorites vault is stored in `backend/data/favorites.json`.

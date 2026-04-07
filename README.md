# 🎬 omdb-movie-vault --- MERN Movie Search & Favorites

A high-performance MERN stack application that allows users to search
movies using the OMDB API and manage a persistent favorites list.

This project focuses on clean architecture, TypeScript usage, and
server-side persistence using the Node.js file system instead of a
database.

------------------------------------------------------------------------

## 🗂️ Project Structure

    root/
    ├── backend/
    │   ├── src/
    │   │   ├── controllers/
    │   │   ├── routes/
    │   │   ├── services/
    │   │   ├── interfaces/
    │   │   ├── middleware/
    │   │   ├── app.ts
    │   │   └── server.ts
    │   ├── data/
    │   │   └── favorites.json
    │   ├── package.json
    │   └── tsconfig.json
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── context/
    │   │   ├── hooks/
    │   │   ├── services/
    │   │   └── App.tsx
    │   ├── package.json
    │   └── tailwind.config.js
    │
    └── README.md

------------------------------------------------------------------------

## ⚙️ Prerequisites

-   Node.js \>= 18.x\
-   npm \>= 9.x\
-   OMDB API Key

------------------------------------------------------------------------

## 🚀 Getting Started

### 1. Clone & Install

    git clone https://github.com/YOUR_USERNAME/omdb-movie-vault.git
    cd omdb-movie-vault

    cd backend && npm install
    cd ../frontend && npm install

### 2. Environment Variables

Create a `.env` file in the backend directory:

    PORT=5000
    OMDB_API_KEY=your_omdb_key_here
    OMDB_BASE_URL=https://www.omdbapi.com

### 3. Run Development Servers

Backend:

    cd backend
    npm run dev

Frontend:

    cd frontend
    npm run dev

------------------------------------------------------------------------

## 📡 API Endpoints

  Method   Endpoint                          Description
  -------- --------------------------------- -----------------
  GET      /api/movies/search?q=movie_name   Search movies
  GET      /api/movies/favorites             Get favorites
  POST     /api/movies/favorites             Toggle favorite

------------------------------------------------------------------------

## 🧠 Technical Decisions

### File System Persistence

Favorites are stored in a local JSON file instead of memory, so data
survives server restarts.

### Debounced Search

Search requests are delayed by 500ms to reduce unnecessary API calls.

### Type Safety

TypeScript is used across frontend and backend to ensure consistent data
handling.

------------------------------------------------------------------------

## ✅ Features

-   Debounced movie search\
-   Persistent favorites storage\
-   Global state with Context API\
-   Dark UI with Tailwind\
-   MVC backend structure\
-   Centralized error handling

------------------------------------------------------------------------

## 💡 Note

The `favorites.json` file is located in `backend/data/`.\
Make sure the server has write permissions.

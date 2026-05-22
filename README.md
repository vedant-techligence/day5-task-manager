# Task Manager

A full-stack task manager built with React, Express.js, and SQLite.

## Tech Stack

- **Frontend** — React, Tailwind CSS, Vite
- **Backend** — Express.js, Node.js
- **Database** — SQLite (via better-sqlite3)

## Features

- Add, edit, complete, and delete tasks
- Data persists across server restarts
- Real-time UI updates without page reloads

## Project Structure

```
project/
├── server/
│   ├── db.js          # SQLite connection and schema
│   ├── tasks.js       # REST API routes
│   └── server.js      # Express server
├── src/
│   ├── api/tasks.js   # Fetch API calls
│   ├── components/
│   │   ├── TaskInput.jsx
│   │   └── TaskList.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
└── vite.config.js
```

## Getting Started

### 1. Install dependencies

```bash
# Backend
cd server
npm install express better-sqlite3 cors

# Frontend (from project root)
npm install
```

### 2. Start the backend

```bash
cd server
node server.js
```

Server runs on `http://localhost:5000`

### 3. Start the frontend

```bash
npm run dev
```

App runs on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Fetch all tasks |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |
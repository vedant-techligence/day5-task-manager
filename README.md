# Task Manager

A full-stack task manager built with React, Express.js, and SQLite — featuring JWT authentication and Eisenhower Matrix prioritization.

## Tech Stack

- **Frontend** — React, Tailwind CSS, Vite
- **Backend** — Express.js, Node.js
- **Database** — SQLite (via better-sqlite3)
- **Auth** — JWT, bcrypt

## Features

- Add, edit, complete, and delete tasks
- Eisenhower Matrix view to prioritize tasks by urgency and importance
--coded task cards based on quadrant (red / amber / blue / zinc)
- User registration and login with JWT authentication
- User-specific tasks — each user sees only their own tasks
- Password hashing with bcrypt
- Protected API routes with token-based middleware
- Data persists across server restarts
- Real-time UI updates without page reloads

## Project Structure

```
project/
├── server/
│   ├── db.js                  # SQLite connection and schema
│   ├── server.js              # Express server entry point
│   ├── routes/
│   │   ├── auth.js            # /register and /login routes
│   │   └── tasks.js           # REST API routes for tasks
│   ├── controllers/
│   │   ├── authController.js
│   │   └── tasksController.js
│   └── middleware/
│       └── auth.js            # JWT verification middleware
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   ├── auth.js        # Login/register fetch calls
│   │   │   └── tasks.js       # Task CRUD fetch calls
│   │   ├── components/
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskInput.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── MatrixView.jsx
│   │   │   ├── Quadrant.jsx
│   │   │   └── Summary.jsx
│   │   ├── pages/
│   │   │   ├── AuthPage.jsx
│   │   │   └── TasksPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── vite.config.js
└── .env
```

## Getting Started

### 1. Install dependencies

```bash
# Backend
cd server
npm install express better-sqlite3 cors bcrypt jsonwebtoken dotenv

# Frontend
cd client
npm install
```

### 2. Configure environment variables

Create a `.env` file inside `server/`:

```env
JWT_SECRET=your_secret_key_here
PORT=5000
```

### 3. Start the backend

```bash
cd server
node server.js
```

Server runs on `http://localhost:5000`

### 4. Start the frontend

```bash
cd client
npm run dev
```

App runs on `http://localhost:5173`

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive a JWT token |

### Tasks (protected — requires `Authorization: Bearer <token>`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Fetch all tasks for the logged-in user |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task (title, completed, urgent, important) |
| DELETE | `/tasks/:id` | Delete a task |

## Eisenhower Matrix

Tasks are categorized into four quadrants — Do First, Delegate, Schedule, and Eliminate — based on their urgency and importance. Switch between **List** and **Matrix** views using the toggle in the top-right corner.
import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import TasksPage from "./pages/TasksPage";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "",
  );

  function handleAuth(newToken, newUsername) {
    setToken(newToken);
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername("");
  }

  if (!token) return <AuthPage onAuth={handleAuth} />;

  return <TasksPage username={username} onLogout={handleLogout} />;
}
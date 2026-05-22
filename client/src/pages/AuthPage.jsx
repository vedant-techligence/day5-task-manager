import { useState } from "react";
import { login, register } from "../api/auth";

export default function AuthPage({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!username.trim() || !password.trim()) {
      setError("Both fields are required");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data =
        mode === "login"
          ? await login(username, password)
          : await register(username, password);
      localStorage.setItem("token", data.token);
      onAuth(data.token, data.username);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            ✦ Task Manager
          </h1>
          <p className="text-zinc-500 text-xs mt-1">
            {mode === "login"
              ? "Sign in to your account"
              : "Create a new account"}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="bg-zinc-800 text-white text-sm rounded-lg px-4 py-2.5 outline-none border border-zinc-700 focus:border-zinc-500 placeholder:text-zinc-500 transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="bg-zinc-800 text-white text-sm rounded-lg px-4 py-2.5 outline-none border border-zinc-700 focus:border-zinc-500 placeholder:text-zinc-500 transition-colors"
          />
        </div>

        {error && <p className="text-red-400 text-xs">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-white text-zinc-900 text-sm font-semibold py-2.5 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : mode === "login"
              ? "Sign In"
              : "Register"}
        </button>

        <p className="text-zinc-500 text-xs text-center">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError("");
            }}
            className="text-zinc-300 hover:text-white transition-colors"
          >
            {mode === "login" ? "Register" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
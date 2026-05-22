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
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative w-full max-w-sm">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-violet-500/10 to-transparent pointer-events-none" />

        <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col gap-6 shadow-2xl shadow-black/60">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5 mb-1">
              <span className="text-violet-400 text-lg leading-none">✦</span>
              <h1 className="text-lg font-bold text-white tracking-tight">
                Task Manager
              </h1>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">
              {mode === "login"
                ? "Sign in to access your workspace"
                : "Create an account to get started"}
            </p>
          </div>

          <div className="flex bg-zinc-800/60 rounded-lg p-1 gap-1">
            {["login", "register"].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError("");
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                  mode === m
                    ? "bg-zinc-700 text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {m === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-500 font-medium tracking-wide">
                Username
              </label>
              <input
                type="text"
                placeholder="e.g. john_doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="bg-zinc-800 text-white text-sm rounded-lg px-4 py-2.5 outline-none border border-zinc-700 focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 placeholder:text-zinc-600 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-500 font-medium tracking-wide">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="bg-zinc-800 text-white text-sm rounded-lg px-4 py-2.5 outline-none border border-zinc-700 focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 placeholder:text-zinc-600 transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              <span className="text-red-400 text-xs">⚠</span>
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="relative w-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-900/30 hover:shadow-violet-900/50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Please wait…
              </span>
            ) : mode === "login" ? (
              "Sign In →"
            ) : (
              "Create Account →"
            )}
          </button>

          <p className="text-zinc-600 text-xs text-center">
            {mode === "login" ? "No account?" : "Have an account?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError("");
              }}
              className="text-zinc-400 hover:text-violet-400 transition-colors underline underline-offset-2"
            >
              {mode === "login" ? "Register here" : "Sign in instead"}
            </button>
          </p>
        </div>

        <p className="text-center text-zinc-700 text-xs mt-5">
          All data persisted to SQLite · JWT secured
        </p>
      </div>
    </div>
  );
}
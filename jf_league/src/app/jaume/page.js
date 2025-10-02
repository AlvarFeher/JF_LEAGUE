"use client";

import { useState } from "react";

export default function Jaume() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleAsk(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setReply(null);
    try {
      const r = await fetch("/api/llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Request failed");
      setReply(String(data.reply));
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "2rem auto", fontFamily: "system-ui" }}>
      <h1>Ask Ollama (LangChain + Next.js)</h1>
      <form onSubmit={handleAsk} style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a question…"
          style={{ flex: 1, padding: "0.6rem 0.8rem" }}
        />
        <button disabled={loading || !input.trim()} type="submit">
          {loading ? "Thinking…" : "Ask"}
        </button>
      </form>

      {error && <p style={{ marginTop: 12, color: "crimson" }}>{error}</p>}

      {reply && (
        <div style={{ marginTop: 16, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <strong>Reply:</strong>
          <div style={{ whiteSpace: "pre-wrap", marginTop: 6 }}>{reply}</div>
        </div>
      )}
    </div>
  );
}

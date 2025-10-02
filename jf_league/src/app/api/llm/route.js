// app/api/llm/route.js
import { ChatOllama } from "@langchain/ollama";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const model = new ChatOllama({
      baseUrl: process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434",
      model: process.env.OLLAMA_MODEL || "qwen2.5:7b-instruct",
      temperature: 0.7,
    });

    // Chat models accept a plain string; returns an AIMessage
    const msg = await model.invoke(prompt);
    return new Response(JSON.stringify({ reply: msg.content }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e?.message || "LLM error" }), { status: 500 });
  }
}

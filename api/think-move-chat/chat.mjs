// Vercel serverless function: POST /api/chat
import { runAgent, TROUBLE } from "../_think-move/core.mjs";
import { callModel } from "../_think-move/openai.mjs";

const PER_IP = 20, WINDOW_MS = 10 * 60e3, MAX_TURNS = 12, MAX_CHARS = 500;
const hits = new Map();   // per warm instance only. The hard cap is the OpenAI project spend limit.
const limited = ip => { const n = Date.now(); const a = (hits.get(ip) || []).filter(t => n - t < WINDOW_MS); a.push(n); hits.set(ip, a); return a.length > PER_IP; };

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return res.status(429).json({ text: "Lots of questions in a short time. Please try again in a few minutes, or email info@thinkmovechess.com." });
  let msgs = req.body && req.body.messages;
  if (typeof req.body === "string") { try { msgs = JSON.parse(req.body).messages; } catch { msgs = null; } }
  if (!Array.isArray(msgs)) return res.status(400).json({ error: "bad messages" });
  msgs = msgs.filter(m => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
             .slice(-MAX_TURNS).map(m => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  if (!msgs.length || msgs[msgs.length - 1].role !== "user") return res.status(400).json({ error: "need a user message" });
  try {
    const r = await runAgent({ messages: msgs, callModel, leads: [] });
    // Vercel keeps function logs: this line is the chat log (question, answer, tools, blocked reason, tokens).
    console.log(JSON.stringify({ q: msgs[msgs.length - 1].content, a: r.text, blocked: r.blocked, tools: r.trace.map(t => t.tool), usage: r.usage }));
    return res.status(200).json({ text: r.text, handoff: r.trace.some(t => t.tool === "handoff") || !!r.blocked });
  } catch (e) {
    // Full reason in Vercel logs (never the key). The parent sees a plain "having trouble" message.
    console.error(JSON.stringify({ error: e.code || "error", detail: String(e.message || e).slice(0, 300), q: msgs[msgs.length - 1].content }));
    return res.status(200).json({ text: TROUBLE, handoff: false, degraded: e.code || "error" });
  }
}

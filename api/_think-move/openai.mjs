// OpenAI Responses API caller with the same safety pattern as n8n/lib-openai.js:
// daily cost ledger, pre-call budget check, output-token ceiling, hard timeout.
// The key comes from the environment only. It never goes to the browser.
import fs from "node:fs";
import path from "node:path";

const PRICE = { "gpt-6-luna": [0.10, 0.50], "gpt-6.1-sol": [2, 10] }; // USD per 1M tokens (in, out), from n8n lib-openai.js
const MODEL = process.env.AGENT_MODEL || "gpt-6-luna";
const DAILY_CAP_USD = Number(process.env.AGENT_DAILY_CAP_USD || 1);
const MAX_OUT = Number(process.env.AGENT_MAX_OUTPUT_TOKENS || 400);
const TIMEOUT_MS = Number(process.env.AGENT_TIMEOUT_MS || 20000);
const LEDGER_DIR = process.env.AGENT_LEDGER_DIR || (process.env.VERCEL ? "/tmp/ledger" : "./.ledger");

const today = () => new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10); // IST date
const file = () => path.join(LEDGER_DIR, `cost-${today()}.json`);
function spent() { try { return JSON.parse(fs.readFileSync(file(), "utf8")).usd || 0; } catch { return 0; } }
function add(usd, calls = 1) {
  fs.mkdirSync(LEDGER_DIR, { recursive: true });
  let l = { usd: 0, calls: 0 }; try { l = JSON.parse(fs.readFileSync(file(), "utf8")); } catch {}
  l.usd = +(l.usd + usd).toFixed(6); l.calls += calls;
  fs.writeFileSync(file(), JSON.stringify(l));
}
const cost = (model, u) => { const [i, o] = PRICE[model] || PRICE["gpt-6.1-sol"]; return (u.input_tokens * i + u.output_tokens * o) / 1e6; };

export async function callModel({ system, input, tools }) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY missing");
  // Worst case for this call: all input tokens (~4 chars each) plus the full output ceiling.
  const estIn = Math.ceil(JSON.stringify([system, input, tools]).length / 4);
  const [pi, po] = PRICE[MODEL] || PRICE["gpt-6.1-sol"];
  const envelope = (estIn * pi + MAX_OUT * po) / 1e6;
  if (spent() + envelope > DAILY_CAP_USD) { const e = new Error("daily budget reached"); e.code = "BUDGET"; throw e; }

  const ctl = new AbortController(); const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST", signal: ctl.signal,
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
      body: JSON.stringify({ model: MODEL, instructions: system, input, tools, max_output_tokens: MAX_OUT, store: false }),
    });
    if (!r.ok) { const e = new Error("openai " + r.status); e.code = "UPSTREAM"; throw e; }
    const j = await r.json();
    const usage = j.usage || { input_tokens: estIn, output_tokens: MAX_OUT };
    add(cost(MODEL, usage));
    return { output: j.output || [], usage };
  } finally { clearTimeout(timer); }
}
export const budgetLeft = () => +(DAILY_CAP_USD - spent()).toFixed(4);

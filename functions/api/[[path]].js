/* Cooltek sync server – runs on Cloudflare Pages Functions with a D1 database.
   Needs two settings in the Cloudflare Pages project:
     DB        – D1 database binding
     SYNC_KEY  – the company access code (a secret). Every device enters it once.
   Tables are created automatically on first use. */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Cooltek-Key",
  "Access-Control-Max-Age": "86400",
};
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...CORS } });

function sameKey(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || !b) return false;
  const x = new TextEncoder().encode(a), y = new TextEncoder().encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] || 0) ^ (y[i] || 0);
  return diff === 0;
}

let ready = false;
async function setup(db) {
  if (ready) return;
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS jobs (id TEXT PRIMARY KEY, updated INTEGER NOT NULL, server_ts INTEGER NOT NULL, deleted INTEGER NOT NULL DEFAULT 0, data TEXT)"),
    db.prepare("CREATE INDEX IF NOT EXISTS jobs_server_ts ON jobs(server_ts)"),
    db.prepare("CREATE TABLE IF NOT EXISTS photos (id TEXT PRIMARY KEY, job_id TEXT, data TEXT NOT NULL, created INTEGER NOT NULL)"),
  ]);
  ready = true;
}

let lastTs = 0;
const serverTs = () => (lastTs = Math.max(Date.now(), lastTs + 1)); // strictly increasing cursor
const ID = /^[A-Za-z0-9_-]{4,64}$/;

export async function onRequest({ request, env, params }) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (!env.DB || !env.SYNC_KEY) return json({ error: "Sync isn't set up on the server yet (missing DB or SYNC_KEY)." }, 503);
  if (!sameKey(request.headers.get("X-Cooltek-Key"), env.SYNC_KEY)) return json({ error: "Wrong access code." }, 401);

  const db = env.DB;
  await setup(db);
  const [kind, id] = params.path || [];
  const url = new URL(request.url);

  try {
    if (kind === "ping") return json({ ok: true, time: Date.now() });

    // ---- jobs ----
    if (kind === "jobs" && !id && request.method === "GET") {
      const since = Number(url.searchParams.get("since")) || 0;
      const { results } = await db.prepare(
        "SELECT id, updated, server_ts, deleted, data FROM jobs WHERE server_ts > ? ORDER BY server_ts LIMIT 200").bind(since).all();
      const jobs = results.map((r) => ({ id: r.id, updated: r.updated, server_ts: r.server_ts, deleted: !!r.deleted, data: r.data ? JSON.parse(r.data) : null }));
      return json({ jobs, cursor: jobs.length ? jobs[jobs.length - 1].server_ts : since, more: jobs.length === 200 });
    }
    if (kind === "jobs" && id && request.method === "GET") {
      const r = await db.prepare("SELECT id, updated, server_ts, deleted, data FROM jobs WHERE id = ?").bind(id).first();
      if (!r) return json({ error: "Not found" }, 404);
      return json({ id: r.id, updated: r.updated, server_ts: r.server_ts, deleted: !!r.deleted, data: r.data ? JSON.parse(r.data) : null });
    }
    if (kind === "jobs" && id && request.method === "PUT") {
      if (!ID.test(id)) return json({ error: "Bad id" }, 400);
      const body = await request.json();
      const updated = Number(body.updated) || 0;
      const existing = await db.prepare("SELECT updated FROM jobs WHERE id = ?").bind(id).first();
      if (existing && existing.updated > updated) return json({ accepted: false, reason: "newer copy on server" });
      const ts = serverTs();
      await db.prepare(
        "INSERT INTO jobs (id, updated, server_ts, deleted, data) VALUES (?1, ?2, ?3, ?4, ?5) " +
        "ON CONFLICT(id) DO UPDATE SET updated = ?2, server_ts = ?3, deleted = ?4, data = ?5")
        .bind(id, updated, ts, body.deleted ? 1 : 0, body.deleted ? null : JSON.stringify(body.data || {})).run();
      if (body.deleted) await db.prepare("DELETE FROM photos WHERE job_id = ?").bind(id).run();
      return json({ accepted: true, server_ts: ts });
    }

    // ---- photos ----
    if (kind === "photos" && id && ID.test(id)) {
      if (request.method === "GET") {
        const row = await db.prepare("SELECT data FROM photos WHERE id = ?").bind(id).first();
        return row ? json({ id, data: row.data }) : json({ error: "Not found" }, 404);
      }
      if (request.method === "PUT") {
        const body = await request.json();
        if (typeof body.data !== "string" || !body.data.startsWith("data:image/")) return json({ error: "Bad photo" }, 400);
        if (body.data.length > 1900000) return json({ error: "Photo too large" }, 413);
        await db.prepare("INSERT OR REPLACE INTO photos (id, job_id, data, created) VALUES (?, ?, ?, ?)")
          .bind(id, String(body.job_id || ""), body.data, Date.now()).run();
        return json({ ok: true });
      }
    }
    return json({ error: "Not found" }, 404);
  } catch (e) {
    return json({ error: "Server error: " + (e && e.message ? e.message : e) }, 500);
  }
}

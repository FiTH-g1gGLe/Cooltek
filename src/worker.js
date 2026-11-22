// Cooltek Worker: /api/* goes to the sync server, everything else is the website and report app in /public.
import { onRequest } from "./api.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      return onRequest({ request, env, params: { path: url.pathname.slice(5).split("/").filter(Boolean) } });
    }
    return env.ASSETS.fetch(request);
  },
};

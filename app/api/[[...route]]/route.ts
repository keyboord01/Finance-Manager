import { Hono } from "hono";
import { handle } from "hono/vercel";

import accounts from "./accounts";
import categories from "./categories";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// app.onError((err, c) => {
//   console.error(err);
//   return c.json({ error: "Internal Server Error" }, 500);
// });

const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;

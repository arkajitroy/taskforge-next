import { Hono } from "hono";
import { handle } from "hono/vercel";
import AuthRoute from "@/features/auth/server/route";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/auth", AuthRoute);

// initializing the http-request
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppRouteType = typeof routes;

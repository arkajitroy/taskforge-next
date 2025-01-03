import { Hono } from "hono";
import { handle } from "hono/vercel";

import AuthRoute from "@/features/auth/server/route";
import WorkspaceRoute from "@/features/workspaces/server/route";
import MemberRoute from "@/features/members/server/route";

const app = new Hono().basePath("/api");

const routes = app
  .route("/auth", AuthRoute)
  .route("/workspaces", WorkspaceRoute)
  .route("/members", MemberRoute);

// initializing the http-request
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppRouteType = typeof routes;

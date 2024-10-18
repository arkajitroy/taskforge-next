import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/app", (request) => {
  return request.json({
    data: "API Running!",
  });
});

app.get("/project/:projectId", (request) => {
  const { projectId } = request.req.param();

  return request.json({
    data: projectId,
  });
});

export const GET = handle(app);

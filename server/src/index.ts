import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import staticPlugin from "@elysiajs/static";
import { env } from "./env";
import { api } from "./api";

const app = new Elysia()
  .use(cors())
  .get("/", ({ set }) => {
    set.redirect = "/index.html";
  })
  .use(staticPlugin({ prefix: "/", assets: env.PUBLIC_DIR }))
  .use(api);

app.listen(env.PORT, () => {
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
});

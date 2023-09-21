import { Elysia, NotFoundError, t } from "elysia";
import { env } from "./env";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { todos } from "./db/schema";
import { cors } from "@elysiajs/cors";
import staticPlugin from "@elysiajs/static";

const app = new Elysia()
  .use(cors())
  .get("/", ({ set }) => {
    set.redirect = "/index.html";
  })
  .use(staticPlugin({ prefix: "/", assets: env.PUBLIC_DIR }))
  .decorate("db", db);

app.get("/todos", async ({ db }) => await db.query.todos.findMany());

app.get(
  "/todos/:id",
  async ({ db, params }) => {
    const [todo] = await db.query.todos.findMany({
      where: eq(todos.id, params.id),
      limit: 1,
    });
    if (!todo) throw new NotFoundError();
    return todo;
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
);

app.post(
  "/todos",
  async ({ db, body }) =>
    await db
      .insert(todos)
      .values({ id: crypto.randomUUID(), ...body })
      .returning(),
  {
    body: t.Object({
      title: t.String(),
      completed: t.Optional(t.Boolean()),
    }),
  }
);

app.put(
  "/todos/:id",
  async ({ db, params, body }) => {
    let [todo] = await db.query.todos.findMany({
      where: eq(todos.id, params.id),
      limit: 1,
    });
    if (!todo) throw new NotFoundError();

    [todo] = await db
      .update(todos)
      .set(body)
      .where(eq(todos.id, params.id))
      .returning();
    return todo;
  },
  {
    params: t.Object({
      id: t.String(),
    }),
    body: t.Object({
      title: t.Optional(t.String()),
      completed: t.Optional(t.Boolean()),
    }),
  }
);

app.delete(
  "/todos/:id",
  async ({ db, params }) => {
    let [todo] = await db.query.todos.findMany({
      where: eq(todos.id, params.id),
      limit: 1,
    });
    if (!todo) throw new NotFoundError();

    [todo] = await db.delete(todos).where(eq(todos.id, params.id)).returning();
    return todo;
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
);

app.listen(env.PORT, () => {
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
});

import { Elysia, NotFoundError, t } from "elysia";
import { eq } from "drizzle-orm";
import { todos } from "./db/schema";
import { db } from "./db";

const TodoDTO = t.Object({
  title: t.String(),
  completed: t.Optional(t.Boolean()),
});

const WithIdDTO = t.Object({
  id: t.String(),
});

export const api = new Elysia({ prefix: "/api" })
  .decorate("db", db)
  .group("/todos", (router) =>
    router
      .get("/", async ({ db }) => await db.query.todos.findMany(), {
        detail: {
          tags: ["Todos"],
        },
      })
      .get(
        "/:id",
        async ({ db, params }) => {
          const [todo] = await db.query.todos.findMany({
            where: eq(todos.id, params.id),
            limit: 1,
          });
          if (!todo) throw new NotFoundError();
          return todo;
        },
        {
          params: WithIdDTO,
          detail: {
            tags: ["Todos"],
          },
        }
      )
      .post(
        "/",
        async ({ db, body }) => {
          const [todo] = await db
            .insert(todos)
            .values({ id: crypto.randomUUID(), ...body })
            .returning();
          return todo;
        },
        {
          body: TodoDTO,
          detail: {
            tags: ["Todos"],
          },
        }
      )
      .put(
        "/:id",
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
          params: WithIdDTO,
          body: t.Partial(TodoDTO),
          detail: {
            tags: ["Todos"],
          },
        }
      )
      .delete(
        "/:id",
        async ({ db, params }) => {
          let [todo] = await db.query.todos.findMany({
            where: eq(todos.id, params.id),
            limit: 1,
          });
          if (!todo) throw new NotFoundError();

          [todo] = await db
            .delete(todos)
            .where(eq(todos.id, params.id))
            .returning();
          return todo;
        },
        {
          params: WithIdDTO,
          detail: {
            tags: ["Todos"],
          },
        }
      )
  );

import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";

import { db } from "../db";
import { TodoInsertSchema } from "../db/models";
import { todos } from "../db/schema";

const ROUTE_PREFIX = "/todos";

/* https://elysiajs.com/recipe/drizzle#type-instantiation-is-possibly-infinite */
const createTodo = t.Omit(TodoInsertSchema, ["id"]);
const updateTodo = t.Partial(createTodo);

export const todosRoutes = new Elysia({ prefix: ROUTE_PREFIX })
	.get("/", () => {
		return db.select().from(todos);
	})
	.get("/:id", ({ params }) => {
		return db.query.todos.findFirst({
			where: (todo, { eq }) => eq(todo.id, params.id),
		});
	})
	.post(
		"/",
		async ({ body }) => {
			const [todo] = await db
				.insert(todos)
				.values({ id: crypto.randomUUID(), ...body })
				.returning();
			return todo;
		},
		{
			body: createTodo,
		},
	)
	.patch(
		"/:id",
		async ({ params, body }) => {
			const [todo] = await db
				.update(todos)
				.set(body)
				.where(eq(todos.id, params.id))
				.returning();
			return todo;
		},
		{
			body: updateTodo,
		},
	)
	.delete("/:id", async ({ params }) => {
		const [todo] = await db
			.delete(todos)
			.where(eq(todos.id, params.id))
			.returning();
		return todo;
	});

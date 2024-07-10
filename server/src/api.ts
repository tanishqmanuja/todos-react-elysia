import Elysia from "elysia";
import { todosRoutes } from "./routes/todos";

export const api = new Elysia({
	prefix: "/api",
}).use(todosRoutes);

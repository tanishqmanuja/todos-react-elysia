import type { app } from "./app";

export type App = typeof app;

export type { TodoInsert, TodoSelect } from "./db/models";

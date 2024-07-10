import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";

import { todos } from "./schema";

export type TodoSelect = InferSelectModel<typeof todos>;
export type TodoInsert = InferInsertModel<typeof todos>;

export const TodoInsertSchema = createInsertSchema(todos);
export const TodoSelectSchema = createSelectSchema(todos);

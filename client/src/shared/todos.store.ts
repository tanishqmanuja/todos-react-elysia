import { treaty } from "@elysiajs/eden";
import type { App, TodoInsert, TodoSelect } from "@todos/server";
import { create } from "zustand";
import { combine } from "zustand/middleware";

const app = treaty<App>(window.location.origin, {});
type WithoutId<T> = Omit<T, "id">;

export type Todo = TodoSelect;

type TodoState = {
	todos: TodoSelect[];
	currentlyEditing: TodoSelect["id"] | null;
};

const initialState: TodoState = {
	todos: [],
	currentlyEditing: null,
};

export const useTodosStore = create(
	combine(initialState, (set) => ({
		fetchTodos: async () => {
			const { data, error } = await app.api.todos.index.get();

			if (error) {
				throw error;
			}

			set({ todos: data });
		},
		addTodo: async (todo: WithoutId<TodoInsert>) => {
			const { data, error } = await app.api.todos.index.post(todo);

			if (!error) {
				set((state) => ({ todos: [...state.todos, data] }));
			}
		},
		updateTodo: async (
			todoId: TodoSelect["id"],
			todo: Partial<WithoutId<TodoInsert>>,
		) => {
			const { data, error } = await app.api.todos({ id: todoId }).patch(todo);

			if (!error) {
				set((state) => ({
					todos: state.todos.map((t) => (t.id === data.id ? data : t)),
				}));
			}
		},
		removeTodo: async (todoId: TodoSelect["id"]) => {
			const { data, error } = await app.api.todos({ id: todoId }).delete();
			if (!error) {
				set((state) => ({
					todos: state.todos.filter((t) => t.id !== data.id),
				}));
			}
		},
		enableEditing: (id: TodoSelect["id"]) =>
			set((state) => ({ ...state, currentlyEditing: id })),
		disableEditing: () =>
			set((state) => ({ ...state, currentlyEditing: null })),
	})),
);

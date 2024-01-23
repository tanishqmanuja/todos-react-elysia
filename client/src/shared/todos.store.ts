import { create } from "zustand";
import { combine } from "zustand/middleware";
import { type Todo, todosService } from "./todos.service";

export const useTodoStore = create(
  combine(
    {
      todos: await todosService.getTodos(),
      currentlyEditing: null as Todo["id"] | null,
    },
    (set) => ({
      fetchTodos: async () => {
        const todos = await todosService.getTodos();
        set({ todos });
      },
      addTodo: async (todo: Omit<Todo, "id" | "completed" | "createdAt">) => {
        const serverTodo = await todosService.addTodo(todo);
        set(
          (state) => ({ ...state, todos: [...state.todos, serverTodo] }),
          true,
        );
      },
      updateTodo: async (id: Todo["id"], todo: Partial<Omit<Todo, "id">>) => {
        await todosService.updateTodo(id, todo);
        set((state) => ({
          ...state,
          todos: state.todos.map((t) => (t.id === id ? { ...t, ...todo } : t)),
        }));
      },
      removeTodo: async (id: Todo["id"]) => {
        await todosService.removeTodo(id);
        set((state) => ({
          ...state,
          todos: state.todos.filter((t) => t.id !== id),
        }));
      },
      enableEditing: (id: Todo["id"]) =>
        set((state) => ({ ...state, currentlyEditing: id })),
      disableEditing: () =>
        set((state) => ({ ...state, currentlyEditing: null })),
    }),
  ),
);

import { create } from "zustand";
import { type Todo, todosService } from "./todos.service";

export type TodoStore = {
  todos: Todo[];
  currentlyEditing: Todo["id"] | null;
  enableEditing: (id: Todo["id"]) => void;
  disableEditing: () => void;
  fetchTodos: () => Promise<void>;
  addTodo: (todo: Omit<Todo, "id" | "completed">) => Promise<void>;
  updateTodo: (
    id: Todo["id"],
    todo: Partial<Omit<Todo, "id">>
  ) => Promise<void>;
  removeTodo: (id: Todo["id"]) => Promise<void>;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  currentlyEditing: null,
  fetchTodos: async () => {
    const todos = await todosService.getTodos();
    set({ todos });
  },
  addTodo: async (todo) => {
    const serverTodo = await todosService.addTodo(todo);
    set((state) => ({ ...state, todos: [...state.todos, serverTodo] }), true);
  },
  updateTodo: async (id, todo) => {
    await todosService.updateTodo(id, todo);
    set((state) => ({
      ...state,
      todos: state.todos.map((t) => (t.id === id ? { ...t, ...todo } : t)),
    }));
  },
  removeTodo: async (id) => {
    await todosService.removeTodo(id);
    set((state) => ({
      ...state,
      todos: state.todos.filter((t) => t.id !== id),
    }));
  },
  enableEditing: (id) => set((state) => ({ ...state, currentlyEditing: id })),
  disableEditing: () => set((state) => ({ ...state, currentlyEditing: null })),
}));

import env from "../env";

const API_ENDPOINT = env.API_ENDPOINT;

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};

async function getTodos(): Promise<Todo[]> {
  return fetch(`${API_ENDPOINT}/todos`).then((res) => res.json());
}

async function addTodo(
  todo: Omit<Todo, "id" | "completed" | "createdAt">
): Promise<Todo> {
  return fetch(`${API_ENDPOINT}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((res) => res.json());
}

async function updateTodo(
  todoId: Todo["id"],
  todo: Partial<Omit<Todo, "id">>
): Promise<Todo> {
  return fetch(`${API_ENDPOINT}/todos/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((res) => res.json());
}

async function removeTodo(todoId: Todo["id"]): Promise<Todo> {
  return fetch(`${API_ENDPOINT}/todos/${todoId}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

export const todosService = {
  getTodos,
  addTodo,
  updateTodo,
  removeTodo,
};

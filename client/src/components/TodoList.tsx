import { useTodoStore } from "../shared/todos.store";
import TodoListItem from "./TodoListItem";

export default function TodoList() {
  const todoStore = useTodoStore();

  return (
    <ul className="flex flex-col gap-2">
      {todoStore.todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

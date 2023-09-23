import { useTodoStore } from "../shared/todos.store";
import TodoListItem from "./TodoListItem";

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos);

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

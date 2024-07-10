import { Pencil, Trash } from "lucide-react";
import { type Todo, useTodosStore } from "../shared/todos.store";

export default function TodoListItem({ todo }: { todo: Todo }) {
	const todosStore = useTodosStore();

	return (
		<li className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border-slate-400/40 border-2 p-2">
			<input
				type="checkbox"
				className="h-5 w-5 my-auto ms-2 accent-slate-600 peer"
				checked={todo.completed}
				onChange={() =>
					todosStore.updateTodo(todo.id, { completed: !todo.completed })
				}
			/>
			<span className="text-slate-600 font-medium text-md truncate peer-checked:line-through">
				{todo.title}
			</span>
			<div className="flex gap-2">
				<button
					id="edit"
					type="button"
					className="bg-sky-700 text-blue-100 hover:text-white rounded-md p-2"
					onClick={() => todosStore.enableEditing(todo.id)}
				>
					<Pencil size={20} />
				</button>
				<button
					id="delete"
					type="button"
					className="bg-rose-600 text-red-100 hover:text-white rounded-md p-2"
					onClick={() => todosStore.removeTodo(todo.id)}
				>
					<Trash size={20} />
				</button>
			</div>
		</li>
	);
}

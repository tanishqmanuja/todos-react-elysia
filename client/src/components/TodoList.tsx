import { useTodosStore } from "../shared/todos.store";
import TodoListItem from "./TodoListItem";

export default function TodoList() {
	const todos = useTodosStore((state) =>
		state.todos.sort((a, b) => b.createdAt - a.createdAt),
	);

	const pendingTodos = todos.filter((todo) => !todo.completed);
	const completedTodos = todos.filter((todo) => todo.completed);

	return todos.length > 0 ? (
		<>
			{pendingTodos.length > 0 && (
				<section className="flex flex-col gap-2">
					<h3 className="text-slate-500 text-sm font-medium ml-auto">
						Pending
					</h3>
					<ul className="flex flex-col gap-2">
						{pendingTodos.map((todo) => (
							<TodoListItem key={todo.id} todo={todo} />
						))}
					</ul>
				</section>
			)}
			{completedTodos.length > 0 && (
				<section className="flex flex-col gap-2">
					<h3 className="text-slate-500 text-sm font-medium ml-auto">
						Completed
					</h3>
					<ul className="flex flex-col gap-2">
						{completedTodos.map((todo) => (
							<TodoListItem key={todo.id} todo={todo} />
						))}
					</ul>
				</section>
			)}
		</>
	) : (
		<p className="text-slate-500 text-center rounded-xl border-slate-400/40 border-2 p-3">
			No Todos
		</p>
	);
}

import { Plus } from "lucide-react";
import { useTodosStore } from "../shared/todos.store";

export default function TodoAddForm() {
	const todoStore = useTodosStore();

	return (
		<form
			className="pb-3"
			onSubmit={(e) => {
				e.preventDefault();

				const target = e.target as typeof e.target & {
					title: { value: string };
					reset: () => void;
				};

				todoStore.addTodo({ title: target.title.value });

				target.reset();
			}}
		>
			<div className="flex gap-3">
				<input
					type="text"
					id="title"
					required
					autoFocus
					placeholder="Enter Todo"
					className="rounded-xl p-3 w-full bg-slate-100 outline-slate-500"
				/>
				<button
					type="submit"
					className=" bg-green-600 text-white rounded-xl p-4"
				>
					<Plus size={20} />
				</button>
			</div>
		</form>
	);
}

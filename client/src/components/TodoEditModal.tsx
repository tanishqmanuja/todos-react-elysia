import { useEffect, useRef, useState } from "react";
import { useTodosStore } from "../shared/todos.store";

export default function TodoEditModal() {
	const todosStore = useTodosStore();
	const todo = useTodosStore((state) =>
		state.todos.find((t) => t.id === state.currentlyEditing),
	);

	const [title, setTitle] = useState(todo?.title);
	const modalRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (!title && todo) {
			setTitle(todo.title);
		}

		if (todo) {
			modalRef.current?.showModal();
		} else {
			modalRef.current?.close();
		}
	}, [title, todo]);

	return (
		todo && (
			<dialog
				ref={modalRef}
				className="rounded-2xl border-2 border-slate-400 m-auto"
			>
				<form
					className="flex flex-col gap-3 py-3 px-4  bg-slate-300 min-w-[300px]"
					onSubmit={(e) => {
						e.preventDefault();
						todosStore.updateTodo(todo.id, { title });
						todosStore.disableEditing();

						// reset form state
						setTitle(undefined);
						(e.target as HTMLFormElement).reset();
					}}
				>
					<input
						type="text"
						required
						autoFocus
						defaultValue={todo.title}
						onChange={(e) => setTitle(e.target.value)}
						className="rounded-xl p-3 w-full bg-slate-100 outline-slate-500"
					/>
					<div className="flex gap-3 justify-center">
						<button
							type="submit"
							className="bg-sky-700 text-white rounded-lg px-4 py-2"
						>
							Save
						</button>
						<button
							type="button"
							className="bg-red-600 text-white rounded-lg px-4 py-2"
							onClick={() => todosStore.disableEditing()}
						>
							Cancel
						</button>
					</div>
				</form>
			</dialog>
		)
	);
}

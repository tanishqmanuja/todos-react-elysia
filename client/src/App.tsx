import { Skull } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import TodoAddForm from "./components/TodoAddForm";
import TodoEditModal from "./components/TodoEditModal";
import TodoList from "./components/TodoList";
import { useTodosStore } from "./shared/todos.store";

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const { fetchTodos } = useTodosStore();

	useEffect(() => {
		fetchTodos()
			.then(() => {
				setIsLoading(false);
			})
			.catch(() => {
				setIsError(true);
				setIsLoading(false);

				toast.error("Could not fetch todos", {
					id: "unable-to-fetch-todos",
				});
			});
	}, [fetchTodos]);

	return (
		<>
			<header className="px-3 sm:px-4 py-4 mx-auto max-w-3xl">
				<h1 className="text-2xl sm:text-3xl text-center underline underline-offset-8 decoration-wavy pb-4">
					Todos
				</h1>
			</header>

			{
				/* Main */
				!isLoading && !isError && (
					<main className="flex flex-col gap-3 mx-auto max-w-3xl px-3 sm:px-4">
						<h2 className="text-xl">Add Todo</h2>
						<TodoAddForm />

						<h2 className="text-xl">Todo List</h2>
						<TodoList />
					</main>
				)
			}

			{
				/* Error */
				!isLoading && isError && (
					<main className="flex flex-col mx-auto max-w-3xl px-3 sm:px-4 mt-3">
						<div className="flex flex-col items-center gap-2 text-center bg-slate-300 rounded-xl px-6 py-16">
							<Skull size={60} />
							<h2 className="text-2xl sm:text-4xl h-[3-vh] ">
								Unable to fetch todos
							</h2>
							<p>Make sure server is up and running !</p>
						</div>
					</main>
				)
			}

			<TodoEditModal />
			<Toaster />
		</>
	);
}

export default App;

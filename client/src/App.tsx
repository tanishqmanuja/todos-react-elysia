import TodoAddForm from "./components/TodoAddForm";
import TodoList from "./components/TodoList";
import TodoEditModal from "./components/TodoEditModal";

function App() {
  return (
    <>
      <header className="px-3 sm:px-4 py-4 mx-auto max-w-3xl">
        <h1 className="text-2xl sm:text-3xl text-center underline underline-offset-8 decoration-wavy pb-4">
          Todos
        </h1>
      </header>

      <main className="flex flex-col gap-3 mx-auto max-w-3xl px-3 sm:px-4">
        <h2 className="text-xl">Add Todo</h2>
        <TodoAddForm />

        <h2 className="text-xl">Todo List</h2>
        <TodoList />
      </main>

      <TodoEditModal />
    </>
  );
}

export default App;

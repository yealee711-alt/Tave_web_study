import { useState } from "react";
import Header from "./components/Header";
import TextInput from "./components/TextInput";
import TaskList from "./components/TaskList";
import type { Category, Task } from "./types";
import CategoryFilter from "./components/CategoryFilter";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    "All",
  );

  function addTask(text: string, category: Category) {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      category,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function toggleTask(id: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function updateTask(id: number, newText: string) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task,
      ),
    );
  }

  const filteredTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter((task) => task.category === selectedCategory);

  return (
    <main className="min-h-screen bg-stone-100 px-6 py-12">
      <div className="mx-auto flex max-w-md flex-col gap-6 rounded-3xl bg-white p-8">
        <Header />
        <TextInput onAdd={addTask} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdate={updateTask}
        />
      </div>
    </main>
  );
}

export default App;

import { createStore } from "solid-js/store";

// Data awal untuk todo list
const initialTodos = [
  { id: 1, title: "Belajar SolidJS", completed: true },
  { id: 2, title: "Aplikasi Todo List", completed: false },
  { id: 3, title: "Semoga Lolos Aamin.", completed: false },
];

// Membuat store dengan createStore untuk mengelola state todo
const [todos, setTodos] = createStore(initialTodos);

// Fungsi helper untuk mendapatkan ID berikutnya (otomatis increment)
const getNextId = () => {
  return Math.max(0, ...todos.map((t) => t.id)) + 1;
};

// === Fungsi-fungsi untuk manipulasi data todo ===

// Menambahkan todo baru ke dalam store
export function addTodo(title) {
  setTodos([...todos, { id: getNextId(), title, completed: false }]);
}

// Mengubah status completed suatu todo (toggle)
export function toggleTodo(id) {
  setTodos(
    (todo) => todo.id === id, // Mencari todo berdasarkan ID
    "completed", // Property yang akan diubah
    (completed) => !completed // Nilai baru (kebalikan dari nilai sebelumnya)
  );
}

// Mengubah judul (title) suatu todo
export function updateTodoTitle(id, title) {
  setTodos(
    (todo) => todo.id === id, // Mencari todo berdasarkan ID
    "title", // Property yang akan diubah
    title // Nilai baru untuk title
  );
}

// Menghapus todo dari store berdasarkan ID
export function removeTodo(id) {
  setTodos((todos) => todos.filter((todo) => todo.id !== id));
}

// Ekspor todos untuk digunakan komponen lain
export { todos }; 
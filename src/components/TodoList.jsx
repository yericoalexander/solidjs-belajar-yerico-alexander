import { createSignal, Show, For, Switch, Match } from "solid-js";
import { todos, addTodo, toggleTodo, updateTodoTitle, removeTodo } from "../store/todoStore";
// Import Flowbite akan dimasukkan di sini setelah instalasi
// import { Modal, Button } from "flowbite-solid";

// Komponen TodoList untuk mengelola daftar tugas dengan fitur CRUD lengkap
function TodoList() {
  // State untuk form input todo baru
  const [newTodo, setNewTodo] = createSignal("");
  // State untuk menandai todo yang sedang diedit
  const [editingId, setEditingId] = createSignal(null);
  // State untuk menyimpan teks yang sedang diedit
  const [editText, setEditText] = createSignal("");
  // State untuk mengontrol visibilitas modal konfirmasi hapus
  const [showModal, setShowModal] = createSignal(false);
  // State untuk menyimpan todo yang akan dihapus
  const [todoToDelete, setTodoToDelete] = createSignal(null);

  // Menambahkan todo baru
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo().trim()) {
      addTodo(newTodo());
      setNewTodo(""); // Mengosongkan input setelah menambah todo
    }
  };

  // Memulai proses edit todo
  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };

  // Menyimpan perubahan pada todo yang diedit
  const handleSaveEdit = (id) => {
    if (editText().trim()) {
      updateTodoTitle(id, editText());
      setEditingId(null); // Menutup mode edit
    }
  };

  // Membatalkan proses edit
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  // Mengganti status selesai/belum selesai pada todo
  const handleToggle = (id) => {
    toggleTodo(id);
  };

  // Menampilkan konfirmasi sebelum menghapus todo
  const handleConfirmDelete = (todo) => {
    setTodoToDelete(todo);
    setShowModal(true);
  };

  // Menghapus todo setelah konfirmasi
  const handleDelete = () => {
    removeTodo(todoToDelete().id);
    setShowModal(false);
    setTodoToDelete(null);
  };

  return (
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Todo List</h2>
      
      {/* Form untuk menambahkan todo baru */}
      <form onSubmit={handleAddTodo} class="flex gap-2 mb-6">
        <input
          type="text"
          value={newTodo()}
          onInput={(e) => setNewTodo(e.target.value)}
          placeholder="Tambahkan tugas baru..."
          class="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Tambah
        </button>
      </form>
      
      {/* Daftar todo dengan komponen For untuk iterasi */}
      <ul class="space-y-3">
        <For each={todos}>
          {(todo) => (
            <li class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              {/* Komponen Show untuk conditional rendering antara mode view dan edit */}
              <Show
                when={editingId() === todo.id}
                fallback={
                  <>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo.id)}
                      class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                    />
                    <span 
                      class={`flex-grow ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}
                    >
                      {todo.title}
                    </span>
                    <button
                      onClick={() => handleEdit(todo)}
                      class="p-1 ml-2 text-gray-500 hover:text-blue-500 focus:outline-none"
                      title="Edit tugas"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleConfirmDelete(todo)}
                      class="p-1 ml-2 text-gray-500 hover:text-red-500 focus:outline-none"
                      title="Hapus tugas"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </>
                }
              >
                {/* Mode edit todo */}
                <input
                  type="text"
                  value={editText()}
                  onInput={(e) => setEditText(e.target.value)}
                  class="flex-grow px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={() => handleSaveEdit(todo.id)}
                  class="p-1 ml-2 text-gray-500 hover:text-green-500 focus:outline-none"
                  title="Simpan perubahan"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  onClick={handleCancelEdit}
                  class="p-1 ml-2 text-gray-500 hover:text-red-500 focus:outline-none"
                  title="Batalkan perubahan"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Show>
            </li>
          )}
        </For>
      </ul>

      {/* Menampilkan pesan ketika daftar todo kosong */}
      <Show when={todos.length === 0}>
        <p class="text-center text-gray-500 py-4">Belum ada tugas. Tambahkan tugas di atas!</p>
      </Show>

      {/* Modal konfirmasi hapus - akan diganti dengan Modal Flowbite setelah diinstal */}
      <Show when={showModal()}>
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 max-w-md mx-auto">
            <h3 class="text-lg font-medium text-gray-900">Konfirmasi Hapus</h3>
            <p class="mt-2 text-gray-500">
              Apakah Anda yakin ingin menghapus "<strong>{todoToDelete()?.title}</strong>"?
            </p>
            <div class="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default TodoList; 
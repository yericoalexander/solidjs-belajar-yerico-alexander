import { createSignal, createEffect, createMemo, onCleanup } from "solid-js";
import UserCard from "./components/UserCard";
import Counter from "./components/Counter";
import TodoList from "./components/TodoList";
import UserDataGrid from "./components/UserDataGrid";
import "./app.css";

// Komponen utama aplikasi
function App() {
  return (
    // Container utama dengan latar belakang abu-abu dan padding
    <div class="min-h-screen bg-gray-100 py-6 px-4">
      {/* Wrapper dengan lebar maksimum dan margin otomatis */}
      <div class="max-w-6xl mx-auto">
        {/* Judul aplikasi */}
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">BELAJAR SOLIDJS</h1>
        
        {/* Komponen Counter - Mendemonstrasikan fitur reaktivitas SolidJS */}
        <Counter />
        
        {/* Komponen UserCard - Menampilkan data pengguna dari API */}
        <div class="mt-8">
          <UserCard />
        </div>

        {/* Komponen TodoList - Aplikasi Todo dengan fitur CRUD */}
        <div class="mt-8">
          <TodoList />
        </div>

        {/* Komponen UserDataGrid - Menampilkan data pengguna dengan AG Grid */}
        <div class="mt-8">
          <UserDataGrid />
        </div>
      </div>
    </div>
  );
}

export default App;
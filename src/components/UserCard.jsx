import { createSignal, onMount } from "solid-js";
import SingleUserCard from "./SingleUserCard";

const UserCard = () => {
  // Deklarasi state dengan createSignal
  const [users, setUsers] = createSignal([]); // State untuk menyimpan daftar pengguna
  const [loading, setLoading] = createSignal(true); // State untuk menandakan proses loading
  const [error, setError] = createSignal(null); // State untuk menyimpan pesan error

  // onMount - Hook yang dijalankan setelah komponen di-render pertama kali
  onMount(async () => {
    try {
      // Mengambil data pengguna dari API
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Gagal mengambil data pengguna');
      const data = await response.json();
      
      // Mengupdate state dengan data yang didapat
      setUsers(data);
      setLoading(false);
    } catch (err) {
      // Menangani error jika terjadi masalah saat fetch data
      setError(err.message);
      setLoading(false);
    }
  });

  return (
    <div class="w-full max-w-4xl mx-auto p-4">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Daftar Pengguna</h2>
      
      {/* Menampilkan indikator loading saat data sedang diambil */}
      {loading() && (
        <div class="flex justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* Menampilkan pesan error jika terjadi masalah */}
      {error() && (
        <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error()}</p>
        </div>
      )}

      {/* Grid responsif untuk menampilkan kartu pengguna */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Mapping array users untuk membuat komponen SingleUserCard */}
        {users().map((user) => (
          <SingleUserCard name={user.name} email={user.email} />
        ))}
      </div>
    </div>
  );
};

export default UserCard; 
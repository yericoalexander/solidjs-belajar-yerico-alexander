import { createSignal, createEffect, createMemo, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";

const Counter = () => {
  // BAGIAN 1: REAKTIVITAS DASAR

  // createSignal - Membuat state reaktif sederhana
  // count: nilai state, setCount: fungsi untuk mengubah nilai state
  const [count, setCount] = createSignal(0);
  
  // createStore - Store untuk perbandingan dengan Signal
  // Store menyimpan data dalam bentuk objek dan memungkinkan update sebagian
  const [store, setStore] = createStore({
    count: 0
  });
  
  // createMemo - Nilai turunan yang akan dihitung ulang saat dependensi berubah
  // Berguna untuk kalkulasi yang performa-intensif
  const doubled = createMemo(() => count() * 2); // Mengalikan nilai count dengan 2
  const isEven = createMemo(() => count() % 2 === 0); // Mengecek apakah nilai count genap
  
  // createEffect - Efek samping (side effect) untuk merespon perubahan nilai reaktif
  // Dijalankan setiap kali nilai yang diakses di dalamnya berubah
  createEffect(() => {
    // Mencatat setiap perubahan nilai count dan doubled ke konsol
    console.log(`Nilai counter: ${count()}`);
    console.log(`Nilai ganda: ${doubled()}`);
    
    // onCleanup - Membersihkan efek/resources saat komponen diperbarui
    // Mencegah memory leak dan efek yang tidak diinginkan
    const timer = setTimeout(() => {
      console.log("Counter stabil selama 1 detik");
    }, 1000);
    
    // Membersihkan timer saat nilai berubah atau komponen di-unmount
    onCleanup(() => clearTimeout(timer));
  });

  return (
    <div class="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 class="text-2xl font-bold text-center mb-4 text-gray-800">Aplikasi Counter</h2>
      
      <div class="flex flex-col md:flex-row justify-between gap-8">
        {/* BAGIAN SIGNAL - Menunjukkan penggunaan createSignal */}
        <div class="bg-blue-50 p-4 rounded-lg flex-1">
          <h3 class="font-semibold text-lg mb-2">Menggunakan Signal</h3>
          <div class="bg-white p-3 rounded-md shadow mb-4 text-center">
            {/* Cara mengakses nilai signal: dengan memanggil fungsinya count() */}
            <span class="text-3xl font-bold text-blue-600">{count()}</span>
          </div>
          <div class="flex justify-center gap-2">
            {/* Event handler untuk mengurangi nilai dengan fungsi updater */}
            <button 
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow transition"
              onClick={() => setCount(c => c - 1)}
            >
              -
            </button>
            {/* Event handler untuk menambah nilai dengan fungsi updater */}
            <button 
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow transition"
              onClick={() => setCount(c => c + 1)}
            >
              +
            </button>
            {/* Reset nilai counter ke 0 */}
            <button 
              class="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-md shadow transition"
              onClick={() => setCount(0)}
            >
              Reset
            </button>
          </div>
          <div class="mt-3 text-sm text-gray-600">
            {/* Menampilkan nilai turunan dari createMemo */}
            <p>Apakah Genap: <span class="font-medium">{isEven() ? "Ya" : "Tidak"}</span></p>
            <p>Doubled: <span class="font-medium">{doubled()}</span></p>
          </div>
        </div>
        
        {/* BAGIAN STORE - Menunjukkan penggunaan createStore */}
        <div class="bg-green-50 p-4 rounded-lg flex-1">
          <h3 class="font-semibold text-lg mb-2">Menggunakan Store</h3>
          <div class="bg-white p-3 rounded-md shadow mb-4 text-center">
            {/* Cara mengakses nilai store: langsung dengan notasi dot store.count */}
            <span class="text-3xl font-bold text-green-600">{store.count}</span>
          </div>
          <div class="flex justify-center gap-2">
            {/* Event handler dengan setStore - membutuhkan path dan fungsi updater */}
            <button 
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow transition"
              onClick={() => setStore("count", c => c - 1)}
            >
              -
            </button>
            <button 
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow transition"
              onClick={() => setStore("count", c => c + 1)}
            >
              +
            </button>
            {/* Reset nilai counter di store ke 0 */}
            <button 
              class="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-md shadow transition"
              onClick={() => setStore("count", 0)}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      
      {/* BAGIAN PENJELASAN - Menjelaskan konsep reaktivitas */}
      <div class="mt-8 bg-gray-50 p-4 rounded-lg text-sm">
        <h3 class="font-semibold mb-2">Konsep Reaktivitas:</h3>
        <ul class="list-disc pl-5 space-y-1">
          <li><span class="font-medium">createSignal</span>: State dasar untuk nilai sederhana</li>
          <li><span class="font-medium">createStore</span>: State berbasis objek, efisien untuk update sebagian</li>
          <li><span class="font-medium">createEffect</span>: Menjalankan efek samping saat nilai berubah</li>
          <li><span class="font-medium">createMemo</span>: Menghitung nilai turunan secara efisien</li>
          <li><span class="font-medium">onCleanup</span>: Membersihkan resources saat komponen berubah</li>
        </ul>
        <p class="mt-2 text-blue-600 italic">Buka konsol browser untuk melihat nilai yang tercatat.</p>
      </div>
    </div>
  );
};

export default Counter; 
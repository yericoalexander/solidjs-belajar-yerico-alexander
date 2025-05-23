import { createSignal, onMount, createResource, For, Show } from "solid-js";
// Import AG Grid akan dimasukkan setelah instalasi
// import { AgGridSolid } from "ag-grid-solid";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

// Data pengguna contoh - normalnya akan diambil dari API
const fetchUsers = async () => {
  // Simulasi panggilan API dengan penundaan waktu
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "Inactive" },
    { id: 4, name: "Alice Williams", email: "alice@example.com", role: "User", status: "Active" },
    { id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "Admin", status: "Active" },
    { id: 6, name: "Diana Prince", email: "diana@example.com", role: "Editor", status: "Active" },
    { id: 7, name: "Edward Smith", email: "edward@example.com", role: "User", status: "Inactive" },
    { id: 8, name: "Fiona Apple", email: "fiona@example.com", role: "Admin", status: "Active" },
    { id: 9, name: "George Lucas", email: "george@example.com", role: "Editor", status: "Inactive" },
    { id: 10, name: "Hannah Montana", email: "hannah@example.com", role: "User", status: "Active" }
  ];
};

// Komponen UserDataGrid untuk menampilkan data pengguna menggunakan AG Grid
function UserDataGrid() {
  // State untuk menyimpan referensi ke AG Grid API
  const [gridApi, setGridApi] = createSignal(null);
  // Membuat resource untuk data pengguna dengan fungsi refetch untuk menyegarkan data
  const [users, { refetch }] = createResource(fetchUsers);
  
  // Definisi kolom untuk AG Grid
  const columnDefs = [
    { field: "id", headerName: "ID", sortable: true, filter: true, width: 80 },
    { field: "name", headerName: "Nama", sortable: true, filter: true },
    { field: "email", headerName: "Email", sortable: true, filter: true },
    { field: "role", headerName: "Peran", sortable: true, filter: true, width: 120 },
    { 
      field: "status", 
      headerName: "Status", 
      sortable: true, 
      filter: true,
      width: 120,
      cellRenderer: (params) => {
        // Kode ini akan berfungsi setelah AG Grid diinstal
        const status = params.value;
        const bgColor = status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
        return `<span class="px-2 py-1 rounded-full text-xs font-medium ${bgColor}">${status}</span>`;
      }
    }
  ];

  // Konfigurasi default untuk semua kolom
  const defaultColDef = {
    resizable: true, // Dapat diubah ukurannya
    flex: 1, // Menggunakan flex untuk ukuran kolom
    minWidth: 100 // Lebar minimal kolom
  };

  // Menangani event saat grid pertama kali siap
  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit(); // Menyesuaikan lebar kolom dengan container
  };

  return (
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Data Pengguna</h2>
      
      <div class="mb-4">
        <button 
          onClick={() => refetch()}
          class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Segarkan Data
        </button>
      </div>
      
      {/* Sampai AG Grid diinstal, kita akan menampilkan tabel simulasi */}
      <div class="ag-theme-alpine h-[500px] w-full overflow-auto">
        {/* Ini akan digantikan dengan:
        <AgGridSolid
          columnDefs={columnDefs}
          rowData={users()}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={10}
        />
        */}
        
        {/* Tabel fallback sampai AG Grid diinstal */}
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">ID</th>
                <th scope="col" class="px-6 py-3">Nama</th>
                <th scope="col" class="px-6 py-3">Email</th>
                <th scope="col" class="px-6 py-3">Peran</th>
                <th scope="col" class="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Menggunakan komponen For untuk iterasi data pengguna */}
              <For each={users() || []}>
                {(user) => (
                  <tr class="bg-white border-b hover:bg-gray-50">
                    <td class="px-6 py-4">{user.id}</td>
                    <td class="px-6 py-4">{user.name}</td>
                    <td class="px-6 py-4">{user.email}</td>
                    <td class="px-6 py-4">{user.role}</td>
                    <td class="px-6 py-4">
                      <span 
                        class={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
          
          {/* Menampilkan animasi loading saat data sedang dimuat */}
          <Show when={users.loading}>
            <div class="flex justify-center items-center p-4">
              <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </Show>
          
          {/* Menampilkan pesan error jika gagal memuat data */}
          <Show when={users.error}>
            <div class="text-center text-red-500 p-4">
              Gagal memuat data pengguna. Silakan coba lagi.
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}

export default UserDataGrid; 
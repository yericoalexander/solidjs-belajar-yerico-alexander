// Komponen untuk menampilkan satu kartu user dengan props name dan email
const SingleUserCard = (props) => {
  return (
    // Container kartu dengan efek shadow dan transisi saat hover
    <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      {/* Header kartu dengan gradient background */}
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        {/* Avatar dengan inisial nama pengguna */}
        <div class="w-16 h-16 rounded-full bg-white text-blue-500 flex items-center justify-center text-2xl font-bold mx-auto">
          {/* Mengambil huruf pertama dari nama sebagai inisial */}
          {props.name.charAt(0)}
        </div>
      </div>
      {/* Konten kartu dengan informasi pengguna */}
      <div class="p-4">
        {/* Nama pengguna */}
        <h3 class="text-xl font-semibold text-gray-800">{props.name}</h3>
        {/* Email pengguna */}
        <p class="text-gray-600">{props.email}</p>
      </div>
    </div>
  );
};

export default SingleUserCard; 
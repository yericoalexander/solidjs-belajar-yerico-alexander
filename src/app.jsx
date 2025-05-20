import { createSignal, createEffect, createMemo, onCleanup } from "solid-js";
import "./app.css";

function App() {
  // 1. CreateSignal - State dasar yang reaktif
  const [count, setCount] = createSignal(0);
  
  // 2. CreateMemo - Nilai turunan yang akan dihitung ulang saat dependensi berubah
  const doubled = createMemo(() => count() * 2);
  
  // 3. CreateEffect - Efek samping (untuk logging perubahan)
  createEffect(() => {
    console.log(`Nilai counter: ${count()}`);
    console.log(`Nilai kelipatan dua: ${doubled()}`);
    
    // 4. OnCleanup - Membersihkan efek saat komponen diperbarui
    const timer = setTimeout(() => {
      console.log("Counter stabil selama 1 detik");
    }, 1000);
    
    onCleanup(() => clearTimeout(timer));
  });

  return (
    <div class="container">
      <h1>Counter Sederhana</h1>
      
      <div class="counter-display">
        <h2>Counter: {count()}</h2>
        <p>Doubled: {doubled()}</p>
      </div>
      
      <div class="buttons">
        <button onClick={() => setCount(c => c - 1)}>-</button>
        <button onClick={() => setCount(c => c + 1)}>+</button>
        <button onClick={() => setCount(0)}>↺</button>
      </div>

      <div class="explanation">
        <h3>Dasar Reaktivitas:</h3>
        <ul>
          <li><strong>createSignal</strong>: State dasar counter</li>
          <li><strong>createEffect</strong>: Mencatat perubahan</li>
          <li><strong>createMemo</strong>: Perhitungan nilai kelipatan</li>
          <li><strong>onCleanup</strong>: Pembersihan timer</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
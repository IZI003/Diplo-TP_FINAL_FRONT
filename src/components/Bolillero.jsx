import { UseAuth } from '../Context/AuthContext';
import { useBingo } from '../Context/BingoContext';

export default function Bolillero() {
  const { bolillas, ultimaBolilla, pedirBolilla } = useBingo();
  const { user } = UseAuth();
  
      const esAdmin = user?.grupoActivo?.admin?._id === user?.id;
  const buckets = Array.from({ length: 9 }, () => []);

  bolillas.forEach(n => {
    if (typeof n !== "number") return;
    const idx = Math.min(Math.floor(n / 10), 8);
    buckets[idx].push(n);
  });

  buckets.forEach(b => b.sort((a, b2) => a - b2));

  const headers = ['1-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89'];

  const maxRows = Math.max(...buckets.map(b => b.length));

  // =====================================================
  return (
    <div className="p-4" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}>
      <h1 className="text-7xl font-bold mb-3 text-primary">Bolillero</h1>

      <div className="rounded-xl shadow-lg p-3 sm:p-4 overflow-x-auto">
        
        {/* 🔥 ÚLTIMA BOLILLA */}
        <h1 className="text-3xl font-bold mb-3 text-center">
          Última: {ultimaBolilla ?? "-"}
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-9 gap-2 sm:gap-3 md:gap-4 text-center">

          {/* Headers */}
          {headers.map((h, i) => (
            <div key={`header-${i}`} className="font-bold">
              {h}
            </div>
          ))}

          {/* Filas */}
          {Array.from({ length: maxRows }).map((_, row) =>
            buckets.map((col, colIndex) => {
              const num = col[row];
              return num ? (
                <div
                  key={`num-${colIndex}-${num}`}
                  className="flex items-center justify-center rounded-full mx-auto
                  bg-gray-100 text-green-700 border-2 border-green-700 font-bold
                  w-10 h-10"
                >
                  {num}
                </div>
              ) : (
                <div key={`empty-${colIndex}-${row}`} className="invisible">
                  0
                </div>
              );
            })
          )}

        </div>
        {esAdmin ? (
        <button 
          onClick={pedirBolilla}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          disabled={!esAdmin}
        >
          Sacar bolilla
        </button>
        ) : (
          <p className="mt-4 text-center text-gray-500">
            Solo el administrador puede sacar bolillas.
          </p>
        )}
      </div>
    </div>
  );
}

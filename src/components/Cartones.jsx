import { useBingo } from "../Context/BingoContext";

export default function Cartones({ cartones = [] }) {
  const colores = [
    { border: "border-blue-500", header: "text-blue-700" },
    { border: "border-red-500", header: "text-red-700" },
    { border: "border-green-500", header: "text-green-700" },
    { border: "border-yellow-500", header: "text-yellow-600" },
  ];

  const { bolillas } = useBingo();
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {cartones.map((carton, idx) => {
        const color = colores[idx % colores.length];

        const linea = tieneLinea(carton, bolillas);
        const bingo = tieneBingo(carton, bolillas);

        return (
          <div
            key={carton._id}
            className="p-4 rounded-lg shadow-md border-2"
            style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
          >
            {/* Código */}
            <div className={`mb-2 font-bold ${color.header}`}>
              {carton.codigo}
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
              <table className="border-collapse mx-auto">
                <tbody>
                  {carton.numeros.map((fila, rowIdx) => (
                    <tr key={rowIdx}>
                      {fila.map((num, colIdx) => {
                        const marcado = bolillas.includes(num);
                        return (
                          <td
                            key={colIdx}
                            className={`border ${color.border} text-center font-semibold
                              w-8 h-8 sm:w-10 sm:h-10
                              ${marcado ? "bg-green-100 border-green-500" : ""}
                            `}
                          >
                            {num && (
                              <div
                                className={`flex items-center justify-center rounded-full
                                  ${marcado ? "bg-green-400 text-white border-2 border-green-600" : ""}
                                  w-6 h-6 sm:w-8 sm:h-8`}
                              >
                                {num}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BOTONES */}
            <div className="mt-4 flex flex-col gap-2">
              {linea && !bingo && (
                <button
                  className="bg-yellow-500 text-white px-3 py-2 rounded"
                  onClick={() =>
                    alert(`🎉 Línea en cartón ${carton.codigo}`)
                  }
                >
                  Cantar línea
                </button>
              )}

              {bingo && (
                <button
                  className="bg-red-600 text-white px-3 py-2 rounded"
                  onClick={() =>
                    alert(`🏆 BINGO en cartón ${carton.codigo}`)
                  }
                >
                  Cantar BINGO
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const tieneLinea = (carton, bolillas) => {
  const drawn = bolillas.map(Number);

  return carton.numeros.some(fila => {
    const numerosFila = fila.filter(num => num !== null && num !== 0);

    return (
      numerosFila.length > 0 &&
      numerosFila.every(num => drawn.includes(Number(num)))
    );
  });
};

const tieneBingo = (carton, bolillas) => {
  const drawn = bolillas.map(Number);

  const todos = carton.numeros
    .flat()
    .filter(num => num !== null && num !== 0);

  return todos.every(num => drawn.includes(Number(num)));
};
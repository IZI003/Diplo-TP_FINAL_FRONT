import { UseCartones } from "../Context/CartonesContext";

export default function CartonItem({ carton, color, drawnNumbers }) {
  const { seleccionados, toggleSeleccion } = UseCartones();
  const isChecked = seleccionados.some(c => c._id === carton._id);

  return (
    <div style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
      className={`p-3 border rounded-xl cursor-pointer transition 
      ${isChecked ? "bg-green-200 border-green-600" : "bg-white"}
      `}
      onClick={() => toggleSeleccion(carton)}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold">Cartón {carton.codigo}</h2>
        <input
          type="checkbox"
          checked={isChecked}
          readOnly
          className="w-5 h-5 accent-green-600 pointer-events-none"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="border-collapse mx-auto">
          <tbody>
            {carton.numeros.map((fila, rowIdx) => (
              <tr key={rowIdx}>
                {fila.map((num, colIdx) => {
                  const marcado = drawnNumbers.includes(num);
                  return (
                    <td
                      key={colIdx}
                      className={`border ${color.border} text-center font-semibold 
                        w-8 h-8 xs:w-12 xs:h-12 sm:w-10 sm:h-9 md:w-11 md:h-10 
                        ${marcado ? "bg-green-100 border-green-500" : ""}
                      `}
                    >
                      {num && (
                        <div
                          className={`flex items-center justify-center rounded-full
                            ${marcado ? "bg-green-400 text-white" : ""}
                            ${marcado ? "border-2 border-green-600" : ""}
                            w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8`}
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
    </div>
  );
}
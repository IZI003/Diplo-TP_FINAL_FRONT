import React from "react";
import { useBingo } from "../Context/BingoContext";

export default function Cartones({ cartones = []}) 
{
  const colores = [
    { border: "border-blue-500", header: "text-blue-700" },
    { border: "border-red-500", header: "text-red-700" },
    { border: "border-green-500", header: "text-green-700" },
    { border: "border-yellow-500", header: "text-yellow-600" },
  ];
  const { bolillas } = useBingo();

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      {cartones.map((carton, idx) => {
        const color = colores[idx % colores.length];
        return (
          <div
            key={carton.id}
            className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 border-2" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
          >
            {/* Código del cartón */}
            <div className={`mb-2 font-bold ${color.header}`}>
              Código: {carton.codigo}
            </div>

            {/* Tabla 3x9 */}
            <div className="overflow-x-auto">
              <table className="border-collapse mx-auto ">
                <tbody>
                  {carton.numeros.map((fila, rowIdx) => (
                    <tr key={rowIdx}>
                      {fila.map((num, colIdx) => {
                        const marcado = bolillas.includes(num);
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
      })}
    </div>
  );
}

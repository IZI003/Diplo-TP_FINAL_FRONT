import { Link } from "react-router-dom";
import Header from "../components/Header";
import { UseGroups } from "../Context/GroupContext";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

export default function GroupsList() {
 const { grupos, grupoActivo, loading, activarGrupo, crearGrupo } = UseGroups();

  const openCrearGrupoModal = async () => {
    const { value: nombre } = await Swal.fire({
      title: "Crear Grupo",
      input: "text",
      inputLabel: "Nombre del Grupo",
      inputPlaceholder: "Ej: Familia, Amigos, Noche, Trabajo",
      showCancelButton: true,
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) return "Debes ingresar un nombre";
      },
    });

    if (!nombre) return;

    try {
      await crearGrupo(nombre);
      Swal.fire("Éxito", "Grupo creado correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.error || "No se pudo crear el grupo", "error");
    }
  };

  return (
    <>
      <Header />

      <div className="p-6">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Mis Comunidades</h1>

          <button
              onClick={openCrearGrupoModal}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Crear Comunidad
            </button>
        </div>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="space-y-3">
            {grupos.map((g) => (
              <div
                key={g._id}
                className="p-4 bg-white shadow rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-bold text-lg">{g.nombre}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Administrador: {g.admin.nombre}
                  </p>
                </div>
                <div>
                  {grupoActivo === g._id ? (
                    <span className="px-3 py-1 bg-green-600 text-white rounded">
                      Activo
                    </span>
                  ) : (
                    <button
                      onClick={() => activarGrupo(g._id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Activar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

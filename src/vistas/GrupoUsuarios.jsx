import { useEffect, useState } from "react";
import { UseAuth } from "../Context/AuthContext";
import api from "../Context/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import InvitarUsuarioModal from "../components/InvitarUsuarioModal";

export default function GrupoUsuarios() {
  const { user } = UseAuth();
  const grupoActivo = user?.grupoActivo;
  const esAdmin = grupoActivo?.admin?._id === user?.id;

  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (!grupoActivo || !esAdmin) return;

    const fetchUsuarios = async () => {
      try {
        const { data } = await api.get(`/grupos/${grupoActivo._id}/usuarios`);
        setUsuarios(data);
      } catch (error) {
        console.error("Error obteniendo usuarios del grupo", error);
      }
    };

    fetchUsuarios();
  }, [grupoActivo, esAdmin]);

  const eliminar = async (id) => {
    const res = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: "Esta acción lo removerá del grupo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    });

    if (!res.isConfirmed) return;

    try {
      await api.delete(`/grupos/${grupoActivo._id}/usuarios/${id}`);
      setUsuarios((u) => u.filter((x) => x._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (!esAdmin) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">No tienes permisos para ver esta página</h1>
      </div>
    );
  }

  return (
    <>
      <Header />
      {esAdmin && (
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Invitar Usuario
            </button>
          )}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Usuarios del Grupo: {grupoActivo?.nombre}
        </h1>

        {usuarios.length === 0 ? (
          <p>No hay usuarios en este grupo</p>
        ) : (
          <div className="space-y-3">
            {usuarios.map((u) => (
              <div
                key={u._id}
                className="p-4 bg-white shadow rounded flex justify-between"
              >
                <div>
                  <p className="font-bold">{u.nombre}</p>
                  <p>{u.email}</p>
                </div>

                {/* No eliminarse a sí mismo */}
                {u._id !== user._id && (
                  <button
                    onClick={() => eliminar(u._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {showModal && (
        <InvitarUsuarioModal
          grupoId={grupoActivo}
          onClose={() => setShowModal(false)}
        />
      )}
      <Footer />
    </>
  );
}

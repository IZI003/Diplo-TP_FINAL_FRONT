import { useEffect, useState } from "react";
import { UseAuth } from "../Context/AuthContext";
import api from "../Context/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import InvitarUsuarioModal from "../components/InvitarUsuarioModal";
import { UseGroups } from "../Context/GroupContext";
import { toast } from "react-toastify";

export default function GrupoUsuarios() {
  const {userActual, getUserActual, grupoActivo} = UseGroups();

  const grupoActivo_objeto = userActual?.user?.grupoActivo;
  const userId = userActual?.user?._id;
  
  const esAdmin = grupoActivo_objeto?.admin?._id === userId;

  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    
    if (!grupoActivo_objeto || !esAdmin) return;
    const fetchUsuarios = async () => {
      try {
        const { data } = await api.get(`/grupos/${grupoActivo_objeto?._id}/usuarios`);
        setUsuarios(data);
      } catch (error) {
        toast.error("Error obteniendo usuarios del grupo", error);
      }
    };

    fetchUsuarios();
  }, [grupoActivo_objeto, esAdmin, getUserActual, grupoActivo]);

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
      await api.delete(`/grupos/${grupoActivo_objeto._id}/usuarios/${id}`);
      setUsuarios((u) => u.filter((x) => x._id !== id));
    } catch (error) {
      toast.error("Error eliminando usuario del grupo", error);
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
      <div className="justify-between items-center mb-5 ">
                <div className="text-center w-full">
                      <h1 className="text-5xl font-bold"> Usuarios del Grupo: {grupoActivo_objeto?.nombre}</h1>
                </div>
            <div className="">
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Invitar Usuario
                  </button>
              </div>
              </div>

            
          )}
      <div className="p-6" 
            style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
        >

        {usuarios.length === 0 ? (
          <p>No hay usuarios en este grupo</p>
        ) : (
          <div className="space-y-3"
          
          >
            {usuarios.map((u) => (
              <div
                key={u._id}
                className="p-4 shadow rounded flex justify-between"
            style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}

              >
                <div>
                  <p className="font-bold">{u.nombre}</p>
                  <p>{u.email}</p>
                </div>

                {/* No eliminarse a sí mismo */}
                {u._id !== userId && (
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
          grupoId={grupoActivo_objeto}
          onClose={() => setShowModal(false)}
        />
      )}
      <Footer />
    </>
  );
}

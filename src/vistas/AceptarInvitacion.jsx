import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Context/api";
import Swal from "sweetalert2";
import { UseAuth } from "../Context/AuthContext";

export default function AceptarInvitacion() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated  } = UseAuth();

  useEffect(() => {
    const procesar = async () => {
      try {
        // Obtener info del grupo antes de unirse
        const { data } = await api.get(`/grupos/preview/${token}`);

        const resp = await Swal.fire({
          title: "Unirse al grupo",
          html: `
            <p>Nombre: <b>${data.nombreGrupo}</b></p>
            <p>Administrador: <b>${data.admin.nombre}</b></p>
          `,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Unirme",
        });

        if (!resp.isConfirmed) {
          navigate("/");
          return;
        }

        // Si está logueado → unirse
        if (isAuthenticated) {
          await api.post(`/grupos/unirse/${token}`);
          Swal.fire("¡Listo!", "Te has unido al grupo.", "success");
          navigate("/grupos");
          return;
        }

        // Si NO está logueado → pedir login

        Swal.fire("Necesitás iniciar sesión o crearte una cuenta", "", "info");
        navigate(`/login?inv=${token}`);

      } catch (error) {
        Swal.fire("Error", error.response?.data?.error || "Invitación inválida", "error");
        navigate("/");
      }
    };

    procesar();
  }, [isAuthenticated, navigate, token]);

  return <p>Procesando invitación...</p>;
}

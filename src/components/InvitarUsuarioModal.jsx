import Swal from "sweetalert2";
import api from "../Context/api";

export default function InvitarUsuarioModal({ grupoId, onClose }) {

  const generarLink = async () => {
    try {
      const urlfront = import.meta.env.VITE_FRONT_URL;
      const { data } = await api.post(`/grupos/${grupoId._id}/invitar`);
      const url = `${urlfront}/invitar/${data.token}`;

      await Swal.fire({
        title: "Link generado",
        html: `
          <p>Compartí este enlace:</p>
          <input value="${url}" class="swal2-input" readonly
          />
        `,
        confirmButtonText: "Copiar",
        preConfirm: () => {
          navigator.clipboard.writeText(url);
        },
      });

      onClose();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.error || "No se pudo generar invitación", "error");
    }
  };

  return (
    <div
    className="fixed inset-0 bg-black/40 z-40  bg-opacity-40 flex justify-center items-center"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
    >
      <div className=" p-6 rounded shadow-xl w-96"
            style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
      
        >
        <h2 className="text-xl font-bold mb-4">Invitar Usuario</h2>

        <p className="mb-4">Se generará un link para que el usuario se una a tu grupo.</p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
            Cancelar
          </button>

          <button onClick={generarLink} className="px-4 py-2 bg-blue-600 text-white rounded">
            Generar link
          </button>
        </div>
      </div>
    </div>
  );
}

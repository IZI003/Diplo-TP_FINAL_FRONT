import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { apiAuth } from "../Context/api";
import { UseAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterModal({ open, setOpen, setOpenlogin }) {

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: ""
  });

  const { login } = UseAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.password) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      const { data } = await apiAuth.post("/register", form);

      if (data.user.token) {
        toast.success("Cuenta creada con éxito");

        // guardar token
        localStorage.setItem("token", data.user.token);

        // actualiza el usuario en context
        login();
        // redirigir a jugar
        navigate("/jugar");
        // cerrar modal
        setOpen(false);

        

      }
      else {
        toast.error("Error al registrarse");
         // cerrar modal
        setOpen(false);

      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error al registrarse");
    }
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      style={{
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)"
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="p-8 rounded-xl w-96 shadow-xl"
        style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
      >
            <h2 className="text-2xl font-bold mb-4">Crear Cuenta</h2>

             <form onSubmit={handleSubmit} className="space-y-4" 
             style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
             >

              <input 
              type="text" 
                name="nombre"
              placeholder="Nombre"

                value={form.nombre}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg border-green-400 " style={{ color: "var(--text-color)" }}
              />

              <input 
              type="email" 
              placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg  border-green-400 " style={{ color: "var(--text-color)" }}
              />

              <input 
              type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg  border-green-400 " style={{ color: "var(--text-color)" }}
              />

              <button className="w-full  text-white p-3 m-2 rounded-lg">
                Registrarme
              </button>
            </form>

            <button
              onClick={() => setOpen(false)}
              className=" w-full  text-white p-3 m-2 rounded-lg"
            >
              Cancelar
            </button>

            <div className="text-center mt-4">
              <button
                onClick={() => {
                  setOpen(false);
                  setOpenlogin(true);
                }}
                className="text-blue-600 hover:underline"
              >
                ¿Ya tienes una cuenta? Iniciar sesión
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

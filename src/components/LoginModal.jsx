import { AnimatePresence, motion } from "framer-motion";
import { UseAuth } from "../Context/AuthContext";
import { apiAuth } from "../Context/api";
import { UseCartones } from "../Context/CartonesContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginModal({ open, setOpen, setOpenRegister  }) {
    const { login } = UseAuth();
    const [form, setForm] = useState({
        email: "",
        password: ""
      });

    const navigate = useNavigate();
    const { getSeleccion } = UseCartones();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!form.email || !form.password) {
        toast.error("Todos los campos son obligatorios");
        return;
      }
  
      try {
          const { data } = await apiAuth.post("/login", form);
           if (data.token) {
        localStorage.setItem("token", data.token);
        login();   // Actualiza el context decodificando el token
        getSeleccion(); // Cargar selección del usuario

        toast.success("Login exitoso");
        navigate("/jugar");

        setOpen(false);
      }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error al iniciar sesión");
      }
    };

  return (
    <AnimatePresence>
      {open && (
        <>
       <motion.div
        className="fixed inset-0 bg-black/40 z-40"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setOpen(false)}
      />

      {/* 🔹 CONTENEDOR DE CENTRADO (SIN BLUR) */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          className="pointer-events-auto"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
        >
          {/* 🔹 MODAL */}
          <div
            className="p-8 rounded-xl w-96 shadow-xl"
            style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
          >
            <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>

            <form onSubmit={handleSubmit} className="space-y-4" 
                style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
            >
              <input 
              type="email" 
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
                className="w-full p-3 border rounded-lg  border-green-400 "
              />

              <input 
              type="password" 
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Contraseña"
                className="w-full p-3 border rounded-lg  border-green-400 "
              />

              <button className="w-full  text-white p-3 m-2 rounded-lg">
                Iniciar
              </button>
            </form>

            <button
              onClick={() => setOpen(false)}
              className="w-full  text-white p-3 m-2 rounded-lg"
            >
              Cancelar
            </button>
            <div className="text-center mt-4 text-blue-600 p-3 rounded-lg">
              <button
                onClick={() => {
                  setOpen(false);
                  setOpenRegister(true);
                }}
                          style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}

              >
                ¿No tenés cuenta? Crear una cuenta
              </button>
            </div>

            </div>
          </motion.div>
            </div>
        
        </>
      )}
    </AnimatePresence>
  );
}

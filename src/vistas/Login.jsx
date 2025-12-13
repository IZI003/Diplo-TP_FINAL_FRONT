import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../Context/AuthContext";
import { apiAuth } from "../Context/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UseCartones } from "../Context/CartonesContext";

export default function Login({ openRegister }) {
  const { login } = UseAuth();
  const navigate = useNavigate();
        const { getSeleccion } = UseCartones();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

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
        if(data.user._id)
        {
        login(data.user._id); // Guardamos en el context
        getSeleccion(); // Cargar selección de cartones si es necesario
        toast.success("Login exitoso");

        navigate("/jugar"); // redirigir al Home
        }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <>
     <Header />
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          Iniciar Sesión
        </h2>

        <label className="block mb-2 dark:text-white">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
        />

        <label className="block mb-2 dark:text-white">Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700"
        >
          Ingresar
        </button>
        <button
                      onClick={openRegister}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Registrarse
                    </button>
      </form>
    </div>
    <Footer />
    </>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ModalSeleccionados from "./ModalSeleccionados";
import { UseAuth } from "../Context/AuthContext";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Header({ openRegister }) {
  const navigate = useNavigate();
 const { user, logout } = UseAuth();   // <-- AHORA EL HEADER VE EL USUARIO

  const [openModalSeleccionados, setOpenModalSeleccionados] = useState(false);

  // Estados para los menús
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const esAdmin = user?.grupoActivo?.admin?._id === user?.id;
  // Cerrar menús cuando se hace click fuera
  const accRef = useRef(null);
  const setRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (accRef.current && !accRef.current.contains(e.target)) {
        setShowAccountMenu(false);
      }
      if (setRef.current && !setRef.current.contains(e.target)) {
        setShowSettingsMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }} >

      {/* ---------- Botón Account Circle (Login / Logout / Perfil) ---------- */}
      <div className="relative" ref={accRef}>
        <button
          className="rounded-xl h-10 w-10 hover:bg-gray-300 dark:hover:bg-gray-700 flex items-center justify-center"
          onClick={() => setShowAccountMenu(!showAccountMenu)}
        >
          <span className="material-symbols-outlined text-gray-800 dark:text-white">
            account_circle
          </span>
        </button>

        {showAccountMenu && (
          <div className="absolute left-0 mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-2 w-40">
            {user ?  (
              <>


                <button
                  className="block w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  onClick={() => navigate(`/usuarios/editar/${user?.id}`)}
                >
                  Perfil
                </button>

                <button
                  className="block w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  onClick={() => {
                    logout();
                    localStorage.removeItem("user");
                    setShowAccountMenu(false);
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
               <nav className="flex gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                      Iniciar Sesión
                    </button>

                    <button
                      onClick={openRegister}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Registrarse
                    </button>
                  </nav>
            )}
          </div>
        )}
      </div>

      {/* ---------- Titulo ---------- */}
      <h1 className="text-xl font-bold dark:text-white">Bingo Bash</h1>

      {/* ---------- Ver seleccionados ---------- */}
       {user ?  (
              <>
      <button
        className="rounded-xl px-3 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 flex items-center justify-center"
        onClick={() => setOpenModalSeleccionados(true)}
      >
        Ver seleccionados
      </button>

      <ModalSeleccionados
        open={openModalSeleccionados}
        setOpen={setOpenModalSeleccionados}
        userId={user}
      />
       <button
        className="rounded-xl px-3 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 flex items-center justify-center"
        onClick={() => navigate("/Jugar")}
      >
        Jugar
      </button>
       <ThemeToggleButton />
      </>): (<></>)} 
      {/* ---------- Settings menu ---------- */}
      <div className="relative" ref={setRef}>
        <button
          className="rounded-xl h-10 w-10 hover:bg-gray-300 dark:hover:bg-gray-700 flex items-center justify-center"
          onClick={() => setShowSettingsMenu(!showSettingsMenu)}
        >
          <span className="material-symbols-outlined text-gray-800 dark:text-white">
            settings
          </span>
        </button>

        {showSettingsMenu && user &&(
          <div className="absolute right-0 mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-2 w-44">
            <button
              className="block w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              onClick={() => navigate("/ListaCartones")}
            >
              Lista de Cartones
            </button>
            <button
              className="block w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              onClick={() => navigate("/grupos")}
            >
              Mis Comunidades
            </button>
            {esAdmin && (
              <button
              className="block w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              onClick={() => navigate("/grupo/usuarios")}
            >
               Usuarios del Grupo
            </button>
            )}
            
          </div>
        )}
      </div>
    </header>
  );
}

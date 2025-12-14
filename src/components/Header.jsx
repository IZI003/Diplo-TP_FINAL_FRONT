import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../Context/AuthContext";
import ModalSeleccionados from "./ModalSeleccionados";
import ThemeToggleButton from "./ThemeToggleButton";
import { motion } from "framer-motion";
import { UseThemeContext } from "../Context/ThemeContext";

export default function Header({ openRegister }) {
  const navigate = useNavigate();
  const { user, logout } = UseAuth();
 const {darkMode, toggleTheme } = UseThemeContext();

  const [openModalSeleccionados, setOpenModalSeleccionados] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const esAdmin = user?.grupoActivo?.admin?._id === user?.id;

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
    <header
      className="flex justify-between items-center p-4"
      style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
    >
      {/* ---------------- Cuenta ---------------- */}
      <div className="relative" ref={accRef}>
        <button
          className="rounded-xl h-10 w-10 hover:bg-gray-300 dark:hover:bg-gray-700 flex items-center justify-center"
          onClick={() => setShowAccountMenu(!showAccountMenu)}
        >
          <span className="material-symbols-outlined">account_circle</span>
        </button>

        {showAccountMenu && (
          <div className="absolute left-0 mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-2 w-44 z-50">
            {user ? (
              <>
                <button
                  className="block w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  onClick={() => navigate(`/usuarios/editar/${user.id}`)}
                >
                  Perfil
                </button>

                <button
                  className="block w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>

                {/* ---- SOLO MOBILE ---- */}
                 <div className="block md:hidden border-t mt-1">
                  <div className="flex">
                    <button
                      className="w-full justify-baseline p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                       onClick={toggleTheme}
                    >
                      <div className="flex justify-between items-center w-full">
                      Tema
                      <span className="text-right">
                      {darkMode === "light" ? (
                        <span className="material-symbols-outlined">dark_mode</span>
                      ) : (
                        <span className="material-symbols-outlined">light_mode</span>
                      )}
                      </span>
                      </div>
                    </button>
                  </div>
                </div>
              
              </>
            ) : (
              <>
                <button
                  className="block w-full p-2 hover:bg-gray-100 rounded"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={openRegister}
                  className="block w-full p-2 hover:bg-gray-100 rounded"
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* ---------------- Título ---------------- */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl font-extrabold"
      >
        Bingo<span className="text-indigo-500">Online</span>
      </motion.h1>

      {/* ---------------- Acciones Desktop ---------------- */}
      {user && (
        <motion.div
          className="hidden md:flex items-center gap-3"
          initial="hidden"
          animate="visible"
        >
          <motion.button
            variants={slideFromRight}
            custom={1}
            className="rounded-xl px-3 py-2 hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={() => setOpenModalSeleccionados(true)}
          >
            Ver seleccionados
          </motion.button>

          <motion.button
            variants={slideFromRight}
            custom={2}
            className="rounded-xl px-3 py-2 hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={() => navigate("/jugar")}
          >
            Jugar
          </motion.button>

          <motion.div variants={slideFromRight} custom={3}>
            <ThemeToggleButton />
          </motion.div>
        </motion.div>
      )}

      {/* ---------------- Settings ---------------- */}
      {user && (
        <div className="relative" ref={setRef}>
          <button
            className="rounded-xl h-10 w-10 hover:bg-gray-300 dark:hover:bg-gray-700 flex items-center justify-center"
            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
          >
            <span className="material-symbols-outlined">settings</span>
          </button>

          {showSettingsMenu && (
            <div className="absolute right-0 mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-2 w-48 z-50">
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



              {/* ---- SOLO MOBILE ---- */}
                 <div className="block md:hidden border-t mt-1">
                  <div className="flex">
                    <button
                      className="w-full justify-baseline p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                       onClick={() => setOpenModalSeleccionados(true)}
                    >
                      <div className="flex justify-between items-center w-full">
                      Ver seleccionados
                      </div>
                    </button>
                  </div>

                  <div className="flex">
                    <button
                      className="w-full justify-baseline p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                       onClick={() => navigate("/jugar")}
                    >
                      <div className="flex justify-between items-center w-full">
                      Jugar
                      </div>
                    </button>
                  </div>
                </div>
              
            </div>
          )}
        </div>
      )}
            <ModalSeleccionados
                        open={openModalSeleccionados}
                        setOpen={setOpenModalSeleccionados}
                        userId={user}
                      />  
      
    </header>
  );
}

/* ---------------- Animación ---------------- */
const slideFromRight = {
  hidden: { opacity: 0, x: 80 },
  visible: (i = 1) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ onLoginOpen, onRegister }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-white/20 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-extrabold text-primary"
        >
          Bingo<span className="text-indigo-500">Online</span>
        </motion.h1>

        {/* BOTONES DESKTOP */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={onLoginOpen}
            className="px-4 py-2 font-semibold text-gray-800 hover:text-indigo-500 transition rounded-lg shadow"
          >
            Iniciar sesión
          </button>

          <button
            onClick={onRegister}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Registrarse
          </button>
        </nav>

        {/* HAMBURGER BUTTON MOBILE */}
        <button
          className="md:hidden text-3xl text-gray-800"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t border-gray-20 shadow-lg"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              <button
                onClick={() => {
                  setOpen(false);
                  onLoginOpen();
                }}
                className="py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"

              >
                Iniciar sesión
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  onRegister();
                }}
                className="py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
              >
                Registrarse
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

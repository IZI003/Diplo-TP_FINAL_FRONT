import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { PacmanLoader } from "react-spinners";
import { UseThemeContext } from "../Context/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ListaCartones from "../components/ListaCartones";

const SeleccionarCartones = () => {
  const { darkMode } = UseThemeContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simula un tiempo mínimo de carga (por ejemplo, 1 segundo)
    const timer = setTimeout(() => {
      setLoading(false);
    }, loading);

    return () => clearTimeout(timer);
  }, [loading]);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ backgroundColor: "var(--bg-color)" }}
      >
        <PacmanLoader 
        color="#36d7b7" 
        size={20}
         />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
                <Header />

          <div className='bg-background-light dark:bg-background-dark font-display min-h-screen'>
                <ListaCartones />
            </div>
      <Footer />
    </div>
  );
};

export default SeleccionarCartones;
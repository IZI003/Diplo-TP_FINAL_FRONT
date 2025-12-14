import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "./api";
import Swal from "sweetalert2";
import { UseAuth } from "./AuthContext";
import { toast } from "react-toastify";

const CartonesContext = createContext();

export function CartonesProvider({ children }) {
  const [cartones, setCartones] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 9
  });
  const [loading, setLoading] = useState(false);

  const [seleccionados, setSeleccionados] = useState(() => {
    const saved = localStorage.getItem("seleccionados");
    return saved ? JSON.parse(saved) : [];
  });

 // const userId = localStorage.getItem("userId") || null;
 const { user } = UseAuth();

const userId = user?.id;
  // 2️⃣ DEFINIR ANTES DE USAR
  const getSeleccion = useCallback(async () => {
    try {
      const saved = localStorage.getItem("seleccion");

      if (saved) {
        setSeleccionados(JSON.parse(saved));
        return;
      }

      if (userId) {
        const { data } = await api.get(`/bingo/seleccion/${userId}`);
        setSeleccionados(data.cartones || []);
      }

    } catch (e) {
      toast.error("Error cargando selección previa", e);
    }
  }, [userId]);


  useEffect(() => {
    localStorage.setItem("seleccionados", JSON.stringify(seleccionados));
  }, [seleccionados]);

useEffect(() => {
  if (!userId) return;
  getSeleccion();
}, [userId, getSeleccion]);


  // --- RESTO DE TU CÓDIGO SIN CAMBIOS ---
  const toggleSeleccion = (carton) => {
    setSeleccionados((prev) => {
      const existe = prev.find((c) => c._id === carton._id);
      return existe
        ? prev.filter((c) => c._id !== carton._id)
        : [...prev, carton];
    });
  };

  const guardarSeleccion = async () => {
    try {
      await api.post("/bingo/seleccion", {
        userId,
        cartones: seleccionados.map(c => c._id)
      });

      Swal.fire("Guardado", "Los cartones fueron asignados correctamente", "success");

      localStorage.removeItem("seleccionados");

    } catch (err) {
      Swal.fire("Error", "No se pudo guardar la selección", err);
    }
  };

  const getCartones = async (page = 1, limit = 20) => {
  if (!userId) return;

    setLoading(true);
    try {
      const { data } = await api.get(`/bingo/generar?page=${page}&limit=${limit}`);
      setCartones(data.items);
      setPagination({
        page: data.page,
        limit: data.limit,
        total: data.total,
        totalPages: data.totalPages
      });
    } catch (e) {
      toast.error("Error cargando cartones", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartones();
  }, []);

  useEffect(() => {
    if (userId) {
      getSeleccion();
    }
  }, [userId, getSeleccion]);


  return (
    <CartonesContext.Provider
      value={{
        cartones,
        loading,
        getCartones,
        seleccionados,
        toggleSeleccion,
        guardarSeleccion,
        getSeleccion,
        pagination,
        setPagination
      }}
    >
      {children}
    </CartonesContext.Provider>
  );
}

export const UseCartones = () => useContext(CartonesContext);

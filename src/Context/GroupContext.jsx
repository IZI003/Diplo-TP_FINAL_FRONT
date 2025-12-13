import { createContext, useContext, useState, useEffect } from "react";
import api from "../Context/api";
import { UseAuth } from "../Context/AuthContext";

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const { user } = UseAuth();

  const [grupos, setGrupos] = useState([]);
  const [grupoActivo, setGrupoActivo] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 cargar lista de grupos del usuario
  const fetchGrupos = async () => {
    try {
      const { data } = await api.get(`/grupos/${user.id}`);
      setGrupos(data.grupos);
      setGrupoActivo(data.grupoActivo);
    } catch (err) {
      console.error("Error cargando grupos:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 activar grupo
  const activarGrupo = async (groupId) => {
    try {
      const { data } = await api.put(`/grupos/activar/${user.id}/${groupId}`);
      setGrupoActivo(data.groupId || data.grupoActivo);
    } catch (err) {
      console.error("Error activando grupo:", err);
    }
  };

  // 🔥 crear grupo
  const crearGrupo = async (nombreGrupo) => {
    try {
      const { data } = await api.post("/grupos", {
        nombreGrupo,
        adminEmail: user.email,
      });

      // recargar grupos y marcar activo
      await fetchGrupos();

      return data;
    } catch (err) {
      console.error("Error creando grupo:", err);
      throw err;
    }
  };

  useEffect(() => {
    if (user?.id) fetchGrupos();
  }, [user]);

  return (
    <GroupContext.Provider
      value={{
        grupos,
        grupoActivo,
        loading,
        activarGrupo,
        crearGrupo,
        fetchGrupos,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const UseGroups = () => useContext(GroupContext);

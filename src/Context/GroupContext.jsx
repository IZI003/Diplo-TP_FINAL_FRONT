import { createContext, useContext, useState, useEffect } from "react";
import api, { apiUsers } from "../Context/api";
import { UseAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const { user } = UseAuth();
  const [grupos, setGrupos] = useState([]);
  const [grupoActivo, setGrupoActivo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userActual, setUserActual] = useState(null);

  const getUserActual = async () => {
    if (!user?.id) return;
  
    try {
      setLoading(true);
      const { data } = await apiUsers.get(`/${user.id}`);
      setUserActual(data); // 👈 NO data.items
    } catch (error) {
      toast.error("Error cargando usuario actual ", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 cargar lista de grupos del usuario
  const fetchGrupos = async () => {
    if (!user?.id) return;

    try {
      const { data } = await api.get(`/grupos/${user.id}`);
      setGrupos(data.grupos);
      setGrupoActivo(data.grupoActivo);
    } catch (err) {
      toast.error("Error cargando grupos", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 activar grupo
  const activarGrupo = async (groupId) => {
    if (!user?.id) return;
    if (!groupId) return;

    try {
      const { data } = await api.put(`/grupos/activar/${user.id}/${groupId}`);
      setGrupoActivo(data.groupId || data.grupoActivo);
    } catch (err) {
      toast.error("Error activando grupo", err);
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
      toast.error("Error creando grupo", err);
      throw err;
    }
  };

  useEffect(() => {
    if (user?.id) 
      {
        fetchGrupos();
        getUserActual();
        }
  }, [user?.id, grupoActivo]);

  return (
    <GroupContext.Provider
      value={{
        grupos,
        grupoActivo,
        loading,
        activarGrupo,
        crearGrupo,
        fetchGrupos,
        getUserActual,
        userActual,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const UseGroups = () => useContext(GroupContext);

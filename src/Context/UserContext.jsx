import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { apiUsers } from "./api";
import { UseAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user } = UseAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET ALL USERS
  const getUsers = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const { data } = await apiUsers.get("/");
      setUsers(data.items);
    } catch (error) {
      toast.error("Error cargando usuarios", error);
    } finally {
      setLoading(false);
    }
  };

  // CREATE USER
  const createUser = async (user) => {
    try {
      await apiUsers.post("/", user);
      toast.success("Usuario creado");
      getUsers();
    } catch (error) {
      toast.error("Error creando usuario", error);
    }
  };

  // UPDATE USER
  const updateUser = async (id, user) => {
    
    try {
      const usuario= await apiUsers.put(`/${id}`, user);
      if(!usuario){
        toast.error("Usuario no encontrado");
        return;
      }else{
        toast.success("Usuario actualizado");
      getUsers();
        return;
      }
    } catch (error) {
      toast.error("Error actualizando", error);
    }
  };

  // DELETE USER
  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    });

    if (!result.isConfirmed) return;

    try {
      await apiUsers.delete(`/${id}`);
      toast.success("Eliminado");
      getUsers();
    } catch (error) {
      toast.error("Error eliminando",error);
    }
  };


  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        createUser,
        deleteUser,
        updateUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const UseUsers = () => useContext(UserContext);
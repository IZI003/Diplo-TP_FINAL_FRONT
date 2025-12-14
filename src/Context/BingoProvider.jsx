import { useState, useEffect } from "react";
import { UseSocketContext } from "./SocketContextProvider";
import api from "./api";
import { UseAuth } from "./AuthContext";
import Swal from "sweetalert2";
import { BingoContext } from "./BingoContext";
import { toast } from "react-toastify";

export const BingoProvider = ({ children }) => {
  const socket = UseSocketContext();
  const { user } = UseAuth();

  const [bolillas, setBolillas] = useState([]);
  const [ultimaBolilla, setUltimaBolilla] = useState(null);
  const [gameStatus, setGameStatus] = useState("waiting");

  /* 
  =============================================
  🔹 1. UNIRSE AL GRUPO CUANDO SE CONECTA
  =============================================
  */
  useEffect(() => {
    if (!socket) return;
    if (!user?.grupoActivo?._id) return;

    const groupId = user.grupoActivo._id;

    socket.emit("joinGroup", groupId);
    // Escuchar bolilla en tiempo real
    socket.on("bolillaGenerada", (data) => {

      setUltimaBolilla(data.numero);
      setBolillas(data.numerosSalidos);
    });

    // Estado de juego (si querés usarlo)
    socket.on("estadoBolillero", (estado) => {
      setGameStatus(estado);
    });

    return () => {
      socket.off("bolillaGenerada");
      socket.off("estadoBolillero");
    };

  }, [socket, user?.grupoActivo]);

  
  /* 
  =============================================
  🔹 2. CONSULTAR ESTADO INICIAL AL BACKEND
  =============================================
  */
  const fetchEstado = async (groupId) => {
    try {
      const { data } = await api.get(`/bolillero/estado/${groupId}`);

      setBolillas(data.numerosSalidos || []);
      setUltimaBolilla(data.numerosSalidos?.slice(-1)[0] || null);
    } catch (error) {
      toast.error("Error obteniendo estado actual:", error);
    }
  };

  useEffect(() => {
    if (!user?.grupoActivo?._id) return;

    fetchEstado(user.grupoActivo._id);
  }, [user]);


  /* 
  =============================================
  🔹 3. PEDIR UNA BOLILLA NUEVA (ADMIN)
  =============================================
  */
  const pedirBolilla = async () => {
    const groupId = user?.grupoActivo?._id;

    try {
      await api.post("/bolillero/sacar", { groupId });
      // ❗ NO actualizar manualmente. El socket enviará la bolilla al grupo.
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };


  return (
    <BingoContext.Provider
      value={{
        bolillas,
        ultimaBolilla,
        gameStatus,
        pedirBolilla,
      }}
    >
      {children}
    </BingoContext.Provider>
  );
};

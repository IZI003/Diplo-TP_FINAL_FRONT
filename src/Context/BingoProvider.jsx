import { useState, useEffect, useRef } from "react";
import { UseSocketContext } from "./SocketContextProvider";
import api from "./api";
import Swal from "sweetalert2";
import { BingoContext } from "./BingoContext";
import { toast } from "react-toastify";
import { UseGroups } from "./GroupContext";

export const BingoProvider = ({ children }) => {
  const socket = UseSocketContext();
  const {userActual } = UseGroups();
  const user =userActual?.user;
  const [bolillas, setBolillas] = useState([]);
  const [ultimaBolilla, setUltimaBolilla] = useState(null);
  const [gameStatus, setGameStatus] = useState("waiting");
  const prevGroupRef = useRef(null);

  /* 
  =============================================
  🔹 1. UNIRSE AL GRUPO CUANDO SE CONECTA
  =============================================
  */

    useEffect(() => {
      if (!socket || !user?.grupoActivo?._id) return;

      const groupId = user.grupoActivo._id;

      // 🔴 salir del grupo anterior
      if (prevGroupRef.current) {
        socket.emit("leaveGroup", prevGroupRef.current);
      }

      // 🟢 entrar al nuevo grupo
      socket.emit("joinGroup", groupId);
      prevGroupRef.current = groupId;

    }, [socket, user?.grupoActivo?._id]);

    useEffect(() => {
      if (!socket || !userActual?.user?.grupoActivo?._id) return;

      const onBolilla = (data) => {
        setUltimaBolilla(data.numero);
        setBolillas(data.numerosSalidos);
      };

      const onEstado = (estado) => {
        setGameStatus(estado);
      };

      socket.on("bolillaGenerada", onBolilla);
      socket.on("estadoBolillero", onEstado);

      return () => {
        socket.off("bolillaGenerada", onBolilla);
        socket.off("estadoBolillero", onEstado);
      };

    }, [socket, userActual?.user?.grupoActivo?._id]);


  
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

  setBolillas([]);
  setUltimaBolilla(null);
  setGameStatus("waiting");

  fetchEstado(user.grupoActivo._id);

}, [user?.grupoActivo?._id]);

  /* 
  =============================================
  🔹 3. PEDIR UNA BOLILLA NUEVA (ADMIN)
  =============================================
  */
  const pedirBolilla = async () => {
    const groupId = user?.grupoActivo?._id;

    try {
      await api.post(`/bolillero/sacar/${groupId}`);

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

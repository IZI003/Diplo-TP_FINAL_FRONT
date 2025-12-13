import { useState, useEffect } from "react";
import { UseSocketContext } from "./SocketContextProvider";
import api from "./api";
import { UseAuth } from "./AuthContext";
import Swal from "sweetalert2";
import { BingoContext } from "./BingoContext";

export const BingoProvider = ({ children }) => {
  const socket = UseSocketContext();

  const [bolillas, setBolillas] = useState([]);
  const [ultimaBolilla, setUltimaBolilla] = useState(null);
  const [gameStatus, setGameStatus] = useState("waiting");
     const { user } = UseAuth();

  useEffect(() => {
    if (!socket) return;
    if (!user?.grupoActivo) return;

    socket.on("connect", () => {
      console.log("Bingo socket conectado");
      socket.emit("joinGroup", user.grupoActivo._id);
    });

    socket.on("bolillaGenerada", (data) => {
      setUltimaBolilla(data.number);
      setBolillas((prev) => [...prev, data.number]);
    });

    socket.on("estadoBolillero", (status) => {
      setGameStatus(status);
    });

    return () => {
      socket.off("bolillaGenerada");
      socket.off("estadoBolillero");
    };
  }, [socket, user?.grupoActivo]);

  useEffect(() => {
   if (!socket || !user?.grupoActivo) return;

   socket.emit("joinGroup", user.grupoActivo._id);

}, [user?.grupoActivo, socket]);
const pedirBolilla = async () => {
    const groupId= user?.grupoActivo._id;
  try {
    const { data } = await api.post("/bolillero/sacar", {
                                    grupoId:groupId 
                                });

    if (data.numero) {
      setUltimaBolilla(data.numero);
      setBolillas(data.numerosSalidos);
        socket.emit("pedirBolilla");

    } else {
      Swal.fire("Falló", data.msg, "error");
    }
  } catch (err) {
    Swal.fire("Error", err.message, "error");
  }
};

 // 🔥 Obtener estado actual desde el backend
  const fetchEstado = async (groupId) => {

        try {
            if (!groupId) return;
        const { data } = await api.get(`/bolillero/estado/${groupId}`);

        setBolillas(data.numerosSalidos || []);
        setUltimaBolilla(data.numerosSalidos?.slice(-1)[0] || null);

        } catch (error) {
        console.error("Error obteniendo estado actual:", error);
        }
    };

// 🔥 Cargar estado inicial al montar el provider
  useEffect(() => {
    const groupId= user?.grupoActivo._id;

    fetchEstado(groupId);
  }, [user]);

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

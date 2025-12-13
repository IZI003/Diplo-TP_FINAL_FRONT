import { createContext, useContext, useEffect } from "react";
import { createSocket } from "./socket/socketConfig";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  
  useEffect(() => {
    createSocket.connect();

    return () => {
      createSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={createSocket}>
      {children}
    </SocketContext.Provider>
  );
};

export const UseSocketContext = () => useContext(SocketContext);

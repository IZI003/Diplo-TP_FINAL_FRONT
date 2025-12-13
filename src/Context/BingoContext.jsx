// BingoContext.jsx
import { createContext, useContext } from "react";

export const BingoContext = createContext(); // <-- ahora sí se exporta

export const useBingo = () => useContext(BingoContext);

import { motion } from "framer-motion";
import sms1 from "../assets/sms1.fw.png";
export default function Hero({ onRegister }) {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b text-black bg-gray-200">
      
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold mb-6"
      >
        ¡Juega Bingo Online con Amigos y Familia!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg md:text-2xl max-w-2xl mb-8"
      >
        Crea salas privadas, elige tus cartones y viví la emoción del bingo en tiempo real.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRegister}
        className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl text-lg shadow-lg hover:bg-yellow-300"
      >
        Registrarme Gratis
      </motion.button>

      <motion.img
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        src= {sms1}
        alt="Personas jugando bingo"
        className="w-2xs max-w-3xl mt-10"
      />

    </section>
  );
}

import { motion } from "framer-motion";

export default function HowToPlay() {
  return (
    <section className="py-20 text-black bg-gray-200">
      <motion.h2
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="text-center text-3xl font-bold mb-8"
      >
        ¿Cómo se juega?
      </motion.h2>

      <motion.ol
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-lg space-y-4"
      >
        <li>1️⃣ Registrate y elegí tus cartones.</li>
        <li>2️⃣ Invita amigos con un link.</li>
        <li>3️⃣ El bolillero empieza automáticamente.</li>
        <li>4️⃣ Marcá tus aciertos en tiempo real.</li>
      </motion.ol>
    </section>
  );
}

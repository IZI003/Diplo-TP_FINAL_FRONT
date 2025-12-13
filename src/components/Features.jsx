import { motion } from "framer-motion";

const features = [
  { title: "Salas privadas", icon: "groups" },
  { title: "Bolillero automático", icon: "casino" },
  { title: "Cartones únicos", icon: "confirmation_number" },
  { title: "Jugar desde el celular", icon: "smartphone" },
];

export default function Features() {
  return (
    <section className="py-16 border-b border-white/10 text-black bg-gray-200">
      <h2 className="text-center text-3xl font-bold mb-10">¿Por qué elegir nuestro bingo?</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">

        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="text-black bg-green-100 p-6 rounded-xl shadow-lg text-center"
          >
            <span className="material-symbols-outlined text-5xl mb-3 text-blue-600">{f.icon}</span>
            <h3 className="font-semibold text-xl">{f.title}</h3>
          </motion.div>
        ))}

      </div>
    </section>
  );
}

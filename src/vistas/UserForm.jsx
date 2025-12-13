import Footer from "../components/Footer";
import Header from "../components/Header";

export default function UserForm({ user, setUser, onSubmit }) {
  return (
    <>
         <Header />
    <form
      onSubmit={onSubmit}
      className="space-y-4 p-6 rounded shadow max-w-md mx-auto"
      style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
    >
      <div>
        <label className="block font-semibold">Nombre</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={user.nombre}
          onChange={(e) => setUser({ ...user, nombre: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Email</label>
        <input
          type="email"
          className="border p-2 w-full rounded"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Password</label>
        <input
          type="password"
          className="border p-2 w-full rounded"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
      </div>

      <button className="w-full py-2 bg-blue-600 text-white rounded">
        Guardar
      </button>
    </form>
    <Footer/>
    </>
  );
}

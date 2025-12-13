import { Routes, Route } from "react-router-dom";
import Jugar from "../vistas/Jugar";
import SettingsMenu from "../components/SettingsMenu";
import Settings from "../components/Settings";
import ListaCartones from "../components/ListaCartones";
import SeleccionarCartones from "../vistas/SeleccionarCartones";
import UserCreate from "../vistas/UserCreate";
import UserEdit from "../vistas/UserEdit";
import UsersList from "../vistas/UsersList";
import Login from "../vistas/Login";
import Landing from "../vistas/Landing";
import PrivateRoute from "../components/PrivateRoute";
import GroupsList from "../vistas/GroupsList";
import GrupoUsuarios from "../vistas/GrupoUsuarios";
import AceptarInvitacion from "../vistas/AceptarInvitacion";
import LoginModal from "../components/LoginModal";

export default function AppRoutes() {
  return (
    <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login?modal=login" element={<Landing />} />
        <Route path="/login?inv=:token" element={<Landing />} />
        <Route path="/login" element={<Landing />} />
        
        <Route path="/usuarios/crear" element={<UserCreate />} />
        <Route path="/usuarios/editar/:id" element={<UserEdit />} />
        <Route path="/vista"  element={<visualViewport.html />} />

      <Route
          path="/jugar"
          element={
            <PrivateRoute>
              <Jugar />
            </PrivateRoute>
          }
        />
      <Route
          path="/ListaCartones"
          element={
            <PrivateRoute>
              <SeleccionarCartones />
            </PrivateRoute>
          }
        />
        <Route path="/cartones" element={
            <PrivateRoute>
              <ListaCartones />
            </PrivateRoute>
          }/>
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
       <Route
          path="/usuarios"
          element={
            <PrivateRoute>
              <UsersList />
            </PrivateRoute>
          }
        />
      <Route path="/grupos" element={<GroupsList />} />
      <Route path="/grupo/usuarios" element={<GrupoUsuarios />} />
      <Route path="/invitar/:token" element={<AceptarInvitacion />} />
      {/* Ruta 404 */}
      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />

    </Routes>
  );
}

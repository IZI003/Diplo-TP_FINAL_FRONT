import { ToastContainer } from 'react-toastify';
import './App.css'
import AppRoutes from './routers/routes';
function App() {
  return (
    <>
     <ToastContainer position="top-right" autoClose={2000} />
     <AppRoutes />
    </>
  )
}

export default App

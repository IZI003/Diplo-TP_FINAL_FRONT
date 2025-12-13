import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './Context/ThemeContext.jsx'
import { CartonesProvider } from './Context/CartonesContext.jsx'
import { UserProvider } from './Context/UserContext.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import { SocketProvider } from './Context/SocketContextProvider.jsx'
import { BingoProvider } from './Context/BingoProvider.jsx'
import { GroupProvider } from './Context/GroupContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
        <AuthProvider>
          <GroupProvider>
          <BingoProvider>
            <BrowserRouter>
              <ThemeProvider>
                <CartonesProvider>
                  <UserProvider>
                      <App />
                  </UserProvider>
                </CartonesProvider>
              </ThemeProvider>
            </BrowserRouter>
          </BingoProvider>
          </GroupProvider>
        </AuthProvider>
    </SocketProvider>
  </StrictMode>
)

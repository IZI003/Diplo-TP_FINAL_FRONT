import {ico} from '../assets/ico.png';

const Footer = () => {
  return (
            <footer 
            className="bg-white/90 border-b border-white/10 text-black py-6 mt-10 text-center">
                <p className="text-sm">Diplomatura en Progrmacion web con JAVASCRIPT, NODO Catamarca, TRABAJO FINAL</p>
                <p className="text-sm">&copy; 2025. Todos los derechos reservados.</p>
                
                <p className="text-sm mb-2">Desarrollado por <span className="font-semibold">Ezequiel Esteban Miranda</span></p>
                <div className="inline-flex items-center gap-2 mb-4">
                <a 
                    href="https://github.com/IZI003/Diplo-TP_FINAL_FRONT" 
                    target="_blank" 
                    className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-300 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38
                        0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94
                        -.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53
                        .63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
                        .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
                        0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
                        0 0 .67-.21 2.2.82a7.54 7.54 0 0 1 2-.27
                        c.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82
                        .44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
                        0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
                        0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8 8 0 0 0 16 8
                        c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    <span>Ver repositorio en GitHub Frontent</span>
                </a>
                <a 
                    href="https://github.com/IZI003/Diplo-TP_FINAL_BACK" 
                    target="_blank" 
                    className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-300 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38
                        0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94
                        -.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53
                        .63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
                        .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
                        0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
                        0 0 .67-.21 2.2.82a7.54 7.54 0 0 1 2-.27
                        c.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82
                        .44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
                        0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
                        0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8 8 0 0 0 16 8
                        c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    <span>Ver repositorio en GitHub Backend</span>
                </a>
                </div>
                <p className="text-sm mb-2"></p>

                <a 
                    href="http://190.228.131.42:5173" 
                    target="_blank" 
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                    <img  src= {ico} alt="nuestra web" className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" />
                    <span>Ver Web de la Aplicacion</span>
                </a>
        </footer>
    );
};

export default Footer;

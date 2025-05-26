import React, { useEffect, useState } from "react";
import { Head, Footer } from "../index.js";
import MainContent from "./components/MainContent/MainContent.jsx";
import { getInitialData } from "./config/initialData.js";

function App(props) {
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    getInitialData().then(setInitialData);
  }, []);

  if (!initialData) return <div>Cargando...</div>;

  return (
    <div className="bg-black min-h-screen text-gray-900 flex flex-col">
      <Head
        logo="./src/assets/react.png"
        title="Movies React"
        navClassName="flex gap-4 justify-center mb-4"
      />
      <h1 className="sr-only">Bienvenido a mi aplicación</h1>
      <MainContent {...initialData} {...props} />
      <Footer>
        &copy; {new Date().getFullYear()} Mi Sitio Web. Todos los derechos
        reservados.
      </Footer>
    </div>
  );
}

export default App;

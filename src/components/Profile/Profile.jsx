import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import MainContent from "../MainContent/MainContent.jsx";
import { getInitialData } from "../../config/initialData.js";

const {
  cardDetails,
  genresList,
  popularByGenre,
  initialGenres,
  SEARCH_API,
  cardDetPop,
} = await getInitialData();

const Profile = () => {
  const [isKidsProfile, setIsKidsProfile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [continueWatching, setContinueWatching] = useState([
    {
      id: 1,
      title: "Serie Ejemplo 1",
      thumbnail: "https://via.placeholder.com/150",
      progress: "00:15:30",
    },
    {
      id: 2,
      title: "Película Ejemplo 2",
      thumbnail: "https://via.placeholder.com/150",
      progress: "01:05:20",
    },
  ]);

  const navigate = useNavigate(); // Hook para redirigir

  const handleSwitchProfile = () => {
    setIsKidsProfile((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    navigate("/"); // Redirigir al usuario a la página de inicio
  };

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {isKidsProfile ? "Perfil Infantil" : "Tu Perfil"}
        </h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={handleSwitchProfile}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {isKidsProfile
              ? "Cambiar a Perfil Normal"
              : "Cambiar a Perfil Infantil"}
          </button>
          <button
            onClick={handleLogout} // Llamar a la función handleLogout
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Cerrar Sesión
          </button>
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
            >
              <span role="img" aria-label="person">
                👤
              </span>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Gestionar datos del usuario
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Activar/Desactivar notificaciones
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Control de permisos
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Borrar historial de búsqueda
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Gestionar suscripciones
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Ayuda y opinión
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Acerca de y avisos legales
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <MainContent
        cardDetails={cardDetails}
        genresList={genresList}
        popularByGenre={popularByGenre}
        initialGenres={initialGenres}
        SEARCH_API={SEARCH_API}
        cardDetPop={cardDetPop}
        continueWatching={continueWatching}
      />
    </div>
  );
};

export default Profile;

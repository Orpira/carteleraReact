import React, { useState } from "react";
import { ButtonFavorite } from "../../../index.js";
import { useLocation } from "react-router-dom";

const Card = ({ image, title, content, onClick, fullScreen, useImg }) => {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';
  const [hovered, setHovered] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const handleShowContent = (e) => {
    e.stopPropagation();
    setShowContent((prev) => !prev);
  };

  return (
    <div
      className={`relative ${
        fullScreen
          ? "w-screen h-screen flex flex-col justify-end items-start p-10 bg-transparent overflow-hidden"
          : "bg-white rounded-xl shadow-md p-5 w-[220px] text-center transition duration-200 cursor-pointer"
      } ${hovered && !fullScreen ? "shadow-lg scale-105" : ""}`}
      onMouseEnter={() => {
        setHovered(true);
        setShowContent(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setShowContent(false);
      }}
      onClick={onClick}
    >
      {useImg ? (
        <img
          src={image}
          alt={title}
          className={`w-full h-[280px] object-fill rounded-lg mb-3 ${
            fullScreen ? "hidden" : ""
          }`}
        />
      ) : (
        <div
          className={`absolute top-0 left-0 z-0 ${
            fullScreen
              ? "w-screen h-screen"
              : "w-full h-[180px] rounded-lg mb-3"
          }`}
          style={
            fullScreen
              ? {
                  backgroundImage: image,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "rgba(0,0,0,0.65)",
                  backgroundBlendMode: "darken",
                  height: "900px",
                }
              : {
                  background: image,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "rgba(0,0,0,0)",
                  backgroundBlendMode: "overlay",
                  height: "180px",
                }
          }
        />
      )}
      <h3
        className={`relative z-10 ${
          fullScreen
            ? "text-white text-3xl drop-shadow-lg ml-5 -mt-32 mb-4"
            : "text-lg mt-2 mb-1 truncate w-full block"
        }`}
        title={title}
      ></h3>
      {/* Solo mostrar el botón y el contenido en cards populares (no fullScreen) */}
      {!fullScreen && isProfilePage && (
        <>
          <span className="block text-x font-bold text-center">{title}</span>
          <div className="flex items-center justify-between mt-2 mb-1">
            {/* Botón de favorito a la izquierda */}
            <ButtonFavorite isFavorite={isFavorite} onToggle={toggleFavorite} />

            {/* Botón de más información a la derecha */}
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onClick(); // Llama a la función pasada desde el padre (abre el modal)
              }}
              type="button"
            >
              Más información
            </button>
          </div>
          {showContent && (
            <div className="absolute inset-0 flex items-center justify-normal bg-black/80 rounded-xl z-20 animate-fade-in">
              <div className="bg-white p-4 rounded-lg shadow-lg max-w-screen-16xl w-full text-gray-800 relative max-h-60 overflow-y-auto">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
                  onClick={handleShowContent}
                  type="button"
                  aria-label="Cerrar"
                >
                  ×
                </button>
                <p className="bg-[#222] p-5 rounded-[10px] max-w-[600px] w-[90%] text-white">
                  {content}
                </p>
              </div>
            </div>
          )}
        </>
      )}
      {/* El content original solo para fullScreen */}
      {fullScreen && (
        <p className="bg-[#222] p-5 rounded-[10px] max-w-[600px] w-[90%] text-white relative z-50">
          <span className="block text-4xl font-bold text-center">{title}</span>
          <br />
          <span className="block">{content}</span>
        </p>
      )}
    </div>
  );
};

export default Card;

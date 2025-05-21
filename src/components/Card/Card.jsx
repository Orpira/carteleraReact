import React, { useState } from "react";

const Card = ({ image, title, content, onClick, fullScreen, useImg }) => {
  const [hovered, setHovered] = useState(false);
  const [showContent, setShowContent] = useState(false);

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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {useImg !== false ? (
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
      >
        {title}
      </h3>
      {/* Solo mostrar el botón y el contenido en cards populares (no fullScreen) */}
      {!fullScreen && (
        <>
          {/* Eliminado el span duplicado del título */}
          <span className="block text-base text-gray-700 mb-2">{content}</span>
          <button
            className="mt-2 mb-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onClick && onClick();
            }}
            type="button"
          >
            Más información
          </button>
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
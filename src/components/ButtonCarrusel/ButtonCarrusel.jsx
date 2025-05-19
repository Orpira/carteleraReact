import React from "react";

const ButtonCarrusel = ({
  direction = "left",
  onClick,
  disabled,
  className = "",
  ...props
}) => {
  const isLeft = direction === "left";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        `${
          isLeft ? "left-5" : "right-5"
        } absolute top-1/2 -translate-y-1/2 z-30 bg-black/40 text-white border-none rounded-full w-12 h-12 text-2xl cursor-pointer outline-none flex items-center justify-center transition-all duration-200 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-blue-300 ` +
        (disabled
          ? "opacity-40 cursor-not-allowed"
          : "opacity-100 hover:scale-110 ") +
        className
      }
      aria-label={isLeft ? "Anterior" : "Siguiente"}
      {...props}
    >
      {isLeft ? "\u2190" : "\u2192"}
    </button>
  );
};

export default ButtonCarrusel;

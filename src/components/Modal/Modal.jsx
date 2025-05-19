import React from "react";

const Modal = ({ open, title, content, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 animate-fade-in">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full text-gray-800 relative max-h-96 overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
          onClick={onClose}
          type="button"
          aria-label="Cerrar"
        >
          ×
        </button>
        {title && (
          <span className="block text-xl font-bold text-center mb-2">
            {title}
          </span>
        )}
        <p className="bg-[#222] p-5 rounded-[10px] w-full text-white">
          {content}
        </p>
      </div>
    </div>
  );
};

export default Modal;

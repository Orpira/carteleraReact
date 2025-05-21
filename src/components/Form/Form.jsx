import React from "react";

const Form = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (onSubmit) onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-6 w-full max-w-md mx-auto flex flex-col gap-4"
    >
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
      >
        Enviar
      </button>
    </form>
  );
};

export default Form;
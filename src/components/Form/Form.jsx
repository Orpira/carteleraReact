import React, { useState } from "react";

const Form = ({ onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !email || !password) {
      setError("Por favor, completa todos los campos.");
      setSuccess("");
      return;
    }
    setError("");
    setSuccess(`¡Hola ${nombre}!`);
    if (onSubmit) onSubmit({ nombre, email, password });
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setError("");
    setSuccess("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <input
        name="nombre"
        placeholder="Nombre"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={email}
        onChange={handleChange(setEmail)}
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={password}
        onChange={handleChange(setPassword)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
      >
        Enviar
      </button>
      {error && (
        <div className="text-red-500 mt-2" role="alert">{error}</div>
      )}
      {success && (
        <div data-testid="success-message" className="text-green-600 mt-2">{success}</div>
      )}
    </form>
  );
};

export default Form;
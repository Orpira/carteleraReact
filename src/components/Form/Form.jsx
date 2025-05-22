import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      setSuccess("");
      return;
    }
    setError("");
    setSuccess(`¡Bienveni@!`);
    if (onSubmit) onSubmit({ email, password });

    // Redirigir al perfil
    navigate("/profile");
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
        <div className="text-red-500 mt-2" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div data-testid="success-message" className="text-green-600 mt-2">
          {success}
        </div>
      )}
    </form>
  );
};

export default Form;

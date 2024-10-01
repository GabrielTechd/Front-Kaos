"use client"; // Necessário para habilitar hooks

import { useState } from "react";
import api from "@/utils/api"; // Importando a API

const Contato = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState(null); // Estado para gerenciar mensagens de erro
  const [success, setSuccess] = useState(false); // Estado para gerenciar sucesso do envio

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/contato", formData); // Envia os dados sem autenticação

      if (response.status === 200) {
        setSuccess(true); // Indica que a mensagem foi enviada com sucesso
        setFormData({ name: "", email: "", phone: "", message: "" }); // Limpa o formulário
      }
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      setError("Falha ao enviar mensagem. Tente novamente mais tarde."); // Define mensagem de erro
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Contato</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Mensagem enviada com sucesso!</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-black">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-black">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 text-black">Telefone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2 text-black">Mensagem:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            maxLength={500}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
          />
          <p className="text-sm text-gray-500">{formData.message.length}/500</p>
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contato;

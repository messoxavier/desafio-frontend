// src/pages/Escolas/Escolas.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Escolas = () => {
  const [escolas, setEscolas] = useState([]);

  useEffect(() => {
    // Fetch the list of schools from the backend
    const fetchEscolas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/escolas');
        setEscolas(response.data);
      } catch (error) {
        console.error('Erro ao buscar escolas:', error);
      }
    };

    fetchEscolas();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Lista de Escolas</h1>
      <Link to="/cadastrar-escola">
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4">
          Cadastrar Escola
        </button>
      </Link>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="p-4 border-b">ID</th>
            <th className="p-4 border-b">Nome</th>
            <th className="p-4 border-b">Endereço</th>
          </tr>
        </thead>
        <tbody>
          {escolas.map((escola) => (
            <tr key={escola.id}>
              <td className="p-4 border-b">{escola.id}</td>
              <td className="p-4 border-b">{escola.nome}</td>
              <td className="p-4 border-b">{escola.endereco}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Escolas;

// src/pages/Professores/Professores.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Professores = () => {
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    // Fetch the list of teachers from the backend
    const fetchProfessores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/professores');
        setProfessores(response.data);
      } catch (error) {
        console.error('Erro ao buscar professores:', error);
      }
    };

    fetchProfessores();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Lista de Professores</h1>
      <Link to="/cadastrar-professor">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4">
          Cadastrar Professor
        </button>
      </Link>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="p-4 border-b">ID</th>
            <th className="p-4 border-b">Nome</th>
            <th className="p-4 border-b">CPF</th>
            <th className="p-4 border-b">Data de Nascimento</th>
            <th className="p-4 border-b">ID da Escola</th>
          </tr>
        </thead>
        <tbody>
          {professores.map((professor) => (
            <tr key={professor.id}>
              <td className="p-4 border-b">{professor.id}</td>
              <td className="p-4 border-b">{professor.nome}</td>
              <td className="p-4 border-b">{professor.cpf}</td>
              <td className="p-4 border-b">{professor.data_nascimento}</td>
              <td className="p-4 border-b">{professor.id_escola}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Professores;

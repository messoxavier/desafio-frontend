import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import { Link } from 'react-router-dom';

const Professores = () => {
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const response = await axiosInstance.get('/professores');
        setProfessores(response.data);
      } catch (error) {
        console.error('Erro ao buscar professores:', error);
      }
    };

    fetchProfessores();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Lista de Professores</h1>
      <Link to="/cadastrar-professor">
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4">
          Cadastrar Professor
        </button>
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 border-b text-left">ID</th>
              <th className="p-4 border-b text-left">Nome</th>
              <th className="p-4 border-b text-left">CPF</th>
              <th className="p-4 border-b text-left">Data de Nascimento</th>
              <th className="p-4 border-b text-left">Escola</th>
            </tr>
          </thead>
          <tbody>
            {professores.map((professor) => (
              <tr key={professor.id}>
                <td className="p-4 border-b">{professor.id}</td>
                <td className="p-4 border-b">{professor.nome}</td>
                <td className="p-4 border-b">{professor.cpf}</td>
                <td className="p-4 border-b">{formatDate(professor.data_nascimento)}</td>
                <td className="p-4 border-b">{professor.escola_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Professores;

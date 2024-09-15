// src/pages/Alunos/Alunos.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Alunos = () => {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    // Fetch the list of students from the backend
    const fetchAlunos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/alunos');
        setAlunos(response.data);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      }
    };

    fetchAlunos();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Lista de Alunos</h1>
      <Link to="/cadastrar-aluno">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4">
          Cadastrar Aluno
        </button>
      </Link>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="p-4 border-b">ID</th>
            <th className="p-4 border-b">Nome</th>
            <th className="p-4 border-b">CPF</th>
            <th className="p-4 border-b">Data de Nascimento</th>
            <th className="p-4 border-b">ID do Professor</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td className="p-4 border-b">{aluno.id}</td>
              <td className="p-4 border-b">{aluno.nome}</td>
              <td className="p-4 border-b">{aluno.cpf}</td>
              <td className="p-4 border-b">{aluno.data_nascimento}</td>
              <td className="p-4 border-b">{aluno.id_professor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alunos;

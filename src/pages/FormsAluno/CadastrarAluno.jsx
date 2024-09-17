import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const CadastrarAluno = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [idProfessor, setIdProfessor] = useState('');
  const [professores, setProfessores] = useState([]);
  const navigate = useNavigate();

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

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/alunos', {
        nome,
        cpf,
        data_nascimento: dataNascimento,
        professor_id: idProfessor,
      });
      navigate('/alunos');
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Cadastrar Aluno</h1>
      <form onSubmit={handleCadastro} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Nome do aluno"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="CPF do aluno"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Data de Nascimento</label>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">ID do Professor</label>
          <select
            value={idProfessor}
            onChange={(e) => setIdProfessor(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Selecione um professor</option>
            {professores.map((professor) => (
              <option key={professor.id} value={professor.id}>
                {professor.nome}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastrarAluno;

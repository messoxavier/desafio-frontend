import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const CadastrarProfessor = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [idEscola, setIdEscola] = useState('');
  const [escolas, setEscolas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEscolas = async () => {
      try {
        const response = await axiosInstance.get('/escolas');
        setEscolas(response.data);
      } catch (error) {
        console.error('Erro ao buscar escolas:', error);
      }
    };

    fetchEscolas();
  }, []);

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/professores', {
        nome,
        cpf,
        data_nascimento: dataNascimento,
        escola_id: idEscola,
      });
      navigate('/professores');
    } catch (error) {
      console.error('Erro ao cadastrar professor:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Cadastrar Professor</h1>
      <form onSubmit={handleCadastro} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Nome do professor"
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
            placeholder="CPF do professor"
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
          <label className="block text-gray-700">ID da Escola</label>
          <select
            value={idEscola}
            onChange={(e) => setIdEscola(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Selecione uma escola</option>
            {escolas.map((escola) => (
              <option key={escola.id} value={escola.id}>
                {escola.nome}
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

export default CadastrarProfessor;

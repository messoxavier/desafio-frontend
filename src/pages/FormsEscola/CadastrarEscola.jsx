import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';

const CadastrarEscola = () => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/escolas', {
        nome,
        endereco
       });
      navigate('/escolas');
    } catch (error) {
      console.error('Erro ao cadastrar escola:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Cadastrar Escola</h1>
      <form onSubmit={handleCadastro} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Nome da escola"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Endereço</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Endereço da escola"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastrarEscola;

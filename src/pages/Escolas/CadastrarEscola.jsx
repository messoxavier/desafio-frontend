import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';

const CadastrarEscola = () => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/escolas', { nome, endereco });
      setShowModal(true);
      setNome('');
      setEndereco('');
      
      setTimeout(() => {
        setShowModal(false);
        navigate('/escolas');
      }, 3000);
    } catch (error) {
      console.error('Erro ao cadastrar escola:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Cadastrar Escola</h1>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full transform transition-transform duration-300 ease-in-out scale-100">
            <div className="mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastro Realizado!</h2>
              <p className="text-gray-600">A escola foi cadastrada com sucesso.</p>
            </div>
            <button
              onClick={() => {
                setShowModal(false);
                navigate('/escolas');
              }}
              className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-300"
            >
              Ok
            </button>
          </div>
        </div>
      )}

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

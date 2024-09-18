import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Escolas = () => {
  const [escolas, setEscolas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [escolaToDelete, setEscolaToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Escolas - Desafio';

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

  const handleEdit = (id) => {
    navigate(`/editar-escola/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/escolas/${id}`);
      setEscolas(escolas.filter(escola => escola.id !== id));
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao deletar escola:', error);
    }
  };

  const openModal = (id) => {
    setEscolaToDelete(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setEscolaToDelete(null);
    setShowModal(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Lista de Escolas</h1>
      <Link to="/cadastrar-escola">
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4">
          Cadastrar Escola
        </button>
      </Link>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirmação de exclusão</h2>
            <p className="text-gray-600 mb-6">
              Tem certeza que gostaria de excluir? Essa ação não pode ser desfeita.
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => handleDelete(escolaToDelete)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 ease-in-out"
              >
                Excluir
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition duration-200 ease-in-out"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 border-b text-left">ID</th>
              <th className="p-4 border-b text-left">Nome</th>
              <th className="p-4 border-b text-left">Endereço</th>
              <th className="p-4 border-b text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {escolas.map((escola) => (
              <tr key={escola.id}>
                <td className="p-4 border-b">{escola.id}</td>
                <td className="p-4 border-b">{escola.nome}</td>
                <td className="p-4 border-b">{escola.endereco}</td>
                <td className="p-4 border-b">
                  <button
                    onClick={() => handleEdit(escola.id)}
                    className="text-blue-500 hover:text-blue-700 mx-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => openModal(escola.id)}
                    className="text-red-500 hover:text-red-700 mx-2"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Escolas;

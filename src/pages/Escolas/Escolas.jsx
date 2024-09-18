import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ModalDelete from '../../components/ModalDelete/ModalDelete';

const Escolas = () => {
  const [escolas, setEscolas] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleEdit = (id) => {
    navigate(`/editar-escola/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/escolas/${selectedId}`);
      setEscolas(escolas.filter(escola => escola.id !== selectedId));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao deletar escola:', error);
    }
  };

  const openModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Lista de Escolas</h1>
      <Link to="/cadastrar-escola">
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4">
          Cadastrar Escola
        </button>
      </Link>
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

      <ModalDelete
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Escolas;

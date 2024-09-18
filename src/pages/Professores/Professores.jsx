import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ModalDelete from '../../components/ModalDelete/ModalDelete';

const Professores = () => {
  const [professores, setProfessores] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Professores - Desafio';

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

  const handleEdit = (id) => {
    navigate(`/editar-professor/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/professores/${id}`);
      setProfessores(professores.filter(professor => professor.id !== selectedId));
      setIsMOdalOpen(false);
    } catch (error) {
      console.error('Erro ao deletar professor:', error);
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
              <th className="p-4 border-b text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {professores.map((professor) => (
              <tr key={professor.id}>
                <td className="p-4 border-b">{professor.id}</td>
                <td className="p-4 border-b">{professor.nome}</td>
                <td className="p-4 border-b">{professor.cpf}</td>
                <td className="p-4 border-b">{new Date(professor.data_nascimento).toLocaleDateString('pt-BR')}</td>
                <td className="p-4 border-b">{professor.escola_nome}</td>
                <td className="p-4 border-b">
                  <button 
                    onClick={() => handleEdit(professor.id)}
                    className="text-blue-500 hover:text-blue-700 mx-2">
                      <FaEdit />
                  </button>
                  <button 
                    onClick={() => openModal(professor.id) }
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

export default Professores;

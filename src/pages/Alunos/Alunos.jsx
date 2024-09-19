import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';
import ModalDelete from '../../components/ModalDelete/ModalDelete';

const Alunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Alunos - Desafio';

    const fetchAlunos = async () => {
      try {
        const response = await axiosInstance.get('/alunos');
        setAlunos(response.data);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      }
    };

    fetchAlunos();
  }, []);

  const handleEdit = (id) => {
    navigate(`/editar-aluno/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/alunos/${selectedId}`);
      setAlunos(alunos.filter(aluno => aluno.id !== selectedId));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
    }
  };

  const openModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      <h1 className="text-2xl font-bold mb-6">Lista de Alunos</h1>
      <Link to="/cadastrar-aluno">
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4">
          Cadastrar Aluno
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
              <th className="p-4 border-b text-left">Professor</th>
              <th className="p-4 border-b text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-600 bg-gray-200">
                  <div className="flex items-center justify-center space-x-2">
                    <FaInfoCircle className="text-blue-500 text-2xl" />
                    <span className="font-semibold text-lg">
                      Não há alunos cadastrados ainda...
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              alunos.map((aluno) => (
                <tr key={aluno.id}>
                  <td className="p-4 border-b">{aluno.id}</td>
                  <td className="p-4 border-b">{aluno.nome}</td>
                  <td className="p-4 border-b">{aluno.cpf}</td>
                  <td className="p-4 border-b">{formatDate(aluno.data_nascimento)}</td>
                  <td className="p-4 border-b">{aluno.professores_nome}</td>
                  <td className="p-4 border-b">
                    <button 
                      onClick={() => handleEdit(aluno.id)}
                      className="text-blue-500 hover:text-blue-700 mx-2">
                        <FaEdit />
                    </button>
                    <button 
                      onClick={() => openModal(aluno.id) }
                      className="text-red-500 hover:text-red-700 mx-2"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
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

export default Alunos;

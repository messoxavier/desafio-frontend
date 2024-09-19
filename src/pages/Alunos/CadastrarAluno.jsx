import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const CadastrarAluno = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [idProfessor, setIdProfessor] = useState('');
  const [professores, setProfessores] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
      setShowModal(true);
      setNome('');
      setCpf('');
      setDataNascimento('');
      setIdProfessor('');

      setTimeout(() => {
        setShowModal(false);
        navigate('/alunos');
      }, 3000);    
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Cadastrar Aluno</h1>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full transform transition-transform duration-300 ease-in-out scale-100">
            <div className="mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastro Realizado!</h2>
              <p className="text-gray-600">O aluno foi cadastrada com sucesso.</p>
            </div>
            <button
              onClick={() => {
                setShowModal(false);
                navigate('/alunos');
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

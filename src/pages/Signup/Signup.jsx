import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';

const Signup = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [data_nascimento, setDataNascimento] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      await axiosInstance.post('/auth/register', { nome, cpf, senha, data_nascimento });
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('CPF já cadastrado.');
      } else {
        setErrorMessage('Erro ao cadastrar. Tente novamente.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleCadastro}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Digite seu nome"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Digite seu CPF"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Digite sua senha"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Data de Nascimento</label>
            <input
              type="date"
              value={data_nascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Cadastrar
          </button>
        </form>
        <p className="mt-4 text-center">
          Já tem uma conta?{' '}
          <Link to="/" className="text-blue-500 hover:underline">
            Entre
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

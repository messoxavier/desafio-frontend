import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSchool, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Home - Desafio';
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bem-vindo a nossa plataforma</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Sair
        </button>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">O que você deseja?</h2>
        <div className="flex flex-col sm:flex-row sm:space-x-16 space-y-8 sm:space-y-0">
          <Link to="/escolas" className="flex flex-col items-center space-y-4 bg-blue-100 p-6 rounded-lg shadow-md">
            <div className="bg-blue-200 p-4 rounded-full">
              <FaSchool size={50} className="text-blue-500" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">Escolas</h2>
              <p className="text-gray-600">Veja a lista de escolas cadastradas.</p>
            </div>
          </Link>
          <Link to="/professores" className="flex flex-col items-center space-y-4 bg-green-100 p-6 rounded-lg shadow-md">
            <div className="bg-green-200 p-4 rounded-full">
              <FaChalkboardTeacher size={50} className="text-green-500" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">Professores</h2>
              <p className="text-gray-600">Veja a lista de professores cadastrados.</p>
            </div>
          </Link>
          <Link to="/alunos" className="flex flex-col items-center space-y-4 bg-red-100 p-6 rounded-lg shadow-md">
            <div className="bg-red-200 p-4 rounded-full">
              <FaUserGraduate size={50} className="text-red-500" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">Alunos</h2>
              <p className="text-gray-600">Veja a lista de alunos cadastrados.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;

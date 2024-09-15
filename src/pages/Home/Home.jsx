// src/pages/Home/Home.jsx
import React from 'react';
import { FaSchool, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bem-vindo a nossa plataforma</h1>
        <Link to="/login">
          <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Sair
          </button>
        </Link>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow p-8">
        <div className="flex flex-col items-center space-y-12">
          <Link to="/escolas" className="flex items-center space-x-6">
            <FaSchool size={50} className="text-blue-500" />
            <div>
              <h2 className="text-xl font-semibold">Escolas</h2>
              <p className="text-gray-600">Veja a lista de escolas cadastradas.</p>
            </div>
          </Link>
          <Link to="/professores" className="flex items-center space-x-6">
            <FaChalkboardTeacher size={50} className="text-green-500" />
            <div>
              <h2 className="text-xl font-semibold">Professores</h2>
              <p className="text-gray-600">Veja a lista de professores cadastrados.</p>
            </div>
          </Link>
          <Link to="/alunos" className="flex items-center space-x-6">
            <FaUserGraduate size={50} className="text-red-500" />
            <div>
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

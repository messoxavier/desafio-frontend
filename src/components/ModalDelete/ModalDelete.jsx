import React from 'react';

const ModalDelete = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirmação de exclusão</h2>
        <p className="text-gray-600 mb-6">
            Tem certeza que gostaria de excluir? Essa ação não pode ser desfeita.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 ease-in-out"
          >
            Excluir
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition duration-200 ease-in-out"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;

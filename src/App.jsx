import { Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Escolas from './pages/Escolas/Escolas';
import Professores from './pages/Professores/Professores';
import Alunos from './pages/Alunos/Alunos';
import CadastrarEscola from './pages/FormsEscola/CadastrarEscola';
import CadastrarProfessor from './pages/FormsProfessor/CadastrarProfessor';
import CadastrarAluno from './pages/FormsAluno/CadastrarAluno';
import EditarEscola from './pages/Escolas/EditarEscola';
import EditarProfessor from './pages/Professores/EditarProfessor';
import PrivateRoute from './Routes/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/cadastro" element={<Signup />} />
      
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/escolas" element={<Escolas />} />
        <Route path="/professores" element={<Professores />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/cadastrar-escola" element={<CadastrarEscola />} />
        <Route path="/cadastrar-professor" element={<CadastrarProfessor />} />
        <Route path="/cadastrar-aluno" element={<CadastrarAluno />} />
        <Route path="/editar-escola/:id" element={<EditarEscola/>} />
        <Route path="/editar-professor/:id" element={<EditarProfessor/>} />
      </Route>
    </Routes>
  );
}

export default App;

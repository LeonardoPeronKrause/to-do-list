import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState('');

  const carregarTarefas = async () => {
    const res = await axios.get('http://localhost:3001/tarefas');
    setTarefas(res.data);
  };

  const adicionar = async () => {
    if (!texto.trim()) return;
    await axios.post('http://localhost:3001/tarefas', { texto });
    setTexto('');
    carregarTarefas();
  };

  const deletar = async (id) => {
    await axios.delete(`http://localhost:3001/tarefas/${id}`);
    carregarTarefas();
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  return (
    <div className='container'>
      <h1>To-Do List</h1>
      <div className='form'>
        <input
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder='Digite uma tarefa'
        />
        <button onClick={adicionar}>Adicionar</button>
      </div>
      {tarefas.length === 0 ? (
        <p className='vazio'>Nenhuma tarefa adicionada.</p>
      ) : (
        <ul>
          {tarefas.map(t => (
            <li key={t.id}>
              <span>{t.texto}</span>
              <button onClick={() => deletar(t.id)}>X</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

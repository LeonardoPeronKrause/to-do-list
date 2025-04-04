const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tarefas = [];
let idAtual = 1;

// GET
app.get('/tarefas', (req, res) => res.json(tarefas));

// POST
app.post('/tarefas', (req, res) => {
    const { texto } = req.body; // Pega o texto enviado no corpo da requisição
    const nova = { id: idAtual++, texto }; // Cria a tarefa com id e texto
    tarefas.push(nova);
    res.status(201).json(nova); // Retorna a tarefa criada com status 201
});

// DELETE
app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    tarefas = tarefas.filter(t => t.id != id); // Remove a tarefa pelo ID
    res.status(204).send();
});

app.listen(3001, () => console.log('Servidor rodando na porta 3001'));

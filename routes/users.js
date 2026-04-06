const express = require('express');
const routes = express.Router();
const db = require('../db');

// create
routes.post('/create/usuario/', (req, res) => {
    const { nome, email, senha } = req.body;
    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';

    db.query(query, [nome, email, senha], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao criar usuário' });
        }
        res.status(201).json({ id: results.insertId, nome, email });
    });
});


// read em todos os usuários
routes.get('/usuarios/', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
        res.json(results);
    });
});


// read usuário por id específico
routes.get('/usuario/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM usuarios WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar usuário' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Usuário não encontrado' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    });
});


// update usuário
routes.put('/edit/usuario/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    const query = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';

    db.query(query, [nome, email, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar informações' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json({ message: 'Usuário atualizado com sucesso!' });
    });
});


// delete usuário
routes.delete('/delete/usuario/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM usuarios WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar usuário' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json({ message: 'Usuário deletado com sucesso!' });

    });
});

module.exports = routes;

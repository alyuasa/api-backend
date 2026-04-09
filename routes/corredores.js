const express = require('express');
const routes = express.Router();
const db = require('../db');

// create
routes.post('/create', (req, res) => {
    const [nome, turma] = req.body;
    const query = 'INSERT INTO corredores (nome, turma) VALUES (?, ?)';

    db.query(query, [nome, turma], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao adicionar corredor' });
        }
        res.status(201).json({ id: results.insertId, nome, turma });
    });
});


// read em todos os corredores
routes.get('/all', (req, res) => {
    db.query('SELECT * FROM corredores', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar corredores'});
        } else {
            if (results.length === 0) {
                res.status(200).json({ message: 'Não há corredores cadastrados ainda'});
            }
        }
        res.json(results);
    });
});


// read corredor (por id específico)
routes.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM corredores WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar corredor' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Corredor não encontrado' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    });
});


// update corredor
routes.put('/:id/edit', (req, res) => {
    const { id } = req.params;
    const { nome, turma } = req.body;

    const query = 'UPDATE corredores SET nome = ?, turma = ? WHERE id = ?';

    db.query(query, [nome, turma], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar informações' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Corredor não encontrado' });
        }

        res.json({ message: 'Corredor atualizado com sucesso!' });

    });
});


// delete corredor
routes.delete('/:id/delete', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM corredores WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar corredor' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Corredor não encontrado' });
        }

        res.json({ message: 'Corredor deletado com sucesso!' });

    });
});

module.exports = routes;
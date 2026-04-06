const express = require('express');
const routes = express.Router();
const db = require('../db');

// create volta
routes.post('/create/volta/', (req, res) => {
    const { tempo, data, corredores_id } = req.body;
    const query = 'INSERT INTO voltas (tempo, data, corredores_id) VALUES (?, ?, ?)';

    db.query(query, [tempo, data, corredores_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao adicionar volta'});
        }
        res.status(201).json({ id: results.insertId, tempo, data, corredores_id });
    });
});


// read em todas as voltas
routes.get('/voltas/', (req, res) => {
    db.query('SELECT * FROM voltas', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar voltas'});
        }
        res.json(results);
    });
});


// read volta específica ?


// update volta
routes.put('/edit/volta/:id', (req, res) => {
    const { id } = req.params;
    const [ tempo, data, corredores_id ] = req.body;

    const query = 'UPDATE voltas SET tempo = ?, data = ?, corredores_id = ? WHERE id = ?';

    db.query(query, [tempo, data, corredores_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar volta' });
        } 

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Volta não encontrada' });
        }

        res.json({ message: 'Volta atualizada com sucesso!'});

    });
});


// delete volta
routes.delete('/delete/volta/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM voltas WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar volta' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Volta não encontrada' });
        }

        res.json({ message: 'Volta deletada com sucesso!' });

    });
});

module.exports = routes;
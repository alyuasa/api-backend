const express = require('express');
const routes = express.Router();
const db = require('../db');

// create
routes.post('/create/corredor/', (req, res) => {
    const [nome, nacionalidade, equipe] = req.body;
    const query = 'INSERT INTO corredores (nome, nacionalidade, equipe) VALUES (?, ?, ?)';

    db.query(query, [nome, nacionalidade, equipe], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao adicionar corredor' });
        }
        res.status(201).json({ id: results.insertId, nome, nacionalidade, equipe });
    });
});


// read em todos os corredores
routes.get('/corredores/', (req, res) => {
    db.query('SELECT * FROM corredores', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar corredores'});
        }
        res.json(results);
    });
});


// read corredor (por id específico)
routes.get('/corredor/:id', (req, res) => {
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
routes.put('/edit/corredor/:id', (req, res) => {
    const { id } = req.params;
    const { nome, nacionalidade, equipe } = req.body;

    const query = 'UPDATE corredores SET nome = ?, nacionalidade = ?, equipe = ? WHERE id = ?';

    db.query(query, [nome, nacionalidade, equipe], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar informações' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Corredor não encontrado' });
        }

        res.json({ message: 'Informações do corredor atualizadas com sucesso!' });

    });
});


// delete corredor
routes.delete('/delete/corredor/:id', (req, res) => {
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
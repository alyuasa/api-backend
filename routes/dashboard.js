const express = require('express');
const routes = express.Router();
const db = require('../db');

// melhor volta
routes.get('/melhor-volta/:id', (req, res) => {
    const { id } = req.params
    const query = 'SELECT MIN(tempo) AS melhor_volta FROM voltas WHERE corredores_id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao calcular melhores voltas' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Não há voltas registradas ainda' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    });
});

// tempo total
routes.get('/tempo-total/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT SUM(tempo) AS tempo_total FROM voltas WHERE corredores_id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao calcular tempos totais' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Não há tempos registrados ainda' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    });
});

// qtd de voltas
routes.get('/voltas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT COUNT(*) AS total_voltas FROM voltas WHERE corredores_id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao mostrar qtd. de voltas' });
        }

        res.status(200).json(results[0]);

    });
});


// ranking
routes.get('/ranking', (req, res) => {
    const query = 'SELECT c.id,c.nome, c.turma, SUM(v.tempo) AS tempo_total,MIN(v.tempo) AS melhor_volta, COUNT(v.corredores_id) AS qtd_voltas FROM corredores c INNER JOIN voltas v ON c.id = v.corredores_id GROUP BY c.id ORDER BY tempo_total ASC';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao carregar o ranking' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Não há dados registrados ainda' });
            } else {
                res.status(200).json(results);
            }
        }
    });
});

// estatísticas corredor específico
routes.get('/estatisticas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT c.nome, c.turma, SUM(v.tempo) AS tempo_total, MIN(v.tempo) AS melhor_volta, COUNT(v.id) AS qtd_voltas FROM corredores c LEFT JOIN voltas v ON c.id = v.corredores_id WHERE c.id = ? GROUP BY c.id';

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao carregar estatísticas' });
        }

        if (results.length === 0 || results[0].nome === null) {
            return res.status(404).json({ error: 'Corredor não encontrado' });
        }

        const stats = results[0];

        if (stats.melhor_volta === null) {
            return res.status(200).json({ 
                nome: stats.nome,
                turma: stats.turma,
                tempo_total: 0,
                melhor_volta: 0,
                qtd_voltas: 0,
                message: 'Este corredor ainda não possui voltas registradas.' 
            });
        }

        res.status(200).json(stats);

    });
});

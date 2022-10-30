const express = require('express');
const router = express.Router();
const db = require('../../db/connect');
const inputCheck = require('../../utils/inputCheck');

router.get('/department', (req, res) => {
  const sql = `SELECT * from department`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

router.post('/deparment', ({ body }, res) => {
  const errors = inputCheck(body, 'name');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO department (name) VALUES (?)`;
  const params = [body.name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
      changes: result.affectedRows
    });
  });
});

module.exports = router;

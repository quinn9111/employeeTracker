const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require('./utils/inputCheck');
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'RiceUniversity2022!',
      database: 'employees'
    },
    console.log('Connected to the employees database.')
  );

// Get all department
/*     app.get('/api/department', (req, res) => {
        const sql = `SELECT * FROM department`;
  
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

  // Default response for any other request (Not Found)
  app.use((req, res) => {
    res.status(404).end();
  });
 */
// Delete a department
/* app.delete('/api/department/:id', (req, res) => {
    const sql = `DELETE FROM department WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Department not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });
 */
  
/* 
*/

app.post('/api/department', ({ body }, res) => {
    const errors = inputCheck(body, 'name');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
      }
    }); 
    
// Create an department
const sql = `INSERT INTO department (name) 
VALUES (?)`;
const params = [body.name];

db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });


  

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '2112',
  database: 'users',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(bodyParser.json());
app.use(cors());

//fetch all expenses
app.get('/get-expense', (req, res) => {
  const query = 'SELECT * FROM expenses';

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching expenses:', err);
      return res.status(500).json({ error: 'Error fetching expenses.' });
    }

    res.json(results);
  });
});

// add expense
app.post('/add-expense', (req, res) => {
  const { amount, description, cat } = req.body;

  if (!amount || !description || !cat) {
    return res.status(400).json({ error: 'amount, description, and cat are required fields!' });
  }

  const quer = 'INSERT INTO expenses (amount, description, cat) VALUES (?, ?, ?)';
  const values = [amount, description, cat];

  pool.query(quer, values, (err, result) => {
    if (err) {
      console.error('Error adding expenses:', err);
      return res.status(500).json({ error: 'Error adding expenses.' });
    }

    res.json({ message: 'expenses added successfully!' });
  });
  // console.log(values)
});

// update expense
app.put('/expenses/:id', (req, res) => {
  const id = req.params.id;
  const { amount, description, cat } = req.body;

  if (!amount || !description || !cat) {
    return res.status(400).json({ error: 'amount, description, and cat are required fields!' });
  }

  const query = 'UPDATE expenses SET amount = ?, description = ?, cat = ? WHERE id = ?';
  const values = [amount, description, cat, id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating expenses:', err);
      return res.status(500).json({ error: 'Error updating expenses.' });
    }

    res.json({ message: 'expenses updated successfully!' });
  });
});

// delete expense
app.delete('/expenses/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM expenses WHERE id = ?';

  pool.query(query, id, (err, result) => {
    if (err) {
      console.error('Error deleting expenses:', err);
      return res.status(500).json({ error: 'Error deleting expenses.' });
    }

    res.json({ message: 'expenses deleted successfully!' });
  });
});

app.listen(3000);

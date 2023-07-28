const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");


const sequelize = require("./database");

const expensesController = require("./controller/expense");

const app = express();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "2112",
  database: "users",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(bodyParser.json());
app.use(cors());

//fetch all expenses
app.get("/get-expense", expensesController.getFetchExpenses);

// add expense
app.post("/add-expense", expensesController.getAddExpenses);

// update expense
app.put("/expenses/:id", expensesController.getEditExpenses);

// delete expense
app.delete("/expenses/:id", expensesController.getDeleteExpenses);


sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });


// app.listen(3000);

const expenses = require("../model/expense");

exports.getFetchExpenses = (req, res) => {
  //   const query = "SELECT * FROM expenses";

  //   pool.query(query, (err, results) => {
  //     if (err) {
  //       console.error("Error fetching expenses:", err);
  //       return res.status(500).json({ error: "Error fetching expenses." });
  //     }

  //     res.json(results);
  //   });

  expenses
    .findAll()
    .then((result) => {
      res.json(result);
      //   console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddExpenses = (req, res) => {
  const { amount, description, cat } = req.body;

  if (!amount || !description || !cat) {
    return res
      .status(400)
      .json({ error: "amount, description, and cat are required fields!" });
  }

  expenses
    .create({
      amount: amount,
      description: description,
      cat: cat,
    })
    .then((createdExpense) => {
      res
        .status(201)
        .json({ message: "Expense added successfully!", data: createdExpense });
    })
    .catch((err) => {
      console.log(err);
    });

  //   const quer =
  //     "INSERT INTO expenses (amount, description, cat) VALUES (?, ?, ?)";
  //   const values = [amount, description, cat];

  //   pool.query(quer, values, (err, result) => {
  //     if (err) {
  //       console.error("Error adding expenses:", err);
  //       return res.status(500).json({ error: "Error adding expenses." });
  //     }

  //     res.json({ message: "expenses added successfully!" });
  //   });
};

exports.getEditExpenses = (req, res) => {
  const id = req.params.id;

  expenses
    .destroy({
      where: {
        id: id,
      },
    })
    .then((destroyedExpense) => {
      res.status(201).json({
        message: "Expense Delete successfully!",
        data: destroyedExpense,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  //   if (!amount || !description || !cat) {
  //     return res
  //       .status(400)
  //       .json({ error: "amount, description, and cat are required fields!" });
  //   }

  //   const query =
  //     "UPDATE expenses SET amount = ?, description = ?, cat = ? WHERE id = ?";
  //   const values = [amount, description, cat, id];

  //   pool.query(query, values, (err, result) => {
  //     if (err) {
  //       console.error("Error updating expenses:", err);
  //       return res.status(500).json({ error: "Error updating expenses." });
  //     }

  //     res.json({ message: "expenses updated successfully!" });
  //   });
};

exports.getDeleteExpenses = (req, res) => {
  const id = req.params.id;
  expenses
    .destroy({
      where: {
        id: id,
      },
    })
    .then((destroyedExpense) => {
      res.status(201).json({
        message: "Expense Delete successfully!",
        data: destroyedExpense,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  //   const query = "DELETE FROM expenses WHERE id = ?";

  //   pool.query(query, id, (err, result) => {
  //     if (err) {
  //       console.error("Error deleting expenses:", err);
  //       return res.status(500).json({ error: "Error deleting expenses." });
  //     }

  //     res.json({ message: "expenses deleted successfully!" });
  //   });
};

const express = require("express");
const app = express();
const port = 3000;

// Parse incoming JSON requests
app.use(express.json());

// In-memory storage for simplicity (replace with a database in a real application)
let expenses = [];

// Get all expenses
app.get("/expenses", (req, res) => {
  res.json(expenses);
});

// Add a new expense
app.post("/expenses", (req, res) => {
  const { description, amount } = req.body;
  console.log(description);
  if (amount > 1000000) {
    console.warn("Amount is too large");
  }
  if (description && !isNaN(amount)) {
    const newExpense = {
      description: description,
      amount: parseFloat(amount.toFixed(2)),
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  } else {
    console.log(
      `Invalid data: description's length: ${description.length} and amount is ${amount}`
    );
    res.status(400).json({ error: "Invalid data" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
module.exports = app;

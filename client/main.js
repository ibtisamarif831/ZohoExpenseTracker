const expenseList = document.getElementById("expenseList");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");

// Function to fetch and display expenses
async function fetchExpenses() {
  try {
    const response = await fetch("/server/expense_tracker_function/expenses");
    const data = await response.json();

    // Clear existing expenses
    expenseList.innerHTML = "";
    if (data.length === 0) {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
                <td colspan="2">No expenses yet</td>
            `;
      expenseList.appendChild(newRow);
    }

    // Display new expenses
    data.forEach((expense) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
                <td>${expense.description}</td>
                <td>${expense.amount.toFixed(2)}</td>
            `;
      expenseList.appendChild(newRow);
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
}

// Function to add a new expense
async function addExpense() {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (description && !isNaN(amount)) {
    try {
      const response = await fetch(
        "/server/expense_tracker_function/expenses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description, amount }),
        }
      );

      if (response.ok) {
        // Fetch and display updated expenses after adding a new one
        fetchExpenses();

        // Clear input fields
        descriptionInput.value = "";
        amountInput.value = "";
      } else {
        console.error("Failed to add expense:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  } else {
    alert("Please enter valid description and amount.");
  }
}

// Fetch and display initial expenses on page load
fetchExpenses();

var amount = 0;
var balance = document.getElementById("balance");

var incomeAmount = 0;
var income = document.getElementById("income");

var expenseAmount = 0;
var expense = document.getElementById("expense");

var amountInput = document.getElementById("amountInput");
var records = document.getElementById("records");

var transactions = [];
var STORAGE_KEY = "expense-tracker-transactions";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP"
});

loadTransactions();
refreshValues();
renderTransactions();

function refreshValues() {
  balance.innerHTML = formatter.format(amount);
  income.innerHTML = formatter.format(incomeAmount);
  expense.innerHTML = formatter.format(expenseAmount);
}

function loadTransactions() {
  var saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    transactions = JSON.parse(saved);

    amount = 0;
    incomeAmount = 0;
    expenseAmount = 0;

    transactions.forEach(function (transaction) {
      if (transaction.type === "income") {
        amount += transaction.amount;
        incomeAmount += transaction.amount;
      } else {
        amount -= transaction.amount;
        expenseAmount += transaction.amount;
      }
    });
  }
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function renderTransactions() {
  records.innerHTML = transactions
    .map(function (transaction) {
      var sign = transaction.type === "income" ? "+" : "-";
      return `<p class="${transaction.type}">${sign}${formatter.format(transaction.amount)} on ${transaction.date}</p>`;
    })
    .join("");
}

function addIncome() {
  var value = Number(amountInput.value);
  var current = new Date().toLocaleString();

  if (value > 0) {
    transactions.unshift({
      type: "income",
      amount: value,
      date: current
    });

    amount += value;
    incomeAmount += value;

    amountInput.value = "";
    saveTransactions();
    renderTransactions();
    refreshValues();
  }
}

function addExpense() {
  var value = Number(amountInput.value);
  var current = new Date().toLocaleString();

  if (value > 0) {
    transactions.unshift({
      type: "expense",
      amount: value,
      date: current
    });

    amount -= value;
    expenseAmount += value;

    amountInput.value = "";
    saveTransactions();
    renderTransactions();
    refreshValues();
  }
}

function clearValues() {
  amount = 0;
  incomeAmount = 0;
  expenseAmount = 0;
  transactions = [];

  localStorage.removeItem(STORAGE_KEY);

  amountInput.value = "";
  records.innerHTML = "";

  refreshValues();
}
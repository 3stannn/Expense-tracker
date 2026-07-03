var amount = 0;
var balance = document.getElementById("balance");

var incomeAmount = 0;
var income = document.getElementById("income");

var expenseAmount = 0;
var expense = document.getElementById("expense")

var amountInput = document.getElementById("amountInput").value;

var records = document.getElementById("records");
var transactions = [];

refreshValues();

function refreshValues() {
    balance.innerHTML = `P${amount}`;
    income.innerHTML = `P${incomeAmount}`;
    expense.innerHTML = `P${expenseAmount}`;
}

function addIncome() {
    var amountInput = Number(document.getElementById("amountInput").value);
    const current = new Date();

    amount += amountInput;
    incomeAmount += amountInput;

    document.getElementById("amountInput").value = "";

    transactions.push(`<p class="income">+${amountInput} on ${current}</p>`)
    records.innerHTML = transactions.join("");
    
    refreshValues();
}

function addExpense() {
    var amountInput = Number(document.getElementById("amountInput").value);
    const current = new Date();

    amount -= amountInput;
    expenseAmount += amountInput;
    
    document.getElementById("amountInput").value = "";

    transactions.push(`<p class="expense">-${amountInput} on ${current}</p>`)
    records.innerHTML = transactions.join("");

    refreshValues();
}
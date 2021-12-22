const expenseItemTemplate = document.querySelector('#expense-item');
const expensesTable = document.querySelector('.expense-table');

const budgetAmountElement = document.querySelector('input[name=income]');
const expenseNameElement = document.querySelector('input[name=expense-name]');
const expenseAmountElement = document.querySelector('input[name=expense-amount]');
const addExpenseButton = document.querySelector('.add-expense-button');

const summaryIncomeElement = document.querySelector('.summary-amount.income');
const summaryExpensesElement = document.querySelector('.summary-amount.expenses');
const summaryBalanceElement = document.querySelector('.summary-amount.balance');

const BALANCE_FEEDBACK_CLASSNAMES = ['positive', 'negative'];

let state = {
  income: 0,
  expenses: 0,
  balance: 0,
  expenses: 0,
};

function mutateState(key, value) {
  state = {
    ...state,
    [key]: value,
  };
}

function deleteExpense() {
  const expense = this.parentElement.previousElementSibling;
  const expenseName = expense.previousElementSibling;

  const { amount } = expense.dataset;

  expense.remove();
  expenseName.remove();
  this.parentElement.remove();

  mutateState('expenses', state.expenses - amount);
  mutateState('balance', state.balance - amount);

  updateSummary();
}

function registerDeleteExpenseEvent() {
  const deleteButtons = document.querySelectorAll('.delete-expense');
  deleteButtons.forEach((button) => {
    button.removeEventListener('click', deleteExpense);
    button.addEventListener('click', deleteExpense);
  });
}

function createExpenseItem({ name, amount }) {
  const [nameElement, expenseElement] = expenseItemTemplate.content.querySelectorAll('.name, .expense');

  nameElement.innerText = name;
  expenseElement.innerText = `$${amount}`;
  expenseElement.dataset.amount = amount;

  return document.importNode(expenseItemTemplate.content, true);
}

function insertElementToDom(element, target) {
  let _target = target;
  if (!target instanceof HTMLElement) {
    _target = document.querySelector(target);
  }
  element && _target.appendChild(element);
}

function updateIncome() {
  if (this.value) {
    summaryIncomeElement.innerText = `$${this.value}`;
    updateBalance(state);
  }
}

function updateBalance({ income, expenses }) {
  BALANCE_FEEDBACK_CLASSNAMES.forEach((className) => summaryBalanceElement.classList.remove(className));

  const [positiveClassName, negativeClassname] = BALANCE_FEEDBACK_CLASSNAMES;
  const balance = +income - +expenses;
  const balanceFeedbackClassname = balance > 0 ? positiveClassName : negativeClassname;

  summaryBalanceElement.classList.add(balanceFeedbackClassname);
  summaryBalanceElement.innerHTML = `$${balance}`;
}

function updateExpenses({ expenses }) {
  summaryExpensesElement.innerText = `$${expenses}`;
}

function updateSummary() {
  updateBalance(state);
  updateExpenses(state);
}

function addExpense() {
  const { value: name } = expenseNameElement;
  const { value: amount } = expenseAmountElement;

  if (name && amount && name.trim() !== '' && amount.trim() !== '') {
    mutateState('expenses', state.expenses + +amount);
    const expenseItem = createExpenseItem({ name, amount });
    insertElementToDom(expenseItem, expensesTable);
    registerDeleteExpenseEvent();
    updateSummary();

    expenseAmountElement.value = '';
    expenseNameElement.value = '';
  }
}

function updateState() {
  mutateState(this.name, this.value);
}

budgetAmountElement.addEventListener('blur', updateIncome);
addExpenseButton.addEventListener('click', addExpense);
document.querySelectorAll('.add-panel input').forEach((input) => input.addEventListener('input', updateState));

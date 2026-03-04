 let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

 isClearAllToggled();
 showArray();

 //CREATING CONFIRM BUTTON AND ADDING ELEMENTS INTO THE TRANSACTIONS ARRAY

 function addElements() {

    const typeElement = document.querySelector('.js-type-input');
    const nameElement = document.querySelector('.js-name-input');
    const amountElement = document.querySelector('.js-amount-input');
    const priceElement = document.querySelector('.js-price-input');
    const descElement = document.querySelector('.js-desc-input');

      if (!validateInputs()) {
      return;
   }
    
    let newTransaction = {
        type: typeElement.value,
        name: nameElement.value, 
        amount: amountElement.value,
        price: priceElement.value,
        description: descElement.value
    }

    transactions.push(newTransaction);
    isClearAllToggled();
    showBalance();

    document.querySelector('.js-create-button').classList.remove('non-visible');
    document.querySelector('.transactions-all').classList.remove('be-visible');
    document.querySelector('.js-fill-blanks').classList.add('non-visible');

    showArray();
    saveToStorage();
    typeElement.value = '';
    nameElement.value = '';
    amountElement.value = '';
    priceElement.value = '';
    descElement.value = '';
}


 const button = document.querySelector('.js-confirm-button');
 button.addEventListener('click', () => {
   addElements();
 });

 //CODE FOR SHOWING THE BALANCE

let balanceElement = document.querySelector('.balance-js');
let balance = 0;
balanceElement.innerHTML = `Balance: ${balance}$`;

function showBalance() {
   balance = 0;

for (let i = 0; i < transactions.length; i++) {

 if (transactions[i].type === 'income' || transactions[i].type === 'Income') {
    balance = balance + (transactions[i].amount * transactions[i].price);
 } else if (transactions[i].type === 'expense' || transactions[i].type === 'Expense') {
    balance = balance - (transactions[i].amount * transactions[i].price);
 }
} 
 balanceElement.innerHTML = `Balance: ${balance}$`;
}

showBalance();

//CREATING A CREATE TRANSACTION BUTTON AND MAKING ACTIONS INVISIBLE

const createButton = document.querySelector('.js-create-button');

function visible() {
   createButton.addEventListener('click', () =>{
      const actions = document.querySelector('.transactions-all');
      actions.classList.add('be-visible');
      document.querySelector('.js-create-button').classList.add('non-visible');
      document.querySelector('.js-fill-blanks').classList.remove('non-visible');
   });
}

visible();
//FUNCTION FOR DISPLAYING THE ARRAY ON THE PAGE

function showArray() {
   let renderArray = '';
   let incomeHTML = '';
   let expenseHTML = '';

   const rightStats = document.querySelector('.js-right-stats');

   if (transactions.length === 0) {
      rightStats.classList.add('non-visible');
   } else {
      rightStats.classList.remove('non-visible');
   }

   for (let i = 0; i < transactions.length; i++) {
      const arrayElement = transactions[i];
      const type = arrayElement.type;
      const name = arrayElement.name;
      const amount = arrayElement.amount;
      const price = arrayElement.price;
      const description = arrayElement.description;

      let sign = '';
      let signClass = '';

      if (type === 'income' || type === 'Income') {
         sign = '+';
         signClass = 'plus';
      } else if (type === 'expense' || type === 'Expense') {
         sign = '-';
         signClass = 'minus';
      }

      if (type.toLowerCase() === 'income') {
         incomeHTML += `<p>${name} - ${amount * price}$</p>`;
      } else if (type.toLowerCase() === 'expense') {
         expenseHTML += `<p>${name} - ${amount * price}$</p>`;
      }

      const html = `
      <div class="transaction-ready">
      <div class="left-section ${signClass}">
      ${sign}
      </div>

      <div class="right-section">
      <div class="top-right-section">
      <p>Name: ${name}</p>
      <p class="type-parag">Type: ${type}</p>
      <p>Price: ${price}$</p>
      <p>Amount: ${amount}</p>
      </div>

      <div class="bottom-right-section">
      <p class="description">Description: ${description}</p>
      <button class="delete-button" onclick="
      deleteTransaction(${i});
      ">Delete</button>
      </div>
      </div>
      </div>
      `;

      renderArray += html;
   }

   document.querySelector('.show-array').innerHTML = renderArray;
   document.querySelector('.js-income-list').innerHTML = incomeHTML;
   document.querySelector('.js-expense-list').innerHTML = expenseHTML;
   saveToStorage();
}

function deleteTransaction(index) {
   deleteIndex = index;
   document.querySelector('.confirm-window').classList.remove('non-visible');

   document.querySelector('.js-yes-button')
   .addEventListener('click', () => {
      if (deleteIndex !== null) {
         transactions.splice(deleteIndex, 1);
         
      }

   showArray();
   showBalance();
   saveToStorage();
   isClearAllToggled();

   deleteIndex = null;

   document.querySelector('.confirm-window').classList.add('non-visible');
   });

   document.querySelector('.js-no-button')
   .addEventListener('click', () => {
      document.querySelector('.confirm-window').classList.add('non-visible');
   });

   document.querySelector('.js-close-window-button')
   .addEventListener('click', () => {
      document.querySelector('.confirm-window').classList.add('non-visible');
   });
}

// CODE FOR SAVING THE DATA IN THE LOCALSTORAGE

function saveToStorage() {
   localStorage.setItem('transactions', JSON.stringify(transactions));
}

// CODE FOR DELETING ALL OF THE TRANSACTIONS AT ONCE
function clearAll() {
   const button = document.querySelector('.js-clear-all-button');
   button.addEventListener('click', () => {
      document.querySelector('.confirm-window').classList.remove('non-visible');
      document.querySelector('.js-yes-button')
      .addEventListener('click', () => {
         transactions = [];
         isClearAllToggled();
         saveToStorage();
         showArray(); 
         showBalance();  
         document.querySelector('.confirm-window').classList.add('non-visible');
      });
      document.querySelector('.js-no-button')
   .addEventListener('click', () => {
      document.querySelector('.confirm-window').classList.add('non-visible');
   });

   document.querySelector('.js-close-window-button')
   .addEventListener('click', () => {
      document.querySelector('.confirm-window').classList.add('non-visible');
   });
   });
}

clearAll();

function isClearAllToggled() {
   const button = document.querySelector('.js-clear-all-button');

   if (transactions.length > 0) {
      button.classList.remove('non-visible');
   } else {
      button.classList.add('non-visible');
   }
}

//SHOWING SOME ERRORS

function validateInputs() {
   const typeInput = document.querySelector('.js-type-input');
   const priceInput = document.querySelector('.js-price-input');

   const type = typeInput.value.toLowerCase();
   const price = Number(priceInput.value);

   if (type !== 'income' && type !== 'expense') {
      alert('Error:Transaction Type Should be "Income" or "Expense"');
      return false;
   }
   
   if (priceInput.value <= 0) {
      alert('Error:Transactions Price must be greater than 0');
      return false;
   }

   return true;
}

//CODE FOR CREATING THE TRANSACTION NOT ONLY WITH BUTTON BUT WITH THE ENTER

const inputElements = document.querySelectorAll('.box');
inputElements.forEach((input) => {
   input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
         addElements();
      }
   });
});
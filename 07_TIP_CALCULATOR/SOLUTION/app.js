const billAmountInput = document.querySelector('#bill-amount');
const numberOfPeopleInput = document.querySelector('#number-of-people');
const calculateButton = document.querySelector('#calculate');
const tipAmountElement = document.querySelector('#tip-amount');
const totalPerPersonElement = document.querySelector('#total-per-person');

function formatPrice(number) {
  return number.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function calculateTip() {
  const tipPercentageElement = document.querySelector('input[name=tip]:checked');
  const tipPercentage = +tipPercentageElement.value;
  const numberOfPeople = +numberOfPeopleInput.value;
  const billAmount = +billAmountInput.value;

  const tipAmount = (billAmount * tipPercentage) / 100;
  const totalPerPerson = (billAmount + tipAmount) / numberOfPeople;

  tipAmountElement.textContent = formatPrice(tipAmount);
  totalPerPersonElement.textContent = formatPrice(totalPerPerson);
}

calculateButton.addEventListener('click', calculateTip);

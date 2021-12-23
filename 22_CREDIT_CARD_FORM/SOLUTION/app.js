const cardNumberInput = document.querySelector('input[name=card-number]');
const cardHolderInput = document.querySelector('input[name=card-holder]');
const cvvInput = document.querySelector('input[name=cvv]');
const expirationDateMonthSelect = document.querySelector('select[name=expiration-date-month]');
const expirationDateYearSelect = document.querySelector('select[name=expiration-date-year]');

const cardNumberElement = document.querySelector('.card-number');
const cardHolderElement = document.querySelector('.card-holder');
const expirationDateElement = document.querySelector('.expiration-date');
const creditCardWrapper = document.querySelector('.credit-card__wrapper');
const creditCardBackWrapper = document.querySelector('.credit-card--back');

const CREDIT_CARD_NUMBER_GROUP = 4;
const CREDIT_CARD_SEPARATOR = ' ';

const CREDIT_CARD_TYPE = {
  3: 'american',
  4: 'visa',
  5: 'mastercard',
  6: 'discover',
};

function getCreditCardType(creditCardNumber) {
  const [first] = [...creditCardNumber];
  return CREDIT_CARD_TYPE[first] ?? CREDIT_CARD_TYPE[4]; // by default type is going to be visa
}

function changeCreditCardType(type) {
  Object.values(CREDIT_CARD_TYPE).forEach((type) => creditCardWrapper.classList.remove(type));
  creditCardWrapper.classList.add(type);
}

function parseCreditCardNumber(creditCard) {
  if (creditCard.length < CREDIT_CARD_NUMBER_GROUP) return creditCard;

  return creditCard.match(/.{4}/g).join(CREDIT_CARD_SEPARATOR);
}

function parseMonth(month) {
  if (month.length === 2) return month;
  return `0${month}`;
}

function updateCreditCardNumber(creditCardNumber) {
  const [cardNumberShadow, cardNumberEmboss] = cardNumberElement.querySelectorAll(
    '.card-number__shadow, .card-number__emboss'
  );
  const creditCardParsed = parseCreditCardNumber(creditCardNumber);
  cardNumberShadow.innerText = creditCardParsed;
  cardNumberEmboss.innerText = creditCardParsed;
}

function updateCreditCardType(creditCardNumber) {
  const creditCardType = getCreditCardType(creditCardNumber);
  changeCreditCardType(creditCardType);
}

function updateCardHolder(cardHolder) {
  const [cardHolderShadow, cardHolderEmboss] = cardHolderElement.querySelectorAll(
    '.card-holder__shadow, .card-holder__emboss'
  );
  cardHolderShadow.innerText = cardHolder;
  cardHolderEmboss.innerText = cardHolder;
}

function updateExpiryMonth(month) {
  const [monthShadow, monthEmboss] = expirationDateElement.querySelectorAll(
    '.expiration-date__shadow .month, .expiration-date__emboss .month'
  );
  const parsedMonth = parseMonth(month);
  monthShadow.innerText = parsedMonth;
  monthEmboss.innerText = parsedMonth;
}

function updateExpiryYear(year) {
  const [yearShadow, yearEmboss] = expirationDateElement.querySelectorAll(
    '.expiration-date__shadow .year, .expiration-date__emboss .year'
  );
  yearShadow.innerText = year;
  yearEmboss.innerText = year;
}

function updateSignature(cardHolder) {
  const signatureElement = creditCardBackWrapper.querySelector('.signature');
  signatureElement.innerText = cardHolder;
}

function updateCvv(cvv) {
  const cvvElement = creditCardBackWrapper.querySelector('.cvv');
  cvvElement.innerText = cvv;
}

function handleCardNumber() {
  updateCreditCardNumber(this.value);
  updateCreditCardType(this.value);
}

function handleCardHolder() {
  updateCardHolder(this.value);
  updateSignature(this.value);
}

function handleExpirationDateMonth() {
  updateExpiryMonth(this.value);
}

function handleExpirationDateYear() {
  updateExpiryYear(this.value);
}

function handleCvv() {
  if (this.value.length > 3) {
    this.value = this.value.slice(0, 3);
  }
  updateCvv(this.value);
}

function flipCard() {
  creditCardWrapper.classList.toggle('flip');
}

cardNumberInput.addEventListener('input', handleCardNumber);
cardHolderInput.addEventListener('input', handleCardHolder);
cvvInput.addEventListener('input', handleCvv);
cvvInput.addEventListener('focus', flipCard);
cvvInput.addEventListener('blur', flipCard);
expirationDateMonthSelect.addEventListener('change', handleExpirationDateMonth);
expirationDateYearSelect.addEventListener('change', handleExpirationDateYear);

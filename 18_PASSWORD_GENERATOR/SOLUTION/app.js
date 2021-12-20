const passwordInput = document.querySelector('input[name=password]');
const passwordLengthRange = document.querySelector('input[name=length]');
const passwordRestrictionsCheckboxes = document.querySelectorAll('input[type=checkbox]');
const copyButton = document.querySelector('button.copy');

let restrictions = {
  symbols: true,
  numbers: true,
  lowercase: true,
  uppercase: true,
  similar: true,
};

const numbers = '0123456789';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const symbols = '!@#$%^&*()';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generatePassword(maxLength) {
  const allowedCharacters = getAllowedCharacters();
  let password = '';
  for (let index = 0; index < maxLength; index++) {
    password += allowedCharacters.charAt(Math.floor(Math.random() * allowedCharacters.length));
  }
  return password;
}

function updatePasswordInput(password) {
  passwordInput.value = password;
}

function updatePasswordGenerated(length) {
  const password = generatePassword(length);
  updatePasswordInput(password);
}

function getAllowedCharacters() {
  let characters = '';
  restrictions.symbols && (characters += symbols);
  restrictions.numbers && (characters += numbers);
  restrictions.uppercase && (characters += uppercase);
  restrictions.lowercase && (characters += lowercase);
  return characters;
}

function handleCopy() {
  this.classList.add('copied');
  copyToClipboard(passwordInput.value);
  setTimeout(() => this.classList.remove('copied'), 5000);
}

function copyToClipboard(text) {
  window.navigator.clipboard.writeText(text);
}

function changePasswordLength() {
  this.nextElementSibling.innerText = this.value;
  updatePasswordGenerated(this.value);
}

function handleRestriction() {
  restrictions = {
    ...restrictions,
    [this.name]: this.checked,
  };
  updatePasswordGenerated(passwordLengthRange.value);
}

function initRestrictions() {
  passwordRestrictionsCheckboxes.forEach((restriction) => (restriction.checked = restrictions[restriction.name]));
}

function init() {
  initRestrictions();
  updatePasswordGenerated(passwordLengthRange.value);
}

passwordRestrictionsCheckboxes.forEach((restriction) => restriction.addEventListener('change', handleRestriction));
passwordLengthRange.addEventListener('input', changePasswordLength);
copyButton.addEventListener('click', handleCopy);
document.addEventListener('DOMContentLoaded', init);

const form = document.querySelector('form');
const codeInputs = document.querySelectorAll('.fields input');

function simulateFormSend(form) {
  const submitButton = form.querySelector('button');
  submitButton.click();
}

function handleInput() {
  // if there is a next input and this input has a value
  if (this.nextElementSibling && this.value) {
    this.nextElementSibling.focus();
    this.nextElementSibling.select();
  }
}

function handlePaste(e) {
  const { clipboardData } = e;
  const pastedCode = clipboardData.getData('text');

  codeInputs.forEach((input, index) => {
    input.value = pastedCode[index];
    input.focus();
  });

  setTimeout(() => pastedCode.length === codeInputs.length && simulateFormSend(form), 1000);
}

function handleForm(e) {
  e.preventDefault();
  alert('Code submitted');
  this.reset();
  codeInputs[0].focus();
}

form.addEventListener('submit', handleForm);
codeInputs[0].addEventListener('paste', handlePaste);
codeInputs.forEach((input) => {
  input.addEventListener('input', handleInput);
});

// Codes:
// 1234
// 3425

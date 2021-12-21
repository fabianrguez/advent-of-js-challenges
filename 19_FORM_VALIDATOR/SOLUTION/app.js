const showHideButtons = document.querySelectorAll('.show-hide');
const form = document.querySelector('form');

const validator = {
  text: (element) => {
    let isValid = false;
    const { value } = element;
    if (value.length === 0) {
      addError(element);
    } else {
      isValid = true;
      addSuccess(element);
    }
    return isValid;
  },
  email: (element) => {
    let isValid = false;
    const { value } = element;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      addSuccess(element);
      isValid = true;
    } else {
      addError(element, `Email is not valid`);
    }
    return isValid;
  },
  password: (element) => {
    let isValid = true;
    const { name, value } = element;
    if (name === 'confirm-password') {
      const $password = document.querySelector('input[name=password]');
      if ($password.value !== value) {
        addError(element, "passwords don't match");
        isValid = false;
      } else {
        isValid = true;
      }
    } else {
      const $confimPassword = document.querySelector('input[name=confirm-password]');
      if ($confimPassword.value && $confimPassword.value === value) {
        addSuccess($confimPassword);
        isValid = true;
      } else {
        isValid = false;
      }
    }
    return isValid;
  },
};

function addSuccess(element) {
  const { parentElement } = element;
  const errorElement = parentElement.querySelector('.error');
  const successElement = parentElement.querySelector('.success');

  errorElement.innerHTML = '';
  successElement.innerHTML = `<img src="./images/success.svg" alt="Success"/>`;
}

function addError(element, customMessage = `${element.name} is required`) {
  const { parentElement } = element;
  const errorElement = parentElement.querySelector('.error');
  const successElement = parentElement.querySelector('.success');

  errorElement.innerHTML = `<img src="./images/error.svg" alt="Error"/> ${customMessage}`;
  successElement.innerHTML = ``;
}

function togglePassword(e) {
  e.preventDefault();

  const fieldTypeClassAction = {
    password: 'add',
    text: 'remove',
  };

  const fieldTypeInputType = {
    password: 'text',
    text: 'password',
  };

  const fieldElement = this.closest('.field');
  const passwordInput = fieldElement.querySelector('input');
  const { type: actualType } = passwordInput;

  fieldElement.classList[fieldTypeClassAction[actualType]]('show');
  passwordInput.type = fieldTypeInputType[actualType];
}

function validateInput(e) {
  let isValid = false;
  let element;
  e.type === 'blur' ? (element = this) : (element = e);

  isValid = validator.text(element);
  if (element.type !== 'text') {
    isValid = validator[element.type](element);
  }
  return isValid;
}

function submitForm(e) {
  e.preventDefault();
  const areInputsValid = [...this.elements]
    .filter((element) => element.nodeName === 'INPUT')
    .map(validateInput)
    .every((input) => input);
  console.log({ areInputsValid });
}

showHideButtons.forEach((button) => button.addEventListener('click', togglePassword));
form.addEventListener('submit', submitForm);
[...form.elements]
  .filter((element) => element.nodeName === 'INPUT')
  .forEach((element) => element.addEventListener('blur', validateInput));

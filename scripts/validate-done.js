const getErrorMessage = (inputEl) => {
  return inputEl.validationMessage;
};

const hideError = (formEl, inputEl) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorEl.classList.remove('form__input-error_active');
  inputEl.classList.remove('form__input_type_error');
  errorEl.textContent = '';
};

const showError = (formEl, inputEl, errorMessage) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorEl.textContent = errorMessage;
  errorEl.classList.add('form__input-error_active');
  inputEl.classList.add('form__input_type_error');
};

const checkInputValidity = (formEl, inputEl) => {
  if (inputEl.validity.valid) {
    hideError(formEl, inputEl);
  } else {
    showError(formEl, inputEl, getErrorMessage(inputEl));
  }
};

const checkPasswordsMatch = (formEl) => {
  const passwordEl = formEl.querySelector('#new-password');
  const confirmPasswordEl = formEl.querySelector('#new-password-confirm');

  if (!passwordEl || !confirmPasswordEl) return;

  if (passwordEl.value !== confirmPasswordEl.value) {
    confirmPasswordEl.setCustomValidity('Пароли не совпадают!');
    showError(formEl, confirmPasswordEl, 'Пароли не совпадают!');
  } else {
    confirmPasswordEl.setCustomValidity('');
    hideError(formEl, confirmPasswordEl);
  }
}

const hazInvalidInput = (inputList) => {
  return inputList.some((inputEl) => !inputEl.validity.valid);
}

const toggleButtonState = (buttonEl, inputList) => {
  if (hazInvalidInput(inputList)) {
    buttonEl.disabled = true;
  } else {
    buttonEl.disabled = false;
  }
};

const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll('.form__input'));
  const buttonEl = formEl.querySelector('.form__submit-button');

  inputList.forEach((inputEl) => {
    inputEl.addEventListener('input', () => {
      checkInputValidity(formEl, inputEl);
      checkPasswordsMatch(formEl);
      toggleButtonState(buttonEl, inputList);
    });
  });

  toggleButtonState(buttonEl, inputList);
};

const enableValidation = () => {
  const formList = document.querySelectorAll('.form');

  formList.forEach((formEl) => {
    formEl.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formEl);
  });
};

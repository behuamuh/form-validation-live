const hideInputError = (formElement, inputElement, config) => {
  // hide error
  // find error elemet
  const { inputErrorClass, errorActiveClass } = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorActiveClass);
  errorElement.textContent = '';
}

const showInputError = (formElement, inputElement, config) => {
  // show error
  const { inputErrorClass, errorActiveClass } = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorActiveClass);
}

const checkInputValidity = (formElement, inputElement, config) => {
  // check input is valid
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
  // if valid, hide error else show error
}

const hazInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

const toggleButtonState = (buttonElement, inputList) => {
  // if form valid enable button else disable
  if (hazInvalidInput(inputList)) {
    // disable
    buttonElement.disabled = true;
  } else {
    // enable
    buttonElement.disabled = false;
  }
}

// const checkPasswordConfirm = (formElement) => {
//   // find fields
//   const passwordElement = formElement.querySelector('#new-password');
//   const passwordConfirmElement = formElement.querySelector('#new-password-confirm');

//   if (!passwordElement || !passwordConfirmElement) return;

//   if (passwordElement.value === passwordConfirmElement.value) {
//     // hide confirm error
//     passwordConfirmElement.setCustomValidity('');
//   } else {
//     // show confirm error
//     passwordConfirmElement.setCustomValidity('Пароли не совпадают!');
//   }
// }

const setEventListeners = (formElement, config) => {
  // prevent page reload on form submit
  const { inputSelector, submitButtonSelector, ...restConfig } = config;

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  
  // find all inputs
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  // find submit button
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      // check input is valid
      // checkPasswordConfirm(formElement);
      checkInputValidity(formElement, inputElement, restConfig);
      toggleButtonState(buttonElement, inputList);
    });
  })
  // add listeners for each input

  // set initial button state
  toggleButtonState(buttonElement, inputList);
}

const enableValidation = ({ formSelector, ...restConfig }) => {
  // const { formSelector, ...restConfig } = config;
  // find all forms
  const formList = Array.from(document.querySelectorAll(formSelector));

  // set event lesteners each form
  formList.forEach((formElement) => {
    setEventListeners(formElement, restConfig);
  })
};

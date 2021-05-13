const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inputErrorClass: 'form__input_type_error',
  errorActiveClass: 'form__input-error_active',
};

enableValidation(config);

config.inputErrorClass = 'bad-class';

// enableValidation({
//   formSelector: '.form',
//   inputSelector: '.form__input',
//   submitButtonSelector: '.form__submit-button',
//   inputErrorClass: 'form__input_type_error',
//   errorActiveClass: 'form__input-error_active',
// });

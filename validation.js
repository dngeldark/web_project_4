function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalid(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function hasInvalid(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function isValid(inputElement, button, config) {
  if (inputElement.validity.valid) {
    hideInputError(inputElement, config);
    button.classList.remove(config.inactiveButtonClass);
  } else {
    showInputError(inputElement, config);
    button.classList.add(config.inactiveButtonClass);
  }
}

function showInputError(inputElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  inputElement.nextElementSibling.textContent = inputElement.validationMessage;
}

function hideInputError(inputElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  inputElement.nextElementSibling.textContent = '';
}

function setEventListeners(formElement, config) {
  const inputElements = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const formButton = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputElements, formButton, config);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(inputElement, formButton, config);
      toggleButtonState(inputElements, formButton, config);
    });
  });
}

function enableValidation(config) {
  const formElements = Array.from(
    document.querySelectorAll(config.formSelector)
  );
  formElements.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(config);

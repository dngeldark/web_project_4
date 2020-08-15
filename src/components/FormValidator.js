export default class FormValidator {
  constructor(form, settings) {
    const {
      formSelector,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    } = settings;

    this._form = document.querySelector(form);
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
  }

  _hasInvalid(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList) {
    const submitBtn = this._form.querySelector(this._submitButtonSelector);
    if (this._hasInvalid(inputList)) {
      submitBtn.classList.add(this._inactiveButtonClass);
      submitBtn.disabled = true;
    } else {
      submitBtn.classList.remove(this._inactiveButtonClass);
      submitBtn.disabled = false;
    }
  }

  _showInputError(inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    inputElement.nextElementSibling.textContent =
      inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    inputElement.nextElementSibling.textContent = '';
  }

  _isValid(inputElement) {
    inputElement.validity.valid
      ? this._hideInputError(inputElement)
      : this._showInputError(inputElement);
  }

  _setEventListeners() {
    const inputElements = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );

    this._toggleButtonState(inputElements);

    inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputElements);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

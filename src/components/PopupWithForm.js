import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.form');
  }

  open(data) {
    super.open();
    if (data) {
      Object.entries(data).forEach((item) => {
        this._form[item[0]].value = item[1];
      });
    }
  }

  close() {
    super.close();
    this._form.reset();
    const submitButton = this._form.querySelector('.form__button');
    submitButton.disabled = true;
    submitButton.classList.add('popup__button_disabled');
  }

  _getInputValues() {
    const inputElements = Array.from(
      this._form.querySelectorAll('.form__input')
    );
    const data = {};
    inputElements.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      event.preventDefault();
      this._getInputValues();
      this._submitHandler(this._getInputValues());
      super.close();
    });
  }
}

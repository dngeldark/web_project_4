import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.form');
  }

  _getInputValues() {
    const inputElements = Array.from(
      this._form.querySelectorAll('.form__input')
    );
    this._data = {};
    inputElements.forEach((input) => {
      this._data[input.name] = input.value;
    });
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      event.preventDefault();
      this._getInputValues();
      this._submitHandler(this._data);
      this._form.reset();
    });
  }
}

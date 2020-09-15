import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('form');
    this._submitButton = this._form.querySelector('.form__button');
  }


setEventListeners() {
  super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      const temp = this._submitButton.textContent;
      this._submitButton.textContent = "Saving...";
      evt.preventDefault();
      this._submitHandler()
      .then(()=> {
        super.close();
        // resets the text in the submit button after the popup has faded
        setTimeout(() => {
          this._submitButton.textContent = temp;          
        },300);
      });
    });
  }
}
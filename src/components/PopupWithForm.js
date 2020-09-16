import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('form');
    this._submitButton = this._form.querySelector('.form__button');
    this._failSubmit = this._failSubmit.bind(this);
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
    this._submitButton.disabled = true;
    this._submitButton.classList.add('popup__button_disabled');
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

  _failSubmit(){
    this._submitButton.textContent = "try again"
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      const temp = this._submitButton.textContent;
      this._submitButton.textContent = "Saving...";
      evt.preventDefault();
      this._submitHandler(this._getInputValues(),this._failSubmit)
      .then(()=> {
        // resets the text in the submit button after the popup has faded
        setTimeout(() => {
          this._submitButton.textContent = temp;          
        },1000);
      });
    });
  }
}

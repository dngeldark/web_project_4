export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector.slice(1);
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add(`${this._selector}_active`);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(`${this._selector}_active`);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.keyCode === 27) this.close();
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(this._selector)) this.close();
    });

    this._popup
      .querySelector(`.${this._selector}__close-btn`)
      .addEventListener('click', () => {
        this.close();
      });
  }
}

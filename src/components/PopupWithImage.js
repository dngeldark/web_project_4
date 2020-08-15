import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(link, name) {
    super.open();
    this._popup.querySelector('.picture-modal__title').textContent = name;
    this._popup.querySelector('.picture-modal__image').src = link;
  }
}

export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  generateCard() {
    this._card = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    this.setEventListeners();
    this._cardPicture = this._card.querySelector('.card__picture');
    this._cardPicture.src = this._link;
    this._cardPicture.alt = this._name;
    this._card.querySelector('.card__title').textContent = this._name;
    return this._card;
  }

  _handleLikeBtn() {
    this._card
      .querySelector('.card__like-btn')
      .classList.toggle('card__like-btn_active');
  }

  _handleDeleteBtn() {
    this._card.remove();
  }

  setEventListeners() {
    //like button
    this._card
      .querySelector('.card__like-btn')
      .addEventListener('click', () => {
        this._handleLikeBtn();
      });

    //delete button
    this._card
      .querySelector('.card__delete-btn')
      .addEventListener('click', () => {
        this._handleDeleteBtn();
      });

    //card click
    this._card.querySelector('.card__picture').addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
      event.stopPropagation();
    });
  }
}

export default class Card {
  constructor({ name, link }) {
    this._name = name;
    this._link = link;
  }

  _generateCard() {
    this._card = document.createElement('figure');
    this._card.append(
      document.querySelector('#card-template').content.cloneNode(true)
    );
    this._card.classList.add('card');
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

  _handleCardClick() {
    const modalPicture = document.querySelector('.picture-modal__image');
    modalPicture.src = this._link;
    modalPicture.alt = this._name;
    document.querySelector('.picture-modal__title').textContent = this._name;
    document
      .querySelector('.picture-modal')
      .classList.add('picture-modal_active');
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
      this._handleCardClick();
    });
  }
}

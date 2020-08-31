export default class Card {
  constructor({ name, link, _id, likes, owner }, cardSelector, handleCardClick,handleDeleteCard) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likesCount = likes.length;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._ownerId = owner._id;
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
    this._card.querySelector('.card__likes-count').textContent = this._likesCount;

    if(this._ownerId !== "c4811e6229ac5c0ef78eb4ac"){
      this._card.querySelector('.card__delete-btn').style.display = "none";
    }

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
        this._handleDeleteCard(this._id);
      });

    //card click
    this._card.querySelector('.card__picture').addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
      event.stopPropagation();
    });
  }
}

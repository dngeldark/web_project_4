export default class Card {
  constructor({ name, link, _id, likes, owner }, cardSelector, handleCardClick,handleDeleteCard,handleLikeClick) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes;
    this._ownerId = owner._id;
    this._likesCount = likes.length;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
    this._liked = false;
    this._userId = "c4811e6229ac5c0ef78eb4ac";
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
    this._card.id = this._id;
    this._card.querySelector('.card__title').textContent = this._name.substring(0,17);
    this._card.querySelector('.card__likes-count').textContent = this._likesCount;

    if(this._ownerId !== this._userId){
      this._card.querySelector('.card__delete-btn').style.display = "none";
    }

    this._likes.forEach(element => {
      if(element._id === this._userId){
         this._liked = true;
      }
    });

    if(this._liked){
      this._toggleLikeBtn();
    }


    return this._card;
  }

  _toggleLikeBtn(){
    this._card
    .querySelector('.card__like-btn')
    .classList.toggle('card__like-btn_active');
  }

  _handleLikeBtn() {
    this._toggleLikeBtn();
    this._handleLikeClick(this._liked,this._id)
    //then(data => data.json()).
    .then(data => {
      this._likesCount = data.likes.length;
      this._card.querySelector('.card__likes-count').textContent = this._likesCount;
    });
    this._liked = !this._liked;
  }

  _handleDeleteBtn() {
    //this._card.remove();
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
        this._handleDeleteCard(this._card);
      });

    //card click
    this._card.querySelector('.card__picture').addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
      event.stopPropagation();
    });
  }
}

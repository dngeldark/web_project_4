import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, settings, cardTemplate } from './data.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import PopupWithForm from './PopupWithForm.js';

const editProfileSubmitHandler = ({ name, job }) => {
  user.setUserInfo(name, job);
  editProfileFormPopup.close();
};

const cardClickHandler = (link, name) => {
  picturePopup.open(link, name);
};

const addPlaceSubmitHandler = (cardData) => {
  const card = new Card(
    cardData,
    cardTemplate,
    cardClickHandler
  ).generateCard();
  cardsSection.addItem(card);
  addCardFormPopup.close();
};

const editProfileFormPopup = new PopupWithForm(
  '.popup',
  editProfileSubmitHandler
);
const addCardFormPopup = new PopupWithForm(
  '.add-pic-popup',
  addPlaceSubmitHandler
);
const picturePopup = new PopupWithImage('.picture-modal');
const user = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
});

editProfileFormPopup.setEventListeners();
addCardFormPopup.setEventListeners();
picturePopup.setEventListeners();

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        cardTemplate,
        cardClickHandler
      ).generateCard();
      cardsSection.addItem(card);
    },
  },
  '.cards'
);

// edit profile event listner
document.querySelector('.profile__edit-btn').addEventListener('click', () => {
  editProfileFormPopup.open();
  new FormValidator('.form', settings).enableValidation();
});

// add new place card event listener
document.querySelector('.profile__add-btn').addEventListener('click', () => {
  new FormValidator('.place-form', settings).enableValidation();
  addCardFormPopup.open();
});

cardsSection.renderItems();

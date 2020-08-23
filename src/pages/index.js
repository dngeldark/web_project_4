import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  settings,
  cardTemplate,
  editProfileBtn,
  addPlaceBtn,
} from '../utils/data.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import './index.css';

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

const editProfileForm = new FormValidator('.form', settings);
const addPlaceForm = new FormValidator('.place-form', settings);

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
editProfileBtn.addEventListener('click', () => {
  editProfileFormPopup.open(user.getUserInfo());
});

// add new place card event listener
addPlaceBtn.addEventListener('click', () => {
  addCardFormPopup.open();
});

cardsSection.renderItems();
editProfileForm.enableValidation();
addPlaceForm.enableValidation();

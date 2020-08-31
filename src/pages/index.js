import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  settings,
  cardTemplate,
  editProfileBtn,
  addPlaceBtn,
} from '../utils/data.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
import './index.css';

const cardsSection = new Section({
  items: [],
  renderer: (item) => {
    const card = new Card(
      item,
      cardTemplate,
      cardClickHandler,
      deleteCardHander
      )
      .generateCard();
    cardsSection.addItem(card);
    },
  },
  '.cards'
  );

const yandexApi = new Api({baseUrl: "https://around.nomoreparties.co/v1/group-3/",
  headers: {authorization: "2dcdffb3-685e-4cea-8daa-c562836c5b1e"}});

yandexApi.getInitialCards()
.then(data => {
    cardsSection.setItems(data);
    cardsSection.renderItems();
    data.forEach(element => {
      //yandexApi.deleteCard(element._id);
      //console.log(element);
    });
  })
.catch(err => console.log(err));

const deleteCardHander = (id) => {
  yandexApi.deleteCard(id);
}


const editProfileSubmitHandler = ({ name, job }) => {
  //user.setUserInfo(name, job);
  yandexApi.setUserInfo(name,job)
  .then(data => user.setUserInfo(data.name,data.about));
  editProfileFormPopup.close();
};

const cardClickHandler = (link, name) => {
  picturePopup.open(link, name);
};

const addPlaceSubmitHandler = (cardData) => {
  yandexApi.postNewCard(cardData)
  .then(data => {
  const card = new Card(
    data,
    cardTemplate,
    cardClickHandler,
    deleteCardHander
  ).generateCard();
  cardsSection.addItem(card);
  addCardFormPopup.close();
  })
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

yandexApi.getUserInfo()
.then(info => user.setUserInfo(info.name,info.about))
.catch(err => console.log(err));


editProfileFormPopup.setEventListeners();
addCardFormPopup.setEventListeners();
picturePopup.setEventListeners();

// edit profile event listner
editProfileBtn.addEventListener('click', () => {
  editProfileFormPopup.open(user.getUserInfo());
});

// add new place card event listener
addPlaceBtn.addEventListener('click', () => {
  addCardFormPopup.open();
});

editProfileForm.enableValidation();
addPlaceForm.enableValidation();


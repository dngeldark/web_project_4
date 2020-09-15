import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  settings,
  cardTemplate,
  editProfileBtn,
  addPlaceBtn,
  editAvatar,
  auth,
  baseUrl
} from '../utils/data.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/Api.js';
import './index.css';

function createCard(item){
  return new Card(
    item,
    cardTemplate,
    cardClickHandler,
    deleteCardHandler,
    likeCardHandler
  ).generateCard();
}

const cardsSection = new Section({
  items: [],
  renderer: (item) => {
    cardsSection.addItem(createCard(item));
    },
  },
  '.cards'
  );

const yandexApi = new Api({
  baseUrl,
  headers: {authorization: auth},
  auth
});

yandexApi.getInitialCards()
.then(data => {
    cardsSection.setItems(data);
    cardsSection.renderItems();
  })
.catch(err => console.log(err));

const deleteCardHandler = (card) => {
  confirmFormPopup.open();
  confirmFormPopup.card = card;
}

const likeCardHandler = (liked,id) => {
  if(liked){
     return yandexApi.unlikeCard(id)
     .catch(err => console.log(err));
  } else {
    return yandexApi.likeCard(id)
    .catch(err => console.log(err));
  }
}

const updateAvatarHandler = ({avatar}) => {
  return yandexApi.updateProfilePicture(avatar)
  .then(() => user.setUserAvatar(avatar))
  .catch(err => console.log(err));
}

const editProfileSubmitHandler = ({ name, job }) => {
   return yandexApi.setUserInfo(name,job)
  .then(data => user.setUserInfo(data.name,data.about))
  .catch(err => console.log(err));
};

const cardClickHandler = (link, name) => {
  picturePopup.open(link, name);
};

const addPlaceSubmitHandler = (cardData) => {
  return yandexApi.postNewCard(cardData)
  .then(data => {
  const card = createCard(data);
  cardsSection.addItem(card);
  })
  .catch(err => console.log(err));
};

const editProfileForm = new FormValidator('.form', settings);
const addPlaceForm = new FormValidator('.place-form', settings);
const avatarForm = new FormValidator('.avatar-form',settings);

const profilePictureFormPopup = new PopupWithForm(
  '.avatar-popup',
  updateAvatarHandler
);

const editProfileFormPopup = new PopupWithForm(
  '.popup',
  editProfileSubmitHandler
);
const addCardFormPopup = new PopupWithForm(
  '.add-pic-popup',
  addPlaceSubmitHandler
);

const confirmFormPopup = new PopupWithConfirm(
  '.confirm-popup',
  ()=>{
    confirmFormPopup.card.remove();
    return yandexApi.deleteCard(confirmFormPopup.card.id)
    .catch(err => console.log(err));
  }
);

const picturePopup = new PopupWithImage('.picture-modal');
const user = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar'
});

yandexApi.getUserInfo()
.then(({name,about,avatar}) => {
  user.setUserInfo(name,about);
  user.setUserAvatar(avatar);
})
.catch(err => console.log(err));


editProfileFormPopup.setEventListeners();
addCardFormPopup.setEventListeners();
picturePopup.setEventListeners();
profilePictureFormPopup.setEventListeners();
confirmFormPopup.setEventListeners();



// edit profile event listner
editProfileBtn.addEventListener('click', () => {
  editProfileFormPopup.open(user.getUserInfo());
});

// add new place card event listener
addPlaceBtn.addEventListener('click', () => {
  addCardFormPopup.open();
});


// edit profile picture event listener 
editAvatar.addEventListener('click',()=>{
  profilePictureFormPopup.open();
});

editProfileForm.enableValidation();
addPlaceForm.enableValidation();
avatarForm.enableValidation();


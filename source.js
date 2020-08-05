import Card from './Card.js';
import { initialCards, settings } from './initialCards.js';
import Validator from './Validator.js';

const editBtn = document.querySelector('.profile__edit-btn');
const closeBtn = document.querySelector('.popup__close-btn');
const formElement = document.querySelector('.form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formInputOne = document.querySelector('.form__profession');
const formInputTwo = document.querySelector('.form__name');
const modal = document.querySelector('.picture-modal');
//const modalPicture = document.querySelector('.picture-modal__image');
//const modalTitle = document.querySelector('.picture-modal__title');
const addButton = document.querySelector('.profile__add-btn');
const cards = document.querySelector('.cards');
const addPlaceForm = document.querySelector('.place-form');
const editFormPopup = document.querySelector('.popup');
const addPictureFormPupup = document.querySelector('.add-pic-popup');

function addEsc() {
  document.querySelector('.page').addEventListener('keydown', closePopupOnEsc);
}

function removeEsc() {
  document
    .querySelector('.page')
    .removeEventListener('keydown', closePopupOnEsc);
}

//open edit form
function openEditForm() {
  new Validator(formElement, settings).enableValidation();
  editFormPopup.classList.add('popup_opened');
  addEsc();
}

//close edit form
function closeEditForm() {
  editFormPopup.classList.remove('popup_opened');
  removeEsc();
}

//close edit form when clicked outside the form
editFormPopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) closeEditForm();
});

//close add picture from when clicked outside the form
addPictureFormPupup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('add-pic-popup')) closeAddPicForm();
});

//open add picture form
function openAddPicForm() {
  new Validator(addPlaceForm, settings).enableValidation();
  addPictureFormPupup.classList.add('add-pic-popup_active');
  addEsc();
}

//close add picture form
function closeAddPicForm() {
  addPictureFormPupup.classList.remove('add-pic-popup_active');
  removeEsc();
}

//Submit handle for  edit form
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = formInputTwo.value;
  profileJob.textContent = formInputOne.value;
  formElement.reset();
  closeEditForm();
  removeEsc();
}

//Edit Form close button handler
closeBtn.addEventListener('click', () => {
  closeEditForm();
});

//Open profile edit form
editBtn.addEventListener('click', () => {
  openEditForm();
  formElement.addEventListener('submit', formSubmitHandler);
  addEsc();
});

//click handle for delete btn
// function deleteCard(evt) {
//   if (evt.target.classList[0] === 'card__delete-btn') {
//     evt.target.parentNode.remove();
//   }
// }

//click handle for like btn
// function likeCard(evt) {
//   if (evt.target.classList[0] === 'card__like-btn') {
//     evt.target.classList.toggle('card__like-btn_active');
//     evt.stopImmediatePropagation();
//   }
// }

// handle ESC keydown
function closePopupOnEsc(evt) {
  if (evt.keyCode === 27) {
    closeEditForm();
    closeAddPicForm();
    closePictureModal();
    removeEsc();
  }
}

//Open picture-modal when card is clicked
// function openPictureModal(evt) {
//   if (evt.target.classList[0] === 'card__picture') {
//     modalPicture.src = evt.target.src;
//     modalPicture.alt = evt.target.alt;
//     modalTitle.textContent = evt.target.alt;
//     modal.classList.add('picture-modal_active');
//     addEsc();
//   }
// }

//close picture modal
function closePictureModal() {
  modal.classList.remove('picture-modal_active');
  removeEsc();
}

// event listener for Cards component
cards.addEventListener('click', (evt) => {
  if (evt.target.classList[0] === 'card__picture') {
    addEsc();
  }

  //   //deleteCard(evt);
  //   //openPictureModal(evt);
});

//create Card element
// function createCard(item) {
//   const card = document.createElement('figure');
//   card.append(document.querySelector('#card-template').content.cloneNode(true));
//   card.classList.add('card');
//   const cardPicture = card.querySelector('.card__picture');
//   cardPicture.src = item.link;
//   cardPicture.alt = item.name;
//   item.liked = false;
//   card.querySelector('.card__title').textContent = item.name;
//   return card;
// }

//Render cards and append to cards block
function renderCards() {
  initialCards.forEach((item) => {
    const card = new Card(item);
    cards.append(card._generateCard());
  });
}

//Add new card form handler
function addBtnSubmitHandler(evt) {
  evt.preventDefault();
  const form = document.forms[1];
  const card = { name: form.title.value, link: form.url.value };
  form.reset();
  cards.insertBefore(new Card(card)._generateCard(), cards.firstChild);
  closeAddPicForm();
}

//add event listener to add button
addButton.addEventListener('click', () => {
  openAddPicForm();
});

//add place form submit handler
addPlaceForm.addEventListener('submit', addBtnSubmitHandler);

//close add picture form modal
addPlaceForm
  .querySelector('.add-pic-popup__close-btn')
  .addEventListener('click', () => {
    closeAddPicForm();
  });

//close picture modal
modal.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('picture-modal__image')) {
    closePictureModal();
  }
});

renderCards();

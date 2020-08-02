const initialCards = [
  {
    name: 'The Wave',
    liked: false,
    link:
      'https://images.unsplash.com/photo-1511206221321-715b8bae1613?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
  },

  {
    name: 'Yosemite Valley',
    liked: false,
    link: 'https://code.s3.yandex.net/web-code/yosemite.jpg',
  },
  {
    name: 'Oklahoma',
    liked: false,
    link:
      'https://images.unsplash.com/photo-1593227948434-19f6f6eba234?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
  },
  {
    name: 'Lake Louise',
    liked: false,
    link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg',
  },

  {
    name: 'Smokie Mountains',
    liked: false,
    link:
      'https://images.unsplash.com/photo-1536691661814-8b0372158cf5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
  },
  {
    name: 'Olympic NP',
    liked: false,
    link:
      'https://images.unsplash.com/photo-1473442240418-452f03b7ae40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMjF9&auto=format&fit=crop&w=1050&q=80',
  },
];

const editBtn = document.querySelector('.profile__edit-btn');
const closeBtn = document.querySelector('.popup__close-btn');
const formElement = document.querySelector('.form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formInputOne = document.querySelector('.form__profession');
const formInputTwo = document.querySelector('.form__name');
const modal = document.querySelector('.picture-modal');
const modalPicture = document.querySelector('.picture-modal__image');
const modalTitle = document.querySelector('.picture-modal__title');
const addButton = document.querySelector('.profile__add-btn');
const cards = document.querySelector('.cards');
const addPlaceForm = document.querySelector('.place-form');
const editFormPopup = document.querySelector('.popup');
const addPictureFormPupup = document.querySelector('.add-pic-popup');
let isModalOpen = false;

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
function deleteCard(evt) {
  if (evt.target.classList[0] === 'card__delete-btn') {
    evt.target.parentNode.remove();
  }
}

//click handle for like btn
function likeCard(evt) {
  if (evt.target.classList[0] === 'card__like-btn') {
    evt.target.classList.toggle('card__like-btn_active');
    evt.stopImmediatePropagation();
  }
}

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
function openPictureModal(evt) {
  if (evt.target.classList[0] === 'card__picture') {
    modalPicture.src = evt.target.src;
    modalPicture.alt = evt.target.alt;
    modalTitle.textContent = evt.target.alt;
    modal.classList.add('picture-modal_active');
    addEsc();
  }
}

//close picture modal
function closePictureModal() {
  modal.classList.remove('picture-modal_active');
  removeEsc();
}

// event listener for Cards component
cards.addEventListener('click', (evt) => {
  deleteCard(evt);
  likeCard(evt);
  openPictureModal(evt);
});

//create Card element
function createCard(item) {
  const card = document.createElement('figure');
  card.append(document.querySelector('#card-template').content.cloneNode(true));
  card.classList.add('card');
  const cardPicture = card.querySelector('.card__picture');
  cardPicture.src = item.link;
  cardPicture.alt = item.name;
  item.liked = false;
  card.querySelector('.card__title').textContent = item.name;
  return card;
}

//Render cards and append to cards block
function renderCards() {
  initialCards.forEach((item) => {
    cards.append(createCard(item));
  });
}

//Add new card form handler
function addBtnSubmitHandler(evt) {
  evt.preventDefault();
  const name = document.querySelector('.place-form__title-input').value;
  const link = document.querySelector('.place-form__url-input').value;
  const card = { name, link, liked: false };
  addPlaceForm.reset();
  cards.insertBefore(createCard(card), cards.firstChild);
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

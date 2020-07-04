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
const jobInput = document.querySelector('.form__profession');
const nameInput = document.querySelector('.form__name');
const formTitle = document.querySelector('.form__title');
const modal = document.querySelector('.picture-modal');
const modalPicture = document.querySelector('.picture-modal__image');
const modalTitle = document.querySelector('.picture-modal__title');
const addButton = document.querySelector('.profile__add-btn');
const cards = document.querySelector('.cards');

//open-close forms
function toggleModal() {
  document.querySelector('.popup').classList.toggle('popup_opened');
}

//Submit handle for profile form
function formSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  formElement.reset();
  toggleModal();
}

//Form cloe button handler
closeBtn.addEventListener('click', toggleModal);

//Open profile edit form
editBtn.addEventListener('click', () => {
  toggleModal();
  jobInput.placeholder = 'Profession';
  nameInput.placeholder = 'Name';
  formTitle.textContent = 'Edit Profile';
  formElement.removeEventListener('submit', addBtnSubmitHandler);
  formElement.addEventListener('submit', formSubmitHandler);
});

//create Card element
const createCard = function (item) {
  const card = document.createElement('figure');
  card.append(document.querySelector('#card-template').content.cloneNode(true));
  card.classList.add('card');
  const cardPicture = card.querySelector('.card__picture');
  const likeBtn = card.querySelector('.card__like-btn');
  cardPicture.src = item.link;
  cardPicture.alt = item.name;
  card.querySelector('.card__title').textContent = item.name;

  //like-button click handle
  likeBtn.addEventListener('click', () => {
    item.liked = !item.liked;
    let icon = card.querySelector('.card__like-btn').style;
    item.liked
      ? (icon.backgroundImage = "url('./images/blackHeart.png')")
      : (icon.backgroundImage = "url('./images/heart.png')");
  });

  //delete-button click handle
  card.querySelector('.card__delete-btn').addEventListener('click', () => {
    initialCards.splice(initialCards.indexOf(item), 1);
    card.remove();
  });

  //Open picture-modal when card is clicked
  cardPicture.addEventListener('click', (e) => {
    modalPicture.src = e.target.src;
    modalTitle.textContent = e.target.alt;
    modal.classList.toggle('fade-out');

    //Close picture-modal on click
    modal
      .querySelector('.picture-modal__close-btn')
      .addEventListener('click', (evt) => {
        modal.classList.toggle('fade-out');
        evt.stopImmediatePropagation();
      });
  });
  return card;
};

//Render cards and append to cards block
const renderCards = function () {
  initialCards.map((item) => {
    cards.append(createCard(item));
  });
};

//Add new card form handler
function addBtnSubmitHandler(evt) {
  evt.preventDefault();
  evt.stopImmediatePropagation();
  const newCard = { name: nameInput.value, link: jobInput.value, liked: false };
  initialCards.push(newCard);
  formElement.reset();
  cards.insertBefore(createCard(newCard), cards.firstChild);
  toggleModal();
}

//add event listener to add button
addButton.addEventListener('click', () => {
  toggleModal();
  nameInput.placeholder = 'Title';
  jobInput.placeholder = 'Image URL';
  formTitle.textContent = 'New Place';
  formElement.removeEventListener('submit', formSubmitHandler);
  formElement.addEventListener('submit', addBtnSubmitHandler);
});

renderCards();

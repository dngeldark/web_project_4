const editBtn = document.querySelector('.profile__edit-btn');
const closeBtn = document.querySelector('.popup__close-btn');
const formElement = document.querySelector('.form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const jobInput = document.querySelector('.form__profession');
const nameInput = document.querySelector('.form__name');

function toggleModal() {
  document.querySelector('.popup').classList.toggle('popup_opened');
}

function formSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  toggleModal();
}

closeBtn.addEventListener('click', toggleModal);
editBtn.addEventListener('click', toggleModal);
formElement.addEventListener('submit', formSubmitHandler);

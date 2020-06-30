const editBtn = document.querySelector('.profile__edit-btn');
const closeBtn = document.querySelector('.popup__close-btn');
const formElement = document.querySelector('.form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const job = document.querySelector('.form__profession');
const name = document.querySelector('.form__name');

function toggleModal(e) {
  document.querySelector('.popup').classList.toggle('popup_opened');
  e.preventDefault();
  name.value = profileName.innerText;
  job.value = profileJob.innerText;
}

function formSubmitHandler(e) {
  e.preventDefault();
  if (name.value.length > 0) {
    profileName.innerText = name.value;
    profileJob.innerText = job.value;
    name.value = '';
    job.value = '';
  }

  toggleModal(e);
}

closeBtn.addEventListener('click', toggleModal);
editBtn.addEventListener('click', toggleModal);
formElement.addEventListener('submit', formSubmitHandler);

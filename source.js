let editBtn = document.querySelector('.profile__edit-btn');
let closeBtn = document.querySelector('.popup__close-btn');
let saveBtn = document.querySelector('.form__save-btn');

function toggleModal(e) {
  document.querySelector('.popup').classList.toggle('popup_opened');
  e.preventDefault();
}

function editInfo(e) {
  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');
  let job = document.querySelector('.form__profession');
  let name = document.querySelector('.form__name');

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
saveBtn.addEventListener('click', editInfo);

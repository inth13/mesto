let editProfileButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let popup = document.querySelector('.popup');
let close = popup.querySelector('.popup__close-btn');

let popupForm = popup.querySelector('.popup__form');
let formName = popup.querySelector('.form__input-text_name');
let formJob = popup.querySelector('.form__input-text_job');

function openPopup() {
    popup.classList.add('popup_opened');
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileJob.textContent = formJob.value;
    closePopup();
}

editProfileButton.addEventListener('click', openPopup);
close.addEventListener('click', closePopup);
popupForm.addEventListener('submit', handleFormSubmit);
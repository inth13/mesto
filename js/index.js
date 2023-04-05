let formElement = document.querySelector(".profile__edit-button");
let profileName = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__subtitle");
let popup = document.querySelector(".popup");
let close = popup.querySelector(".popup__close-btn");

let popupForm = popup.querySelector(".popup__form");
let formName = popup.querySelector(".popup__name");
let formJob = popup.querySelector(".popup__job");

function openPopup() {
    console.log("click edit button");``
    popup.classList.add("popup__opened");
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;
}

function closePopup() {
    console.log('click close');
    popup.classList.remove("popup__opened");
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileJob.textContent = formJob.value;
    console.log(formName.value);
    closePopup();
}

formElement.addEventListener('click', openPopup);
close.addEventListener('click', closePopup);
popupForm.addEventListener('submit', handleFormSubmit);
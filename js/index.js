const editProfileButton = document.querySelector('.profile__edit-button');
const editPlaceButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const close = popup.querySelector('.popup__close-btn');

const popupForm = popup.querySelector('.popup__form');
const formName = popup.querySelector('.form__input-text_field_name');
const formJob = popup.querySelector('.form__input-text_field_job');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const popupAddCard = document.querySelector('.popup_card');
const popupCardForm = popupAddCard.querySelector('.popup__form');
const cardTitle = popupCardForm.querySelector('.form__input-text_field_title');
const imageLink = popupCardForm.querySelector('.form__input-text_field_link');
const closeCard = popupAddCard.querySelector('.popup__close-btn');

const cardsTemplate = document.querySelector('.cards-template').content.querySelector('.element');
const cardElementsContainer = document.querySelector('.elements');

const popupImageContainer = document.querySelector('.popup__image-container');
const popupPicture = popupImageContainer.querySelector('.popup__picture');
const popupText = popupImageContainer.querySelector('.popup__text');
const closeImage = popupImageContainer.querySelector('.popup__close-btn');


function openPopup() {
    popup.classList.add('popup_opened');
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;
}

function openImagePopup() {
    popupImageContainer.classList.add('popup_opened');
}

function openCardPopup() {
    popupAddCard.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function closeCardPopup() {
    popupAddCard.classList.remove('popup_opened');
}

function closeImagePopup() {
    popupImageContainer.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileJob.textContent = formJob.value;
    closePopup();
}

function handleCardForm(evt) {
    evt.preventDefault();
    const name = cardTitle.value;
    const link = imageLink.value;
    const card = createCard({name: name, link: link});
    cardElementsContainer.prepend(card);
    closeCardPopup();
    evt.target.reset();
}

function createCard(item) {
    const card = cardsTemplate.cloneNode(true);
    const cardPicture = card.querySelector('.element__img');
    const cardText = card.querySelector('.element__title');

    cardPicture.setAttribute('src', item.link);
    cardPicture.setAttribute('alt', ("Фото. " + item.textContent));
    cardText.textContent = "" + item.name;

    const like = card.querySelector('.element__like-button');

    function toggleLike() {
        like.classList.toggle('element__like-button_active');
    }

    like.addEventListener('click', toggleLike);

    const trash = card.querySelector('.element__delete');
    trash.addEventListener('click', () => {
        card.remove();
    });

    function openImageContainer() {
        openImagePopup();
        popupPicture.setAttribute('src', item.link);
        popupPicture.setAttribute('alt', ("Фото. " + item.textContent));
        popupText.textContent = "" + item.name;
    }

    cardPicture.addEventListener('click', openImageContainer);
    return card;
}

function renderCards(items) {
    const cards = items.map((item) => {
        return createCard(item);
    });
    cardElementsContainer.prepend(...cards);
}

renderCards(initialCards);

editProfileButton.addEventListener('click', openPopup);
editPlaceButton.addEventListener('click', openCardPopup);

close.addEventListener('click', closePopup);
closeCard.addEventListener('click', closeCardPopup);
closeImage.addEventListener('click', closeImagePopup);
popupForm.addEventListener('submit', handleFormSubmit);
popupCardForm.addEventListener('submit', handleCardForm);
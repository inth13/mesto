const profileEditButton = document.querySelector('.profile__edit-button'); //кнопка профиля
const placeAddButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const popupProfile = document.querySelector('.popup_profile');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-btn');

//данные из формы профиля
const profileInputName = popupProfile.querySelector('.form__input-text_field_name');
const profileInputJob = popupProfile.querySelector('.form__input-text_field_job');

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
const cardImageLink = popupCardForm.querySelector('.form__input-text_field_link');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-btn');

const cardsTemplate = document.querySelector('.cards-template').content.querySelector('.element');
const cardElementsContainer = document.querySelector('.elements');

const popupImageContainer = document.querySelector('.popup_type_image-container');
const popupPictureCloseUp = popupImageContainer.querySelector('.popup__picture');
const popupPictureCloseUpDescription = popupImageContainer.querySelector('.popup__text');
const popupPictureCloseUpCloseButton = popupImageContainer.querySelector('.popup__close-btn');


function openPopup(item) {
    item.classList.add('popup_opened');
}

function closePopup(item) {
    item.classList.remove('popup_opened')
}

function openProfilePopupHandler() {
    profileInputName.value = profileName.textContent;
    profileInputJob.value = profileJob.textContent;
    openPopup(popupProfile);
}

function openAddPlacePopupHandler() {
    openPopup(popupAddCard);
}

function closeProfilePopupHandler() {
    closePopup(popupProfile);
}

function closeAddPlacePopupHandler() {
    closePopup(popupAddCard);
}

function closePictureHandler() {
    closePopup(popupImageContainer);
}

function submitFormHandler(evt) {
    evt.preventDefault();
    profileName.textContent = profileInputName.value;
    profileJob.textContent = profileInputJob.value;
    closeProfilePopupHandler();
}

function submitFormAddCard(evt) {
    evt.preventDefault();
    const name = cardTitle.value;
    const link = cardImageLink.value;
    const card = createCard({name: name, link: link});
    cardElementsContainer.prepend(card);
    closeAddPlacePopupHandler();
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
        openPopup(popupImageContainer);
        popupPictureCloseUp.setAttribute('src', item.link);
        popupPictureCloseUp.setAttribute('alt', ("Фото. " + item.textContent));
        popupPictureCloseUpDescription.textContent = "" + item.name;
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

profileEditButton.addEventListener('click', openProfilePopupHandler);
placeAddButton.addEventListener('click', openAddPlacePopupHandler);

popupProfileCloseButton.addEventListener('click', closeProfilePopupHandler);
popupAddCardCloseButton.addEventListener('click', closeAddPlacePopupHandler);
popupPictureCloseUpCloseButton.addEventListener('click', closePictureHandler);
popupProfile.addEventListener('submit', submitFormHandler);
popupCardForm.addEventListener('submit', submitFormAddCard);
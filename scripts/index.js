import { initialCard } from "./cards.js";
import { obj } from "./validate.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const page = document.querySelector('.page');
const contentPage = page.querySelector('.content');
const profile = contentPage.querySelector('.profile');
const infoProfile = profile.querySelector('.profile__info');
const titleProfile = infoProfile.querySelector('.profile__title');
const subtitleProfile = infoProfile.querySelector('.profile__subtitle');
const editingProfile = infoProfile.querySelector('.profile__edit');
const editingPage = page.querySelector('.popup_type_edit');
const closingPopupButton = editingPage.querySelector('.popup__close');
const namePopup = editingPage.querySelector('.popup__text_type_name');
const aboutPopup = editingPage.querySelector('.popup__text_type_about');
const formPopup = editingPage.querySelector('.popup__form');


//Универсальная функция открытия и закрытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

//Закрытие попапа Esc
const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
};

//Закрытие попапа overlay
const closePopupOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
};

document.querySelectorAll('.popup').forEach( popup => {
  popup.addEventListener('mousedown', closePopupOverlay); 
});

//Попап редактирования профиля
function openEditingPagePopup() {
  openPopup(editingPage);
  namePopup.value = titleProfile.textContent;
  aboutPopup.value = subtitleProfile.textContent;
};

function closeEditingPagePopup() {
  closePopup(editingPage);
}

function saveEditingPagePopup (evt) {
  evt.preventDefault();
  titleProfile.textContent = namePopup.value;
  subtitleProfile.textContent = aboutPopup.value;
  closePopup(editingPage);
};

editingProfile.addEventListener('click', openEditingPagePopup);
closingPopupButton.addEventListener('click', closeEditingPagePopup);
formPopup.addEventListener('submit', saveEditingPagePopup);

const elementsContent = contentPage.querySelector('.elements');
const picPage = page.querySelector('.popup_type_pic');
const imagePicPopup = picPage.querySelector('.popup__image');
const namePicPopup = picPage.querySelector('.popup__name');
const closingPicPopup = picPage.querySelector('.popup__close');

//Попап картинки - открытие
const openImagePopup = (name, link) => {
  openPopup(picPage);
  imagePicPopup.src = link;
  imagePicPopup.alt = name;
  namePicPopup.textContent = name;
}

//Попап картинки - закрытие
const closeImagePopup = () => {
  closePopup(picPage);
}

closingPicPopup.addEventListener('click', closeImagePopup);

//Новые карточки
function renderElements () {
    initialCard.forEach(item => {
      const cardElement = new Card(item, '.template', openImagePopup);
      const cardCreated = cardElement.generateCard();
      elementsContent.append(cardCreated);
    });
};

renderElements ();


const newCardPage = page.querySelector('.popup_type_new-card');
const closingNewCardButton = newCardPage.querySelector('.popup__close');
const contentNewCardPopup = newCardPage.querySelector('.popup__content');
const titlePopup = contentNewCardPopup.querySelector('.popup__text_type_title');
const linkPopup = contentNewCardPopup.querySelector('.popup__text_type_link');
const formNewCardPopup = newCardPage.querySelector('.popup__form');
const additionProfile = profile.querySelector('.profile__add');

//Попап добавления карточки
function openPopupNewCard() {
  openPopup(newCardPage);
};

function closePopupNewCard() {
  closePopup(newCardPage);
};


function savePopupNewCard (evt) {
    evt.preventDefault();
    const contentNewCard = {
      name: titlePopup.value,
      link: linkPopup.value
    }
    
    const newCardElement = new Card(contentNewCard, '.template', openImagePopup);
    const newCardCreated = newCardElement.generateCard();
    elementsContent.prepend(newCardCreated);
    closePopup(newCardPage);
    titlePopup.value = '';
    linkPopup.value = '';
};

const validatorEditing = new FormValidator(obj, formPopup);
const validatorNewCard = new FormValidator(obj, formNewCardPopup);
validatorEditing.enableValidation();
validatorNewCard.enableValidation();

additionProfile.addEventListener('click', openPopupNewCard);
closingNewCardButton.addEventListener('click', closePopupNewCard);
formNewCardPopup.addEventListener('submit', savePopupNewCard);
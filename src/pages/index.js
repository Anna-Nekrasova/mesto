import "./index.css";
import { initialCard } from "../scripts/cards.js";
import { obj } from "../scripts/validate.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const page = document.querySelector('.page');
const contentPage = page.querySelector('.content');
const profile = contentPage.querySelector('.profile');
const infoProfile = profile.querySelector('.profile__info');
const titleProfile = infoProfile.querySelector('.profile__title');
const subtitleProfile = infoProfile.querySelector('.profile__subtitle');
const editingProfile = infoProfile.querySelector('.profile__edit');
const editingPage = page.querySelector('.popup_type_edit');
const formPopup = editingPage.querySelector('.popup__form');
const newCardPage = page.querySelector('.popup_type_new-card');
const contentNewCardPopup = newCardPage.querySelector('.popup__content');
const titlePopup = contentNewCardPopup.querySelector('.popup__text_type_title');
const linkPopup = contentNewCardPopup.querySelector('.popup__text_type_link');
const formNewCardPopup = newCardPage.querySelector('.popup__form');
const additionProfile = profile.querySelector('.profile__add');

//Валидация
const validatorEditing = new FormValidator(obj, formPopup);
const validatorNewCard = new FormValidator(obj, formNewCardPopup);
validatorEditing.enableValidation();
validatorNewCard.enableValidation();

//Попап редактирования профиля
const userInfo = new UserInfo({
  name: titleProfile,
  about: subtitleProfile,
})


function saveProfilePopup(data) {
  userInfo.setUserInfo({
    userName: data.name,
    userAbout: data.about,
   });
   profilePopup.close();
}

const profilePopup = new PopupWithForm('.popup_type_edit', saveProfilePopup);

profilePopup.setEventListeners();
editingProfile.addEventListener('click', () => {
  profilePopup.open(userInfo.getUserInfo());
});

//Попап добавления карточки
function saveNewCardPopup() {
  const contentNewCard = [{
    name: titlePopup.value,
    link: linkPopup.value,
  }];

  const sectionNewCard = new Section(
    {
      items: contentNewCard,
      renderer: (item) => {
        const cardCreated = createCard(item);
        sectionNewCard.addItem(cardCreated);
      }
    },
    '.elements'
  );
  
  sectionNewCard.renderItems();
  newCardPopup.close();
}

const newCardPopup = new PopupWithForm('.popup_type_new-card', saveNewCardPopup);

newCardPopup.setEventListeners();
additionProfile.addEventListener('click', () => {
  newCardPopup.open();
})

//Попап картинки
const imagePopup = new PopupWithImage('.popup_type_pic');

function openImagePopup(data) {
  imagePopup.open(data.name, data.link);
}

imagePopup.setEventListeners();

//Универсальная функция создания карточки
function createCard(data) {
  const cardElement = new Card(data, '.template', openImagePopup);
  return cardElement.generateCard();
}

//Отрисовка карточек
const section = new Section(
  {
    items: initialCard.reverse(),
    renderer: (item) => {
      const cardCreated = createCard(item);
      section.addItem(cardCreated);
    }
  },
  '.elements'
);

section.renderItems();
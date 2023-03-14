import "./index.css";
import { 
  initialCard,
  titleProfile,
  subtitleProfile,
  editingProfile,
  formPopup,
  titlePopup,
  linkPopup,
  formNewCardPopup,
  additionProfile
} from "../scripts/constants.js";
import { obj } from "../scripts/validate.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

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

//Попап добавления карточки
function saveNewCardPopup() {
  const contentNewCard = createCard({
    name: titlePopup.value,
    link: linkPopup.value,
  })
  section.addItem(contentNewCard);
  newCardPopup.close();
}

const newCardPopup = new PopupWithForm('.popup_type_new-card', saveNewCardPopup);

newCardPopup.setEventListeners();
additionProfile.addEventListener('click', () => {
  newCardPopup.open();
  validatorNewCard.blockButton();
})

//Попап картинки
const imagePopup = new PopupWithImage('.popup_type_pic');

function openImagePopup(data) {
  imagePopup.open(data.name, data.link);
}

imagePopup.setEventListeners();


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
  additionProfile,
  numberLikeElement
} from "../scripts/constants.js";
import { obj } from "../scripts/validate.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
//import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

//Валидация
const validatorEditing = new FormValidator(obj, formPopup);
const validatorNewCard = new FormValidator(obj, formNewCardPopup);
validatorEditing.enableValidation();
validatorNewCard.enableValidation();

let currentUserId;

//Загрузка данных профиля с сервера ДОБАВИТЬ АВАТАР
function downloadUserInfo(data) {
  userInfo.setUserInfo({
    userName: data.name,
    userAbout: data.about,
    userAvatar: data.avatar,
  });
}

const api = new Api;

/*api.getDataUserInfo().then((data) => {
  downloadUserInfo(data);
});*/

//Попап редактирования профиля
const userInfo = new UserInfo({
  name: titleProfile,
  about: subtitleProfile,
})

function saveProfilePopup(data) {
  api.sendDataUserInfo({
    userName: data.name,
    userAbout: data.about,
   }).then((newData) => {
    userInfo.setUserInfo({
      userName: newData.name,
      userAbout: newData.about,
      userAvatar: newData.avatar,
     });
   })
   profilePopup.close();
}

const profilePopup = new PopupWithForm('.popup_type_edit', saveProfilePopup);

profilePopup.setEventListeners();
editingProfile.addEventListener('click', () => {
  profilePopup.open(userInfo.getUserInfo());
});

function deleteCardPopup() {
  confirmationPopup.open();
}

//Универсальная функция создания карточки
function createCard(data) {
  const cardElement = new Card(data, '.template', currentUserId, openImagePopup, deleteCardPopup);
  return cardElement.generateCard();

}

//Отрисовка карточек
/*const section = new Section(
  {
    items: initialCard.reverse(),
    renderer: (item) => {
      const cardCreated = createCard(item);
      section.addItem(cardCreated);
    }
  },
  '.elements'
);

section.renderItems();*/

//Отрисовка карточек
const section = new Section({
  renderer: (item) => {
    const cardCreated = createCard(item);
    section.addItem(cardCreated);
  }
}, '.elements');

/*api.getDataCards().then((data) => {
  section.renderItems(data);
})*/

//Попап добавления карточки
const saveNewCardPopup = (data) => {
  api.sendDataCards(data.name, data.link)
    .then((item) => {
      const contentNewCard = createCard(item)
      section.addItem(contentNewCard);
  })
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

Promise.all([api.getDataCards(), api.getDataUserInfo()])
  .then(([items, user]) => {
    currentUserId = user._id;
    console.log(items);
    console.log(user);
    section.renderItems(items);
    downloadUserInfo(user);
  })

//Попап подтверждения удаления
const confirmationPopup = new PopupWithConfirmation('.popup_type_confirmation', deleteCard)

/*const deleteCardPopup = () => {
  confirmationPopup.open();
}*/

function deleteCard() {
  cardElement.deleteElements();
  //return api.deleteCard(id);
}

//confirmationPopup.open();

/*function openConfirmationPopup() {
  confirmationPopup.open();
}

function deleteCards() {
  cardElement.deleteElements(openConfirmationPopup);
}

const confirmationPopup = new PopupWithConfirmation('.popup_type_confirmation', deleteCards);
confirmationPopup.setEventListeners();*/

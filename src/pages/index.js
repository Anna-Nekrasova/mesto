import "./index.css";
import { 
  titleProfile,
  subtitleProfile,
  editingProfile,
  formPopup,
  formNewCardPopup,
  additionProfile,
  avatarProfile,
  buttonOpenEditAvatar,
  avatarPage,
  buttonSaveProfile,
  buttonSaveAvatar,
  buttonSaveCard,
} from "../scripts/constants.js";
import { obj } from "../scripts/validate.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

//Валидация
const validatorEditing = new FormValidator(obj, formPopup);
const validatorNewCard = new FormValidator(obj, formNewCardPopup);
const validatorAvatarLink = new FormValidator(obj, avatarPage);
validatorEditing.enableValidation();
validatorNewCard.enableValidation();
validatorAvatarLink.enableValidation();

let currentUserId;

//Загрузка данных профиля с сервера
function downloadUserInfo(data) {
  userInfo.setUserInfo({
    userName: data.name,
    userAbout: data.about,
    userAvatar: data.avatar,
  });
}

const api = new Api;

//Замена текста кнопки при загрузке
function renderLoadingSave(isLoading, button, text) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  }
  else {
    button.textContent = text;
  }
}

//Редактирование профиля
const userInfo = new UserInfo({
  name: titleProfile,
  about: subtitleProfile,
  avatar: avatarProfile,
})

function saveProfilePopup(data) {
  renderLoadingSave(true, buttonSaveProfile, 'Сохранить');
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
    .finally(() => {
      renderLoadingSave(false, buttonSaveProfile, 'Сохранить');
    })
   profilePopup.close();
}

const profilePopup = new PopupWithForm('.popup_type_edit', saveProfilePopup);

profilePopup.setEventListeners();
editingProfile.addEventListener('click', () => {
  profilePopup.open(userInfo.getUserInfo());
});

//Попап подтверждения удаления - открытие
function deleteCardPopup() {
  confirmationPopup.open();
}

//Удаление/Добавление лайка (апи)
function deleteOrAddLikeCard(method, id) {
  return api.deleteOrAddLikeCard(method, id);
}

//Универсальная функция создания карточки
function createCard(data) {
  return new Card(
    data, 
    '.template', 
    currentUserId, 
    openImagePopup, 
    deleteOrAddLikeCard, 
    deleteCardPopup
  );
}

//Попап Подтверждения удаления
const confirmationPopup = new PopupWithConfirmation('.popup_type_confirmation');
confirmationPopup.setEventListeners();
function openConfirmDeletePopup() {
    return confirmationPopup.open();
}

//Удаление карточки (апи)
function deleteCard(cardId) {
    return api.deleteCard(cardId)
}

//Отрисовка карточек
const section = new Section(
  {
      renderer: (item) => {
          const cardCreated = createCard(item);
          section.addItem(cardCreated);
      }
  },
  '.elements',
  openConfirmDeletePopup,
  deleteCard
);


//Попап добавления карточки
const saveNewCardPopup = (data) => {
  renderLoadingSave(true, buttonSaveCard, 'Создать');
  api.sendDataCards(data.name, data.link)
    .then((item) => {
      const contentNewCard = createCard(item)
      section.addItem(contentNewCard);
    })
    .finally(() => {
      renderLoadingSave(false, buttonSaveCard, 'Создать');
    })
  newCardPopup.close();
}

const newCardPopup = new PopupWithForm('.popup_type_new-card', saveNewCardPopup);

newCardPopup.setEventListeners();
additionProfile.addEventListener('click', () => {
  newCardPopup.open();
  validatorNewCard.blockButton();
})

//Попап изменение аватара
function saveAvatarPopup(data) {
  renderLoadingSave(true, buttonSaveAvatar, 'Сохранить');
  api.sendDataAvatar(data.link)
    .then((item) => {
      userInfo.setUserInfo({
        userName: item.name,
        userAbout: item.about,
        userAvatar: item.avatar,
       });
    })
    .finally(() => {
      renderLoadingSave(false, buttonSaveAvatar, 'Сохранить')
    })
    newAvatarPopup.close();
}

const newAvatarPopup = new PopupWithForm('.popup_type_avatar', saveAvatarPopup);

newAvatarPopup.setEventListeners();
buttonOpenEditAvatar.addEventListener('click', () => {
  newAvatarPopup.open();
  validatorAvatarLink.blockButton();
})

//Попап картинки
const imagePopup = new PopupWithImage('.popup_type_pic');

function openImagePopup(data) {
  imagePopup.open(data.name, data.link);
}

imagePopup.setEventListeners();

//Промисы
Promise.all([api.getDataCards(), api.getDataUserInfo()])
  .then(([items, user]) => {
    currentUserId = user._id;
    console.log(items);
    console.log(user);
    section.renderItems(items);
    downloadUserInfo(user);
  })
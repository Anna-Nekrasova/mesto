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
  baseUrl,
  token
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
import { renderLoadingSave } from "./utils.js";

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

const api = new Api(baseUrl, token);

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
     profilePopup.close();
   })
    .finally(() => {
      renderLoadingSave(false, buttonSaveProfile, 'Сохранить');
    })
}

const profilePopup = new PopupWithForm('.popup_type_edit', saveProfilePopup);

profilePopup.setEventListeners();
editingProfile.addEventListener('click', () => {
  profilePopup.open(userInfo.getUserInfo());
});

//Попап подтверждения удаления - открытие
/*function openConfirmationPopup() {
  confirmationPopup.open();
}*/

//Удаление/Добавление лайка (апи)
function deleteOrAddLikeCard(method, id) {
  return api.deleteOrAddLikeCard(method, id)
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

//Универсальная функция создания карточки
/*function createCard(data) {
  return new Card(
    data, 
    '.template', 
    currentUserId, 
    openImagePopup, 
    deleteOrAddLikeCard, 
    openConfirmationPopup
  );
}*/

function createCard(data) {
  const cardElement = new Card(data, 'template', currentUserId, openImagePopup, deleteOrAddLikeCard, openConfirmDeletePopup);
  return cardElement.generateCard();
}

//Попап Подтверждения удаления
function openConfirmDeletePopup(card) {
  confirmationPopup.open();
  confirmationPopup.setAction(() => {
    api.deleteCard(card.id)
      .then(() => {
        card.removeCard();
        confirmationPopup.open();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  })
}

const confirmationPopup = new PopupWithConfirmation('.popup_type_confirmation'/*, openConfirmDeletePopup*/);
confirmationPopup.setEventListeners();


//Удаление карточки (апи)
/*function deleteCard(cardId) {
    return api.deleteCard(cardId)
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
}*/

//Отрисовка карточек
/*const section = new Section(
  {
      renderer: (item) => {
          const cardCreated = createCard(item);
          section.addItem(cardCreated);
      }
  },
  '.elements',
  openConfirmDeletePopup,
  deleteCard
);*/

const section = new Section({
  renderer: (item) => {
    const cardCreated = createCard(item);
    section.addItem(cardCreated);
  }
}, '.elements');


//Попап добавления карточки
const saveNewCardPopup = (data) => {
  renderLoadingSave(true, buttonSaveCard, 'Создать');
  api.sendDataCards(data.name, data.link)
    .then((item) => {
      const contentNewCard = createCard(item)
      section.addItem(contentNewCard);
      newCardPopup.close();
    })
    .finally(() => {
      renderLoadingSave(false, buttonSaveCard, 'Создать');
    })
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
      newAvatarPopup.close();
    })
    .finally(() => {
      renderLoadingSave(false, buttonSaveAvatar, 'Сохранить')
    })
    
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
    section.renderItems(items.reverse());
    downloadUserInfo(user);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
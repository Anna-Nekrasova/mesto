const page = document.querySelector('.page');
const contentPage = page.querySelector('.content');
const profile = contentPage.querySelector('.profile');
const infoProfile = profile.querySelector('.profile__info');
const titleProfile = infoProfile.querySelector('.profile__title');
const subtitleProfile = infoProfile.querySelector('.profile__subtitle');
const editProfile = infoProfile.querySelector('.profile__edit');
const editPage = page.querySelector('.popup_type_edit');
const closeButton = editPage.querySelector('.popup__close');
const contentPopup = editPage.querySelector('.popup__content');
const namePopup = contentPopup.querySelector('.popup__text_type_name');
const aboutPopup = contentPopup.querySelector('.popup__text_type_about');
const formPopup = editPage.querySelector('.popup__form');

//Универсальная функция открытия и закрытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

//Попап редактирования профиля
function openEditPagePopup() {
  openPopup(editPage);
  namePopup.value = titleProfile.textContent;
  aboutPopup.value = subtitleProfile.textContent;
};

function closeEditPagePopup() {
  closePopup(editPage);
}

function saveEditPagePopup (evt) {
  evt.preventDefault();
  titleProfile.textContent = namePopup.value;
  subtitleProfile.textContent = aboutPopup.value;
  closePopup(editPage);
};

editProfile.addEventListener('click', openEditPagePopup);
closeButton.addEventListener('click', closeEditPagePopup);
formPopup.addEventListener('submit', saveEditPagePopup);

//Новые карточки, кнопки удаления и лайков
const elementsContent = contentPage.querySelector('.elements');
const templateContent = contentPage
    .querySelector('.template')
    .content
    .querySelector('.elements__item');

const picPage = page.querySelector('.popup_type_pic');
const imagePicPopup = picPage.querySelector('.popup__image');
const namePicPopup = picPage.querySelector('.popup__name');
const closePicPopup = picPage.querySelector('.popup__close');


function createElement (initialCard) {
    const element = templateContent.cloneNode(true);

    const elementName = element.querySelector('.elements__title');
    elementName.textContent = initialCard.name;

    const elementLink = element.querySelector('.elements__image');
    elementLink.src = initialCard.link;
    elementLink.alt = initialCard.name;

    const deleteButton = element.querySelector('.elements__delete');
    const deleteElements = () => {
      element.remove();
    };

    deleteButton.addEventListener('click',deleteElements);

    const likeButton = element.querySelector('.elements__like');
    const likeElements = () => {
      likeButton.classList.toggle('elements__like_on');
    };

    likeButton.addEventListener('click',likeElements);
    
    //Попап картинки - открытие
    const openImagePopup = () => {
      openPopup(picPage);
      imagePicPopup.src = initialCard.link;
      imagePicPopup.alt = initialCard.name;
      namePicPopup.textContent = initialCard.name;
    }

    elementLink.addEventListener('click', openImagePopup);

    return element;
};

//Попап картинки - закрытие
const closeImagePopup = () => {
  closePopup(picPage);
}

closePicPopup.addEventListener('click', closeImagePopup);

function renderElements () {
    initialCard.forEach(item => {
        const elementHtml = createElement(item);
        elementsContent.append(elementHtml);
    });
};

renderElements ();


const newCardPage = page.querySelector('.popup_type_new-card');
const closeNewCardButton = newCardPage.querySelector('.popup__close');
const contentNewCardPopup = newCardPage.querySelector('.popup__content');
const titlePopup = contentNewCardPopup.querySelector('.popup__text_type_title');
const linkPopup = contentNewCardPopup.querySelector('.popup__text_type_link');
const formNewCardPopup = newCardPage.querySelector('.popup__form');
const addProfile = profile.querySelector('.profile__add');

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
    const newCard = createElement(contentNewCard);
    elementsContent.prepend(newCard);
    closePopup(newCardPage);
};

addProfile.addEventListener('click', openPopupNewCard);
closeNewCardButton.addEventListener('click', closePopupNewCard);
formNewCardPopup.addEventListener('submit', savePopupNewCard);








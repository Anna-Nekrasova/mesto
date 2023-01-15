let page = document.querySelector('.page');
let contentPage = page.querySelector('.content');
let profile = contentPage.querySelector('.profile');
let infoProfile = profile.querySelector('.profile__info');
let titleProfile = infoProfile.querySelector('.profile__title');
let subtitleProfile = infoProfile.querySelector('.profile__subtitle');
let editProfile = infoProfile.querySelector('.profile__edit');
let editPage = page.querySelector('.popup_type_edit');
let closePopup = editPage.querySelector('.popup__close');
let contentPopup = editPage.querySelector('.popup__content');
let namePopup = contentPopup.querySelector('.popup__text_type_name');
let aboutPopup = contentPopup.querySelector('.popup__text_type_about');
let formPopup = editPage.querySelector('.popup__form');


function popupOpened() {
    editPage.classList.add('popup_opened');
    namePopup.value = titleProfile.textContent;
    aboutPopup.value = subtitleProfile.textContent;
};

function popupClosed() {
    editPage.classList.remove('popup_opened');
};

function popupSaved (evt) {
    evt.preventDefault();
    titleProfile.textContent = namePopup.value;
    subtitleProfile.textContent = aboutPopup.value;
    editPage.classList.remove('popup_opened');
};

editProfile.addEventListener('click', popupOpened);
closePopup.addEventListener('click', popupClosed);
formPopup.addEventListener('submit', popupSaved);


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



const elementsContent = contentPage.querySelector('.elements');
const templateContent = contentPage
    .querySelector('.template')
    .content
    .querySelector('.elements__item');

const picPage = page.querySelector('.popup_type_pic');
const imagePicPopup = picPage.querySelector('.popup__image');
const namePicPopup = picPage.querySelector('.popup__name');
const closePicPopup = picPage.querySelector('.popup__close');


function createElements (initialCards) {
    const element = templateContent.cloneNode(true);

    const elementName = element.querySelector('.elements__title');
    elementName.textContent = initialCards.name;

    const elementLink = element.querySelector('.elements__image');
    elementLink.src = initialCards.link;

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

    const imageButton = element.querySelector('.elements__image')
    
    const popupImageOpened = () => {
      picPage.classList.add('popup_opened');
      imagePicPopup.src = initialCards.link;
      namePicPopup.textContent = initialCards.name;
    }

    const popupImageClosed = () => {
      picPage.classList.remove('popup_opened');
    }

    imageButton.addEventListener('click',popupImageOpened);
    closePicPopup.addEventListener('click', popupImageClosed);

    return element;
};

function renderElements () {
    initialCards.forEach(item => {
        const elementHtml = createElements(item);
        elementsContent.append(elementHtml);
    });
};

renderElements ();


let newCardPage = page.querySelector('.popup_type_new-card');
let closeNewCardPopup = newCardPage.querySelector('.popup__close');
let contentNewCardPopup = newCardPage.querySelector('.popup__content');
let titlePopup = contentNewCardPopup.querySelector('.popup__text_type_title');
let linkPopup = contentNewCardPopup.querySelector('.popup__text_type_link');
let formNewCardPopup = newCardPage.querySelector('.popup__form');
let addProfile = profile.querySelector('.profile__add');

function popupNewCardOpened() {
    newCardPage.classList.add('popup_opened');
};

function popupNewCardClosed() {
    newCardPage.classList.remove('popup_opened');
};


function popupNewCardSaved (evt) {
    evt.preventDefault();
    initialCards.unshift(
      {
        name: `${titlePopup.value}`,
        link: `${linkPopup.value}`
      })
    newCardPage.classList.remove('popup_opened');
    console.log(initialCards);
    const newCard = createElements(initialCards[0]);
    elementsContent.prepend(newCard);
};

addProfile.addEventListener('click', popupNewCardOpened);
closeNewCardPopup.addEventListener('click', popupNewCardClosed);
formNewCardPopup.addEventListener('submit', popupNewCardSaved);








let page = document.querySelector('.page');
let contentPage = page.querySelector('.content');
let profile = contentPage.querySelector('.profile');
let infoProfile = profile.querySelector('.profile__info');
let titleProfile = infoProfile.querySelector('.profile__title');
let subtitleProfile = infoProfile.querySelector('.profile__subtitle');
let editProfile = infoProfile.querySelector('.profile__edit');
let popupPage = page.querySelector('.popup');
let closePopup = popupPage.querySelector('.popup__close');
let contentPopup = popupPage.querySelector('.popup__content');
let namePopup = contentPopup.querySelector('.popup__text_type_name');
let aboutPopup = contentPopup.querySelector('.popup__text_type_about');
let formPopup = popupPage.querySelector('.popup__form');


function popupOpened() {
    popupPage.classList.add('popup_opened');
    namePopup.value = titleProfile.textContent;
    aboutPopup.value = subtitleProfile.textContent;
};

function popupClosed() {
    popupPage.classList.remove('popup_opened');
};


function popupSaved (evt) {
    evt.preventDefault();
    titleProfile.textContent = namePopup.value;
    subtitleProfile.textContent = aboutPopup.value;
    popupPage.classList.remove('popup_opened');
};

editProfile.addEventListener('click', popupOpened);
closePopup.addEventListener('click', popupClosed);
formPopup.addEventListener('submit', popupSaved);

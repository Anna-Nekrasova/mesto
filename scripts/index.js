let page = document.querySelector('.page');
let contentPage = page.querySelector('.content');
let profile = contentPage.querySelector('.profile');
let infoProfile = profile.querySelector('.profile__info');
let titleProfile = infoProfile.querySelector('.profile__title');
let subtitleProfile = infoProfile.querySelector('.profile__subtitle');
let editProfile = infoProfile.querySelector('.profile__edit');
let formPage = page.querySelector('.form');
let closeForm = formPage.querySelector('.form__close');
let contentForm = formPage.querySelector('.form__content');
let nameForm = contentForm.querySelector('.form__text_name');
let aboutForm = contentForm.querySelector('.form__text_about');
let saveForm = formPage.querySelector('.form__save');




function formOpened() {
    formPage.classList.add('form__opened');
    nameForm.value = titleProfile.textContent;
    aboutForm.value = subtitleProfile.textContent;
};

function formClosed() {
    formPage.classList.remove('form__opened');
};


function formSaved (evt) {
    evt.preventDefault();
    titleProfile.textContent = nameForm.value;
    subtitleProfile.textContent = aboutForm.value;
    formPage.classList.remove('form__opened');
};

editProfile.addEventListener('click', formOpened);
closeForm.addEventListener('click', formClosed);
formPage.addEventListener('submit', formSaved);

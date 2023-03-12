const initialCard = [
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

export { initialCard };

export const page = document.querySelector('.page');
export const contentPage = page.querySelector('.content');
export const profile = contentPage.querySelector('.profile');
export const infoProfile = profile.querySelector('.profile__info');
export const titleProfile = infoProfile.querySelector('.profile__title');
export const subtitleProfile = infoProfile.querySelector('.profile__subtitle');
export const editingProfile = infoProfile.querySelector('.profile__edit');
export const editingPage = page.querySelector('.popup_type_edit');
export const formPopup = editingPage.querySelector('.popup__form');
export const newCardPage = page.querySelector('.popup_type_new-card');
export const contentNewCardPopup = newCardPage.querySelector('.popup__content');
export const titlePopup = contentNewCardPopup.querySelector('.popup__text_type_title');
export const linkPopup = contentNewCardPopup.querySelector('.popup__text_type_link');
export const formNewCardPopup = newCardPage.querySelector('.popup__form');
export const additionProfile = profile.querySelector('.profile__add');
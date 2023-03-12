export default class Card {
  constructor(initialCard, templateSelector, handleCardClick) {
    this._name = initialCard.name;
    this._link = initialCard.link;
    this._templateSelector = templateSelector;
    //this._openImagePopup = openImagePopup;
    this._handleCardClick = handleCardClick;

    this._deleteElements = this._deleteElements.bind(this);
    this._likeElements = this._likeElements.bind(this);
    //this._openImage = this._openImage.bind(this);
}

_getTemplate() {
    const templateContent = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);

    return templateContent;
}

generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._likeButton = this._element.querySelector('.elements__like');

    this._element.querySelector('.elements__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._addEventListeners();

    return this._element;
}

_addEventListeners() {
    this._element
    .querySelector('.elements__delete')
    .addEventListener('click', this._deleteElements);

    this._likeButton
    .addEventListener('click', this._likeElements);

    /*this._cardImage
    .addEventListener('click', () => this._openImage(this._name, this._link));*/

    this._cardImage
    .addEventListener('click', () => this._handleCardClick({
        name: this._name,
        link: this._link,
    }));
}

_deleteElements() {
    this._element.remove();
}

_likeElements() {
    this._likeButton
    .classList
    .toggle('elements__like_on');
}

/*_openImage() {
    this._openImagePopup(this._name, this._link);
}*/
};
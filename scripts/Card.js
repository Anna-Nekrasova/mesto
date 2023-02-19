export default class Card {
  constructor(initialCard, templateSelector, openImagePopup) {
    this._name = initialCard.name;
    this._link = initialCard.link;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;

    this._deleteElements = this._deleteElements.bind(this);
    this._likeElements = this._likeElements.bind(this);
    this._openImage = this._openImage.bind(this);
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

    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__image').src = this._link;
    this._element.querySelector('.elements__image').alt = this._name;

    this._addEventListeners();

    return this._element;
}

_addEventListeners() {
    this._element
    .querySelector('.elements__delete')
    .addEventListener('click', this._deleteElements);

    this._element
    .querySelector('.elements__like')
    .addEventListener('click', this._likeElements);

    this._element
    .querySelector('.elements__image')
    .addEventListener('click', () => this._openImage(this._name, this._link));
}

_deleteElements() {
    this._element.remove();
}

_likeElements() {
    this._element
    .querySelector('.elements__like')
    .classList
    .toggle('elements__like_on');
}

_openImage() {
    this._openImagePopup(this._name, this._link);
}


};
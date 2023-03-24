export default class Card {
  constructor(initialCard, templateSelector, currentUserId, handleCardClick, deleteCard) {
    this._id = initialCard._id;
    this._name = initialCard.name;
    this._link = initialCard.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._isOwner = initialCard.owner._id === currentUserId;
    this._deleteCard = deleteCard;

    //this._deleteElements = this._deleteElements.bind(this);
    this._likeElements = this._likeElements.bind(this);
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

    if (!this._isOwner) {
        this._element.querySelector('.elements__delete').remove();
    }
    

    return this._element;
}

_addEventListeners() {
    this._element
    .querySelector('.elements__delete')
    .addEventListener('click', () => {this._deleteCard});

    this._likeButton
    .addEventListener('click', this._likeElements);

    this._cardImage
    .addEventListener('click', () => this._handleCardClick({
        name: this._name,
        link: this._link,
    }));
}

/*deleteElements() {
    this._deleteCard(this._id)
        .then(() => {
            this._element.remove();
        });
}*/

/*_deleteElements(callbackOpenPopup) {
    //callbackOpenPopup(this._element);
    this._element.remove();
}*/

_likeElements() {
    this._likeButton
    .classList
    .toggle('elements__like_on');
}
};
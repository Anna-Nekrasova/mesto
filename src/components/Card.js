export default class Card {
  constructor(initialCard, templateSelector, currentUserId, handleCardClick, deleteOrAddLikeCard, openConfirmationPopup) {
    this._id = initialCard._id;
    this._name = initialCard.name;
    this._link = initialCard.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._isOwner = initialCard.owner._id === currentUserId;
    this._openConfirmationPopup = openConfirmationPopup;
    this._likeCount = initialCard.likes.length;
    this._likes = initialCard.likes;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.elements__like');
    this._deleteOrAddLikeCard = deleteOrAddLikeCard;
    
    this._isLikedByMyself = this._isLikedCardByUser(currentUserId);
    this._setLikeIfNeeded();

    this.deleteButton = this._element.querySelector('.elements__delete');
}

_isLikedCardByUser(userId) {
    const userIdsWhoLikedCard = this._likes.map(like => like._id);
    return userIdsWhoLikedCard.includes(userId);
}

_setLikeIfNeeded() {
    if (this._isLikedByMyself) {
        this._toggleLike();
    }
}

_toggleLike() {
    this._likeButton
    .classList
    .toggle('elements__like_on');
}

_setLikeCount(count) {
    this._likeCountElements = this._element.querySelector('.elements__number');
    this._likeCountElements.textContent = count;
}

removeCard() {
    this._element.remove();
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
    this._cardImage = this._element.querySelector('.elements__image');
    this._element.querySelector('.elements__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setLikeCount(this._likeCount);

    this._addEventListeners();

    if (!this._isOwner) {
        this._element.querySelector('.elements__delete').remove();
    }
    
    return this._element;
}

_addEventListeners() {
    this._element
    .querySelector('.elements__delete')
    .addEventListener('click', () => {this._openConfirmationPopup(this)});

    this._likeButton
    .addEventListener('click', () => {this._deleteOrAddLikeCard(this)});

    this._cardImage
    .addEventListener('click', () => this._handleCardClick({
        name: this._name,
        link: this._link,
    }));
}

getMethodForLikeAction() {
    return this._isLikedByMyself ? 'DELETE' : 'PUT';
}

deleteOrAddLikeAndSetLikeCount(count) {
    this._toggleLike();
    this._isLikedByMyself = !this._isLikedByMyself;
    this._setLikeCount(count);
}
};
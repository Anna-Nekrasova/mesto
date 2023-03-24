import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, callbackDeleteCard) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__save');
        this._callbackDeleteCard = callbackDeleteCard;
    }

    setEventListeners() {
        super.setEventListeners;
        this._button.addEventListener('click', () => {this._callbackDeleteCard});
    }

    open() {
        super.open();
    }
}
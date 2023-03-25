import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePicPopup = this._popup.querySelector('.popup__image');
        this._namePicPopup = this._popup.querySelector('.popup__name');
    }

    open(name,link) {
        super.open();

        this._imagePicPopup.src = link;
        this._imagePicPopup.alt = name;
        this._namePicPopup.textContent = name;
    }
}
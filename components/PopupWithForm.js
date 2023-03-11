import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmitForm) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._popupInputs = this._popup.querySelectorAll('popup__text');
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        this._popupInputValues = {};
        this._popupInputs.forEach((input) => {
            this._popupInputValues[input.name] = input.value;
        });

        return this._popupInputValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._getInputValues();
            this._callbackSubmitForm(this._popupInputValues);
        })
    }

    close() {
        super.close();
        //this._popup.reset();
    }
}
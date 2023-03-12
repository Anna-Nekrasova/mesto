import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmitForm) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._popupInputs = this._popup.querySelectorAll('.popup__text');
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        const popupInputValues = {};
        this._popupInputs.forEach((input) => {
            popupInputValues[input.name] = input.value;
        });

        return popupInputValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const popupInputValues = this._getInputValues();
            this._callbackSubmitForm(popupInputValues);
        })
    }

    open(data) {
        this._popupInputs.forEach((input) => {
            input.value = '';
        });

        if (data) {
            this._popupInputs.forEach((input) => {
                input.value = data[input.id];
            });
        };
        super.open();
    }
}
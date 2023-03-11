export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);

        this._handleEscClose = this._handleEscClose.bind(this);
        this.close = this.close.bind(this);
        this._overlayClose = this._overlayClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    }

    _overlayClose(evt) {
        if (evt.currentTarget === evt.target) {
            this.close();
        };
    }

    setEventListeners() {
        document.querySelector('.popup__close')
        .addEventListener('click', this.close);

        this._popup.addEventListener('mousedown', this._overlayClose);
    }

}
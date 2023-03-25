import Popup from './Popup.js';
 
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
  }
 
  open() {
    super.open();
  }

  setAction(action) {
      this._popupForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        action();
    })
  }
}
import Popup from './Popup.js';
 
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popup.querySelector('.popup__save');
  }
 
  open() {
    super.open();
    return new Promise((resolve, reject) => {
 
      this._button.addEventListener('click', () => {
        resolve(true);
        this.close();
      });
 
      this._popup.querySelector('.popup__close')
          .addEventListener('click', () => {
            resolve(false);
            this.close();
          });
 
      this._popup.addEventListener('mousedown', (evt) => {
        if (evt.currentTarget === evt.target) {
          resolve(false);
          this.close();
        }
      });
 
    });
  }
}
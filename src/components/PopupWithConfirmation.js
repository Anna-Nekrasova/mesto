import Popup from './Popup.js';
 
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector/*, callbackSubmitForm*/) {
    super(popupSelector);
    //this._button = this._popup.querySelector('.popup__save');
    //this._openConfirmDeletePopup = openConfirmDeletePopup;
    this._popupForm = this._popup.querySelector('.popup__form');
    //this._callbackSubmitForm = callbackSubmitForm;
  }

  /*setEventListeners() {
    super.setEventListeners;
    this._button.addEventListener('click', () => {this._openConfirmDeletePopup});
  }*/
 
  open() {
    super.open();
    /*return new Promise((resolve, reject) => {
 
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
 
    });*/
  }

  setAction() {
      this._popupForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        //this._callbackSubmitForm();
    })
  }
}
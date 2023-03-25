export default class Section {
    constructor({renderer}, containerSelector/*, confirmPopupPromise, deleteCardPromise*/) {
      this._renderer = renderer;
      //this._cards = [];
      this._container = document.querySelector(containerSelector);
      //this._confirmPopupPromise = confirmPopupPromise;
      //this._deleteCardPromise = deleteCardPromise;
    }
  
    addItem(card) {
      //this._cards.push(card);
      this._container.prepend(/*card.generateCard()*/card);
      //this._addDeleteCardEvent(card);
    }
  
    /*_deleteItem(card) {
      const index = this._cards.indexOf(card);
      this._cards.splice(index, 1);
      this._container.removeChild(card.generateCard());
    }*/
  
    renderItems(items) {
      items.forEach((item) => {
        this._renderer(item);
      })
    }
  
    /*_addDeleteCardEvent(card) {
      card.deleteButton.addEventListener('click', () => {
        this._deleteCard(card);
      });
    }
  
    _deleteCard(card) {
      const promise = this._confirmPopupPromise();
      promise
        .then((answer) => {
          if (answer) {
            const deleteCardPromise = this._deleteCardPromise(card._id)
            deleteCardPromise
              .then(() => {
                this._deleteItem(card);
              })
              .catch((err) => {
                console.log(`Cant delete card, error: ${err}`);
              })
          }
        });
    }*/
  }
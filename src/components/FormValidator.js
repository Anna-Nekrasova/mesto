export default class FormValidator {
    constructor(obj, formElement) {
        this._formSelector = obj.formSelector;
        this._inputSelector = obj.inputSelector;
        this._submitButtonSelector = obj.submitButtonSelector;
        this._inactiveButtonClass = obj.inactiveButtonClass;
        this._inputErrorClass = obj.inputErrorClass;
        this._errorClass = obj.errorClass;
        this._formElement = formElement;
        this._buttonElement = formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        this._formList = Array.from(document.querySelector(this._formSelector));
    }

    _showError(inputElement, errorMessage) {
        this._formElement
        .querySelector(`.${inputElement.id}-error`)
        .textContent = errorMessage;
        inputElement.classList.add(this._inputErrorClass);
    }

    _hideError(inputElement) {
        this._formElement
        .querySelector(`.${inputElement.id}-error`)
        .textContent = '';
        inputElement.classList.remove(this._inputErrorClass);
    }

    _checkValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
          }
        else {
            this._hideError(inputElement);
          };
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    resetValidation() {
        this._toggleButtonState();
  
        this._inputList.forEach((inputElement) => {
          this._hideError(inputElement)
        });
    }
    

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
          }
        else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
          };
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}
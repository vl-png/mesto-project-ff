import '../styles/index.css';
import { addCard, handleFormSubmit, addFormSubmit } from './card.js';
import { openEditPopup, openPopup, closePopup } from './modal.js';
import {initialCards} from './cards.js';

export const cardsContainer = document.querySelector('.places__list'); //
export const EditButton = document.querySelector('.profile__edit-button');
export const AddButton = document.querySelector('.profile__add-button');
export const popupEdit = document.querySelector('.popup_type_edit'); //
export const popupAdd = document.querySelector('.popup_type_new-card'); //
export const popupImg = document.querySelector('.popup_type_image'); //
export const closeEditButton = popupEdit.querySelector('.popup__close');
export const closeAddButton = popupAdd.querySelector('.popup__close');
export const closeImgButton = popupImg.querySelector('.popup__close');
export const profileName = document.querySelector('.profile__title'); // //
export const profileJob = document.querySelector('.profile__description'); // //
export const formEdit = popupEdit.querySelector('[name="edit-profile"]');
export const nameInput = formEdit.querySelector('[name="name"]'); // //
export const jobInput = formEdit.querySelector('[name="description"]'); // //
export const formAdd = popupAdd.querySelector('[name="new-place"]'); //
export const placeInput = formAdd.querySelector('[name="place-name"]'); //
export const linkInput = formAdd.querySelector('[name="link"]'); //

initialCards.forEach(item => addCard(item));

EditButton.addEventListener('click', () => openEditPopup(popupEdit));

AddButton.addEventListener('click', () => openPopup(popupAdd));

closeEditButton.addEventListener('click', () => closePopup(popupEdit));

closeAddButton.addEventListener('click', () => closePopup(popupAdd));

closeImgButton.addEventListener('click', () => closePopup(popupImg));

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup(popupEdit);
    closePopup(popupAdd);
    closePopup(popupImg);
  }
});

document.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('.popup__content') || evt.target.closest('.popup__content')) {
    return;
  }
  closePopup(popupEdit);
  closePopup(popupAdd);
  closePopup(popupImg);
});

formEdit.addEventListener('submit', handleFormSubmit);

formAdd.addEventListener('submit', addFormSubmit);









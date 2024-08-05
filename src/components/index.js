import '../styles/index.css';
import { createCard, deleteCard, likeCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import {initialCards} from './cards.js';
import { validationConfig, enableValidation, clearValidation } from './form-validation.js';

const cardsContainer = document.querySelector('.places__list'); 
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit'); 
const popupAdd = document.querySelector('.popup_type_new-card'); 
const popupImg = document.querySelector('.popup_type_image'); 
const closeEditButton = popupEdit.querySelector('.popup__close');
const closeAddButton = popupAdd.querySelector('.popup__close');
const closeImgButton = popupImg.querySelector('.popup__close')
const profileName = document.querySelector('.profile__title'); 
const profileJob = document.querySelector('.profile__description'); 
const formEdit = popupEdit.querySelector('[name="edit-profile"]');
const nameInput = formEdit.querySelector('[name="name"]'); 
const jobInput = formEdit.querySelector('[name="description"]'); 
const formAdd = popupAdd.querySelector('[name="new-place"]'); 
const placeInput = formAdd.querySelector('[name="place-name"]'); 
const linkInput = formAdd.querySelector('[name="link"]'); 
const popupImage = popupImg.querySelector('.popup__image');
const popupTitle = popupImg.querySelector('.popup__caption');

function addCard(item) {
  cardsContainer.prepend(createCard(item, deleteCard, likeCard, openImgPopup))
};

initialCards.forEach(item => addCard(item));

editButton.addEventListener('click', () => openEditPopup(popupEdit));

addButton.addEventListener('click', () => openAddPopup(popupAdd));

closeEditButton.addEventListener('click', () => closePopup(popupEdit));

closeAddButton.addEventListener('click', () => closePopup(popupAdd));

closeImgButton.addEventListener('click', () => closePopup(popupImg));

formEdit.addEventListener('submit', profileFormSubmit);

formAdd.addEventListener('submit', addFormSubmit);

function openAddPopup(element) {
  formAdd.reset()
  clearValidation(element, validationConfig);
  openPopup(element);
};

function openImgPopup(element) {
  popupImage.src = element.src;
  popupImage.alt = element.alt;
  popupTitle.textContent = element.alt;
  openPopup(popupImg);
};

function openEditPopup(element) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(element, validationConfig);
  openPopup(element);
};

function profileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
};

function addFormSubmit(evt) {
  evt.preventDefault();
  const add = {
  name: placeInput.value,
  link: linkInput.value
  };
  addCard(add);
  closePopup(popupAdd);
  formAdd.reset();
}

enableValidation(validationConfig);
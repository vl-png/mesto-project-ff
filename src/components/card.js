import { cardsContainer, popupEdit, popupAdd, popupImg, profileName, profileJob, nameInput, jobInput, placeInput, linkInput, formAdd } from './index.js';
import { openPopup, closePopup } from './modal.js';

export function createCard(item, deleteCallback, likeCallback, imgPopupCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCallback);
  cardImage.addEventListener('click', () => imgPopupCallback(cardImage));

  return cardElement;
};

export function addCard(item) {
  cardsContainer.prepend(createCard(item, deleteCard, likeCard, openImgPopup))
};

export function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

export function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
};

export function openImgPopup(element) {
  const popupImage = popupImg.querySelector('.popup__image');
  const popupTitle = popupImg.querySelector('.popup__caption');
  popupImage.src = element.src;
  popupTitle.textContent = element.alt;
  openPopup(popupImg);
};

export function addFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.

const add = {
  name: placeInput.value,
  link: linkInput.value
};
addCard(add);
closePopup(popupAdd);
formAdd.reset();
}


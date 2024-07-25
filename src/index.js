import './styles/index.css';
//DOM узлы

const cardsContainer = document.querySelector('.places__list');

//Темплейт карточки

function createCard(item, deleteCallback, likeCallback, imgPopupCallback) {
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

//Функция создания карточки

function addCard(item) {
  cardsContainer.prepend(createCard(item, deleteCard, likeCard, openImgPopup))
};

//Функция удаления карточки

function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

// Функция лайка карточки

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

//Вывести карточки на страницу

import {initialCards} from './cards.js';

initialCards.forEach(item => addCard(item));
;


// // Работа модальных окон

// открытие

const EditButton = document.querySelector('.profile__edit-button');
const AddButton = document.querySelector('.profile__add-button');


const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');

// Функция открытия попапа

function openEditPopup(element) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(element);
};


function openPopup(element) {
  element.classList.add('popup_is-opened');
};

EditButton.addEventListener('click', () => openEditPopup(popupEdit));

AddButton.addEventListener('click', () => openPopup(popupAdd));




// закрытие

const closeEditButton = popupEdit.querySelector('.popup__close');
const closeAddButton = popupAdd.querySelector('.popup__close');


// функция закрытия

function closePopup(element) {
  element.classList.remove('popup_is-opened');
};

closeEditButton.addEventListener('click', () => closePopup(popupEdit));

closeAddButton.addEventListener('click', () => closePopup(popupAdd));



document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup(popupEdit);
    closePopup(popupAdd);
  }
});

document.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('.popup__content') || evt.target.closest('.popup__content')) {
    return;
  }
  closePopup(popupEdit);
  closePopup(popupAdd);
});

// Редактирование имени и информации о себе

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const formEdit = popupEdit.querySelector('[name="edit-profile"]');
const nameInput = formEdit.querySelector('[name="name"]');
const jobInput = formEdit.querySelector('[name="description"]');


function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    
    closePopup(popupEdit);
}

formEdit.addEventListener('submit', handleFormSubmit);



// Добавление новой карточки через форму

const formAdd = popupAdd.querySelector('[name="new-place"]');
const placeInput = formAdd.querySelector('[name="place-name"]');
const linkInput = formAdd.querySelector('[name="link"]');


function addFormSubmit(evt) {
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

formAdd.addEventListener('submit', addFormSubmit);


// Открытия попапа карточки 


function openImgPopup(element) {
  const popup = document.querySelector('.popup_type_image');
  const popupImage = popup.querySelector('.popup__image');
  const popupTitle = popup.querySelector('.popup__caption');

  popupImage.src = element.src;
  popupTitle.textContent = element.alt;

  const closeImgButton = popup.querySelector('.popup__close');

  closeImgButton.addEventListener('click', () => closePopup(popup));

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
  
  document.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('.popup__content') || evt.target.closest('.popup__content')) {
      return;
    }
    closePopup(popup);
  });

  openPopup(popup);
};





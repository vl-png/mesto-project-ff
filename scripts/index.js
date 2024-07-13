//DOM узлы

const cardsContainer = document.querySelector('.places__list');

//Темплейт карточки

function createCard(item, deleteCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);

  return cardElement;
};

//Функция создания карточки

function addCard(item) {
  cardsContainer.append(createCard(item, deleteCard))
};

//Функция удаления карточки

function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

//Вывести карточки на страницу

initialCards.forEach(item => addCard(item));
;
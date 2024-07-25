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

export function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};







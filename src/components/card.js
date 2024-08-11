import { deleteCardOnServer, putLikeCard, deleteLikeCard } from "./api.js";

export function createCard(
  item,
  deleteCallback,
  likeCallback,
  imgPopupCallback,
  userId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardImage.addEventListener("click", () => imgPopupCallback(cardImage));

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const userCardId = item.owner["_id"];
  const cardId = item._id;

  if (userId === userCardId) {
    deleteButton.addEventListener("click", () =>
      deleteCallback(cardId, cardElement)
    );
  } else {
    deleteButton.remove();
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  const iconLikeCount = cardElement.querySelector(".like__counter");
  const likes = item.likes;
  const likesCount = likes.length;
  iconLikeCount.textContent = likesCount;

  function isLiked(likes) {
    return likes.some((like) => like._id === userId);
  }

  if (isLiked(likes)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    likeCallback(cardId, isLiked(item.likes), likeButton, iconLikeCount, item);
  });

  return cardElement;
}

export function likeCard(cardId, isLiked, likeButton, iconLikeCount, item) {
  const method = isLiked ? deleteLikeCard : putLikeCard;
  method(cardId)
    .then((res) => {
      likeButton.classList.toggle("card__like-button_is-active");
      iconLikeCount.textContent = res.likes.length;
      item.likes = res.likes;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deleteCard(cardId, cardElement) {
  deleteCardOnServer(cardId)
    .then(() => cardElement.remove())
    .catch((err) => {
      console.log(err);
    });
}

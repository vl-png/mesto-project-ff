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

  if (likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  function toggleLike(cardId) {
    const method = isLiked(item.likes) ? deleteLikeCard : putLikeCard;
    method(cardId)
      .then((res) => {
        likeCallback(likeButton, res, iconLikeCount);
        item.likes = res.likes;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  likeButton.addEventListener("click", () => {
    toggleLike(cardId);
  });

  return cardElement;
}

export function likeCard(likeButton, res, iconLikeCount) {
  likeButton.classList.toggle("card__like-button_is-active");
  iconLikeCount.textContent = res.likes.length;
}

export function deleteCard(cardId, cardElement) {
  deleteCardOnServer(cardId)
    .then(() => cardElement.remove())
    .catch((err) => {
      console.log(err);
    });
}

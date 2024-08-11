import "../styles/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import {
  enableValidation,
  clearValidation,
} from "./form-validation.js";
import {
  getDataProfile,
  getInitialCards,
  editProfileInfo,
  postCard,
  editPofileImage,
} from "./api.js";
import { validationConfig } from "./validationConfig.js";

const cardsContainer = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImg = document.querySelector(".popup_type_image");
const popupProfileImage = document.querySelector(
  ".popup_type_new-profile_image"
);
const closeEditButton = popupEdit.querySelector(".popup__close");
const closeAddButton = popupAdd.querySelector(".popup__close");
const closeImgButton = popupImg.querySelector(".popup__close");
const closeProfileImage = popupProfileImage.querySelector(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileImg = document.querySelector(".profile__image");
const formEdit = popupEdit.querySelector('[name="edit-profile"]');
const nameInput = formEdit.querySelector('[name="name"]');
const jobInput = formEdit.querySelector('[name="description"]');
const formAdd = popupAdd.querySelector('[name="new-place"]');
const placeInput = formAdd.querySelector('[name="place-name"]');
const linkInput = formAdd.querySelector('[name="link"]');
const formProfileImage = popupProfileImage.querySelector(
  '[name="new-profile_image"]'
);
const profileImageInput = formProfileImage.querySelector(
  '[name="profile_image"]'
);
const popupImage = popupImg.querySelector(".popup__image");
const popupTitle = popupImg.querySelector(".popup__caption");

editButton.addEventListener("click", () => openEditPopup(popupEdit));

addButton.addEventListener("click", () => openAddPopup(popupAdd));

profileImg.addEventListener("click", () =>
  openProfileImagePopup(popupProfileImage)
);

closeEditButton.addEventListener("click", () => closePopup(popupEdit));

closeAddButton.addEventListener("click", () => closePopup(popupAdd));

closeImgButton.addEventListener("click", () => closePopup(popupImg));

closeProfileImage.addEventListener("click", () =>
  closePopup(popupProfileImage)
);

formEdit.addEventListener("submit", profileFormSubmit);

formAdd.addEventListener("submit", addFormSubmit);

formProfileImage.addEventListener("submit", profileImageFormSubmit);

function openAddPopup(element) {
  formAdd.reset();
  clearValidation(element, validationConfig);
  openPopup(element);
}

function openImgPopup(element) {
  popupImage.src = element.src;
  popupImage.alt = element.alt;
  popupTitle.textContent = element.alt;
  openPopup(popupImg);
}

function openEditPopup(element) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(element, validationConfig);
  openPopup(element);
}

function openProfileImagePopup(element) {
  formProfileImage.reset();
  clearValidation(element, validationConfig);
  openPopup(element);
}

function profileImageFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupProfileImage);
  editPofileImage(profileImageInput.value)
    .then((result) => {
      profileImg.setAttribute(
        "style",
        `background-image: url('${result.avatar}')`
      );
      closePopup(popupProfileImage);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, popupProfileImage);
    });
}

function profileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupEdit);
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  editProfileInfo({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((res) => {
      profileName.textContent = res.name;
      profileJob.textContent = res.about;
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.error("Произошла ошибка:", err);
    })
    .finally(() => {
      renderLoading(false, popupEdit);
    });
}

function addFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupAdd);
  const add = {
    name: placeInput.value,
    link: linkInput.value,
  };
  postCard(add)
    .then((res) => {
      cardsContainer.prepend(
        createCard(res, deleteCard, likeCard, openImgPopup, res.owner._id)
      );
      closePopup(popupAdd);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupAdd);
    });

  formAdd.reset();
}

enableValidation(validationConfig);

function renderLoading(isLoading, Element) {
  const activeButton = Element.querySelector(".popup__button");
  activeButton.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

Promise.all([getDataProfile(), getInitialCards()])
  .then(([info, initialCards]) => {
    profileName.textContent = info.name;
    profileJob.textContent = info.about;
    profileImg.setAttribute("style", `background-image: url('${info.avatar}')`);
    initialCards.forEach((item) =>
      cardsContainer.append(
        createCard(item, deleteCard, likeCard, openImgPopup, info._id)
      )
    );
  })
  .catch((err) => {
    console.log(err);
  });

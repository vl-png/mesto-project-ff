import {profileName, profileJob, nameInput, jobInput} from './index.js';

export function openEditPopup(element) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(element);
};

export function openPopup(element) {
  element.classList.add('popup_is-opened');
};

export function closePopup(element) {
  element.classList.remove('popup_is-opened');
};





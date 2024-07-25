export function openPopup(element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
  element.addEventListener('mousedown', closeByOverlay);
};

export function closePopup(element) {
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
  element.removeEventListener('mousedown', closeByOverlay);
};

const closeByEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
    }
  };

const closeByOverlay = (evt) => {
  if (evt.target.classList.contains('popup__content') || evt.target.closest('.popup__content')) {
    return;
  }
  closePopup(document.querySelector('.popup_is-opened'));
};

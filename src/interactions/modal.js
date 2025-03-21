import { attr, checkBreakpoints } from '../utilities';

export const modal = function (gsapContext, pagePlayers, pagePlayerComponents) {
  const ANIMATION_ID = 'modal';
  //Selectors
  const MODAL_WRAP = '[data-ix-modal="wrap"]'; //a modal item
  const MODAL_TRIGGER = '[data-ix-modal="trigger"]'; //element to trigger modal
  const MODAL_CLOSE_BTN = '[data-ix-modal="close"]';
  const TIMEOUT = 'data-ix-modal-timeout';
  const DEFAULT_TIMEOUT = 3;

  //classes
  const NO_SCROLL = 'no-scroll';
  //global variables
  let activeModal = false;

  //Arrays of modal and video player elements
  const modals = [...document.querySelectorAll(MODAL_WRAP)];

  if (modals.length === 0) return;
  modals.forEach((modal, index) => {
    //get the parent element of the trigger, and find the modal within that element
    const closeButtons = [...modal.querySelectorAll(MODAL_CLOSE_BTN)];
    const timeout = attr(DEFAULT_TIMEOUT, modal.getAttribute(TIMEOUT));

    //open modal after timeout
    setTimeout(() => {
      openModal();
    }, timeout * 1000);

    //get the player for this modal
    // process key events in the modal
    modal.addEventListener('keydown', (e) => {
      // if escape is pressed when modal is open, close lightbox
      if (e.key === 'Escape' && activeModal !== false) {
        closeModal(modal);
      }
    });

    // process click events in the modal
    modal.addEventListener('click', (e) => {
      // Check if the clicked element is a close button inside a dialog
      if (e.target.closest(MODAL_CLOSE_BTN) !== null) {
        // Find the closest dialog parent and close it
        closeModal(modal);
      }
    });
  });

  const openModal = function (modal) {
    if (!modal) return;
    modal.showModal();
    //   modalThumbnails(modal, player);
    body.classList.add(NO_SCROLL);
    activeModal = modal;
  };
  const closeModal = function (modal) {
    if (!modal) return;
    modal.close();
    body.classList.remove(NO_SCROLL);
    activemodal = false;
  };
};

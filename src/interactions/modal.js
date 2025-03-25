import { attr, attrIfSet, startScroll, stopScroll } from '../utilities';

export const modal = function (gsapContext, lenis) {
  const ANIMATION_ID = 'modal';
  //Selectors
  const MODAL_WRAP = '[data-ix-modal="wrap"]'; //a modal item
  const MODAL_TRIGGER = 'data-ix-modal-trigger'; //id of element to trigger modal
  const MODAL_CLOSE_BTN = '[data-ix-modal="close"]';
  const TIMEOUT = 'data-ix-modal-timeout';
  const MODAL_TRIGGER_DEFAULT = 'blank-id';
  const DEFAULT_TIMEOUT = 3;

  //global variables
  let activeModal = false;

  //Arrays of modal and video player elements
  const modals = [...document.querySelectorAll(MODAL_WRAP)];

  if (modals.length === 0) return;
  modals.forEach((modal, index) => {
    //get the parent element of the trigger, and find the modal within that element
    const closeButtons = [...modal.querySelectorAll(MODAL_CLOSE_BTN)];
    const timeout = attr(DEFAULT_TIMEOUT, modal.getAttribute(TIMEOUT));
    const triggerID = attr(MODAL_TRIGGER_DEFAULT, modal.getAttribute(MODAL_TRIGGER));

    //if trigger id attribute is not default
    if (triggerID !== MODAL_TRIGGER_DEFAULT) {
      const trigger = document.querySelector(`#${triggerID}`);
      //find trigger and open modal on click
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          // Find the closest dialog parent and close it
          openModal(modal);
        });
      }
    } else {
      //otherwise open based on timer
      setTimeout(() => {
        openModal(modal);
      }, timeout * 1000);
    }

    // process key events in the modal
    modal.addEventListener('keydown', (e) => {
      // if escape is pressed when modal is open, close lightbox
      if (e.key === 'Escape' && activeModal !== false) {
        closeModal(modal);
      }
    });

    // process click events for close buttons
    closeButtons.forEach((item) => {
      item.addEventListener('click', (e) => {
        closeModal(modal);
      });
    });
  });

  const openModal = function (modal) {
    if (!modal) return;
    modal.showModal();
    stopScroll();
    activeModal = modal;
  };
  const closeModal = function (modal) {
    if (!modal) return;
    modal.close();
    startScroll();
    activemodal = false;
  };
};

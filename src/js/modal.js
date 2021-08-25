import sprite from '../images/sprite.svg';

export default (component, listeners) => {
  const container = document.querySelector('.modal');

  function closeModalComponent() {
    container.innerHTML = '';
    container.classList.remove('is-open');
    document.body.style.overflow = 'auto';
    window.removeEventListener('keydown', closeModalWindow);
  }

  function closeModalWindow(e) {
    if (e.key === 'Escape') {
      closeModalComponent();
    }
  }

  const markup = `
    <div class="modal__overlay"></div>
    <div class="modal__content">
      <button class="btn-close" type="button" data-action="close">
        <svg width="21px" height="21px">
          <use href="${sprite}#close"></use>
        </svg>
      </button>
    </div>
  `;

  container.classList.add('is-open');
  container.innerHTML = markup;
  document.body.style.overflow = 'hidden';
  const modalComponent = container.querySelector('.modal__content');
  modalComponent.insertAdjacentHTML('beforeend', component());
  listeners(closeModalComponent);
  const modalOverlay = container.querySelector('.modal__overlay');
  const btnClose = container.querySelector('[data-action="close"]');
  btnClose.addEventListener('click', closeModalComponent);
  modalOverlay.addEventListener('click', closeModalComponent);
  window.addEventListener('keydown', closeModalWindow);
};

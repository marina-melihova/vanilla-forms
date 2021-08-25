import modal from './modal';
import sprite from '../images/sprite.svg';

// const urlReg = 'https://api.investnix.com/v1/user/signup';
const urlLogin = 'https://api.investnix.com/v1/user/login';
const bearerToken = 'Kjdijoij{oq123!kdlsOp';
const bearer = 'Bearer ' + bearerToken;

let isHidden = true;
const eyeMarkup = (isOpen) => `
    <svg class="form__item-icon" width="24px" height="24px">
      <use href="${sprite}#${isOpen ? 'eye' : 'eye_close'}"></use>
    </svg>
  `;

const loginMarkUp = () => `
  <h4 class="modal__title">Login</h4>
  <form name="login" class="form">
    <div class="form__body">
      <div class="form__item">
        <input type="email" id="email" name="email" class="form__item-input form__item-input--text" placeholder=" " />
        <label for="email" class="form__item-label">Email</label>
        <div class="helper-text-div"></div>
      </div>
      <div class="form__item">
        <div class="form__item-toggle">
          ${eyeMarkup(isHidden)}
        </div>
        <input type="password" id="password" name="password" class="form__item-input form__item-input--password" placeholder=" " />
        <label for="password" class="form__item-label">Password</label>
        <div class="helper-text-div"></div>
      </div>
    </div>
    <button type="submit" class="form__btn btn">Login</button>
  </form>
`;

const onLogin = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  try {
    const response = await fetch(urlLogin, {
      method: 'POST',
      headers: { Authentication: bearer },
      body: formData,
    });
    const info = await response.json();
    console.log('Success:', JSON.stringify(info));
  } catch (error) {
    console.log('Error:', error);
  }
};

const listeners = (closeModal) => {
  const formRef = document.querySelector('[name="login"]');
  formRef.addEventListener('submit', closeModal);
};

const onToggle = (e) => {
  const formItem = e.target.closest('.form__item');
  const inputRef = formItem.querySelector('input');
  const toggleRef = formItem.querySelector('.form__item-toggle');
  isHidden = !isHidden;
  inputRef.type = isHidden ? 'password' : 'text';
  toggleRef.innerHTML = eyeMarkup(isHidden);
};

const showLogin = () => {
  modal(loginMarkUp, listeners);
  const formRef = document.querySelector('[name="login"]');
  const toggleRef = document.querySelector('.form__item-toggle');

  formRef.addEventListener('submit', onLogin);
  toggleRef.addEventListener('click', onToggle);
};

export default showLogin;

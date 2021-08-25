import modal from './modal';
import sprite from '../images/sprite.svg';

const urlReg = 'https://api.investnix.com/v1/user/signup';
const bearerToken = 'Kjdijoij{oq123!kdlsOp';
const bearer = 'Bearer ' + bearerToken;

let isHiddenPwd = true;
let isHiddenPwdConfirm = true;
const eyeMarkup = (isOpen) => `
    <svg class="form__item-icon" width="24px" height="24px">
      <use href="${sprite}#${isOpen ? 'eye' : 'eye_close'}"></use>
    </svg>
  `;

const regMarkUp = () => `
  <h4 class="modal__title">Create account</h4>
  <form name="reg" class="form">
    <div class="form__body">
      <div class="form__item">
        <input type="email" name="email" class="form__item-input form__item-input--text" placeholder=" " />
        <label for="email" class="form__item-label">Email</label>
        <div class="helper-text-div"></div>
      </div>
      <div class="form__item">
        <input type="text" name="username" class="form__item-input form__item-input--text" placeholder=" " />
        <label for="name" class="form__item-label">Nickname</label>
        <div class="helper-text-div"></div>
      </div>
      <div class="form__item">
        <div class="form__item-toggle" id="password">
          ${eyeMarkup(isHiddenPwd)}
        </div>
        <input type="password" name="password" class="form__item-input form__item-input--password" placeholder=" " />
        <label for="password" class="form__item-label">Password</label>
        <div class="helper-text-div"></div>
      </div>
      <div class="form__item">
        <div class="form__item-toggle" id="passwordConfirm">
          ${eyeMarkup(isHiddenPwdConfirm)}
        </div>
        <input type="password" name="password_confirmation" class="form__item-input form__item-input--password" placeholder=" " />
        <label for="passwordConfirm" class="form__item-label">Repeat password</label>
        <div class="helper-text-div"></div>
      </div>
    </div>
    <button type="submit" class="form__btn btn">Create account</button>
  </form>
`;

const onReg = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  try {
    const response = await fetch(urlReg, {
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
  const formRef = document.querySelector('[name="reg"]');
  formRef.addEventListener('submit', closeModal);
};

const onToggle = (e) => {
  const formItem = e.target.closest('.form__item');
  const inputRef = formItem.querySelector('input');
  const toggleRef = formItem.querySelector('.form__item-toggle');
  let isOpen = true;
  switch (toggleRef.id) {
    case 'password':
      isHiddenPwd = !isHiddenPwd;
      isOpen = isHiddenPwd;
      break;
    case 'passwordConfirm':
      isHiddenPwdConfirm = !isHiddenPwdConfirm;
      isOpen = isHiddenPwdConfirm;
      break;
    default:
      // console.log('input without listener');
      break;
  }
  inputRef.type = isOpen ? 'password' : 'text';
  toggleRef.innerHTML = eyeMarkup(isOpen);
};

const showReg = () => {
  modal(regMarkUp, listeners);
  const formRef = document.querySelector('[name="reg"]');
  const pwdRef = document.getElementById('password');
  const pwdConfirmRef = document.getElementById('passwordConfirm');

  formRef.addEventListener('submit', onReg);
  pwdRef.addEventListener('click', onToggle);
  pwdConfirmRef.addEventListener('click', onToggle);
};

export default showReg;

import './styles/main.scss';
import sprite from './images/sprite.svg';

const header = document.createElement('header');
header.classList.add('header');
const title = document.createElement('h1');
title.classList.add('title');
title.textContent = 'Welcome!';
header.appendChild(title);
const rootRef = document.querySelector('#root');
rootRef.appendChild(header);
let isHidden = true;
const eyeMarkup = (isOpen) => `
    <svg class="form__item-icon" width="24px" height="24px">
      <use href="${sprite}#${isOpen ? 'eye' : 'eye_close'}"></use>
    </svg>
  `;
const inputMarkup = (id, label, type) => {
  const toggleMarkUp = () => `
      <div class="form__item-toggle" data-state="${isHidden ? 'hidden' : 'visible'}">
        ${eyeMarkup(isHidden)}
      </div>
    `;
  let inputType = type;
  if (type === 'password') {
    inputType = isHidden ? 'password' : 'text';
  }
  return `${type === 'password' ? toggleMarkUp() : ''}
      <input type=${inputType} id=${id} name=${id} class="form__item-input" 
      placeholder="Enter password" autocomplete="off">
      <label for=${id}>${label}</label>
  `;
};

const formItemMarkup = (id, label, type = 'text') => {
  const pwdType = label === 'Repeat Password' ? 'passwordConfirm' : 'password';
  return `
    <div class="form__item" data-type=${type === 'password' ? pwdType : type}>
      ${inputMarkup(id, label, type)}
    </div>
  `;
};
const formMarkup = () => `
  <form class="form">
    ${formItemMarkup('password', 'Password', 'password')}
    ${formItemMarkup('agree', 'I agree with Terms and Policies', 'checkbox')}
  </form>
`;
const temp = document.createElement('div');
temp.innerHTML = formMarkup();
header.appendChild(temp);
const toggleRef = document.querySelector('.form__item-toggle');
function onToggle(e) {
  const formItem = e.target.closest('.form__item');
  const inputRef = formItem.querySelector('input');
  isHidden = !isHidden;
  inputRef.type = isHidden ? 'password' : 'text';
  toggleRef.innerHTML = eyeMarkup(isHidden);
}
toggleRef.addEventListener('click', onToggle);

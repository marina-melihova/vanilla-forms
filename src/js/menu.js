import showLogin from './login';
import showReg from './reg';

const menuMarkup = function () {
  return `
    <div class="menu">
      <button class="menu__btn" data-action="reg">Register</button>
      <button class="menu__btn" data-action="login">Login</button>
    </div>
  `;
};

export default () => {
  const header = document.querySelector('.header');
  header.insertAdjacentHTML('beforeend', menuMarkup());
  const buttons = document.querySelectorAll('[data-action]');
  for (let i = 0; i < buttons.length; i += 1) {
    switch (buttons[i].dataset.action) {
      case 'login':
        buttons[i].addEventListener('click', showLogin);
        break;
      case 'reg':
        buttons[i].addEventListener('click', showReg);
        break;
      default:
        // console.log('button without listener');
        break;
    }
  }
};

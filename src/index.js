import './styles/main.scss';
import createMenu from './js/menu';

const rootRef = document.querySelector('#root');

const header = document.createElement('header');
header.classList.add('header');
const title = document.createElement('h1');
title.classList.add('title');
title.textContent = 'Welcome!';
header.appendChild(title);
rootRef.appendChild(header);
const modal = document.createElement('div');
modal.classList.add('modal');
rootRef.appendChild(modal);
createMenu();

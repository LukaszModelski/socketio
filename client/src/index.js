import './styles/main.scss';

import { io } from 'socket.io-client';

const socket = io('localhost:3000');

const SELECTORS = {
  nameInput: '.nameInput',
  submitNameBtn: '.submitNameBtn',
  chatWindow: '.chatWindow',
}

const DOM = {
  nameInput: document.querySelector(SELECTORS.nameInput),
  submitNameBtn: document.querySelector(SELECTORS.submitNameBtn),
  chatWindow: document.querySelector(SELECTORS.chatWindow),
}

const eventListeners = () => {
  // Click listener
  DOM.submitNameBtn.addEventListener('click', () => {
    if(DOM.nameInput.value) {
      socket.emit('new user', DOM.nameInput.value);
      DOM.nameInput.setAttribute('disabled', true);
      DOM.submitNameBtn.setAttribute('disabled', true);
    }
  });

  // socket listeners
  socket.on('users', users => printUsers(users));
}

const printUsers = users => {
  DOM.chatWindow.innerHTML = '';
  users.forEach(user => {
    DOM.chatWindow.innerHTML += `<p>${user}</p>`;
  });
}

eventListeners();

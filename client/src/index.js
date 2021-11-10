import './styles/main.scss';

import { io } from 'socket.io-client';

const socket = io('localhost:3000');

const SELECTORS = {
  newUserForm: '.newUserForm',
  nameInput: '.newUserForm__nameInput',
  submitNameBtn: '.newUserForm__submitBtn',
  userList: '.usersList',
  chatWindow: '.chatWindow',
  messageForm: '.messageForm',
  msgInput: '.messageForm__msgInput',
  submitMessageBtn: '.messageForm__submitBtn'
}

const DOM = {
  newUserForm: document.querySelector(SELECTORS.newUserForm),
  nameInput: document.querySelector(SELECTORS.nameInput),
  submitNameBtn: document.querySelector(SELECTORS.submitNameBtn),
  usetList: document.querySelector(SELECTORS.userList),
  chatWindow: document.querySelector(SELECTORS.chatWindow),
  messageForm: document.querySelector(SELECTORS.messageForm),
  msgInput: document.querySelector(SELECTORS.msgInput),
  submitMessageBtn: document.querySelector(SELECTORS.submitMessageBtn),
}

let userName;

const eventListeners = () => {
  DOM.newUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(DOM.nameInput.value) {
      userName = DOM.nameInput.value;
      socket.emit('new user', userName);
      DOM.nameInput.setAttribute('disabled', true);
      DOM.submitNameBtn.setAttribute('disabled', true);
      DOM.msgInput.removeAttribute('disabled');
      DOM.submitMessageBtn.removeAttribute('disabled');
    }
  });

  DOM.messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (DOM.msgInput.value && userName) {
      socket.emit('new message', {user: userName, message: DOM.msgInput.value});
      DOM.msgInput.value = '';
    }
  });

  // socket listeners
  socket.on('users', users => printUsers(users));
  socket.on('messages', messages => printMessages(messages));
}

const printUsers = users => {
  DOM.usetList.innerHTML = '';
  users.forEach(user => {
    DOM.usetList.innerHTML += `<li class="usersList__item">${user}</li>`;
  });
}

const printMessages = messages => {
  console.log(messages);
  DOM.chatWindow.innerHTML = '';
  messages.forEach(message => {
    DOM.chatWindow.innerHTML += `
      <label class="chatWindow__userName">${message.user}:</label>
      <p class="chatWindow__message">${message.message}</p>
    `;
  });
}

eventListeners();

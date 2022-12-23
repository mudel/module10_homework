// 0.6 Event Source, WebSocket Задание 3.
// Запуск после загрузки DOM

document.addEventListener('DOMContentLoaded', function() {

// Ноды ввода-вывода

const inputMessage = document.querySelector(".online-input");
const btn = document.querySelector('.btn');
const winCchat = document.querySelector('.win-chat');
const echoUrl = "wss://echo-ws-service.herokuapp.com";
let display = [];
let websocket;

// Инициализация WebSocket
websocket = new WebSocket(echoUrl);
websocket.onopen = function(evt) {
    console.log("Connected");
  };

websocket.onerror = function(evt) {
    console.log("Error");
  };

// Ожидание входящих сообщений
websocket.onmessage = function(evt) {
    displayResult(evt.data);
  };


  // Функция вывода результата в окно чата
  function displayResult(newMessage, meOrServer='server') {
    if (display.length < 10) {
      display.push(`
        <div class=${meOrServer}>
        <span>${newMessage}</span>
        </div>
      `
        );
    } else {
        display.splice(9, 1,`
        <div class=${meOrServer}>
        <span>${newMessage}</span>
        </div>
      `
          );
    }
    winCchat.innerHTML = display.join('');
  }

   
  // Обработчик клика на кнопку 
  btn.addEventListener('click', () => {
      // Передача введенной строки в окно чата
      displayResult(inputMessage.value, 'me');
      // Отправка введенной строки через WebSocket
      websocket.send(inputMessage.value);
      inputMessage.value = '';
  });

}, false);








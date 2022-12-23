// 10.6 Event Source, WebSocket Задание 3 + геолокация
// Запуск после загрузки DOM

document.addEventListener('DOMContentLoaded', function() {

// Ноды ввода-вывода
const inputMessage = document.querySelector(".online-input");
const btn = document.querySelector('.btn');
const btnGeo = document.querySelector('.geo');
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
  function displayResult(newMessage, meOrServer='server', thisIsGeo=false) {
    if (thisIsGeo) { 
      result = `
                <a  class='geotag me' href='${newMessage}'
                    target='_blank'
                    style='text-decoration: none;'
                    >
                    Гео-локация
                    </a>
                `;
    } else {
        result = `
        <div class='${meOrServer} message'>
        <span>${newMessage}</span>
        </div>
      ` 
    }

    if (display.length < 11) {
      display.push(result);
    } else {
        display.shift();
        display.push(result);
    }
    winCchat.innerHTML = display.join('');
  }
    
  // Обработчик клика на кнопку Отправить
  btn.addEventListener('click', () => {
      // Передача введенной строки в окно чата
      displayResult(inputMessage.value, 'me');
      // Отправка введенной строки через WebSocket
      websocket.send(inputMessage.value);
      inputMessage.value = '';
  });

  // Обработка ошибки при геопозиционировании
    let error = () => {
        console.log("Геопозиционирование недоступно");
        // addMessage(error);
    }
  // Обработка успешного геопозиционирования
    let success = (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
    
        let link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        displayResult(link, 'me', true);
    }
    
     // Обработчик клика на кнопку Гео-локация
    btnGeo.addEventListener('click', () => {
        if (!navigator.geolocation) {
            console.log("Геопозиционирование недоступно")
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        };
    });


}, false);

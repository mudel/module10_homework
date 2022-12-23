// 10.5 Geolocation. Notification. Screen size Задание 2.
// Запуск после загрузки DOM

document.addEventListener('DOMContentLoaded', function() {
// Нода кнопки
const btn = document.querySelector('.j-btn-request');

  // Обработчик клика на кнопку 
  btn.addEventListener('click', () => {
     window.alert(`Размер экрана ${window.screen.width} на ${window.screen.height} пикселей`);
  });

}, false);

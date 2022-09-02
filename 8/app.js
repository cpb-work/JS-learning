'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');
let basketList = [];

fitlerLabel.addEventListener('click', function() {
  fitlerPopup.classList.toggle('hidden');
  fitlerLabel.classList.toggle('filterLabelPink');
  filterIcon.classList.toggle('filterIconPink');

  if (filterIcon.getAttribute('src') === 'images/filter.svg') {
    filterIcon.setAttribute('src', 'images/filterHover.svg')
  } else {
    filterIcon.setAttribute('src', 'images/filter.svg')
  }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
  header.addEventListener('click', function(event) {
    event.target.nextElementSibling.classList.toggle('hidden');
  })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
  filterSizes.classList.toggle('hidden');
});

// добавленный код
const goodsParent = document.querySelector('.featuredItems');
goodsParent.addEventListener('click', event => { 
  const price = getPrice(event.target.closest('.featuredItem')
    .querySelector('.featuredPrice').innerText);
  const title = event.target.closest('.featuredItem')
    .querySelector('.featuredName').innerText;
  if (!isInArray(title)) {
    addToArray(title, price);
  } else {
    changeInArray(title, price);
  }
  updateBasketView();
  updateBasketNumber();
});

const basket = document.querySelector('.goodsInTrashTable');
basket.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    alert('И тут вы ушли на страницу корзины для подтверждения заказа...');
  }
  if (event.target.tagName === 'IMG') {
    deleteFromBasket(event.target.dataset.name);
    updateBasketView();
    updateBasketNumber();
  }
});

/**
 * VOID-Функция собирает новую таблицу корзины, добавляя строки и футер
 */
function updateBasketView() {
  const basketTable = basket.querySelector('table');
  const basketRows = addBasketRow();
  const basketFooter = addBasketFooter();
  basketTable.querySelector('tbody').innerHTML = basketRows;
  basketTable.querySelector('tfoot').innerHTML = basketFooter;
}

/**
 * VOID-Функция меняет количество уникальных товаров в значке на корзине
 */
function updateBasketNumber() {
  toggleBasketNumberIcon();
  const countIcon = document.querySelector('.cartIconWrap').querySelector('span');
  countIcon.innerText = basketList.length;
  countIcon.title = `В корзине товаров: ${basketList.length}`;
}

/**
 * VOID-Функция включает количество товара, если товар есть и выключает, если нет.
 * То же самое делает с самой корзиной.
 */
function toggleBasketNumberIcon() {
  const countIconParent = document.querySelector('.cartIconWrap');
  const countIcon = countIconParent.querySelector('span');
  const span = document.createElement('span');
  if (countIcon) {
    countIconParent.removeChild(countIcon);
    document.querySelector('.goodsInTrashTable').style.visibility = "hidden";
  }
  if (basketList.length > 0) {
    countIconParent.appendChild(span);
    document.querySelector('.goodsInTrashTable').style.visibility = "visible";
  }
}

/**
 * Функция для выведения из массива всего содержимого для корзины
 * @returns {string} - возвращает содержимое для раздела tbody
 */
function addBasketRow() {
  let basketRows = ``;
  basketList.forEach(elem => {
    basketRows += `
    <tr>
      <td>${elem.title}</td>
      <td>${elem.quantity}</td>
      <td>${elem.price}</td>
      <td>$${(elem.price * elem.quantity).toFixed(2)}</td>
      <td><img data-name="${elem.title}" src="images/del.png" alt="Удалить товар" title="Удалить товар">
      </td>
    </tr>
    `;
  });
  return basketRows;
}

/**
 * Функция для выведения футера для корзины
 * @returns {string} - возвращает содержимое для раздела tfoot
 */
function addBasketFooter() {
  const summ = getBasketSumm();
  let basketFooter = `
      <tr>
        <td colspan="3">Всего в корзине товаров на сумму: </td>
        <td>$${summ}</td>
        <td></td>
      </tr>
    `;
  return basketFooter;
}

/**
 * Функция для подсчёта стоимости всех имеющихся в корзине товаров
 * @returns {number} - возвращает сумму цен всех товаров из корзины
 */
function getBasketSumm() {
  let summ = 0;
  basketList.forEach(elem => {
    summ += (elem.quantity * elem.price);
  });
  return summ.toFixed(2);
}

/**
 * Void-ункция получает название товара и меняет в массиве товаров в корзине
 * количество товара на +1
 * @param {string} title - название товара
 */
function changeInArray(title) {
  let result = basketList.find(item => item.title == title);
  result.quantity++;
}

/**
 * Void-функция получает название товара и его цену и добавляет в массив
 * @param {string} title - название товара
 * @param {number} price - цена товара
 */
function addToArray(title, price) {
  basketList.push({title: title, price: price, quantity: 1});
}

/**
 * Функция проверяет, есть ли товар с таким названием в корзине и возвращает
 * результат проверки
 * @param {string} title - название товара
 * @returns {boolean} - результат проверки наличия названия
 */
function isInArray(title) {
  return basketList.find(item => item.title === title);
}

/**
 * Функция получает элемент с ценой товара со знаком доллара и отсекает его
 * @param {string} priceTag - элемент с ценой товара
 * @returns {integer} - возвращает цену числом
 */
function getPrice(priceTag) {
  const priceWithDollar = priceTag;
  const priceArr = priceWithDollar.split('\$');
  return(+priceArr[1]);
}

/**
 * VOID-Функция удаляет из корзины весь товар с выбранным названием
 * @param {string} title - название товара, по которому удаляется запись
 */
function deleteFromBasket(title) {
  let updatedArr = basketList.filter((elem, index, array) => {
    if (elem.title === title) return false;
    return true;
  });
  basketList = updatedArr.slice();
}
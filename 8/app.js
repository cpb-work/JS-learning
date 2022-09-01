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

const goodsParent = document.querySelector('.featuredItems');
goodsParent.addEventListener('click', event => { //alert(event.target.tagName);
  const price = getPrice(event.target.closest('.featuredItem').querySelector('.featuredPrice').innerText);
  const title = event.target.closest('.featuredItem').querySelector('.featuredName').innerText;
  if (!isInArray(title)) {
    addToArray(title, price);
  } else {
    changeInArray(title, price);
  }
  
  //console.log(basketList);
  deleteFromArray('Шмотка 2');
});

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

function deleteFromArray(title) {
  delete basketList[title];
  console.log(basketList);
}



function createRow(title, price) {
  const addRow = `
    <tr>
      <td>${price}</td>
      <td>1</td>
      <td>${price}</td>
      <td>$534543</td>
      <td><img src="images/del.png" alt="Удалить товар" title="Удалить товар"></td>
    </tr>
  `;
}
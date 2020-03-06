'use strict';

// elems from html
var gamburger = document.querySelector('.navbar_link--toggle');
var navbarButtonSearch = document.querySelector('.navbar_button-search');
var productsList = document.querySelector('.products_list');
var cartCount = document.querySelector('.count-products-in-bag');
var textOfEmptyBag = document.querySelector('.bag-is-empty');

// menu and search listeners
gamburger.addEventListener('click', gamburgerToggle);
navbarButtonSearch.addEventListener('click', searchMenuToggle);

// save to LS and get from LS catalog items
var lsCatalog = void 0;
saveToLS('catalog', window.catalog);
lsCatalog = getFromLS('catalog');

checkCartPriceAndCount();

// cart count and price
function checkCartPriceAndCount() {

  var fullPrice = 0;
  var quantity = 0;

  var shb = getFromLS('shoppingBag');

  for (var i = 0; i < shb.length; i++) {
    var key = shb[i];
    var itemPrice = key.price * key.count;
    quantity += key.count;
    fullPrice += itemPrice;
  }

  cartCount.textContent = '\xA3' + fullPrice + ' (' + quantity + ')';
}

// add item to LS
function addItemToLS(e) {

  if (e.target.tagName === 'IMG' || e.target.tagName === 'A') {
    var trg = e.target.parentNode;
    var trgId = trg.dataset.id;
    localStorage.setItem('itemId', JSON.stringify(trgId));
  }
}

// get elem by key from LS
function getFromLS(key) {
  return JSON.parse(localStorage.getItem(key));
}

// product template
function createProductTemplate(key) {
  return '\n    <div class="products_item ' + (key.hasNew ? 'new-label' : '') + '" data-id="' + key.id + '" data-price="' + key.price.toFixed(2) + '">\n      <a href="./item.html">\n        <img src="' + key.thumbnail[0] + '" alt="product-image" class="products_item_img">\n        <h4 class="products_item_title">' + key.title + '</h4>\n        <p class="products_item_price">\xA3' + key.price.toFixed(2) + '</p>\n      </a>\n    </div>\n    ';
}

// save elem by key to LS
function saveToLS(key, elem) {
  localStorage.setItem(key, JSON.stringify(elem));
}

// search menu toggle
function searchMenuToggle() {
  document.querySelector('.navbar_text-to-search').classList.toggle('navbar_text-to-search--active');
}

// toggle menu for mobile
function gamburgerToggle() {
  var navs = document.querySelectorAll('.navbar_menu, .navbar_search');
  var gamburgerImg = gamburger.querySelector('img');

  for (var i = 0; i < navs.length; i++) {
    navs[i].classList.toggle('navbar_link--toggle-show');
  }

  gamburgerImg.classList.toggle('gamburger-img-show');
  gamburgerImg.classList.contains('gamburger-img-show') ? gamburgerImg.src = './img/icons/close.png' : gamburgerImg.src = './img/icons/icon-menu.png';
}

function itemBtnClickHandler(className, functionName) {
  document.querySelectorAll(className).forEach(function (btn) {
    btn.addEventListener('click', functionName);
  });
}

// Array.from for IE
if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;
    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function toInteger(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    return function from(arrayLike /*, mapFn, thisArg */) {
      var C = this;
      var items = Object(arrayLike);
      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {

        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }
      var len = toLength(items.length);
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);
      var k = 0;
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      A.length = len;
      return A;
    };
  }();
}
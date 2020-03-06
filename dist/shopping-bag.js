'use strict';

// elems from html
var shoppingBagHTML = document.querySelector('.shopping-bag_products');
var emptyBagBtn = document.querySelector('.shopping-bag_empty-bag');
var totalPrice = document.querySelector('.total-price');

// get shoppingBag from LS
var shoppingBag = getFromLS('shoppingBag') || [];

// if shoppingBag.length > 0
showShoppingBagProducts();
outTotalPrice();

// products added to bag
var shoppingBagProducts = shoppingBagHTML.children;

for (var i = 0, len = shoppingBagProducts.length; i < len; i++) {
  var key = shoppingBagProducts[i];
  key.addEventListener('click', addItemToLS);
}

// listeners
emptyBagBtn.addEventListener('click', emptyBag);
document.querySelector('.checkout-btn').addEventListener('click', checkout);

function plusGood() {

  var item = this.closest('.shb-item');
  var id = item.dataset.id;
  var color = item.querySelector('.param_color').textContent.split(' ').slice(1).join(' ');
  var size = item.querySelector('.param_size').textContent.split(' ').slice(1).join(' ');

  for (var _i = 0; _i < shoppingBag.length; _i++) {
    var _key = shoppingBag[_i];
    if (_key.id === id && _key.color === color && _key.size === size) {
      _key.count++;
    }
  }

  saveToLS('shoppingBag', shoppingBag);
  showShoppingBagProducts();
  outTotalPrice();
  checkCartPriceAndCount();
}

function minusGood() {

  var item = this.closest('.shb-item');
  var id = item.dataset.id;
  var color = item.querySelector('.param_color').textContent.split(' ').slice(1).join(' ');
  var size = item.querySelector('.param_size').textContent.split(' ').slice(1).join(' ');

  for (var _i2 = 0; _i2 < shoppingBag.length; _i2++) {
    var _key2 = shoppingBag[_i2];

    if (_key2.id === id && _key2.color === color && _key2.size === size) {

      if (_key2.count > 1) {
        _key2.count--;
      } else {
        delete shoppingBag[_i2];
        shoppingBag = shoppingBag.filter(function (x) {
          return x !== undefined && x !== null;
        });
      }
    }
  }

  saveToLS('shoppingBag', shoppingBag);
  showShoppingBagProducts();
  outTotalPrice();
  checkCartPriceAndCount();
}

function removeItemFromBag(e) {
  e.preventDefault();

  var item = this.closest('.shb-item');
  var id = item.dataset.id;
  var color = item.querySelector('.param_color').textContent.split(' ').slice(1).join(' ');
  var size = item.querySelector('.param_size').textContent.split(' ').slice(1).join(' ');

  for (var _i3 = 0; _i3 < shoppingBag.length; _i3++) {
    var _key3 = shoppingBag[_i3];
    if (_key3.id === id && _key3.color === color && _key3.size === size) {
      delete shoppingBag[_i3];
      shoppingBag = shoppingBag.filter(function (x) {
        return x !== undefined && x !== null;
      });
    }
  }

  saveToLS('shoppingBag', shoppingBag);
  showShoppingBagProducts();
  outTotalPrice();
  checkCartPriceAndCount();
}

// empty bag
function emptyBag(e) {
  e.preventDefault();

  document.querySelector('.shopping-bag_products').innerHTML = '<h2 class="bag-is-empty">Your shopping bag is empty. Use <a href="./catalog.html"><span>Catalog</span></a> to add new items</h2>';

  localStorage.removeItem('shoppingBag');
  totalPrice.textContent = 'Total price: 0';
  cartCount.innerHTML = '(0)';
  checkCartPriceAndCount();
}

function checkout() {

  document.querySelector('.shopping-bag_products').innerHTML = '<h2 class="bag-is-empty">Thank for your purchase</h2>';

  localStorage.removeItem('shoppingBag');
  totalPrice.textContent = 'Total price: 0';
  cartCount.innerHTML = '(0)';
  checkCartPriceAndCount();
}

// totalPrice outpuy
function outTotalPrice() {

  var fullPrice = 0;
  var shb = getFromLS('shoppingBag');

  for (var _i4 = 0; _i4 < shb.length; _i4++) {
    var _key4 = shb[_i4];
    var itemPrice = _key4.price * _key4.count;
    fullPrice += itemPrice;
    console.log(fullPrice);
  }

  totalPrice.textContent = 'Total price: \xA3' + fullPrice;
}

//
function showShoppingBagProducts() {
  shoppingBagHTML.innerHTML = createShoppingBagProducts() || '<h2 class="bag-is-empty">Your shopping bag is empty. Use <a href="./catalog.html"><span>Catalog</span></a> to add new items</h2>';;
  // plus and minus btns

  itemBtnClickHandler('.param_quantity--plus', plusGood);
  itemBtnClickHandler('.param_quantity--minus', minusGood);
  itemBtnClickHandler('.shb-item_remove-item', removeItemFromBag);
}

function createShoppingBagProducts() {
  var output = '';

  for (var _i5 = 0; _i5 < shoppingBag.length; _i5++) {
    var _key5 = shoppingBag[_i5];
    output += createShoppingBagProduct(_key5);
  }

  return output;
}

// Shopping Bag Product template
function createShoppingBagProduct(key) {
  return '\n  <div class="shb-item" data-id="' + key.id + '">\n  <a class="shb-item_img new-label" href="./item.html">\n    <img src="' + key.img + '" alt="product-in-bag">\n  </a>\n  <div class="shb-item_info">\n    <a class="shb-item_name" href="./item.html"><h4>' + key.title + '</h4></a>\n    <span class="shb-item_price">\xA3' + key.price * key.count + '</span>\n    <p class="shb-item_params">\n      <span class="param_color">Color: ' + key.color + '</span>\n      <span class="param_size">Size: ' + key.size + '</span>\n      <span class="param_quantity">Quantity: <span class="param_quantity--minus" data-id="' + key.id + '">\u2212</span><span id="quantity-in-bag">' + key.count + '</span><span class="param_quantity--plus" data-id="' + key.id + '">+</span></span>\n    </span>\n    <a class="shb-item_remove-item" href="#">Remove item</a>\n  </div>\n</div>\n  ';
}
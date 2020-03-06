'use strict';

var itemId = JSON.parse(localStorage.getItem('itemId'));
var itemOptions = document.querySelector('.options');

itemOptions.innerHTML = showItemOnPage(lsCatalog);

// thumbs listener 
document.querySelector('.thumbs-img').addEventListener('click', showFullImg);

// add to bag btn
var addToBagBtn = document.getElementById('add-to-cart-btn');

// sizes and colors from html
var optionSizes = document.querySelector('.option_sizes');
var optionColors = document.querySelector('.option_colors');

// listeners for colors and sizes
optionSizes.addEventListener('click', chooseActiveSize);
optionColors.addEventListener('click', chooseActiveColor);

// add btn listener
addToBagBtn.addEventListener('click', addToCart);

// product from LS or empty arr
var shoppingBag = getFromLS('shoppingBag') || [];

// add product to bag
function addToCart(e) {
  e.preventDefault();

  var size = void 0,
      color = void 0;
  var id = this.dataset.id;
  var title = document.querySelector('.options_heading').textContent;
  var price = +document.querySelector('.options_price').textContent.slice(1);
  var img = document.querySelector('.full-img_item').src;

  var sizes = document.querySelectorAll('.size-of-item');
  var colors = document.querySelectorAll('.color-of-item');

  for (var i = 0; i < sizes.length; i++) {
    if (sizes[i].classList.contains('option--active')) size = sizes[i].textContent;
  }

  for (var _i = 0; _i < colors.length; _i++) {
    if (colors[_i].classList.contains('option--active')) color = colors[_i].textContent;
  }

  var item = {
    id: id,
    title: title,
    price: price,
    img: img,
    size: size,
    color: color
  };

  if (!shoppingBag.length) {
    item.count = 1;
    shoppingBag.push(item);
  } else {
    var isSame = shoppingBag.some(function (el) {
      return el.id === id && el.color === color && el.size === size;
    });

    if (!isSame) {
      item.count = 1;
      shoppingBag.push(item);
    } else {
      shoppingBag.forEach(function (el) {
        if (el.id === id && el.color === color && el.size === size) {
          el.count++;
        }
      });
    }
  }

  saveToLS('shoppingBag', shoppingBag);
  checkCartPriceAndCount();
}

// choose active color
function chooseActiveColor(e) {
  var trg = e.target;
  if (trg.classList.contains('color-of-item')) {
    var itemColors = optionColors.querySelectorAll('.color-of-item');
    for (var i = 0; i < itemColors.length; i++) {
      itemColors[i].classList.remove('option--active');
    }
    trg.classList.add('option--active');
  }
}

// choose active size
function chooseActiveSize(e) {
  var trg = e.target;
  if (trg.classList.contains('size-of-item')) {
    var itemSizes = optionSizes.querySelectorAll('.size-of-item');
    for (var i = 0; i < itemSizes.length; i++) {
      itemSizes[i].classList.remove('option--active');
    }
    trg.classList.add('option--active');
  }
}

// show full image by thumbs clicking
function showFullImg(e) {
  var trg = e.target;

  if (trg.tagName == 'IMG') {

    var fullImg = document.querySelector(".full-img_item");
    var thumbsItems = document.querySelectorAll('.thumbs-img_item');
    var thumbImgSrc = trg.src;

    fullImg.src = thumbImgSrc;

    for (var i = 0; i < thumbsItems.length; i++) {
      thumbsItems[i].classList.remove("thumbs-img_item--active");
    }

    trg.parentElement.classList.add("thumbs-img_item--active");
  }
}

// show product item
function showItemOnPage(storage) {
  var output = '';
  for (var i = 0, len = storage.length; i < len; i++) {
    var key = storage[i];
    if (key.id == itemId) {
      output = createItemTemplate(key);
    }
  }

  return output;
}

// item template
function createItemTemplate(key) {
  return '\n      <div class="options_img">\n        <p class="full-img">\n          <img class="full-img_item" src="' + key.preview[0] + '" alt="item img">\n        </p>\n        <div class="thumbs-img">\n          <p class="thumbs-img_item thumbs-img_item--active">\n            <img src="' + key.thumbnail[0] + '" alt="item thumbs">\n          </p>\n          <p class="thumbs-img_item">\n            <img src="' + key.thumbnail[1] + '" alt="item thumbs">\n          </p>\n          <p class="thumbs-img_item">\n            <img src="' + key.thumbnail[2] + '" alt="item thumbs">\n          </p>\n        </div>\n      </div>\n\n      <div class="options_data">\n        <h1 class="options_heading">' + key.title + '</h1>\n        <p class="options_descr">' + key.description + '</p>\n        <p class="options_price">\xA3' + (key.discountedPrice ? key.discountedPrice.toFixed(2) : key.price.toFixed(2)) + '</p>\n        <p class="option_sizes">\n          <span>Size:</span>\n          <span class="size-of-item option--active">' + key.sizes[0] + '</span>\n          ' + key.sizes.slice(1).map(function (size) {
    return '<span class="size-of-item">' + size + '</span>';
  }).join(' ') + '\n        </p>\n        <p class="option_colors">\n          <span>Color:</span>\n          <span class="color-of-item option--active">' + key.colors[0] + '</span>\n          ' + key.colors.slice(1).map(function (color) {
    return '<span class="color-of-item">' + color + '</span>';
  }).join(' ') + '\n        </p>\n\n        <div class="item_add-to-bag-btn">\n          <a href="#" class="main-btn" id="add-to-cart-btn" data-id="' + key.id + '">Add to bag</a>\n        </div>\n    </div>\n      ';
}
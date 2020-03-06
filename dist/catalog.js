"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// filter elements from html
var filter = document.querySelector(".catalog_filter");
var filterListHidden = document.querySelector(".filter-list--hidden");

// listener to enable filter
filter.addEventListener('click', configureFilterSection);

// show catalog products
showProductsInCatalog();

// catalog items
var productsItems = productsList.children;

// listners to catalog items
for (var i = 0, len = productsItems.length; i < len; i++) {
  var key = productsItems[i];
  key.addEventListener('click', addItemToLS);
}

// showing catalog items
function showProductsInCatalog() {
  productsList.innerHTML = createProductItems(lsCatalog);
  outputCatalogInfo();
}

// creating catalog items
function createProductItems(storage) {
  var output = '';
  for (var _i = 0, _len = storage.length; _i < _len; _i++) {
    var _key = storage[_i];
    if (_key.category === 'women') {
      output += createProductTemplate(_key);
    }
  }

  return output;
}

// catalog info-text block
function createCatalogInfo() {
  var block = document.createElement("div");
  block.className = "catalog_info-text";
  block.innerHTML = "\n    <h3 class=\"catalog_heading\">\n      Last weekend <span>extra 50%</span> off on all reduced boots and shoulder bags\n    </h3>\n    <p class=\"under-heading-description\">\n      This offer is valid in-store and online. Prices displayed reflect this additional discount. This offer\n      ends at 11:59 GMT on March 1st 2019\n    </p>";
  return block;
}

// DEV -> output catalog info-text block depending device
function outputCatalogInfo() {
  var prodCh = productsList.children;
  var clientWidth = document.body.clientWidth;

  clientWidth > 1024 ? productsList.insertBefore(createCatalogInfo(), prodCh[4]) : clientWidth > 767 && clientWidth < 1025 ? productsList.insertBefore(createCatalogInfo(), prodCh[3]) : productsList.insertBefore(createCatalogInfo(), prodCh[2]);
}

// RES -> output catalog info-text block depending resize
window.addEventListener("resize", function () {
  productsList.querySelector(".catalog_info-text").remove();
  outputCatalogInfo();
});

// filter conifgure
function configureFilterSection(e) {
  var trg = e.target;

  if (trg.classList.contains("item-params_option")) {

    var filterList = document.querySelector('.filter-list');
    var filterListItem = trg.closest('.filter-list_item');
    var filterListItemHeading = filterListItem.querySelector(".filter-list_item-heading").textContent;
    var filterListItemParams = trg.parentElement.children;
    var _filterListHidden = document.querySelector(".filter-list--hidden");
    var filterListItemShorten = _filterListHidden.querySelectorAll(".filter-list_item-shorten");
    var indexOfFilterListItem = [].concat(_toConsumableArray(filterList.children)).indexOf(filterListItem);
    var selectedFilterListItem = filterListItem.querySelector(".filter-list_item--selected");
    var trgValue = trg.innerHTML;

    if (trgValue === 'Not selected') {

      filterListItem.classList.remove("select");

      for (var _i2 = 0; _i2 < filterListItemParams.length; _i2++) {
        filterListItemParams[_i2].classList.remove("highlight");
      }

      filterListItemShorten[indexOfFilterListItem].innerHTML = filterListItemHeading;
      filterListItemShorten[indexOfFilterListItem].classList.remove("select");
    } else {

      filterListItem.classList.add("select");
      selectedFilterListItem.innerHTML = trgValue;
      filterListItemShorten[indexOfFilterListItem].innerHTML = trgValue;
      filterListItemShorten[indexOfFilterListItem].classList.add("select");

      for (var _i3 = 0; _i3 < filterListItemParams.length; _i3++) {
        filterListItemParams[_i3].classList.remove("highlight");
      }

      trg.classList.add("highlight");
    }
  }
}

// show hidden filter
filterListHidden.addEventListener("click", function (e) {
  var trg = e.target;

  if (trg.classList.contains("close-filter")) {
    filter.classList.remove("filter-open");
  } else {
    filter.classList.add("filter-open");
  }
});
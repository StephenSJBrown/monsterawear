// HIT THAT API
// $.ajax({
//   url: "http://localhost:8000/api/1",
//   method: "GET",
//   success: function (item) {
//     $(`#item-name`)[0].innerText = item.item_name;
//     $(`#item-colour`)[0].innerText = item.colour;
//     $(`#item-price`)[0].innerText = `£${item.value}`;
//     $(`#item-description`)[0].innerText = item.description;
//     $(`#small-quantity-range`)[0].max = item.s_quantity;
//     $(`#medium-quantity-range`)[0].max = item.m_quantity;
//     $(`#large-quantity-range`)[0].max = item.l_quantity;
//     $(`#x-large-quantity-range`)[0].max = item.xl_quantity;
//     console.log(`got data`);
//   },
//   error: function (error) {
//     console.log(`Error: ${error}`);
//   },
// });

if (sessionStorage.getItem("item total")) {
  $(`#cart-counter`)[0].innerText = sessionStorage.getItem("item total")
  $(`#cart-counter`).show()
}
else {
  sessionStorage.setItem("item total", 0)
}

$(`.range-selector`).each((i, option) => {
if (option.max === "0") {
  option.type = "hidden"
  option.value = "Sold Out"
}
})

const showSize = (e) => {
  let allSizes = $(`.range-selector`);
  allSizes.hide();
  let shownItem = $(`#${e.target.value}-quantity-range`);
  shownItem.show();
  let quantity = $(`#quantity-value`)[0];
  quantity.innerHTML = shownItem[0].value;
  if (shownItem[0].max === "0") {
    $(`#add-to-cart`).hide()
  }
  else {
    $(`#add-to-cart`).show()
  }
};

const changeValue = (e) => {
  let quantity = $(`#quantity-value`)[0];
  quantity.innerText = e.target.value;
};

const addToCart = () => {
  let cartCount = $(`#cart-counter`)[0]
  let quantity = $(`#quantity-value`)[0].innerText
  cartCount.innerHTML = parseInt(quantity, 10) + parseInt(cartCount.innerHTML)
  sessionStorage.setItem("item total", parseInt(cartCount.innerText))
  $(`#cart-counter`).show()
  const urlParams = new URLSearchParams(window.location.search)
  let id = urlParams.get("item")
  let name = $(`#item-name`)[0].innerText
  let colour = $(`#item-colour`)[0].innerText
  let size = $(`#size-selector`)[0].value
  let price = $(`#item-price`)[0].innerHTML
  let addition = {id, name, colour, price, size, quantity}
  let existingOrder = JSON.parse(sessionStorage.getItem('order'))
  if (existingOrder && existingOrder.id == id ) {
    console.log("we got a match")
    existingOrder.quantity = parseInt(existingOrder.quantity) + parseInt(quantity)
    addition = existingOrder
  }
  sessionStorage.setItem("order", JSON.stringify(addition))
  console.log(sessionStorage.getItem("order"))
};

let sizeSelector = $(`#size-selector`)[0];
sizeSelector.addEventListener("change", showSize);

let rangeSelectors = $(`.range-selector`);
rangeSelectors.each((i, selector) => {
  selector.addEventListener("click", changeValue);
});

$("#add-to-cart")[0].addEventListener("click", addToCart);

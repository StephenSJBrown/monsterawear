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

if (parseInt((sessionStorage.getItem("item total"))) > 0) {
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

const checkMatch = () => {
  // console.log("checking for match")
  let result = false
  let existingOrder = JSON.parse(sessionStorage.getItem('order'))
  const urlParams = new URLSearchParams(window.location.search)
  let id = urlParams.get("item")
  let size = $(`#size-selector`)[0].value
  let i = 0
  // console.log(existingOrder)
  if (existingOrder) {
  for (item of existingOrder) {
    // console.log("looping through order items")
    // console.log(item)
    if (existingOrder && item.id == id && item.size == size) {
      result = true
      // console.log(`one of the items, ${i} matches`)
      return [result, i]
    }
    i++
  }
  }
  return result
}

const addToCart = () => {
  // add and show cart number
  let cartCount = $(`#cart-counter`)[0]
  let quantity = $(`#quantity-value`)[0].innerText
  cartCount.innerHTML = parseInt(quantity, 10) + parseInt(cartCount.innerHTML)
  sessionStorage.setItem("item total", parseInt(cartCount.innerText))
  $(`#cart-counter`).show()
  // check if there's a match within our existing order
  const results = checkMatch()
  // console.log(`it is ${results[0]} there is a match. It is at ${results[1]}`)
  // if there is, just add current quantity to that item
  if (results[0]) {
    // console.log(`we got a match @ ${results[1]}`)
    order = JSON.parse(sessionStorage.getItem("order"))
    // console.log(`quantity is ${order[results[1]].quantity}`)
    const oldQuantity = parseInt(JSON.parse(sessionStorage.getItem("order"))[results[1]].quantity)
    const newQuantity = oldQuantity + parseInt(quantity)
    // console.log(oldQuantity, quantity, newQuantity)
    order[results[1]].quantity = newQuantity
  }
  // if not, then create a new item and add it to the existing items
  else {
    // console.log(`no match`)
    // create new object
    const urlParams = new URLSearchParams(window.location.search)
    let id = urlParams.get("item")
    let size = $(`#size-selector`)[0].value
    let name = $(`#item-name`)[0].innerText
    let colour = $(`#item-colour`)[0].innerText
    let price = $(`#item-price`)[0].innerHTML
    let addition = {id, name, colour, price, size, quantity}
    order = []
    if (sessionStorage.getItem("order")) {
      order = JSON.parse(sessionStorage.getItem("order"))
    }
    order.push(addition)
  }
  sessionStorage.setItem("order", JSON.stringify(order))
  // console.log(sessionStorage.getItem("order"))
};

let sizeSelector = $(`#size-selector`)[0];
sizeSelector.addEventListener("change", showSize);

let rangeSelectors = $(`.range-selector`);
rangeSelectors.each((i, selector) => {
  selector.addEventListener("click", changeValue);
});

$("#add-to-cart")[0].addEventListener("click", addToCart);

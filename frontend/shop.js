let small = 0;
let medium = 3;
let large = 5;
let xl = 1;
// let small = 0;
// let medium = 0;
// let large = 0;
// let xl = 0;

if (small === 0) {
  $(`#small`).attr("disabled", true);
  $(`#small`)[0].innerText += " SOLD OUT"
}
if (medium === 0) {
  $(`#medium`).attr("disabled", true);
  $(`#medium`)[0].innerText += " SOLD OUT"
}
if (large === 0) {
  $(`#large`).attr("disabled", true);
  $(`#large`)[0].innerText += " SOLD OUT"
}
if (xl === 0) {
  $(`#x-large`).attr("disabled", true);
  $(`#x-large`)[0].innerText += " SOLD OUT"
}

// HIT THAT API (ONLY ONCE PER SESSION PER ITEM)
// $.ajax({
//   url: "http://localhost:8000/api/1",
//   method: "GET",
//   success: function (item) {
//     $(`#item-name`)[0].innerText = item.item_name;
//     $(`#item-colour`)[0].innerText = item.colour;
//     $(`#item-price`)[0].innerText = `£${item.value}`;
//     $(`#item-description`)[0].innerText = item.description;
//     small = item.s_quantity;
//     medium = item.m_quantity;
//     large = item.l_quantity;
//     xl = item.xl_quantity;
//     console.log(`got data`);
//   },
//   error: function (error) {
//     console.log(`Error: ${error}`);
//   },
// });

console.log(sessionStorage);

const initSize = () => {
  if (small === 0 && medium === 0 && large === 0 && xl === 0) {
    $(`#sold-out`).show();
    $(`#quantity-section`).hide();
    $(`#size-selector`).hide();
    $(`#add-to-cart`).hide();
  } else {
    console.log("okay so we ain't completely sold out")
    let e = jQuery.Event("change", { target: { value: "small" } });
    if (small === 0) {
      $(`#size-selector`)[0].selectedIndex = 1;
      e = jQuery.Event("change", { target: { value: "medium" } });
      if (medium === 0) {
        console.log("got no mediums")
        $(`#size-selector`)[0].selectedIndex = 2;
        e = jQuery.Event("change", { target: { value: "large" } });
        if (large === 0) {
          console.log("got no larges")
          $(`#size-selector`)[0].selectedIndex = 3;
          e = jQuery.Event("change", { target: { value: "x-large" } });
        }
      }
    }
    showSize(e)
  }
};


if (parseInt(sessionStorage.getItem("item count")) > 0) {
  $(`#cart-counter`)[0].innerText = sessionStorage.getItem("item count");
  $(`#cart-counter`).show();
} else {
  sessionStorage.setItem("item count", 0);
}

const showSize = (e) => {
  console.log("we hit showSize", e);
  switch (e.target.value) {
    case "small":
      console.log("change that bitch to small");
      $("#quantity-number")[0].max = small;
      break;
    case "medium":
      console.log("change that bitch to medium");
      $("#quantity-number")[0].max = medium;
      break;
    case "large":
      console.log("change that bitch to large");
      $("#quantity-number")[0].max = large;
      break;
    case "x-large":
      console.log("change that bitch to xl");
      $("#quantity-number")[0].max = xl;
      break;
  }
  if ($(`#quantity-number`)[0].max == 1) {
    $("#quantity-number")[0].value = 1;
    $(`#last-one`).show();
    $(`#increase`).attr("disabled", true);
    $(`#decrease`).attr("disabled", true);
  } else {
    $("#quantity-number")[0].value = 1;
    $(`#last-one`).hide();
    $(`#increase`).attr("disabled", false);
    $(`#decrease`).attr("disabled", true);
  }
};

const increase = () => {
  let quantity = $(`#quantity-number`)[0];
  if (parseInt(quantity.value) < parseInt(quantity.max)) {
    quantity.value = parseInt(quantity.value) + 1;
  }
  if (parseInt(quantity.value) === parseInt(quantity.max)) {
    $(`#increase`).attr("disabled", true);
  }
  $(`#decrease`).attr("disabled", false);
};

const decrease = () => {
  let quantity = $(`#quantity-number`)[0];
  if (parseInt(quantity.value) > 1) {
    quantity.value = parseInt(quantity.value) - 1;
  }
  if (parseInt(quantity.value) === parseInt(quantity.min)) {
    $(`#decrease`).attr("disabled", true);
  }
  $(`#increase`).attr("disabled", false);
};

const checkMatch = () => {
  // console.log("checking for match")
  let result = false;
  let existingOrder = JSON.parse(sessionStorage.getItem("order"));
  const urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get("item");
  let size = $(`#size-selector`)[0].value;
  let i = 0;
  // console.log(existingOrder)
  if (existingOrder) {
    for (item of existingOrder) {
      // console.log("looping through order items")
      // console.log(item)
      if (existingOrder && item.id == id && item.size == size) {
        result = true;
        // console.log(`one of the items, ${i} matches`)
        return [result, i];
      }
      i++;
    }
  }
  return result;
};

const addToCart = () => {
  // add and show cart number
  let cartCount = $(`#cart-counter`)[0];
  let quantity = $(`#quantity-number`)[0].value;
  cartCount.innerHTML = parseInt(quantity, 10) + parseInt(cartCount.innerHTML);
  sessionStorage.setItem("item count", parseInt(cartCount.innerText));
  $(`#cart-counter`).show();
  // check if there's a match within our existing order
  const results = checkMatch();
  // console.log(`it is ${results[0]} there is a match. It is at ${results[1]}`)
  // if there is, just add current quantity to that item
  if (results[0]) {
    // console.log(`we got a match @ ${results[1]}`)
    order = JSON.parse(sessionStorage.getItem("order"));
    // console.log(`quantity is ${order[results[1]].quantity}`)
    const oldQuantity = parseInt(
      JSON.parse(sessionStorage.getItem("order"))[results[1]].quantity
    );
    const newQuantity = oldQuantity + parseInt(quantity);
    // console.log(oldQuantity, quantity, newQuantity)
    order[results[1]].quantity = newQuantity;
  }
  // if not, then create a new item and add it to the existing items
  else {
    // console.log(`no match`)
    // create new object
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("item");
    let size = $(`#size-selector`)[0].value;
    let name = $(`#item-name`)[0].innerText;
    let colour = $(`#item-colour`)[0].innerText;
    let price = $(`#item-price`)[0].innerHTML;
    let addition = { id, name, colour, price, size, quantity };
    order = [];
    if (sessionStorage.getItem("order")) {
      order = JSON.parse(sessionStorage.getItem("order"));
    }
    order.push(addition);
  }
  sessionStorage.setItem("order", JSON.stringify(order));
  // console.log(sessionStorage.getItem("order"))
};

$(`#size-selector`)[0].addEventListener("change", showSize);

$("#add-to-cart")[0].addEventListener("click", addToCart);

$("#increase")[0].addEventListener("click", increase);
$("#decrease")[0].addEventListener("click", decrease);

initSize()

let small = 0;
let medium = 0;
let large = 0;
let xl = 0;

console.log(sessionStorage);

const adjustForCart = () => {
  let existingOrder = JSON.parse(sessionStorage.getItem("order"));
  if (existingOrder) {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("item");
    for (item of existingOrder) {
      if (item.id == id) {
        switch (item.size) {
          case "small":
            small -= item.quantity;
            break;
          case "medium":
            medium -= item.quantity;
            break;
          case "large":
            large -= item.quantity;
            break;
          case "x-large":
            xl -= item.quantity;
            break;
        }
      }
    }
  }
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

const initSize = () => {
  if (small < 1 && medium < 1 && large < 1 && xl < 1) {
    $(`#sold-out`).show();
    $(`#last-one`).hide();
    $(`#quantity-section`).hide();
    $(`#size-selector`).hide();
    $(`#add-to-cart`).hide();
  } else {
    console.log("okay so we ain't completely sold out");
    if (small < 1) {
      $(`#small`).attr("disabled", true);
      $(`#small`)[0].innerText = "Small SOLD OUT";
    }
    if (medium < 1) {
      $(`#medium`).attr("disabled", true);
      $(`#medium`)[0].innerText = "Medium SOLD OUT";
    }
    if (large < 1) {
      $(`#large`).attr("disabled", true);
      $(`#large`)[0].innerText = "Large SOLD OUT";
    }
    if (xl < 1) {
      $(`#x-large`).attr("disabled", true);
      $(`#x-large`)[0].innerText = "X-Large SOLD OUT";
    }
    let e = jQuery.Event("change", { target: { value: "small" } });
    if (small < 1) {
      console.log("got no smalls");
      $(`#size-selector`)[0].selectedIndex = 1;
      e = jQuery.Event("change", { target: { value: "medium" } });
      if (medium < 1) {
        console.log("got no mediums");
        $(`#size-selector`)[0].selectedIndex = 2;
        e = jQuery.Event("change", { target: { value: "large" } });
        if (large < 1) {
          console.log("got no larges");
          $(`#size-selector`)[0].selectedIndex = 3;
          e = jQuery.Event("change", { target: { value: "x-large" } });
        }
      }
    }
    showSize(e);
  }
};

const updateCart = () => {
  if (parseInt(sessionStorage.getItem("item count")) > 0) {
    $(`#cart-counter`)[0].innerText = sessionStorage.getItem("item count");
    $(`#cart-counter`).show();
  } else {
    sessionStorage.setItem("item count", 0);
  }
};

const showSize = (e) => {
  switch (e.target.value) {
    case "small":
      $("#quantity-number")[0].max = small;
      break;
    case "medium":
      $("#quantity-number")[0].max = medium;
      break;
    case "large":
      $("#quantity-number")[0].max = large;
      break;
    case "x-large":
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

const addToCart = () => {
  let cartCount = $(`#cart-counter`)[0];
  let quantity = $(`#quantity-number`)[0].value;
  cartCount.innerHTML = parseInt(quantity, 10) + parseInt(cartCount.innerHTML);
  sessionStorage.setItem("item count", parseInt(cartCount.innerText));
  $(`#cart-counter`).show();
  switch ($(`#size-selector`)[0].value) {
    case "small":
      small -= quantity;
      break;
    case "medium":
      medium -= quantity;
      console.log("deducting from medium", medium);
      break;
    case "large":
      large -= quantity;
      break;
    case "x-large":
      xl -= quantity;
      break;
  }
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
  initSize();
};

// HIT THAT API
$.ajax({
  url: "http://localhost:8000/api/1",
  method: "GET",
  success: function (item) {
    console.log(item);
    $(`#item-name`)[0].innerText = item.item_name;
    $(`#item-colour`)[0].innerText = item.colour;
    $(`#item-price`)[0].innerText = `${item.value}`;
    $(`#item-description`)[0].innerHTML = `<p>${item.description}</p>`;
    small = item.s_quantity;
    medium = item.m_quantity;
    large = item.l_quantity;
    xl = item.xl_quantity;
    console.log(`got data`);
    adjustForCart()
    initSize()
    updateCart()
    console.log(small, medium, large, xl)
  },
  error: function (error) {
    console.log(`Error: ${error}`);
  },
});

$(`#size-selector`)[0].addEventListener("change", showSize);

$("#add-to-cart")[0].addEventListener("click", addToCart);

$("#increase")[0].addEventListener("click", increase);
$("#decrease")[0].addEventListener("click", decrease);
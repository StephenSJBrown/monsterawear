$.ajax({
  url: "http://localhost:8000/api/1",
  method: "GET",
  success: function (item) {
    $(`#item-name`)[0].innerText = item.item_name;
    $(`#item-colour`)[0].innerText = item.colour;
    $(`#item-price`)[0].innerText = `£${item.value}`;
    $(`#item-description`)[0].innerText = item.description;
    $(`#small-quantity-range`)[0].max = item.s_quantity;
    $(`#medium-quantity-range`)[0].max = item.m_quantity;
    $(`#large-quantity-range`)[0].max = item.l_quantity;
    $(`#x-large-quantity-range`)[0].max = item.xl_quantity;
    console.log(`got data`);
  },
  error: function (error) {
    console.log(`Error: ${error}`);
  },
});

console.log(sessionStorage)
$(`#cart-counter`)[0].innerText = sessionStorage.getItem("item total")

const showSize = (e) => {
  let allSizes = $(`.range-selector`);
  allSizes.hide();
  let shownItem = $(`#${e.target.value}-quantity-range`);
  shownItem.show();
  let quantity = $(`#quantity-value`)[0];
  quantity.innerHTML = shownItem[0].value;
};

const changeValue = (e) => {
  let quantity = $(`#quantity-value`)[0];
  quantity.innerText = e.target.value;
};

const addToCart = () => {
  let count = $(`#cart-counter`)[0]
  let newCount = $(`#quantity-value`)[0].innerText
  count.innerHTML = parseInt(newCount, 10) + parseInt(count.innerHTML)
  sessionStorage.setItem("item total", parseInt(count.innerText))
  console.log(sessionStorage)
};

let sizeSelector = $(`#size-selector`)[0];
sizeSelector.addEventListener("change", showSize);

let rangeSelectors = $(`.range-selector`);
rangeSelectors.each((i, selector) => {
  selector.addEventListener("click", changeValue);
});

$("#add-to-cart")[0].addEventListener("click", addToCart);

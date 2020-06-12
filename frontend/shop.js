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

let showSize = (e) => {
    console.log(`showing ${e.target.value}`)
    let allSizes = $(`.range-selector`)
    allSizes.hide()
    let shownItem = $(`#${e.target.value}-quantity-range`)[0]
    console.log(shownItem)
    shownItem.show()
}

let small = $(`#size`)[0]
console.log(small)
small.addEventListener("change", showSize)

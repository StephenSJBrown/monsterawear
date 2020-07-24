let order = JSON.parse(sessionStorage.getItem("order"));

console.log(sessionStorage)

const updateTotal = () => {
  let total = 0.0;
  order.forEach((item) => {
    total += parseFloat(item.quantity) * parseFloat(item.price);
  });
  $(`#total-value`)[0].innerText = `£${total.toFixed(2)}`;
  sessionStorage.setItem("item total", total.toFixed(2));
};

const removeFromCart = (e) => {
  let index = e.target.value;
  $(`#item-${index}`).remove();
  let total = parseInt(sessionStorage.getItem("item count"));
  total -= parseInt(order[index].quantity);
  sessionStorage.setItem("item count", total);
  order.splice(index);
  sessionStorage.setItem("order", JSON.stringify(order));
  if (order.length == 0) {
    $(`#empty-cart`).show();
    $(`#delivery`).hide();
  }
  updateTotal();
};

if (order && order.length > 0) {
  $(`#empty-cart`).hide();
  $(`#populated-cart`).show();
  $(`#total-container`).show();
  $(`#delivery`).show();
  order.forEach((item, i) => {
    $(`#populated-cart`).append(
      `<div class="cart-item-small" id="item-${i}">
                <img src="#" class="item-m" alt="#"/>
                <div>
                    <p>${item.name} ${item.colour}</p>
                    <div class="separator">
                        <p>${
                          item.size.charAt(0).toUpperCase() + item.size.slice(1)
                        }</p>
                        <p>${item.quantity}</p>
                        <p>£${item.price}</p>
                    </div>
                    <button class="remove" value="${i}">Remove</button>
                </div>
            </div>`
    );
  });
  $(`.remove`).each((i, button) => {
    button.addEventListener("click", removeFromCart);
  });
  updateTotal();
}

let order = JSON.parse(sessionStorage.getItem("order"));

const removeFromCart = (e) => {
    let index = e.target.value
    $(`#item-${index}`).remove()
    let total = parseInt(sessionStorage.getItem("item total"))
    total -= parseInt(order[index].quantity)
    sessionStorage.setItem("item total", total)
    order.splice(index)
    sessionStorage.setItem("order", JSON.stringify(order))
    if (order.length == 0) {
        $(`#empty-cart`).show();
        $(`#delivery`).hide()
    }
}

if (order.length > 0) {
  $(`#empty-cart`).hide();
  $(`#populated-cart`).show();
  order.forEach((item, i) => {
    $(`#populated-cart`).append(
      `<div class="cart-item-small" id="item-${i}">
                <img src="#" class="item-m" alt="#"/>
                <div>
                    <p>${item.name} ${item.colour}</p>
                    <div class="separator">
                        <p>${item.size.charAt(0).toUpperCase() + item.size.slice(1)}</p>
                        <p>${item.quantity}</p>
                        <p>${item.price}</p>
                    </div>
                    <button class="remove" value="${i}">Remove</button>
                </div>
            </div>`
    );
  });
  $(`.remove`).each((i, button) => {
      button.addEventListener("click", removeFromCart)
  })
}




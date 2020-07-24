const order = JSON.parse(sessionStorage.getItem("order"))
const deliveryCost = parseFloat(sessionStorage.getItem("delivery cost"))
const orderTotal = parseFloat(sessionStorage.getItem("order total"))
const itemTotal = parseFloat(sessionStorage.getItem("item total"))

console.log(sessionStorage)

if (order.length == 0) {
    window.location.href = "index.html"
}

order.forEach((item, i) => {
    $(`#delivery-items`).append(
      `<div class="cart-item-small" id="item-${i}">
                <img src="#" class="item-s" alt="#"/>
                <div>
                    <p>${item.name} ${item.colour}</p>
                    <div class="separator">
                        <p>${item.size.charAt(0).toUpperCase() + item.size.slice(1)}</p>
                        <p>${item.quantity}</p>
                        <p>£${item.price}</p>
                    </div>
                </div>
            </div>`
    );
  });

const updateTotals = () => {
    $(`#item-value`)[0].innerText = `£${itemTotal.toFixed(2)}`
    $(`#delivery-value`)[0].innerText = `£${deliveryCost}`
    $(`#total-value`)[0].innerText = `£${(orderTotal).toFixed(2)}`
}

updateTotals()
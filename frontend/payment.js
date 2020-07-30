const order = sessionStorage.getItem("order");
const delivery = JSON.parse(sessionStorage.getItem("delivery info"))
const deliveryCost = parseFloat(sessionStorage.getItem("delivery cost"));
const deliveryType = sessionStorage.getItem("delivery type")
const orderTotal = parseFloat(sessionStorage.getItem("order total"));
const itemTotal = parseFloat(sessionStorage.getItem("item total"));
const itemCount = parseInt(sessionStorage.getItem("item total"));

console.info(sessionStorage);
console.log(delivery)
console.log(order)
console.log(deliveryType)

if (order.length == 0) {
  window.location.href = "index.html";
}

JSON.parse(order).forEach((item, i) => {
  $(`#delivery-items`).append(
    `<div class="cart-item-small" id="item-${i}">
                <img src="#" class="item-s" alt="#"/>
                <div>
                    <p>${item.name} ${item.colour}</p>
                    <div class="separator">
                        <p>${
                          item.size.charAt(0).toUpperCase() + item.size.slice(1)
                        }</p>
                        <p>${item.quantity}</p>
                        <p>£${item.price}</p>
                    </div>
                </div>
            </div>`
  );
});

const updateTotals = () => {
  $(`#item-value`)[0].innerText = `£${itemTotal.toFixed(2)}`;
  $(`#delivery-value`)[0].innerText = `£${deliveryCost}`;
  $(`#total-value`)[0].innerText = `£${orderTotal.toFixed(2)}`;
};

updateTotals();


$.ajax({
  url: "http://localhost:8000/api/generate",
  method: "GET",
  success: function (clientToken) {
    braintree.dropin.create(
      {
        authorization: clientToken,
        container: "#dropin-container",
      },
      function (createErr, instance) {
        button.addEventListener("click", function () {
          console.log("submitted the token");
          instance.requestPaymentMethod(function (err, payload) {
            // Submit payload.nonce to your server
            console.log(payload);
            $.ajax({
              method: "POST",
              url: "http://localhost:8000/api/create",
              data: 
              { nonce: payload.nonce,
                firstName: delivery.first,
                lastName: delivery.last,
                email: delivery.email,
                address: delivery.address,
                postcode: delivery.postcode,
                items: order,
                itemCount: itemCount,
                itemTotal: itemTotal,
                deliveryCost: deliveryCost,
                deliveryType: deliveryType,
                orderTotal: orderTotal
               }
              })
              .done(function( orderID ) {
                  alert( "Data Saved: " + orderID );
                  sessionStorage.setItem("order id", orderID)
                  window.location.href = "confirm.html";
                });
              });
        });
      }
    );
  },
  error: function (error) {
    console.log(`Error: ${error}`);
  },
});

var button = document.querySelector("#complete-order");

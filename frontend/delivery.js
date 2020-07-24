let order = JSON.parse(sessionStorage.getItem("order"));
let itemTotal = parseInt(sessionStorage.getItem("item total"));

console.log(sessionStorage);

if (order.length == 0) {
  window.location.href = "index.html";
}

const handleFirst = () => {
  return $(`#first-input`)[0].value;
};
const handleLast = () => {
  return $(`#last-input`)[0].value;
};
const handleEmail = () => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String($(`#email-input`)[0].value.toLowerCase()));
};
const handleAddress = () => {
  return $(`#address-input`)[0].value.length > 5;
};
const handlePostcode = () => {
  const re = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
  return re.test(String($(`#postcode-input`)[0].value).toLowerCase());
};
const handleRadios = () => {
  let ans = false;
  $(`.radio`).each((i, radio) => {
    if (radio.checked) {
      ans = true;
    }
  });
  return ans
};

const checkAll = () => {
  console.log("checking all...");
  if (
    handleFirst() &&
    handleLast() &&
    handleEmail() &&
    handleAddress() &&
    handlePostcode() &&
    handleRadios()
  ) {
    $(`#confirm-payment`).attr("disabled", false);
  }
};

order.forEach((item, i) => {
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
  let delivery = parseFloat($(`#delivery-value`)[0].innerText);
  $(`#total-value`)[0].innerText = `£${(itemTotal + delivery).toFixed(2)}`;
  sessionStorage.setItem("order total", (itemTotal + delivery).toFixed(2));
};

updateTotals();

const updateDelivery = (e) => {
  $(`#delivery-value`)[0].innerText = e.target.value;
  sessionStorage.setItem("delivery cost", e.target.value);
  checkAll();
  updateTotals();
};

$(`.radio`).each((i, radio) => {
  radio.addEventListener("click", updateDelivery);
});
$(`.radio`).each((i, radio) => {
  radio.addEventListener("click", checkAll);
});

$(`.input`).each((i, input) => {
  input.addEventListener("change", checkAll);
});

$(`#confirm-payment`)[0].addEventListener("click", function () {
  let first = $(`#first-input`)[0].value;
  let last = $(`#last-input`)[0].value;
  let email = $(`#email-input`)[0].value;
  let address = $(`#address-input`)[0].value;
  let postcode = $(`#postcode-input`)[0].value;
  let deliveryInfo = {first, last, email, address, postcode}
  sessionStorage.setItem("delivery info", JSON.stringify(deliveryInfo))
  window.location.href = "payment.html";
});

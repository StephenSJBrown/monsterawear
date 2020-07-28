const updateCartCounter = () => {
  if (parseInt(sessionStorage.getItem("item count")) > 0) {
    $(`#cart-counter`)[0].innerText = sessionStorage.getItem("item count");
    $(`#cart-counter`).show();
  } else {
    sessionStorage.setItem("item count", 0);
    $(`#cart-counter`).hide();
  }
};

updateCartCounter()
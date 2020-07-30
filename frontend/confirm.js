console.log(sessionStorage)
orderID = sessionStorage.getItem("order id")

if (!orderID) {
    window.location.href = "index.html"
}

$(`#order-number`)[0].innerText = `Order #${orderID}`
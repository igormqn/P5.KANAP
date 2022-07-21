const orderId = getOrderId()


function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
}


function displayOrderId() {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}
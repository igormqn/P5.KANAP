const orderId = getOrderId()
displayOrderId(orderId)
removeAllCache() 
// function to take back the product id
function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
}

// function to display the orderId
function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}
// function to display the element from the localStorage
function removeAllCache() {
    const cache = window.localStorage
    cache.clear()

}
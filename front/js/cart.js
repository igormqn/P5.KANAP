
const cart = []

retrieveItemsFromCache()
cart.forEach((item) => displayItem(item))
// function to transfer client data
const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

// function to give the possibility to display more item on the localStorage
function retrieveItemsFromCache() {
  const numberOfItems = localStorage.length
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || ""
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
  }
}
// function used to display the item create variable used in function below
function displayItem(item) {
  const article = makeArticle(item)
  const imageDiv = makeImage(item)
  article.appendChild(imageDiv)
  const cardItemContent = makeCartContent(item)
  article.appendChild(cardItemContent)
  displayArticle(article)
  displayTotalQuantity()
  displayTotalPrice()
}
// function to display the total quantity on the page
function displayTotalQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity")
  const total = cart.reduce((total, item) => total + item.quantity, 0)
  totalQuantity.textContent = total
}
// function to display the total quantity on the page
function displayTotalPrice() {
  const totalPrice = document.querySelector("#totalPrice")
  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  totalPrice.textContent = total
}
// function to display the product content on the cart page
function makeCartContent(item) {
  const cardItemContent = document.createElement("div")
  cardItemContent.classList.add("cart__item__content")

  const description = makeDescription(item)
  const settings = buildSettings(item)

  cardItemContent.appendChild(description)
  cardItemContent.appendChild(settings)
  return cardItemContent
}
// function to make the settings of the product
function buildSettings(item) {
  const settings = document.createElement("div")
  settings.classList.add("cart__item__content__settings")

  addQuantityToSettings(settings, item)
  addDeleteToSettings(settings, item)
  return settings
}
// function to delete product from the settings
function addDeleteToSettings(settings, item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")
  div.addEventListener("click", () => deleteItem(item))

  const p = document.createElement("p")
  p.textContent = "Supprimer"
  div.appendChild(p)
  settings.appendChild(div)
}
// function to delete product from the localStorage
function deleteItem(item) {
  const itemToDelete = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color
  )
  cart.splice(itemToDelete, 1)
  displayTotalPrice()
  displayTotalQuantity()
  deleteDataFromCache(item)
  deleteArticleFromPage(item)

  if (localStorage.length === 0 ) {
    alert("Panier vide, retour à l'accueil")
    window.location = "index.html";
  }
}
// function to delete article from page
function deleteArticleFromPage(item) {
  const articleToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  )
  articleToDelete.remove()
}
// function to create the input to choose the quantity between 1 and 100
function addQuantityToSettings(settings, item) {
  const quantity = document.createElement("div")
  quantity.classList.add("cart__item__content__settings__quantity")
  const p = document.createElement("p")
  p.textContent = "Qté : "
  quantity.appendChild(p)
  const input = document.createElement("input")
  input.type = "number"
  input.classList.add("itemQuantity")
  input.name = "itemQuantity"
  input.min = "1"
  input.max = "100"
  input.value = item.quantity
// variable to create an alert if the quantity is null, negative or above 100
  input.addEventListener("blur", (e) => {
    const qte = e.target.value;
    if (qte < 0 || qte > 100) {
      alert("La quantité doit être comprise entre 1 et 100");
      input.value = 1;
      return;
    }

  })

  input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))
  quantity.appendChild(input)
  settings.appendChild(quantity)

}

// function to permit the user to update quantity to display a new price
function updatePriceAndQuantity(id, newValue, item) {
  const itemToUpdate = cart.find((item) => item.id === id)
  itemToUpdate.quantity = Number(newValue)
  item.quantity = itemToUpdate.quantity
  displayTotalQuantity()
  displayTotalPrice()
  saveNewDataToCache(item)
}
// function to create the alert to delete the item from LocalStorage and create the alert if he is sure
function deleteDataFromCache(item) {
  const key = `${item.id}-${item.color}`;
  if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
    localStorage.removeItem(key)
  }
  else {
    return
  }
}

// function to save new data in the localStorage
function saveNewDataToCache(item) {
  const dataToSave = JSON.stringify(item)
  const key = `${item.id}-${item.color}`
  localStorage.setItem(key, dataToSave)
}
// function to create the div cart__item__content__description
function makeDescription(item) {
  const description = document.createElement("div")
  description.classList.add("cart__item__content__description")

  const h2 = document.createElement("h2")
  h2.textContent = item.name
  const p = document.createElement("p")
  p.textContent = item.color
  const p2 = document.createElement("p")
  p2.textContent = item.price + " €"

  description.appendChild(h2)
  description.appendChild(p)
  description.appendChild(p2)
  return description
}
// function to create the article with the id
function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article)
}
function makeArticle(item) {
  const article = document.createElement("article")
  article.classList.add("card__item")
  article.dataset.id = item.id
  article.dataset.color = item.color
  return article
}
// function use to create the image
function makeImage(item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__img")

  const image = document.createElement("img")
  image.src = item.imageUrl
  image.alt = item.altTxt
  div.appendChild(image)
  return div
}
// function to tell what to do if the cart is null
function submitForm(e) {
  e.preventDefault()
  if (cart.length === 0) {
    alert("Please select items to buy")
    return
  }

  if (ifFormInvalid()) return
  if (ifEmailInvalid()) return

  const body = makeRequestBody()
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId
      window.location.href = "/html/confirmation.html" + "?orderId=" + orderId
    })
    .catch((err) => console.error(err))
}
// function to tell what is allowed when we write the e-mail
function ifEmailInvalid() {
  const email = document.querySelector("#email").value
  var mailformat = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,7}$/
  if (mailformat.test(email) === false) {
    alert("Please enter valid email")
    return true
  }
  return false
}
// function to tell what is allowed when we write the e-mail wrong
function ifFormInvalid() {
  const form = document.querySelector(".cart__order__form")
  const inputs = form.querySelectorAll("input")
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("Please fill all the fields")
      return true
    }
    return false
  })
  
}
// function to make the form of the formulary
function makeRequestBody() {
  const form = document.querySelector(".cart__order__form")
  const firstName = form.elements.firstName.value
  const lastName = form.elements.lastName.value
  const address = form.elements.address.value
  const city = form.elements.city.value
  const email = form.elements.email.value
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email
    },
    products: getIdsFromCache()
  }
  return body
}
// function to get the id from the cache
function getIdsFromCache() {
  const numberOfProducts = localStorage.length
  const ids = []
  for (let i = 0; i < numberOfProducts; i++) {
    const key = localStorage.key(i)
    const id = key.split("-")[0]
    ids.push(id)
  }
  return ids
}

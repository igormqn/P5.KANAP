// recuperation of product id
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
    let Priceitem = 0
    let imgUrl, altText, articleName
}
// Ask API to find & return informations
fetch(`http://localhost:3000/api/products/${id}`)
.then((response) => response.json())
.then((res) => handleData(res))
//function manage the data and our functions
function handleData(Canape) {
    const { altTxt, colors, description, imageUrl, name, price } = Canape
    Priceitem = price
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
  }
//function create img 
function makeImage(imageUrl, altTxt) {
    const image = document.createElement('img')
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}
//function create title
function makeTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name 
}
//function create price
function makePrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}
//function create descritpion
function makeDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}
//function to display colors
function makeColors(colors) {
    const select = document.querySelector("#colors")
    if (select != null) {
    colors.forEach((color) => {
    const option = document.createElement("option")
    option.value = color
    option.textContent = color
    select.appendChild(option)
    })
  }  
}
//function to create addtocart button
const button = document.querySelector("#addToCart")
    button.addEventListener("click", handleClick)
//function to create  the colors and quantity input
function handleClick() {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
   if (ifOrderInvalid(color, quantity)) return
   SaveMyOrder(color, quantity)
   redirectToCart()
}
//function to save the order inside the localStorage
function SaveMyOrder(color, quantity) {
    const key = `${id}-${color}`
        const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price: Priceitem,
        imageUrl: imgUrl,
        altTxt: altText,
        name: articleName,
    }
    localStorage.setItem(key, JSON.stringify(data))
}
//function to tell what to do in case the order is invalid
function ifOrderInvalid(color, quantity) {
    if (color == null || color == "" || quantity == null) {
        alert("Please select a color and quantity")
        return true
    }
}
//function to tell what to do in case the order is valid
function redirectToCart() {
    window.location.href = "cart.html"
}
//variable to keep quantity between 1 and 100
let qte = document.querySelector("#quantity");

qte.addEventListener("blur", function () {
    if (qte.value < 1 || qte.value > 100) {
        alert("La quantité doit être comprise entre 1 et 100");
        qte.value = 1;
        return;
    }
});


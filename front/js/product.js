const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
    let Priceitem = 0
    let imgUrl, altText, articleName
}

fetch(`http://localhost:3000/api/products/${id}`)
.then((response) => response.json())
.then((res) => handleData(res))

function handleData(Kanape) {
    const {altTxt, colors, description, imageUrl, name, price } = Kanape
    Priceitem = price
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeCartContent(description)
    makeColors(colors)
}

function makeImage(imageUrl, altTxt) {
    const image = document.createElement('img')
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item_img")
    if (parent != null) parent.appendChild(image)
}

function makeTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name 

}

function makePrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}
function makeCartContent(description) {
    const p = document.querySelector("description")
    if (p != null) p.textContent = description
}
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

const button = document.querySelector("#addToCart")
    button.addEventListener("click", handleClick)

function handleClick() {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
   if (isOrderInvalid(color, quantity)) return
   SaveMyOrder(color, quantity)
   redirectToCart()
}
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
function isOrderInvalid(color, quantity) {
    if (color == null || color == "" || quantity == null) {
        alert("Please select a color and quantity")
        return true
    }
}
function redirectToCart() {
    window.location.href = "cart.html"
}


input.addEventListener("blur", (e) => {
    const qte = e.target.value;
    if (qte < 0 || qte > 100) {
      alert("La quantité doit être comprise entre 1 et 100");
      input.value = 1;
      return;
    }

  })


//if (qte < 1 || qte > 100)
//{ alert("Veuillez saisir une quantité entre 1 et 100"); 
 //return false;
//}

//colors.forEach(element =>  {
 //   console.log(element)});
//function option(Value) {
//    let option = document.createElement("option")
//}

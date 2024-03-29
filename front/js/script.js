// Ask API to find & return informations

fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((data) => addProducts(data))

// Function to create card & link
// use for each element to call the function on each array éléments
function addProducts (data) {
    //const _id = data[0]._id
   // const imageUrl = data[0].imageUrl
   // const altTxt = data[0].altTxt
   // const name = data[0].name
   // const description = data[0].descritpion
   

  data.forEach((canape) => {
    

    const { _id, imageUrl, altTxt, name, description} = canape
    const anchor = makeAnchor(_id)
    const article = document.createElement("article")
    const image = makeImage(imageUrl, altTxt)
    const h3 = makeH3(name)
    const p = makeParagraph(description)
    
    appendElementsToArticle(article, [image, h3, p])
    appendArticleToAnchor(anchor, article)    
})
}
// I used this function to append my elements inside an articled
function appendElementsToArticle(article, array) {
    array.forEach((item) => {
        article.appendChild(item)
    })
}
// Function to create a href
function makeAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor  
}
// Function to append the article as a child of anchor
function appendArticleToAnchor(anchor, article)  {
    const items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(anchor) 
        anchor.appendChild(article)  
        console.log("éléments ajouté à items", items)     
    } 
}
// Function to create the image
function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}
// Function to create the H3
function makeH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}
// Function to create the p element
function makeParagraph(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}


fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((data) => {

        
    });
    
function addProduct(donnees) {
    let imageUrl = donnees[0].imageUrl
   
    let anchor = document.createElement("a") 
    anchor.text = "Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu."
    anchor.href = imageUrl
    let items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(anchor)
    }
}
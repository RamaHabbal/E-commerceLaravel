
window.addEventListener("load" ,async () =>{
const cart_id = localStorage.getItem("cart_id")
console.log(cart_id);
const cartItemsArray1 = [];
const cartItemsArray2 = [];

async function displayCartItems(cart_id) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/get_cart/${cart_id}`,
      {
        method: "GET",
      }
    );

    const responseData = await response.json();
    const cartItems = responseData.cart_items;
    console.log(responseData);

    const cartContainer = document.querySelector(".productCardContainer");
    cartContainer.innerHTML = ""; 

    cartItems.forEach((cartItem) => {
      const { name, description, image, price, quantity, category_id } =
        cartItem;
      if (category_id === 1) {
        cartItemsArray1.push(`
        <div class="productCard">
            <img class="productImage" src="${image}">
              <p class="productName">${name}</p>
             <p class="productName">Scented</p>
              <p class="productDetails">${description}</p>
              <div class="cartPrice">
              <p class="productPrice">$${price}</p>
              <p class="cartItemQuantity">Quantity: ${quantity}</p>
            </div>
            </div>
        
        `);
      } else if (category_id === 2) {
        cartItemsArray2.push(`
        <div class="productCard">
              <img class="productImage" src="${image}"> 
                <p class="productName">${name}</p>
               <p class="productName">Unscented</p>
                <p class="productDetails">${description}</p>
                <div class="cartPrice">
                <p class="productPrice">$${price}</p>
                <p class="cartItemQuantity">Quantity: ${quantity}</p>
                </div>
            </div>`);
      }
    });

    const cartSection1 = document.querySelector(".productCardContainer");
    cartSection1.innerHTML += cartItemsArray1.join("");
    const cartSection2 = document.querySelector(".productCardContainer1");
    cartSection2.innerHTML += cartItemsArray2.join("");
  } catch (error) {
    console.log(error);
    console.log("An error occurred while fetching cart items.");
  }
}
displayCartItems(cart_id)


})


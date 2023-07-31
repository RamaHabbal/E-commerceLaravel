window.addEventListener('load', () => {
const user = JSON.parse(localStorage.getItem("user"));
const authorization = JSON.parse(localStorage.getItem("authorization"));
const cart_id =localStorage.getItem("cart_id")
console.log(cart_id);
const scented = [];
const unscented = [];
async function getPproducts() {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/products`, {
      method: "GET",
    });

    const products = await response.json();

    products.forEach((element) => {
      const product_Id = element.id;
      const cart_id = element.id;
      console.log(cart_id);
      const name = element.name;
      const description = element.description;
      const image = element.image;
      const price = element.price;
      const category = element.category_id;
      //   console.log(category);
      if (category === 1) {
        scented.push(`
        <div class="productCard" id="${product_Id}">
        <img class="productImage" src="${image}">
        <p class="productName">${name}</p>
        <p class="productName">Scented</p>
        <p class="productDetails"> ${description}</p>
        <div class="cartPrice">
            <p class="productPrice">${price}</p>
            <img class="cart" src="/src/images/cart.png" alt="" data-product-id="${product_Id}">
        </div>
    </div>
        
    `);
      } else if (category === 2) {
        unscented.push(`
        <div class="productCard" id="${product_Id}">
        <img class="productImage" src="${image}">
        <p class="productName">${name}</p>
        <p class="productName">Unscented</p>
        <p class="productDetails"> ${description}</p>
        <div class="cartPrice">
            <p class="productPrice">${price}</p>
            <img class="cart" src="/src/images/cart.png" alt="" data-product-id="${product_Id}">
        </div>
    </div>
        
    `);
      }
    });

    const scentedSection = document.querySelector(".productCardContainer");
    scentedSection.innerHTML += scented.join("");
    const unscentedSection = document.querySelector(".productCardContainer1");
    unscentedSection.innerHTML += unscented.join("");


    const cartButtons = document.querySelectorAll(".cart");
    cartButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const product_id = event.target.getAttribute("data-product-id");
        const cart_id =localStorage.getItem("cart_id")
 
        try {
          const response = await fetch("http://127.0.0.1:8000/api/add_cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authorization.token}`,
            },
            body: JSON.stringify({
              cart_id,
              product_id,
              quantity: 1,
            }),
          });
          const responseData = await response.json();
          console.log(responseData);
          if (responseData) {
            console.log("Added to the cart!");
            console.log(product_id);
            console.log(cart_id);


          } else {
            console.log("Failed to add to cart");
          }
        } catch (error) {
          console.log(error);
          console.log(
            "An error occurred while adding to cart. Please try again later."
          );
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}
getPproducts();
})
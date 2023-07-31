const user = JSON.parse(localStorage.getItem("user"));
const authorization = JSON.parse(localStorage.getItem("authorization"));
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
      const name = element.name;
      const description = element.description;
      const image = element.image;
      const price = element.price;
      scented.push(`
        <div class="productCard" id="${product_Id}">
        <img class="productImage" src="${image}">
        <p class="productName">${name}</p>
        <p class="productDetails"> ${description}</p>
        <div class="cartPrice">
            <p class="productPrice">${price}</p>
            <img class="cart" src="/src/images/cart.png" alt="" data-product-id="${product_Id}"   data-cart-id="${cart_id}">
        </div>
    </div>
        
    `);
    });

    const scentedSection = document.querySelector(".productCardContainer");
    scentedSection.innerHTML += scented.join("");
    const unscentedSection = document.querySelector(".productCardContainer1");
    unscentedSection.innerHTML += unscented.join("");

    const cartButtons = document.querySelectorAll(".cart");
    cartButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const product_id = event.target.getAttribute("data-product-id");
        const cart_id = event.target.getAttribute("data-cart-id");
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

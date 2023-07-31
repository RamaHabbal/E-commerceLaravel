// window.addEventListener("load", ()=> {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const authorization = JSON.parse(localStorage.getItem("authorization"));
//   const cart_id = JSON.parse(localStorage.getItem("cart"));
//     // console.log(user, authorization, cart_id);

//   const addToCart = document.querySelectorAll(".cart");
// // console.log(addToCart);
//   console.log(10000000000);
//   addToCart.addEventListener("click", async () => {
//     console.log(555555555);

//     const cartId = JSON.parse(localStorage.getItem("cart"));
//     const productId = JSON.parse(localStorage.getItem("product"));



//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/add_cart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${authorization.token}`,
//         },
//         body: JSON.stringify({
//           cart: cartId,
//           product: productId,
//           quantity: 1,
//         }),
//       });
//       const responseData = await response.json();
//       if (responseData.ok) {
//         console.log(`Added to the cart!`);
//       } else {
//         console.log("Failed to add to cart");
//       }
//     } catch (error) {
//       console.log(error);
//       console.log(
//         "An error occurred while adding to cart. Please try again later."
//       );
//     }
//   });
// });

window.addEventListener('load', () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const authorization = JSON.parse(localStorage.getItem("authorization"));
    const cart_id =localStorage.getItem("cart_id")
    console.log(cart_id);
    const scented = [];
    const unscented = [];
    async function getPproducts() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/get_category`, {
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
          if (category === 1) {
            scented.push(`
            <div class="productCard" id="${product_Id}">
            <img class="productImage" src="${image}">
            <p class="productName">${name}</p>
            <p class="productName">${element.category_name}</p>
            <p class="productDetails"> ${description}</p>
            <div class="cartPrice">
                <p class="productPrice">${price}</p>
                <button   class="editBtn"   data-product-id="${product_Id}">Edit</button>
                <button   class="deleteBtn" data-product-id="${product_Id}">Delete</button>
            </div>
        </div>
            
        `);
          } else if (category === 2) {
            unscented.push(`
            <div class="productCard" id="${product_Id}">
            <img class="productImage" src="${image}">
            <p class="productName">${name}</p>
            <p class="productName">${element.category_name}</p>
            <p class="productDetails"> ${description}</p>
            <div class="cartPrice">
                <p class="productPrice">${price}</p>
                <button class="editBtn" data-product-id="${product_Id}">Edit</button>
                <button class="deleteBtn" data-product-id="${product_Id}">Delete</button>
            </div>
        </div>
            
        `);
          }
        });
    
        const scentedSection = document.querySelector(".productCardContainer");
        scentedSection.innerHTML += scented.join("");
        const unscentedSection = document.querySelector(".productCardContainer1");
        unscentedSection.innerHTML += unscented.join("");
    
        const deleteBtns = document.querySelectorAll(".deleteBtn");
        deleteBtns.forEach((btn) =>{
            btn.addEventListener("click",async()=>{
            const product_Id = btn.dataset.productId;
            const response = await fetch(`http://127.0.0.1:8000/api/deleteProduct/${product_Id}`,{
                method: "DELETE",
            })
                const message = await response.json()
                console.log(message);
                window.location.href = "dashboard.html"
            })
        });
        
      } catch (error) {
        console.log(error);
      }
    }
    getPproducts();
    })
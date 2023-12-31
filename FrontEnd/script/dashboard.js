window.addEventListener("load", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const authorization = JSON.parse(localStorage.getItem("authorization"));
  // const cart_id =localStorage.getItem("cart_id")
  // console.log(cart_id);
  const scented = [];
  const unscented = [];

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
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const product_Id = btn.dataset.productId;
      const response = await fetch(
        `http://127.0.0.1:8000/api/deleteProduct/${product_Id}`,
        {
          method: "DELETE",
        }
      );
      const message = await response.json();
      console.log(message);
      window.location.href = "dashboard.html";
    });
  });

  const addBtn = document.getElementById("addBtn");

  addBtn.addEventListener("click", async () => {
    const fileInput = document.getElementById("imgInput").files[0];
    const name = document.getElementById("nameInput");
    const price = document.getElementById("priceInput");
    const description = document.getElementById("descriptionInput");
    const category = document.getElementById("categoryInput");

    let imgString;
    const reader = new FileReader();
    reader.onload = async function (e) {
      imgString = e.target.result;

      const data = {
        name: name.value,
        price: price.value,
        description: description.value,
        category_name: category.value,
        image: imgString,
      };
      const response = await fetch("http://127.0.0.1:8000/api/add_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      window.location.href = "dashboard.html";
    };
    reader.readAsDataURL(fileInput);
  });


  // const editBtns = document.getElementById("editBtn")
  // editBtns.addEventListener("click", async()=>{
  //   const fileInput = document.getElementById("editImage").files[0];
  //   const name = document.getElementById("editName");
  //   const price = document.getElementById("editPrice");
  //   const description = document.getElementById("editDesc");
  //   const category = document.getElementById("editCategory");
  //   const product_id = button.dataset.productId;

  //   let imageString;
  //   const reader = new FileReader();

  //     fileReader.onload = async function(event) {
  //       imageString = event.target.result;
        

  //       const updateData = {
  //         name: name.value,
  //         price: price.value,
  //         description: description.value,
  //         category_name: category.value,
  //         image:imageString
  //       };

  //       const updateresponse = await fetch(`http://127.0.0.1:8000/api/updateProduct/${product_id}`, {
  //       method: 'POST', 
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(updateData),
  //       });
        
  //       window.location.href = "dashboard.html"


  //   };

  //   reader.readAsDataURL(fileInput);

  // })

  
});


window.addEventListener('load', () =>{
    
    let signIn = document.getElementById("nextBtn");

    signIn.addEventListener("click",async ()=>{

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data)
            if (data.message === "Unauthorized") {
                emailInput.style.borderColor = "red";
                passwordInput.style.borderColor = "red";
            } else {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("authorization", JSON.stringify(data.authorization));

                if (data.user.role === "customer") {
                    window.location.href = "/pages/products.html";
                }
            }

        } catch (error) {
            emailInput.style.borderColor = "red";
        }
    });
});

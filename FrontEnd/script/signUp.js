
window.addEventListener('load', () =>{
    
    let signIn = document.getElementById("nextBtn");

    signIn.addEventListener("click",async ()=>{

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const role = "customer"

        const name = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        
        try {
            const response = await fetch("http://127.0.0.1:8000/api/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, email, password, role }),
            });

            const data = await response.json();

            if (data.message === "User created successfully") {
                window.location.href = "/pages/signIn.html";
               
            } else {      
                nameInput.style.borderColor = "red"
                emailInput.style.borderColor = "red";
                passwordInput.style.borderColor = "red";
            }

        } catch (error) {
            emailInput.style.borderColor = "red";
        }
    });
});

window.addEventListener("load", () => {
  const user = localStorage.getItem("user");
  const authorization = JSON.parse(localStorage.getItem("authorization"));
  const logout = document.getElementById("logout");
//   console.log(authorization.token);
  logout.addEventListener("click", async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorization.token}`,
        },
      });

      const data = await response.json();
      console.log(data.message);
      if (data.message === "Successfully logged out") {
        localStorage.clear();
        window.location.href = "/pages/signIn.html";
      }
    } catch (error) {
      console.log(error);
    }
  });
});

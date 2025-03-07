
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const switchToSignup = document.getElementById("switch-to-signup");
const switchToLogin = document.getElementById("switch-to-login");
const logoutButton = document.getElementById("logout-btn");

switchToSignup.addEventListener("click", () => {
  loginForm.classList.remove("active");
  signupForm.classList.add("active");
});

switchToLogin.addEventListener("click", () => {
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
});

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const response = await fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Signup successful! Please login.");
      loginForm.classList.add("active");
      signupForm.classList.remove("active");
    } else {
      alert(data.message || "Error during signup.");
    }
  } catch (error) {
    console.error("Error during signup:", error);
  }
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      window.location.href = "/Frontend/1.Home/home.html"; 
    } else {
      alert(data.message || "Error during login.");
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
});

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  alert("Logged out successfully.");
  window.location.href = "/Frontend/2.Login/login.html"; 
});

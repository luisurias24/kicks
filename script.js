document.addEventListener("DOMContentLoaded", function () {
  const loginMenuLink = document.getElementById("loginMenuLink");
  const loginSection = document.getElementById("loginSection");
  const loginForm = document.getElementById("loginForm");
  const userInfo = document.getElementById("userInfo");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const requiresLoginElements = document.querySelectorAll(".requires-login");
  const usuariosValidos = {
  "admin": "1234",
  "juan": "pass123",
  "maria": "tenis2025"
};


  // Oculta todo lo que requiere sesión al principio
  requiresLoginElements.forEach(el => el.style.display = "none");

  // Mostrar el formulario al hacer clic en el menú
  loginMenuLink.addEventListener("click", function (e) {
    e.preventDefault();
    loginSection.style.display = "block";
  });

  // Verifica si ya hay un usuario guardado
  const savedUser = localStorage.getItem("username");
  if (savedUser) {
    mostrarUsuario(savedUser);
  }

  // Al iniciar sesión
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
const password = document.getElementById("password").value.trim();

if (usuariosValidos[username] && usuariosValidos[username] === password) {
  localStorage.setItem("username", username);
  mostrarUsuario(username);
} else {
  alert("Usuario o contraseña incorrectos.");
}

  });

  function mostrarUsuario(nombre) {
    welcomeMessage.innerHTML = `
      <strong>¡Bienvenido a Kick Store, ${nombre}!</strong><br>
      <span class="mensaje-extra">Nos alegra tenerte de vuelta. Descubre los últimos lanzamientos y encuentra tu próximo par favorito.</span>
    `;
    userInfo.style.display = "block";
    loginSection.style.display = "none";
    if (loginMenuLink) loginMenuLink.style.display = "none";

    // Mostrar elementos que requieren sesión
    requiresLoginElements.forEach(el => el.style.display = "block");
  }

  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("username");
      userInfo.style.display = "none";
      if (loginMenuLink) loginMenuLink.style.display = "inline-block";

      // Ocultar todo lo que requiere sesión
      requiresLoginElements.forEach(el => el.style.display = "none");
    });
  }
});

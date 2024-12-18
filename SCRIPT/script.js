
// Redireccionar a Registro
function redirectToRegister() {
    window.location.href = "/HTML/register.html";
}

// Redireccionar a Login
function redirectToLogin() {
    window.location.href = "/HTML/login.html";
}

// Registrar usuario en LocalStorage
document.getElementById('register-btn')?.addEventListener('click', () => {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    if (name && email && password) {
        localStorage.setItem('user', JSON.stringify({ name, email, password }));
        alert('Usuario registrado exitosamente.');
        redirectToLogin();
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Mostrar el modal con mensaje de bienvenida
function showWelcomeMessage(name) {
    const modal = document.getElementById('welcome-modal');
    const message = document.getElementById('welcome-message');
    message.textContent = `¡Bienvenid@, ${name}!`;
    modal.classList.remove('hidden');

    // Cerrar modal automáticamente después de 3 segundos
    setTimeout(() => {
        modal.classList.add('hidden');
        window.location.href = 'index.html'; // Redirige después de cerrar
    }, 3000);
}

// Validar usuario al iniciar sesión
document.getElementById('login-btn')?.addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        showWelcomeMessage(storedUser.name);
    } else {
        alert('Correo o contraseña incorrectos.');
    }
});


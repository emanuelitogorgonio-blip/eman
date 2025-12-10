// Login credentials (in a real application, this would be handled server-side)
const validCredentials = {
    username: "Eman",
    password: "Eman123"
};

// Check if user is already logged in when portfolio page loads
window.addEventListener('DOMContentLoaded', function() {
    // If we're on the portfolio page, check authentication
    if (window.location.pathname.includes('portfolio.html') || window.location.pathname.endsWith('portfolio.html')) {
        checkAuthentication();
    }
    
    // If we're on the login page, check if already logged in
    if (window.location.pathname.includes('login.html') || window.location.pathname.endsWith('login.html')) {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            window.location.href = 'portfolio.html';
        }
        
        // Setup login form handler
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
    }
});

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Validate credentials
    if (username === validCredentials.username && password === validCredentials.password) {
        // Store login status in sessionStorage
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        
        // Redirect to portfolio page
        window.location.href = 'portfolio.html';
    } else {
        // Show error message
        errorMessage.textContent = 'Invalid username or password. Please try again.';
        errorMessage.classList.add('show');
        
        // Clear password field
        document.getElementById('password').value = '';
        
        // Hide error after 5 seconds
        setTimeout(function() {
            errorMessage.classList.remove('show');
        }, 5000);
    }
}

// Check if user is authenticated before showing portfolio
function checkAuthentication() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    if (isLoggedIn !== 'true') {
        // Redirect to login page if not authenticated
        window.location.href = 'login.html';
    }
}

// Logout function
function logout() {
    // Clear session storage
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    
    // Redirect to login page
    window.location.href = 'login.html';
}


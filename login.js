function login() {
    let username = document.getElementById("login-username").value.trim();
    let password = document.getElementById("login-password").value.trim();
    let errorMessage = document.getElementById("login-error-message");

    if (!username || !password) {
        errorMessage.textContent = "Both fields are required!";
        return;
    } //trueeeeeeeeee

    let users = JSON.parse(localStorage.getItem("users")) || []; // هقارنهم من اللوكل استواردج 
    let validUser = users.find(user => user.username === username && user.password === password);

    if (validUser) {
    
        window.location.href = "exam.html";
    } else {
        errorMessage.textContent = "Invalid username or password!";
    }
}

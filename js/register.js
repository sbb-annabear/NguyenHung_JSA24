let users = JSON.parse(localStorage.getItem("users")) || [
    { email: "test@hase.com", username: "tester" },
    { email: "admin@hase.com", username: "admin" }
];

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();


    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.toLowerCase().trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();


    const lowerCaseLetter = /[a-z]/g;
    const upperCaseLetter = /[A-Z]/g;
    const numbers = /[0-9]/g;
    

    const isDuplicate = users.some(user => user.email === email);
    if (isDuplicate) {
        alert("Một tài khoản tương tự đã đăng ký, vui lòng đăng nhập hoặc nhập thông tin tài khoản khác.");
        return;
    }


    if (username.length < 6) {
        alert("Tài khoản phải ít nhất 6 ký tự.");
        return;
    }


    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again!");
        return;
    }


    if (password.length < 8) {
        alert("Mật khẩu phải ít nhất 8 ký tự.");
    } else if (!password.match(lowerCaseLetter)) {
        alert("Mật khẩu phải có kí tự viết thường.");
    } else if (!password.match(upperCaseLetter)) {
        alert("Mật khẩu phải có kí tự viết hoa.");
    } else if (!password.match(numbers)) {
        alert("Mật khẩu phải có kí tự số.");
    } else {

        users.push({
            email: email,
            password: password,
            username: username,
        });

        localStorage.setItem("users", JSON.stringify(users));
        
        alert("Registration successful! Welcome to Hase.");
        window.location.href = "./login.html";
    }
});
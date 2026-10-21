const form = document.querySelector(".login-form");
const message = document.getElementById("message");

// Handle this exercise in the browser without submitting or reloading the page.
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Both values must match exactly, including uppercase/lowercase and spaces.
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    const isValid = username === "Zaabinh" && password === "22552308";

    message.dataset.status = isValid ? "success" : "error";
    if (!isValid) {
        message.textContent = "Đăng nhập thất bại. Tên người dùng hoặc mật khẩu không đúng.";
        return;
    }

    const name = document.createElement("strong");
    name.textContent = username; // Insert text safely instead of interpreting HTML.
    message.replaceChildren("Đăng nhập thành công. Chào bạn ", name, "!");
});

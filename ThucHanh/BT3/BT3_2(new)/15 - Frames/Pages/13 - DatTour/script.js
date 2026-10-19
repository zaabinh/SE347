const form = document.getElementById("register-form");
const message = document.getElementById("message");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const query = new URLSearchParams(new FormData(form)).toString();
    history.pushState(null, "", "?" + query);
    message.textContent = "Bạn đã đăng ký thành công!!!";
});

// Editing again hides the old message, so it animates in again on the next submit
form.addEventListener("input", function() {
    message.textContent = "";
});
